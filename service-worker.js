const CACHE_NAME = "world-prediction-system-v156";
const APP_SHELL = [
  "/",
  "/index.html",
  "/styles.css",
  "/app.js",
  "/current-status-assistant.js",
  "/manifest.webmanifest",
  "/icon.svg"
];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL)));
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))))
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);
  if (url.pathname.startsWith("/api/")) return;
  if (["/app.js", "/styles.css", "/index.html", "/"].includes(url.pathname)) {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
          return response;
        })
        .catch(() => caches.match(event.request))
    );
    return;
  }
  event.respondWith(
    caches.match(event.request).then((cached) => cached || fetch(event.request))
  );
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const targetUrl = event.notification?.data?.url || "/";
  event.waitUntil(
    self.clients.matchAll({ type: "window", includeUncontrolled: true }).then((clients) => {
      for (const client of clients) {
        if ("focus" in client) {
          client.navigate?.(targetUrl);
          return client.focus();
        }
      }
      if (self.clients.openWindow) return self.clients.openWindow(targetUrl);
      return undefined;
    })
  );
});

function addSirenRequest(targetUrl) {
  try {
    const url = new URL(targetUrl || "/", self.location.origin);
    url.searchParams.set("siren", "1");
    return url.toString();
  } catch {
    return "/?siren=1";
  }
}

self.addEventListener("push", (event) => {
  let data = {};
  try { data = event.data?.json() || {}; } catch { data = { body: event.data?.text() || "重要な市場変化を検知しました。" }; }
  event.waitUntil(self.registration.showNotification(data.title || "世界予測システム", {
    body: data.body || "重要な市場変化を検知しました。",
    tag: data.tag || "wps-background-alert",
    renotify: data.severity === "critical",
    requireInteraction: data.severity === "critical",
    silent: false,
    vibrate: data.severity === "critical" ? [400, 180, 400, 180, 700] : [220, 120, 220],
    icon: "/icon.svg",
    badge: "/icon.svg",
    actions: [{ action: "open", title: "詳細を表示" }],
    data: {
      url: data.severity === "critical"
        ? addSirenRequest(data.url)
        : data.url || "/",
      type: data.type || "alert"
    }
  }));
});
