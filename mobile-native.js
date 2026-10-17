(function initializeWorldPredictionNativeBridge() {
  const capacitor = globalThis.Capacitor;
  const native = Boolean(capacitor?.isNativePlatform?.());
  const plugins = capacitor?.Plugins || {};
  const preferences = plugins.Preferences;
  const localNotifications = plugins.LocalNotifications;
  const keys = {
    snapshot: "wps.mobile.snapshot.v1",
    position: "wps.mobile.position.v1",
    trade: "wps.mobile.trade.v1",
    initialized: "wps.mobile.trade.initialized.v1"
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

  globalThis.WpsNative = Object.freeze({
    isNative: native,
    snapshotUrl: "https://pipihamesu-cell.github.io/world-prediction-system-preview/preview-snapshot.json",
    loadSnapshot,
    saveSnapshot,
    syncTradeNotifications
  });
}());
