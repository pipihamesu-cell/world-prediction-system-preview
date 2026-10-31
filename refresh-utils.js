(function (root) {
  const chartDateFormatter = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Tokyo", year: "numeric", month: "2-digit", day: "2-digit",
    hour: "2-digit", minute: "2-digit", second: "2-digit", hourCycle: "h23"
  });

  function chartTimeParts(time) {
    const businessDay = typeof time === "string" ? /^(\d{4})-(\d{2})-(\d{2})$/.exec(time) : null;
    const date = typeof time === "number" ? new Date(time * 1000)
      : businessDay ? new Date(Date.UTC(Number(businessDay[1]), Number(businessDay[2]) - 1, Number(businessDay[3])))
        : time && typeof time === "object" ? new Date(Date.UTC(Number(time.year), Number(time.month) - 1, Number(time.day))) : null;
    if (!date || !Number.isFinite(date.getTime())) return null;
    const parts = Object.fromEntries(chartDateFormatter.formatToParts(date).map((part) => [part.type, part.value]));
    return { ...parts, businessDay: typeof time !== "number" };
  }

  function chartTickJst(time, tickType) {
    const parts = chartTimeParts(time);
    if (!parts) return "";
    if (tickType === 0) return parts.year;
    if (tickType === 1) return `${Number(parts.month)}月`;
    if (tickType === 2 || parts.businessDay) return `${Number(parts.month)}/${Number(parts.day)}`;
    return `${parts.hour}:${parts.minute}${tickType === 4 ? `:${parts.second}` : ""}`;
  }

  function chartTimeJst(time) {
    const parts = chartTimeParts(time);
    if (!parts) return "時刻不明";
    const date = `${parts.year}/${parts.month}/${parts.day}`;
    return parts.businessDay ? `${date} JST` : `${date} ${parts.hour}:${parts.minute} JST`;
  }

  function actualAgeSeconds(at, reportedAge, now = Date.now()) {
    const timestamp = Date.parse(at || "");
    if (!Number.isFinite(timestamp) || timestamp > now + 5000) return Infinity;
    const age = Math.max(0, (now - timestamp) / 1000);
    const reported = Number(reportedAge);
    return Number.isFinite(reported) && reported >= 0 ? Math.max(age, reported) : age;
  }

  function mergeLiveMarkets(markets = [], rows = [], now = Date.now()) {
    const liveById = new Map(rows.map((row) => [row.id, row]));
    return markets.map((market) => {
      const live = liveById.get(market.id);
      const liveTime = Date.parse(live?.at || "");
      const existingTime = Date.parse(market.quote?.at || "");
      if (!live || !(Number(live.value) > 0) || !Number.isFinite(liveTime)
        || liveTime > now + 5000 || (Number.isFinite(existingTime) && liveTime < existingTime)) return market;
      return {
        ...market,
        quote: {
          ...(market.quote || {}),
          value: Number(live.value),
          change24h: Number(live.changePct || 0),
          provider: live.provider,
          at: live.at,
          freshnessSeconds: actualAgeSeconds(live.at, live.freshnessSeconds, now),
          synthetic: live.synthetic === true,
          consensusVerified: live.consensusVerified === true,
          trustedSourceCount: Number(live.sourceCount || 0),
          sourceCount: Number(live.sourceCount || 0),
          sourceDeviationPct: Number(live.sourceDeviationPct || 0)
        }
      };
    });
  }

  function mergeRevaluedMarkets(current = [], revalued = [], rows = [], now = Date.now()) {
    const previous = new Map(current.map((market) => [market.id, market]));
    const base = revalued.map((market) => {
      const old = previous.get(market.id);
      const oldTime = Date.parse(old?.quote?.at || "");
      const newTime = Date.parse(market.quote?.at || "");
      if (Number.isFinite(oldTime) && (!Number.isFinite(newTime) || oldTime > newTime)) {
        return { ...market, quote: old.quote };
      }
      return market;
    });
    return mergeLiveMarkets(base, rows, now);
  }

  async function fetchJson(url, options = {}, timeoutMs = 20_000) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);
    try {
      const response = await fetch(url, { ...options, signal: controller.signal });
      if (response.status === 304) return { response, payload: null };
      if (!response.ok) throw new Error(`API ${response.status}`);
      return { response, payload: await response.json() };
    } finally {
      clearTimeout(timer);
    }
  }

  root.WpsRefreshUtils = Object.freeze({ actualAgeSeconds, mergeLiveMarkets, mergeRevaluedMarkets, fetchJson, chartTickJst, chartTimeJst });
})(globalThis);
