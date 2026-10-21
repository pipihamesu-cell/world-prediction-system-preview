(function initializeWorldPredictionNativeBridge() {
  const capacitor = globalThis.Capacitor;
  const native = Boolean(capacitor?.isNativePlatform?.());
  const plugins = capacitor?.Plugins || {};
  const preferences = plugins.Preferences;
  const localNotifications = plugins.LocalNotifications;
  const pushNotifications = plugins.PushNotifications;
  const keys = {
    snapshot: "wps.mobile.snapshot.v1",
    position: "wps.mobile.position.v1",
    trade: "wps.mobile.trade.v1",
    initialized: "wps.mobile.trade.initialized.v1",
    pushToken: "wps.mobile.push.token.v1",
    pushApiUrl: "wps.mobile.push.api-url.v1",
    pushAccessPin: "wps.mobile.push.access-pin.v1",
    pushStatus: "wps.mobile.push.status.v1"
  };

  async function getValue(key) {
    if (!preferences) return localStorage.getItem(key);
    return (await preferences.get({ key })).value;
  }

  async function setValue(key, value) {
    if (!preferences) {
      localStorage.setItem(key, value);
      return;
    }
    await preferences.set({ key, value });
  }

  async function saveSnapshot(snapshot) {
    if (!native || !snapshot) return;
    await setValue(keys.snapshot, JSON.stringify({ savedAt: new Date().toISOString(), snapshot }));
  }

  async function loadSnapshot() {
    if (!native) return null;
    const raw = await getValue(keys.snapshot);
    if (!raw) return null;
    try { return JSON.parse(raw); } catch { return null; }
  }

  function notificationId(value) {
    let hash = 0;
    for (const character of String(value || Date.now())) hash = ((hash << 5) - hash + character.charCodeAt(0)) | 0;
    return Math.max(1, Math.abs(hash) % 2_000_000_000);
  }

  async function showTradeNotification(kind, trade) {
    if (!native || !localNotifications || !trade) return false;
    const permission = await localNotifications.checkPermissions();
    const state = permission.display === "granted" ? permission : await localNotifications.requestPermissions();
    if (state.display !== "granted") return false;
    const pair = trade.pairLabel || trade.assetId?.toUpperCase() || "FX";
    const side = trade.side === "long" ? "買い" : trade.side === "short" ? "売り" : "取引";
    const lots = Number(trade.lots || trade.lotCount || 0);
    const price = Number(kind === "start" ? trade.entryPrice : trade.exitPrice);
    const pnl = Number(trade.netPnl || 0);
    const body = kind === "start"
      ? `${pair} ${side} ${lots || "--"}ロット / 開始 ${Number.isFinite(price) ? price : "--"}`
      : `${pair} ${side}終了 / ${Number.isFinite(price) ? price : "--"} / 損益 ${pnl >= 0 ? "+" : ""}${Math.round(pnl).toLocaleString("ja-JP")}円`;
    await localNotifications.schedule({ notifications: [{
      id: notificationId(`${kind}:${trade.id || trade.openedAt || trade.closedAt}`),
      title: kind === "start" ? "仮想取引を開始しました" : "仮想取引を終了しました",
      body,
      schedule: { at: new Date(Date.now() + 500) },
      extra: { url: "#paper-trading-panel", kind, tradeId: trade.id || "" }
    }] });
    return true;
  }

  async function ensureNotificationPermission() {
    if (!native || !localNotifications) return "unavailable";
    const permission = await localNotifications.checkPermissions();
    if (permission.display === "granted") return "granted";
    const requested = await localNotifications.requestPermissions();
    return requested.display || "denied";
  }

  async function showNotificationTest() {
    if (!native || !localNotifications) throw new Error("Android端末通知を利用できません");
    const permission = await ensureNotificationPermission();
    if (permission !== "granted") throw new Error("Android設定で通知を許可してください");
    await localNotifications.schedule({ notifications: [{
      id: notificationId(`test:${Date.now()}`),
      title: "世界予測システム 通知テスト",
      body: "登録できました。仮想取引の開始・終了時に通知します。",
      schedule: { at: new Date(Date.now() + 500) },
      extra: { url: "#paper-trading-panel", kind: "registration-test" }
    }] });
    return true;
  }

  function normalizedApiUrl(value) {
    const raw = String(value || "").trim().replace(/\/+$/, "");
    return /^https:\/\//i.test(raw) ? raw : "";
  }

  async function pushConnection() {
    const configuredUrl = normalizedApiUrl(await getValue(keys.pushApiUrl));
    const currentOrigin = /^https?:$/i.test(location.protocol) && location.hostname !== "localhost"
      ? normalizedApiUrl(location.origin)
      : "";
    const urlPin = new URLSearchParams(location.search || "").get("pin") || "";
    return {
      apiUrl: configuredUrl || currentOrigin || "https://world-prediction-system.onrender.com",
      pin: await getValue(keys.pushAccessPin) || urlPin
    };
  }

  async function setPushConnection({ apiUrl, pin } = {}) {
    const normalized = normalizedApiUrl(apiUrl);
    if (apiUrl && !normalized) throw new Error("通知APIはHTTPS URLを指定してください");
    if (normalized) await setValue(keys.pushApiUrl, normalized);
    if (pin !== undefined) await setValue(keys.pushAccessPin, String(pin || ""));
    return ensureRemotePushRegistration();
  }

  async function registerTokenWithServer(token) {
    const connection = await pushConnection();
    if (!connection.apiUrl || !connection.pin) {
      const status = { state: "local-monitor-ready", remoteState: "waiting-connection", at: new Date().toISOString() };
      await setValue(keys.pushStatus, JSON.stringify(status));
      return status;
    }
    const response = await fetch(`${connection.apiUrl}/api/native-push/register`, {
      method: "POST",
      headers: { "content-type": "application/json", "x-access-pin": connection.pin },
      body: JSON.stringify({ token, platform: "android", appVersion: "0.3.3", deviceLabel: navigator.userAgent || "Android" })
    });
    if (!response.ok) throw new Error(`通知端末登録に失敗しました (${response.status})`);
    const result = await response.json();
    await setValue(keys.pushToken, token);
    await setValue(keys.pushStatus, JSON.stringify({ state: result.configured ? "instant-ready" : "server-waiting-firebase", at: new Date().toISOString(), ...result }));
    return result;
  }

  async function ensureRemotePushRegistration() {
    if (!native || !pushNotifications) return { state: "unavailable" };
    let permission = await pushNotifications.checkPermissions();
    if (permission.receive !== "granted") permission = await pushNotifications.requestPermissions();
    if (permission.receive !== "granted") {
      await setValue(keys.pushStatus, JSON.stringify({ state: "permission-denied", at: new Date().toISOString() }));
      return { state: "permission-denied" };
    }
    await pushNotifications.register();
    return { state: "registering" };
  }

  async function enableTradeNotifications() {
    const permission = await ensureNotificationPermission();
    if (permission !== "granted") {
      const status = { state: "permission-denied", at: new Date().toISOString() };
      await setValue(keys.pushStatus, JSON.stringify(status));
      return status;
    }
    const status = {
      state: "local-monitor-ready",
      remoteState: pushNotifications ? "registering" : "unavailable",
      monitoringMinutes: 15,
      at: new Date().toISOString()
    };
    await setValue(keys.pushStatus, JSON.stringify(status));
    if (pushNotifications) {
      ensureRemotePushRegistration().catch(async (error) => {
        await setValue(keys.pushStatus, JSON.stringify({
          ...status,
          remoteState: "registration-error",
          message: error?.message || "FCM登録失敗"
        }));
      });
    }
    await showNotificationTest();
    return status;
  }

  async function getPushStatus() {
    const raw = await getValue(keys.pushStatus);
    if (!raw) return { state: pushNotifications ? "not-registered" : "unavailable" };
    try { return JSON.parse(raw); } catch { return { state: "unknown" }; }
  }

  async function syncTradeNotifications(snapshot) {
    if (!native || !snapshot?.paperTrading) return;
    const account = snapshot.paperTrading;
    const position = account.position || null;
    const latestTrade = (account.recentTrades || [])[0] || null;
    const previousPositionId = await getValue(keys.position);
    const previousTradeId = await getValue(keys.trade);
    const initialized = await getValue(keys.initialized);
    if (initialized === "1") {
      if (position?.id && position.id !== previousPositionId) await showTradeNotification("start", position);
      if (!position && latestTrade?.id && latestTrade.id !== previousTradeId) await showTradeNotification("end", latestTrade);
    }
    await setValue(keys.position, position?.id || "");
    await setValue(keys.trade, latestTrade?.id || "");
    await setValue(keys.initialized, "1");
  }

  localNotifications?.addListener?.("localNotificationActionPerformed", (action) => {
    const target = action?.notification?.extra?.url;
    if (target) location.hash = target.replace(/^#/, "");
  });

  pushNotifications?.addListener?.("registration", (registration) => {
    registerTokenWithServer(registration?.value || "").catch(async (error) => {
      await setValue(keys.pushStatus, JSON.stringify({ state: "local-monitor-ready", remoteState: "registration-error", message: error?.message || "即時通知登録失敗", monitoringMinutes: 15, at: new Date().toISOString() }));
    });
  });
  pushNotifications?.addListener?.("registrationError", async (error) => {
    await setValue(keys.pushStatus, JSON.stringify({ state: "local-monitor-ready", remoteState: "registration-error", message: error?.error || error?.message || "即時通知登録失敗", monitoringMinutes: 15, at: new Date().toISOString() }));
  });
  pushNotifications?.addListener?.("pushNotificationActionPerformed", (action) => {
    const target = action?.notification?.data?.url || "#paper-trading-panel";
    location.hash = target.replace(/^.*#/, "");
  });

  if (native && typeof globalThis.addEventListener === "function") {
    globalThis.addEventListener("DOMContentLoaded", () => {
      globalThis.setTimeout(() => {
        ensureNotificationPermission().catch(() => {});
        ensureRemotePushRegistration().catch(() => {});
      }, 1200);
    }, { once: true });
  }

  globalThis.WpsNative = Object.freeze({
    isNative: native,
    snapshotUrl: "https://pipihamesu-cell.github.io/world-prediction-system-preview/preview-snapshot.json",
    loadSnapshot,
    saveSnapshot,
    syncTradeNotifications,
    ensureNotificationPermission,
    ensureRemotePushRegistration,
    enableTradeNotifications,
    showNotificationTest,
    setPushConnection,
    getPushStatus
  });
}());
