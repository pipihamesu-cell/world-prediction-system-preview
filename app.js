// Restorable presentation features. See docs/RESTORABLE_FEATURES.md.
const FEATURE_FLAGS = Object.freeze({ globe3d: true });
const NATIVE_APP_MODE = Boolean(globalThis.WpsNative?.isNative);
const STATIC_PREVIEW_MODE = location.hostname.endsWith("github.io") || NATIVE_APP_MODE;
const signedYen = (value) => `${Number(value || 0) >= 0 ? "+" : ""}${Number(value || 0).toLocaleString("ja-JP", { maximumFractionDigits: 0 })}円`;
const escapeMarkup = (value) => String(value ?? "").replace(/[&<>"']/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[character]);
const globeEl = document.getElementById("globe");
const map2dEl = document.getElementById("map-2d");
const mapAlertMarkersEl = document.getElementById("map-alert-markers");
const mapLiveFxEl = document.getElementById("map-live-fx");
const mapLiveFxQuotesEl = document.getElementById("map-live-fx-quotes");
const mapLiveFxTimeEl = document.getElementById("map-live-fx-time");
const mapEventDetailEl = document.getElementById("map-event-detail");
const mapEventDetailCloseEl = document.getElementById("map-event-detail-close");
const mapEventDetailLevelEl = document.getElementById("map-event-detail-level");
const mapEventDetailTitleEl = document.getElementById("map-event-detail-title");
const mapEventDetailBodyEl = document.getElementById("map-event-detail-body");
const mapEventDetailMetaEl = document.getElementById("map-event-detail-meta");
const gridEl = document.getElementById("market-grid");
const historyEl = document.getElementById("history");
const historyCountEl = document.getElementById("history-count");
const updatedAtEl = document.getElementById("updated-at");
const feedStatusEl = document.getElementById("feed-status");
const mobileLearningStatusEl = document.getElementById("mobile-learning-status");
const mobileDataFreshnessEl = document.getElementById("mobile-data-freshness");
const mobileAnalysisTimeEl = document.getElementById("mobile-analysis-time");
const mobileLedgerStatusEl = document.getElementById("mobile-ledger-status");
const mobileNextLearningEl = document.getElementById("mobile-next-learning");
const operationalReadinessBarEl = document.getElementById("operational-readiness-bar");
const operationalReadinessStateEl = document.getElementById("operational-readiness-state");
const operationalReadinessChecksEl = document.getElementById("operational-readiness-checks");
const riskValueEl = document.getElementById("risk-value");
const riskMeterEl = document.getElementById("risk-meter");
const refreshButton = document.getElementById("refresh");
const signalsEl = document.getElementById("signals");
const signalScoreEl = document.getElementById("signal-score");
const learningScoreEl = document.getElementById("learning-score");
const learningGridEl = document.getElementById("learning-grid");
const alertPanelEl = document.getElementById("alert-panel");
const alertTitleEl = document.getElementById("alert-title");
const alertDetailEl = document.getElementById("alert-detail");
const soundToggleEl = document.getElementById("sound-toggle");
const soundPreviewEl = document.getElementById("sound-preview");
const notifyToggleEl = document.getElementById("notify-toggle");
const voiceToggleEl = document.getElementById("voice-toggle");
const voiceStatusEl = document.getElementById("voice-briefing-status");
const voiceLineEl = document.getElementById("voice-briefing-line");
const voiceDetailEl = document.getElementById("voice-briefing-detail");
const voiceModeEl = document.getElementById("voice-mode");
const voiceTestEl = document.getElementById("voice-test");
const focusListEl = document.getElementById("focus-list");
const briefingHeadlineEl = document.getElementById("briefing-headline");
const briefingSummaryEl = document.getElementById("briefing-summary");
const briefingActionEl = document.getElementById("briefing-action");
const pulseRegimeEl = document.getElementById("pulse-regime");
const pulseGridEl = document.getElementById("pulse-grid");
const scenarioGridEl = document.getElementById("scenario-grid");
const shockRadarEl = document.getElementById("shock-radar");
const watchPointsEl = document.getElementById("watch-points");
const newsTickerEl = document.getElementById("news-ticker");
const greedLabelEl = document.getElementById("greed-label");
const greedScoreEl = document.getElementById("greed-score");
const greedBarEl = document.getElementById("greed-bar");
const greedComponentsEl = document.getElementById("greed-components");
const countryRiskEl = document.getElementById("country-risk");
const shockLogEl = document.getElementById("shock-log");
const shockLogCountEl = document.getElementById("shock-log-count");
const shockShadowSummaryEl = document.getElementById("shock-shadow-summary");
const externalSignalShadowEl = document.getElementById("external-signal-shadow");
const shockSearchInputEl = document.getElementById("shock-search-input");
const shockDirectionFilterEl = document.getElementById("shock-direction-filter");
const timeMachineEl = document.getElementById("time-machine");
const timeMachineEventEl = document.getElementById("time-machine-event");
const timeMachinePlayEl = document.getElementById("time-machine-play");
const timeMachineSliderEl = document.getElementById("time-machine-slider");
const timeMachineClockEl = document.getElementById("time-machine-clock");
const timeMachineAuditEl = document.getElementById("time-machine-audit");
const timeMachineAudioEl = document.getElementById("time-machine-audio");
const fxNewsEl = document.getElementById("fx-news");
const eurusdTimeframesEl = document.getElementById("eurusd-timeframes");
const dailyForecastReferenceEl = document.getElementById("daily-forecast-reference");
const eurusdTimeframeLearningEl = document.getElementById("eurusd-timeframe-learning");
const eurusdTimeframeLearningStatusEl = document.getElementById("eurusd-timeframe-learning-status");
const importantInfoPanelEl = document.getElementById("important-info-panel");
const importantInfoStatusEl = document.getElementById("important-info-status");
const importantInfoEl = document.getElementById("important-info");
const economicCalendarEl = document.getElementById("economic-calendar");
const calendarStatusEl = document.getElementById("calendar-status");
const cotPanelEl = document.getElementById("cot-panel");
const cotStatusEl = document.getElementById("cot-status");
const cotAnalysisEl = document.getElementById("cot-analysis");
const optionsPanelEl = document.getElementById("options-panel");
const optionsStatusEl = document.getElementById("options-status");
const optionsAnalysisEl = document.getElementById("options-analysis");
const commandCenterPanelEl = document.getElementById("command-center-panel");
const commandCenterStatusEl = document.getElementById("command-center-status");
const commandCenterEl = document.getElementById("command-center");
const centralBankTonePanelEl = document.getElementById("central-bank-tone-panel");
const centralBankToneStatusEl = document.getElementById("central-bank-tone-status");
const centralBankToneEl = document.getElementById("central-bank-tone");
const fundamentalNewsPanelEl = document.getElementById("fundamental-news-panel");
const fundamentalNewsStatusEl = document.getElementById("fundamental-news-status");
const fundamentalNewsEl = document.getElementById("fundamental-news");
const geopoliticalRiskPanelEl = document.getElementById("geopolitical-risk-panel");
const geopoliticalRiskStatusEl = document.getElementById("geopolitical-risk-status");
const geopoliticalRiskEl = document.getElementById("geopolitical-risk");
const currencyStrengthPanelEl = document.getElementById("currency-strength-panel");
const currencyStrengthStatusEl = document.getElementById("currency-strength-status");
const currencyStrengthEl = document.getElementById("currency-strength");
const currencyStrengthChartEl = document.getElementById("currency-strength-chart");
const dataHealthEl = document.getElementById("data-health");
const healthStatusEl = document.getElementById("health-status");
const eurusdCommandPanelEl = document.getElementById("eurusd-command-panel");
const eurusdCommandStatusEl = document.getElementById("eurusd-command-status");
const eurusdCommandEl = document.getElementById("eurusd-command");
const fxAnalysisPartnerPanelEl = document.getElementById("fx-analysis-partner-panel");
const fxAnalysisPartnerStatusEl = document.getElementById("fx-analysis-partner-status");
const fxAnalysisPartnerEl = document.getElementById("fx-analysis-partner");
const yenCrossCommandPanelEl = document.getElementById("yen-cross-command-panel");
const yenCrossCommandStatusEl = document.getElementById("yen-cross-command-status");
const yenCrossCommandEl = document.getElementById("yen-cross-command");
const eurusdPivotChartEl = document.getElementById("eurusd-pivot-chart");
const eurusdPivotLevelsEl = document.getElementById("eurusd-pivot-levels");
const eurusdPivotStatusEl = document.getElementById("eurusd-pivot-status");
const eurusdPivotTradeEl = document.getElementById("eurusd-pivot-trade");
const eurusdPivotButtons = [...document.querySelectorAll("[data-pivot-timeframe]")];
const euroSovereignSpreadToggleEl = document.getElementById("euro-sovereign-spread-toggle");
const euroSovereignSpreadStatusEl = document.getElementById("euro-sovereign-spread-status");
const euroSovereignSpreadValuesEl = document.getElementById("euro-sovereign-spread-values");
const usdjpyPivotChartEl = document.getElementById("usdjpy-pivot-chart");
const usdjpyPivotLevelsEl = document.getElementById("usdjpy-pivot-levels");
const usdjpyPivotStatusEl = document.getElementById("usdjpy-pivot-status");
const usdjpyPivotTradeEl = document.getElementById("usdjpy-pivot-trade");
const usdjpyPivotButtons = [...document.querySelectorAll("[data-usdjpy-pivot-timeframe]")];
const pivotAutoLineButtons = [...document.querySelectorAll("[data-auto-line]")];
const yttDemoPanelEl = document.getElementById("ytt-demo-panel");
const yttDemoStatusEl = document.getElementById("ytt-demo-status");
const yttDemoFormEl = document.getElementById("ytt-demo-form");
const yttDemoPairEl = document.getElementById("ytt-demo-pair");
const yttDemoSideEl = document.getElementById("ytt-demo-side");
const yttDemoTriggerEl = document.getElementById("ytt-demo-trigger");
const yttDemoStopEl = document.getElementById("ytt-demo-stop");
const yttDemoTargetEl = document.getElementById("ytt-demo-target");
const yttDemoRiskEl = document.getElementById("ytt-demo-risk");
const yttDemoSubmitEl = document.getElementById("ytt-demo-submit");
const yttDemoAccountEl = document.getElementById("ytt-demo-account");
const yttDemoOrdersEl = document.getElementById("ytt-demo-orders");
const yttDemoTradesEl = document.getElementById("ytt-demo-trades");
const swingCompassPanelEl = document.getElementById("swing-compass-panel");
const swingCompassStatusEl = document.getElementById("swing-compass-status");
const swingCompassEl = document.getElementById("swing-compass");
const probabilitySimulationPanelEl = document.getElementById("probability-simulation-panel");
const probabilitySimulationStatusEl = document.getElementById("probability-simulation-status");
const probabilitySimulationEl = document.getElementById("probability-simulation");
const conformalPanelEl = document.getElementById("conformal-panel");
const conformalStatusEl = document.getElementById("conformal-status");
const conformalCalibrationEl = document.getElementById("conformal-calibration");
const championChallengerPanelEl = document.getElementById("champion-challenger-panel");
const championChallengerStatusEl = document.getElementById("champion-challenger-status");
const championChallengerEl = document.getElementById("champion-challenger");
const validationControlPanelEl = document.getElementById("validation-control-panel");
const validationControlStatusEl = document.getElementById("validation-control-status");
const validationControlEl = document.getElementById("validation-control");
const paperTradingPanelEl = document.getElementById("paper-trading-panel");
const paperTradingStatusEl = document.getElementById("paper-trading-status");
const paperTradingEl = document.getElementById("paper-trading");
const tradingAnalyticsStatusEl = document.getElementById("trading-analytics-status");
const forecastHeatmapEl = document.getElementById("forecast-heatmap");
const profitCalendarEl = document.getElementById("profit-calendar");
const shadowPaperTradingPanelEl = document.getElementById("shadow-paper-trading-panel");
const shadowPaperTradingStatusEl = document.getElementById("shadow-paper-trading-status");
const shadowPaperTradingEl = document.getElementById("shadow-paper-trading");
const paperTradingComparisonEl = document.getElementById("paper-trading-comparison");
const tradeOpportunityPanelEl = document.getElementById("trade-opportunity-panel");
const tradeOpportunityStatusEl = document.getElementById("trade-opportunity-status");
const tradeOpportunityEl = document.getElementById("trade-opportunity");
const aiImprovementPanelEl = document.getElementById("ai-improvement-panel");
const aiImprovementStatusEl = document.getElementById("ai-improvement-status");
const aiImprovementEl = document.getElementById("ai-improvement");
const integratedIntelligenceSummaryEl = document.getElementById("integrated-intelligence-summary");
const androidAccessEl = document.getElementById("android-access");
const androidAccessStatusEl = document.getElementById("android-access-status");
const mobileAccessEl = document.getElementById("mobile-access");
const mobileAccessStatusEl = document.getElementById("mobile-access-status");
const backtestScoreEl = document.getElementById("backtest-score");
const backtestGridEl = document.getElementById("backtest-grid");
const backtestRecommendationsEl = document.getElementById("backtest-recommendations");
const financeMonitorPanelEl = document.getElementById("finance-monitor-panel");
const financeMonitorStatusEl = document.getElementById("finance-monitor-status");
const financeMonitorOverviewEl = document.getElementById("finance-monitor-overview");
const globeLayerButtons = [...document.querySelectorAll("[data-globe-layer]")];
const globeModeButtons = [...document.querySelectorAll("[data-globe-mode]")];
const designModeButtons = [...document.querySelectorAll("[data-design-mode]")];
const detailModeToggleEl = document.getElementById("detail-mode-toggle");
const flowCountEl = document.getElementById("flow-count");
const flowExplanationEl = document.getElementById("flow-explanation");
const marketTapeEl = document.getElementById("market-tape");
const forecastNewsflashTrackEl = document.getElementById("forecast-newsflash-track");
const pairDecisionDeckEl = document.getElementById("pair-decision-deck");
const pairDecisionCardsEl = document.getElementById("pair-decision-cards");
const pairDecisionUpdatedEl = document.getElementById("pair-decision-updated");
const fullWidthChartStackEl = document.getElementById("full-width-chart-stack");
const fullWidthGateStackEl = document.getElementById("full-width-gate-stack");
const paperPositionBarEl = document.getElementById("paper-position-bar");
const paperPositionStateEl = document.getElementById("paper-position-state");
const paperPositionSummaryEl = document.getElementById("paper-position-summary");
const leftIntelligenceStackEl = document.getElementById("left-intelligence-stack");
const leftIntelligenceColumnsEl = document.getElementById("left-intelligence-columns");
const aiQuestionFormEl = document.getElementById("ai-question-form");
const aiQuestionInputEl = document.getElementById("ai-question-input");
const aiQuestionSubmitEl = document.getElementById("ai-question-submit");
const aiQuestionStatusEl = document.getElementById("ai-question-status");
const aiQuestionAnswerEl = document.getElementById("ai-question-answer");
const aiQuestionSuggestionEls = [...document.querySelectorAll("[data-ai-question]")];

let globe;
let latestSignals = { items: [] };
let soundEnabled = localStorage.getItem("worldPredictionSound") === "on";
let notificationsEnabled = localStorage.getItem("worldPredictionNotifications") === "on";
let notificationStatusMessage = "";
let notificationBusy = false;
let nativePushStatus = null;
let voiceEnabled = localStorage.getItem("worldPredictionVoice") === "on";
let voiceMode = localStorage.getItem("worldPredictionVoiceMode") || "important";
let rebalanceIntelligenceRail = () => {};
let soundscapeContext = null;
let soundscapeMaster = null;
let soundscapeNodes = [];
let soundscapeTimer = null;
let soundscapeMode = "off";
let soundPreviewTimers = [];
let soundPreviewActive = false;

function initFullWidthCharts() {
  if (!fullWidthChartStackEl) return;
  const eurusdPanel = document.getElementById("eurusd-pivot-panel");
  const usdjpyPanel = document.getElementById("usdjpy-pivot-panel");
  if (eurusdPanel) fullWidthChartStackEl.appendChild(eurusdPanel);
  if (usdjpyPanel) fullWidthChartStackEl.appendChild(usdjpyPanel);
}

function initFullWidthGateVerification() {
  const panels = [paperTradingPanelEl, shadowPaperTradingPanelEl, document.querySelector(".gate-verification-wrap")].filter(Boolean);
  if (!panels.length || !fullWidthGateStackEl) return;
  panels.forEach((panel) => fullWidthGateStackEl.appendChild(panel));
  fullWidthGateStackEl.hidden = false;
}

function initResponsiveIntelligenceRail() {
  if (!leftIntelligenceStackEl) return;
  const selectors = [
    [".desktop-ops-wrap", "left"],
    [".ticker-wrap", "right"],
    [".fx-news-wrap", "left"],
    [".important-info-wrap", "right"],
    [".calendar-wrap", "left"],
    [".central-bank-tone-wrap", "right"],
    [".fundamental-news-wrap", "right"],
    [".geopolitical-risk-wrap", "right"],
    [".cot-wrap", "wide"],
    [".options-wrap", "right"],
    [".swing-compass-wrap", "left"],
    [".currency-strength-wrap", "left"],
    [".eurusd-timeframes-wrap", "wide"],
    [".ai-improvement-wrap", "left"],
    [".trade-opportunity-wrap", "wide"],
    [".radar-wrap", "wide"],
    [".pulse-wrap", "wide"],
    [".scenario-wrap", "wide"],
    [".signal-wrap", "wide"],
    [".verification-center", "wide"]
  ];
  const entries = selectors.flatMap(([selector, lane]) => {
    const node = document.querySelector(selector);
    if (!node) return [];
    const anchor = document.createComment(`original-position:${selector}`);
    node.parentNode.insertBefore(anchor, node);
    return [{ node, anchor, lane }];
  });
  const leftColumn = leftIntelligenceColumnsEl?.querySelector('[data-intelligence-column="left"]');
  const rightColumn = leftIntelligenceColumnsEl?.querySelector('[data-intelligence-column="right"]');
  const media = window.matchMedia("(min-width: 901px)");
  const arrange = () => {
    if (media.matches) {
      for (const { node, lane } of entries) {
        if (lane === "left" && leftColumn) leftColumn.appendChild(node);
        else if (lane === "right" && rightColumn) rightColumn.appendChild(node);
        else leftIntelligenceStackEl.appendChild(node);
      }
    } else {
      for (const { node, anchor } of entries) anchor.parentNode.insertBefore(node, anchor.nextSibling);
    }
    requestAnimationFrame(resizeGlobe);
  };
  rebalanceIntelligenceRail = () => {
    if (!media.matches || !leftColumn || !rightColumn) return;
    const laneEntries = entries.filter(({ lane }) => lane !== "wide");
    const measured = laneEntries.map((entry, index) => ({
      ...entry,
      index,
      height: Math.max(80, entry.node.getBoundingClientRect().height)
    }));
    const fixed = measured.slice(0, 2);
    const rest = measured.slice(2).sort((a, b) => b.height - a.height || a.index - b.index);
    let leftHeight = fixed[0]?.height || 0;
    let rightHeight = fixed[1]?.height || 0;
    if (fixed[0]) leftColumn.appendChild(fixed[0].node);
    if (fixed[1]) rightColumn.appendChild(fixed[1].node);
    for (const { node, height } of rest) {
      const target = leftHeight <= rightHeight ? leftColumn : rightColumn;
      target.appendChild(node);
      if (target === leftColumn) leftHeight += height + 12;
      else rightHeight += height + 12;
    }
  };
  arrange();
  media.addEventListener?.("change", arrange);
}

function initMobileSectionTabs() {
  const dashboard = document.querySelector(".dashboard");
  const tabs = [...document.querySelectorAll("[data-mobile-view]")];
  if (!dashboard || !tabs.length) return;

  const groups = {
    decision: [
      "#finance-monitor-panel", "#alert-panel", "#fx-analysis-partner-panel", "#eurusd-command-panel", "#yen-cross-command-panel", "#swing-compass-panel",
      ".eurusd-timeframes-wrap", "#currency-strength-panel",
      "#eurusd-pivot-panel", "#usdjpy-pivot-panel", "#time-machine-panel", "#command-center-panel", "#ai-question-panel", ".intelligence-grid",
      ".scenario-wrap"
    ],
    news: [
      "#important-info-panel", "#fundamental-news-panel", "#geopolitical-risk-panel", ".ticker-wrap", ".fx-news-wrap",
      ".calendar-wrap", "#central-bank-tone-panel", "#cot-panel", "#options-panel",
      ".shock-log-wrap", "#market-grid", ".radar-wrap", ".pulse-wrap", ".focus-wrap", ".signal-wrap"
    ],
    learning: [
      "#conformal-panel", "#champion-challenger-panel", "#validation-control-panel",
      "#paper-trading-panel", "#shadow-paper-trading-panel", ".gate-verification-wrap", "#trade-opportunity-panel",
      "#ai-improvement-panel", ".learning-wrap", ".backtest-wrap", ".history-wrap"
    ],
    operations: [
      ".android-access-wrap", ".mobile-access-wrap", ".voice-briefing-wrap", ".health-wrap"
    ]
  };

  const getPanelGroup = (panel) => Object.entries(groups)
    .find(([, selectors]) => panel.matches(selectors.join(",")))?.[0];

  const applyView = (view, persist = true) => {
    const selected = groups[view] ? view : "all";
    dashboard.dataset.mobileView = selected;
    for (const panel of dashboard.children) {
      const group = getPanelGroup(panel);
      if (group) panel.classList.toggle("mobile-section-hidden", selected !== "all" && group !== selected);
    }
    for (const tab of tabs) {
      const active = tab.dataset.mobileView === selected;
      tab.classList.toggle("active", active);
      tab.setAttribute("aria-pressed", String(active));
    }
    if (persist) localStorage.setItem("worldPredictionMobileView", selected);
    if (selected === "all" || selected === "decision") {
      requestAnimationFrame(() => {
        if (latestEurusdPivotChart) renderEurusdPivotChart(latestEurusdPivotChart, selectedPivotTimeframe);
        if (latestUsdjpyPivotChart) renderUsdjpyPivotChart(latestUsdjpyPivotChart, selectedUsdjpyPivotTimeframe);
        window.dispatchEvent(new Event("resize"));
      });
    }
  };

  for (const tab of tabs) tab.addEventListener("click", () => applyView(tab.dataset.mobileView));

  document.querySelectorAll("[data-mobile-target]").forEach((button) => {
    button.addEventListener("click", () => {
      const target = document.getElementById(button.dataset.mobileTarget);
      if (!target) return;
      applyView("all");
      requestAnimationFrame(() => {
        target.scrollIntoView({ behavior: "auto", block: "start" });
        target.classList.add("mobile-jump-highlight");
        window.setTimeout(() => target.classList.remove("mobile-jump-highlight"), 1600);
      });
    });
  });

  const targetViews = {
    "finance-monitor-panel": "decision",
    "eurusd-command-panel": "decision",
    "important-info-panel": "news",
    "ai-improvement-panel": "learning"
  };
  document.querySelectorAll('.terminal-nav a[href^="#"]').forEach((link) => {
    link.addEventListener("click", () => {
      const targetId = link.getAttribute("href").slice(1);
      if (targetViews[targetId]) applyView(targetViews[targetId]);
    });
  });

  // Always open with the complete PC-equivalent dashboard; category tabs are optional shortcuts.
  applyView("all", false);
}
let lastVoiceAt = 0;
let lastVoiceSignature = "";
let latestVoiceBriefing = null;
let voiceUnlocked = false;
let voiceRunId = 0;
let lastAlertIds = new Set();
let lastImportantKeys = new Set();
let latestShockLogs = [];
let latestTimeMachine = null;
let timeMachineFrameIndex = 0;
let timeMachineTimer = null;
let timeMachineAudioContext = null;
let timeMachineSpeechActive = false;
let deferredInstallPrompt = null;
let serviceWorkerRegistration = null;
let lastNotificationAt = 0;
let latestSnapshot = null;
let snapshotEtag = "";
let coreSnapshotEtag = "";
let liveFxEtag = "";
let lastFullSnapshotAt = 0;
let snapshotTimer = null;
let liveFxTimer = null;
let latestEurusdPivotChart = null;
let latestUsdjpyPivotChart = null;
const previousLiveFxValues = new Map();
const latestLiveFxById = new Map();
const livePivotCandles = new Map();
let mapAlertExpiryTimer = null;
let eurusdPivotChart = null;
let eurusdPivotSeries = null;
let eurusdPivotResizeObserver = null;
let selectedPivotTimeframe = localStorage.getItem("eurusdPivotTimeframe") || "h1";
let selectedEurusdChartMode = localStorage.getItem("eurusdChartMode") === "spread" ? "spread" : "price";
let latestEuroSovereignSpread = null;
let euroSovereignSpreadFallbackRequested = false;
let selectedUsdjpyPivotTimeframe = localStorage.getItem("usdjpyPivotTimeframe") || "h1";
const autoLineEnabled = {
  eurusd: localStorage.getItem("eurusdAutoLine") !== "off",
  usdjpy: localStorage.getItem("usdjpyAutoLine") !== "off"
};
let usdjpyPivotChart = null;
let usdjpyPivotSeries = null;
let usdjpyPivotResizeObserver = null;
let selectedProfitCalendarMonth = null;
const globeLayers = { events: true, centers: true, flows: true, alerts: true, geopolitics: true };
const globeRestoreVersion = "worldPredictionGlobeRestoredV1";
const savedGlobeMode = localStorage.getItem("worldPredictionMapMode");
let globeMode = FEATURE_FLAGS.globe3d && (localStorage.getItem(globeRestoreVersion) !== "done" || savedGlobeMode !== "2d") ? "3d" : "2d";
localStorage.setItem(globeRestoreVersion, "done");
localStorage.setItem("worldPredictionMapMode", globeMode);
let designMode = localStorage.getItem("worldPredictionDesignMode") === "classic" ? "classic" : "command";
let detailMode = localStorage.getItem("worldPredictionDetailMode") === "full" ? "full" : "compact";
const secondaryPanelIds = [
  "options-panel",
  "ytt-demo-panel",
  "conformal-panel",
  "champion-challenger-panel",
  "shadow-paper-trading-panel"
];

function deriveTradeScenarioPlans(paperTrading, markets = latestSnapshot?.markets || []) {
  if (paperTrading?.scenarioPlans?.length) return paperTrading.scenarioPlans;
  const marketById = new Map((markets || []).map((market) => [market.id, Number(market.quote?.value || market.value || 0)]));
  const usdjpy = marketById.get("usdjpy") || 0;
  const inputs = [
    { assetId: "eurusd", pairLabel: "EUR/USD", direction: latestSnapshot?.probabilitySimulation?.direction, probability: latestSnapshot?.probabilitySimulation?.probabilities?.calibratedMain, chart: latestSnapshot?.eurusdPivotChart, margin: 71_060, jpyPerBase: (marketById.get("eurusd") || 0) * usdjpy },
    { assetId: "usdjpy", pairLabel: "USD/JPY", direction: latestSnapshot?.yenCrossCommand?.timeframeConsensus?.direction, probability: latestSnapshot?.yenCrossCommand?.timeframeConsensus?.probability, chart: latestSnapshot?.usdjpyPivotChart, margin: 63_150, jpyPerBase: usdjpy }
  ];
  return inputs.map((input) => {
    const probability = Number(input.probability || 0);
    const levels = [...new Set(Object.values(input.chart?.frames?.h1?.levels || {}).map(Number).filter((value) => Number.isFinite(value) && value > 0))].sort((a, b) => a - b);
    const current = marketById.get(input.assetId) || 0;
    if (!current || !["up", "down"].includes(input.direction) || probability < 0.55 || levels.length < 3) {
      return { ...input, active: false, probability, status: probability < 0.55 ? "確率55%以上を待機" : "方向・ピボット確定待ち" };
    }
    const below = levels.filter((value) => value < current);
    const above = levels.filter((value) => value > current);
    const triggerPrice = input.direction === "up" ? above[0] : below.at(-1);
    const stopPrice = input.direction === "up" ? below.at(-1) : above[0];
    if (!triggerPrice || !stopPrice) return { ...input, active: false, probability, status: "有効な上下ライン待ち" };
    const targetPrice = input.direction === "up" ? above.find((value) => value > triggerPrice) : [...below].reverse().find((value) => value < triggerPrice);
    const riskPct = Math.abs(triggerPrice - stopPrice) / triggerPrice;
    const equity = Number(paperTrading?.equity || 0);
    const targetNotional = riskPct > 0 ? Math.min(equity * 3, equity * 0.001 / riskPct) : 0;
    const lots = Math.max(0, Math.floor(targetNotional / Math.max(1, input.jpyPerBase * 10_000)));
    return {
      ...input, active: lots >= 1, probability, side: input.direction === "up" ? "long" : "short",
      triggerPrice, stopPrice, targetPrice: targetPrice || triggerPrice + (input.direction === "up" ? 1 : -1) * Math.abs(triggerPrice - stopPrice) * 1.8,
      lots, requiredMarginJpy: lots * input.margin, status: lots >= 1 ? "価格到達と確定足を待機" : "最低1ロット未満",
      triggerRule: input.direction === "up" ? "上側ピボットを確定足で上抜け" : "下側ピボットを確定足で下抜け"
    };
  });
}

function renderPivotTradeOverlays(paperTrading, markets = latestSnapshot?.markets || []) {
  const position = paperTrading?.position || null;
  const marketById = new Map((markets || []).map((market) => [market.id, Number(market.quote?.value || market.value || 0)]));
  const eurusd = marketById.get("eurusd") || 0;
  const usdjpy = marketById.get("usdjpy") || 0;
  const definitions = [
    { assetId: "eurusd", pairLabel: "EUR/USD", base: "EUR", element: eurusdPivotTradeEl, oneLotNotionalJpy: eurusd * usdjpy * 10_000, marginPerLotJpy: 71_060, digits: 5 },
    { assetId: "usdjpy", pairLabel: "USD/JPY", base: "USD", element: usdjpyPivotTradeEl, oneLotNotionalJpy: usdjpy * 10_000, marginPerLotJpy: 63_150, digits: 3 }
  ];
  definitions.forEach((item) => {
    if (!item.element) return;
    const active = position?.assetId === item.assetId || position?.pairLabel === item.pairLabel;
    const rule = paperTrading?.brokerLotRules?.[item.assetId] || {};
    const lotSizeUnits = Number(position?.lotSizeUnits || rule.lotSizeUnits || 10_000);
    const marginPerLotJpy = Number(position?.marginPerLotJpy || rule.marginPerLotJpy || item.marginPerLotJpy);
    const oneLotNotionalJpy = Number(position?.oneLotNotionalJpy || position?.oneLotJpy || item.oneLotNotionalJpy || 0);
    const baseUnits = active
      ? Number(position.baseUnits || (oneLotNotionalJpy > 0 ? Number(position.notionalJpy || 0) / oneLotNotionalJpy * lotSizeUnits : 0))
      : 0;
    const lots = active ? Number(position.lots || baseUnits / lotSizeUnits) : 0;
    const requiredMarginJpy = active ? Number(position.requiredMarginJpy || lots * marginPerLotJpy) : 0;
    const side = active ? (position.side === "long" ? "buy" : "sell") : "waiting";
    const plan = deriveTradeScenarioPlans(paperTrading, markets).find((row) => row.assetId === item.assetId);
    item.element.className = `pivot-trade-overlay ${side}`;
    item.element.innerHTML = active ? `
      <div><span>公式仮想取引</span><strong>${position.side === "long" ? "買い / BUY" : "売り / SELL"} ${lots.toFixed(0)}ロット</strong></div>
      <div><span>通貨数量</span><strong>${Math.round(baseUnits).toLocaleString("ja-JP")} ${item.base}</strong></div>
      <div><span>必要証拠金</span><strong>${requiredMarginJpy.toLocaleString("ja-JP")}円</strong></div>
      <div><span>円換算元本</span><strong>${Number(position.notionalJpy || 0).toLocaleString("ja-JP")}円</strong></div>
      <div><span>約定 → 現在</span><strong>${Number(position.entryPrice || 0).toFixed(item.digits)} → ${Number(position.currentPrice || 0).toFixed(item.digits)}</strong></div>
      <div><span>含み損益</span><strong class="${Number(position.unrealizedPnl || 0) >= 0 ? "up" : "down"}">${Number(position.unrealizedPnl || 0) >= 0 ? "+" : ""}${Number(position.unrealizedPnl || 0).toLocaleString("ja-JP")}円</strong></div>
    ` : plan?.active ? `
      <div><span>仮想予約シナリオ</span><strong>${plan.side === "long" ? "買い / BUY" : "売り / SELL"} ${Number(plan.lots || 0).toFixed(0)}ロット</strong></div>
      <div><span>発動ライン</span><strong>${Number(plan.triggerPrice).toFixed(item.digits)}</strong></div>
      <div><span>損切り / 利確</span><strong>${Number(plan.stopPrice).toFixed(item.digits)} / ${Number(plan.targetPrice).toFixed(item.digits)}</strong></div>
      <div><span>根拠</span><strong>${plan.triggerRule}</strong></div>
      <div><span>必要証拠金</span><strong>${Number(plan.requiredMarginJpy || 0).toLocaleString("ja-JP")}円</strong></div>
      <div><span>状態</span><strong>${plan.status}</strong></div>
    ` : `
      <div><span>公式仮想取引</span><strong>保有なし / 0ロット</strong></div>
      <div><span>1ロット</span><strong>10,000 ${item.base}</strong></div>
      <div><span>1ロット必要証拠金</span><strong>${marginPerLotJpy.toLocaleString("ja-JP")}円</strong></div>
      <div><span>1ロット円換算元本</span><strong>${oneLotNotionalJpy > 0 ? `約${Math.round(oneLotNotionalJpy).toLocaleString("ja-JP")}円` : "レート取得中"}</strong></div>
    `;
  });
}

function buildPivotAutoLines(candles = []) {
  const rows = candles.map((candle, index) => ({ index, time: Math.floor(new Date(candle.date).getTime() / 1000), high: Number(candle.high), low: Number(candle.low) }))
    .filter((row) => Number.isFinite(row.time) && Number.isFinite(row.high) && Number.isFinite(row.low));
  if (rows.length < 10) return [];
  const highs = [];
  const lows = [];
  for (let index = 2; index < rows.length - 2; index += 1) {
    const window = rows.slice(index - 2, index + 3);
    if (rows[index].high === Math.max(...window.map((row) => row.high))) highs.push({ ...rows[index], price: rows[index].high });
    if (rows[index].low === Math.min(...window.map((row) => row.low))) lows.push({ ...rows[index], price: rows[index].low });
  }
  const interval = Math.max(60, rows.at(-1).time - rows.at(-2).time);
  const endTime = rows.at(-1).time + interval * 6;
  const priceRange = Math.max(0.000001, Math.max(...rows.map((row) => row.high)) - Math.min(...rows.map((row) => row.low)));
  const create = (points, type, color, title) => {
    const anchors = points.slice(-2);
    if (anchors.length < 2 || anchors[1].time === anchors[0].time) return null;
    const slope = (anchors[1].price - anchors[0].price) / (anchors[1].time - anchors[0].time);
    const projected = anchors[1].price + slope * (endTime - anchors[1].time);
    if (Math.abs(projected - anchors[1].price) > priceRange * 1.5) return null;
    return { type, color, title, anchors, projected, endTime, slope };
  };
  return [create(highs, "resistance", "#ff9f68", "AUTO 抵抗線"), create(lows, "support", "#4bd7c0", "AUTO 支持線")].filter(Boolean);
}

function addPivotAutoLines(chart, LC, candles, enabled) {
  if (!enabled) return [];
  const lines = buildPivotAutoLines(candles);
  for (const line of lines) {
    const options = { color: line.color, lineWidth: 2, lineStyle: LC.LineStyle?.Solid ?? 0, pointMarkersVisible: true, lastValueVisible: true, priceLineVisible: false, title: line.title };
    const lineSeries = chart.addSeries ? chart.addSeries(LC.LineSeries, options) : chart.addLineSeries(options);
    lineSeries.setData([
      { time: line.anchors[0].time, value: line.anchors[0].price },
      { time: line.anchors[1].time, value: line.anchors[1].price },
      { time: line.endTime, value: line.projected }
    ]);
  }
  return lines;
}

function addPivotHistoryLines(chart, LC, frame, timeframe, levelStyles, liveTime = null) {
  const history = Array.isArray(frame?.pivotHistory) ? frame.pivotHistory : [];
  const interval = pivotTimeframeSeconds(timeframe);
  const lastCandleTime = Math.floor(Date.parse(frame?.candles?.at(-1)?.date || "") / 1000);
  const activeTime = Number.isFinite(Number(liveTime))
    ? Number(liveTime)
    : Number.isFinite(lastCandleTime) ? lastCandleTime + interval : null;
  for (const [key, [title, color]] of Object.entries(levelStyles)) {
    const rows = history.map((item) => ({
      time: Math.floor(Date.parse(item.effectiveFrom) / 1000),
      value: Number(item.levels?.[key])
    })).filter((item) => Number.isFinite(item.time) && Number.isFinite(item.value));
    const current = Number(frame?.levels?.[key]);
    if (Number.isFinite(current) && Number.isFinite(activeTime) && (!rows.length || activeTime > rows.at(-1).time)) {
      rows.push({ time: activeTime, value: current });
    }
    if (!rows.length) continue;
    const options = {
      color,
      lineWidth: key === "p" ? 2 : 1,
      lineStyle: LC.LineStyle?.Dashed ?? 2,
      lineType: LC.LineType?.WithSteps ?? 1,
      pointMarkersVisible: false,
      lastValueVisible: true,
      priceLineVisible: false,
      title
    };
    const pivotSeries = chart.addSeries ? chart.addSeries(LC.LineSeries, options) : chart.addLineSeries(options);
    pivotSeries.setData(rows);
  }
}

function pivotBasisSummary(frame, decimals) {
  const basis = frame?.basis || {};
  const high = Number(basis.high);
  const low = Number(basis.low);
  const close = Number(basis.close);
  if (![high, low, close].every(Number.isFinite)) return "";
  return ` / 前確定足 H ${high.toFixed(decimals)} L ${low.toFixed(decimals)} C ${close.toFixed(decimals)}`;
}

function pivotTimeframeSeconds(timeframe) {
  return ({ m15: 900, h1: 3600, h4: 14400, d1: 86400 })[timeframe] || 3600;
}

function buildLivePivotCandle(assetId, frame, timeframe) {
  const live = latestLiveFxById.get(assetId);
  const value = Number(live?.value);
  const observedAt = Date.parse(live?.at || "");
  const last = frame?.candles?.at(-1);
  const lastTime = Math.floor(Date.parse(last?.date || "") / 1000);
  if (!Number.isFinite(value) || !Number.isFinite(observedAt) || !Number.isFinite(lastTime)) return null;
  const seconds = pivotTimeframeSeconds(timeframe);
  const bucket = Math.floor(observedAt / 1000 / seconds) * seconds;
  if (bucket < lastTime) return null;
  const key = `${assetId}:${timeframe}`;
  const previous = livePivotCandles.get(key);
  const open = bucket === lastTime ? Number(last.open) : Number(last.close);
  const baseHigh = bucket === lastTime ? Number(last.high) : open;
  const baseLow = bucket === lastTime ? Number(last.low) : open;
  const candle = {
    time: bucket === lastTime ? lastTime : bucket,
    open,
    high: Math.max(baseHigh, value, previous?.time === bucket ? previous.high : value),
    low: Math.min(baseLow, value, previous?.time === bucket ? previous.low : value),
    close: value
  };
  livePivotCandles.set(key, candle);
  return candle;
}

function appendLivePivotStatus(statusEl, live) {
  if (!statusEl || !live?.at) return;
  const base = statusEl.textContent.replace(/ \/ LIVE価格 .*$/, "");
  const at = new Date(live.at).toLocaleTimeString("ja-JP", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
  statusEl.textContent = `${base} / LIVE価格 1分以内 ${at}`;
}

function refreshLivePivotCandles(rows = []) {
  for (const row of rows) latestLiveFxById.set(row.id, row);
  const eurFrame = latestEurusdPivotChart?.frames?.[selectedPivotTimeframe];
  const usdFrame = latestUsdjpyPivotChart?.frames?.[selectedUsdjpyPivotTimeframe];
  if (selectedEurusdChartMode === "price" && eurFrame) {
    const candle = buildLivePivotCandle("eurusd", eurFrame, selectedPivotTimeframe);
    if (candle && eurusdPivotSeries?.update) eurusdPivotSeries.update(candle);
    else if (candle && !window.LightweightCharts) renderEurusdPivotChart(latestEurusdPivotChart, selectedPivotTimeframe);
    appendLivePivotStatus(eurusdPivotStatusEl, latestLiveFxById.get("eurusd"));
  }
  if (usdFrame) {
    const candle = buildLivePivotCandle("usdjpy", usdFrame, selectedUsdjpyPivotTimeframe);
    if (candle && usdjpyPivotSeries?.update) usdjpyPivotSeries.update(candle);
    else if (candle && !window.LightweightCharts) renderUsdjpyPivotChart(latestUsdjpyPivotChart, selectedUsdjpyPivotTimeframe);
    appendLivePivotStatus(usdjpyPivotStatusEl, latestLiveFxById.get("usdjpy"));
  }
}

function renderPivotFallback(frame, timeframe, levelStyles, chartEl = eurusdPivotChartEl, symbol = "EUR/USD", decimals = 5, showAutoLines = true) {
  const candles = frame.candles.slice(-64).map((candle) => ({
    ...candle,
    open: Number(candle.open), high: Number(candle.high), low: Number(candle.low), close: Number(candle.close)
  })).filter((candle) => [candle.open, candle.high, candle.low, candle.close].every(Number.isFinite));
  if (!candles.length) return false;
  const width = 1000;
  const height = 440;
  const margin = { top: 20, right: 92, bottom: 38, left: 14 };
  const plotWidth = width - margin.left - margin.right;
  const plotHeight = height - margin.top - margin.bottom;
  const levelValues = Object.keys(levelStyles).map((key) => Number(frame.levels?.[key])).filter(Number.isFinite);
  const lows = candles.map((candle) => candle.low).concat(levelValues);
  const highs = candles.map((candle) => candle.high).concat(levelValues);
  const rawMin = Math.min(...lows);
  const rawMax = Math.max(...highs);
  const padding = Math.max((rawMax - rawMin) * 0.08, 0.0002);
  const min = rawMin - padding;
  const max = rawMax + padding;
  const y = (price) => margin.top + ((max - price) / (max - min)) * plotHeight;
  const step = plotWidth / candles.length;
  const bodyWidth = Math.max(3, Math.min(11, step * 0.64));
  const priceGrid = Array.from({ length: 6 }, (_, index) => max - ((max - min) * index / 5));
  const grid = priceGrid.map((price) => {
    const py = y(price);
    return `<line x1="${margin.left}" y1="${py}" x2="${width - margin.right}" y2="${py}" class="pivot-svg-grid"/><text x="${width - margin.right + 8}" y="${py + 4}" class="pivot-svg-price">${price.toFixed(decimals)}</text>`;
  }).join("");
  const history = Array.isArray(frame.pivotHistory) ? frame.pivotHistory : [];
  const pivotLines = Object.entries(levelStyles).map(([key, [label, color]]) => {
    const rows = history.map((item) => {
      const index = candles.findIndex((candle) => candle.date === item.effectiveFrom);
      const value = Number(item.levels?.[key]);
      return index < 0 || !Number.isFinite(value) ? null : { x: margin.left + step * (index + 0.5), value };
    }).filter(Boolean);
    const current = Number(frame.levels?.[key]);
    if (Number.isFinite(current)) rows.push({ x: width - margin.right, value: current });
    if (!rows.length) return "";
    let path = `M ${rows[0].x} ${y(rows[0].value)}`;
    for (const row of rows.slice(1)) path += ` H ${row.x} V ${y(row.value)}`;
    path += ` H ${width - margin.right}`;
    const last = rows.at(-1);
    return `<path d="${path}" fill="none" stroke="${color}" stroke-width="${key === "p" ? 2 : 1}" stroke-dasharray="7 5" opacity="0.88"/><text x="${width - margin.right - 5}" y="${y(last.value) - 4}" text-anchor="end" fill="${color}" class="pivot-svg-level">${label}</text>`;
  }).join("");
  const autoLineSvg = (showAutoLines ? buildPivotAutoLines(candles) : []).map((line) => {
    const firstIndex = candles.findIndex((candle) => Math.floor(new Date(candle.date).getTime() / 1000) === line.anchors[0].time);
    if (firstIndex < 0) return "";
    const x1 = margin.left + step * (firstIndex + 0.5);
    const lastTime = Math.floor(new Date(candles.at(-1).date).getTime() / 1000);
    const lastPrice = line.anchors[1].price + line.slope * (lastTime - line.anchors[1].time);
    return `<line x1="${x1}" y1="${y(line.anchors[0].price)}" x2="${width - margin.right}" y2="${y(lastPrice)}" stroke="${line.color}" stroke-width="2.2"/><text x="${width - margin.right - 6}" y="${y(lastPrice) - 6}" text-anchor="end" fill="${line.color}" class="pivot-svg-level">${line.title}</text>`;
  }).join("");
  const bodies = candles.map((candle, index) => {
    const x = margin.left + step * (index + 0.5);
    const color = candle.close >= candle.open ? "#35d39a" : "#ff5f72";
    const top = y(Math.max(candle.open, candle.close));
    const bottom = y(Math.min(candle.open, candle.close));
    return `<line x1="${x}" y1="${y(candle.high)}" x2="${x}" y2="${y(candle.low)}" stroke="${color}" stroke-width="1.4"/><rect x="${x - bodyWidth / 2}" y="${top}" width="${bodyWidth}" height="${Math.max(1.5, bottom - top)}" fill="${color}" rx="0.8"><title>${new Date(candle.date).toLocaleString("ja-JP")} 始 ${candle.open.toFixed(decimals)} 高 ${candle.high.toFixed(decimals)} 安 ${candle.low.toFixed(decimals)} 終 ${candle.close.toFixed(decimals)}</title></rect>`;
  }).join("");
  const labelIndexes = [0, Math.floor((candles.length - 1) / 2), candles.length - 1];
  const timeLabels = labelIndexes.map((index) => {
    const candle = candles[index];
    const x = margin.left + step * (index + 0.5);
    const options = timeframe === "d1" ? { month: "numeric", day: "numeric" } : { month: "numeric", day: "numeric", hour: "2-digit", minute: "2-digit" };
    return `<text x="${x}" y="${height - 11}" text-anchor="${index === 0 ? "start" : index === candles.length - 1 ? "end" : "middle"}" class="pivot-svg-time">${new Date(candle.date).toLocaleString("ja-JP", options)}</text>`;
  }).join("");
  chartEl.innerHTML = `<svg class="pivot-fallback-svg" viewBox="0 0 ${width} ${height}" preserveAspectRatio="none" role="img" aria-label="${symbol} ${frame.label}ローソク足">${grid}${pivotLines}${autoLineSvg}${bodies}${timeLabels}</svg>`;
  return true;
}

function renderEurusdPivotChart(data, timeframe = selectedPivotTimeframe) {
  if (!eurusdPivotChartEl || !eurusdPivotLevelsEl || !eurusdPivotStatusEl) return;
  latestEurusdPivotChart = data;
  if (selectedEurusdChartMode === "spread") {
    renderEurusdSovereignSpreadChart();
    return;
  }
  euroSovereignSpreadToggleEl?.classList.remove("active");
  euroSovereignSpreadToggleEl?.setAttribute("aria-pressed", "false");
  if (eurusdPivotTradeEl) eurusdPivotTradeEl.hidden = false;
  eurusdPivotLevelsEl.hidden = false;
  const frame = data?.frames?.[timeframe];
  eurusdPivotButtons.forEach((button) => {
    const active = button.dataset.pivotTimeframe === timeframe;
    button.classList.toggle("active", active);
    button.setAttribute("aria-selected", String(active));
  });
  if (!frame?.candles?.length) {
    eurusdPivotStatusEl.textContent = frame?.error || "チャートデータを取得できません";
    eurusdPivotChartEl.innerHTML = '<div class="pivot-chart-empty">ローソク足を再取得しています。</div>';
    eurusdPivotLevelsEl.innerHTML = "";
    return;
  }
  const levelStyles = {
    r3: ["R3", "#ff5971"], r2: ["R2", "#ff7181"], r1: ["R1", "#ff9a73"],
    p: ["P", "#ffd166"], s1: ["S1", "#69d7c3"], s2: ["S2", "#48b8d0"], s3: ["S3", "#5b96df"]
  };
  if (!window.LightweightCharts) {
    const autoLines = autoLineEnabled.eurusd ? buildPivotAutoLines(frame.candles) : [];
    renderPivotFallback(frame, timeframe, levelStyles, eurusdPivotChartEl, "EUR/USD", 5, autoLineEnabled.eurusd);
    const calculated = frame.calculatedFrom ? new Date(frame.calculatedFrom).toLocaleString("ja-JP", { month: "numeric", day: "numeric", hour: "2-digit", minute: "2-digit" }) : "--";
    eurusdPivotStatusEl.textContent = `${frame.label} / ${frame.candleCount}本 / 履歴ピボット ${frame.pivotHistory?.length || 0}期間 / AUTO ${autoLines.length}本 / 基準 ${calculated}${pivotBasisSummary(frame, 5)}`;
    eurusdPivotLevelsEl.innerHTML = Object.entries(levelStyles).map(([key, [label, color]]) => `<div style="--pivot-color:${color}"><span>${label}</span><strong>${Number(frame.levels?.[key]).toFixed(5)}</strong></div>`).join("");
    return;
  }
  eurusdPivotChart?.remove();
  eurusdPivotSeries = null;
  eurusdPivotResizeObserver?.disconnect();
  eurusdPivotChartEl.innerHTML = "";
  const LC = window.LightweightCharts;
  eurusdPivotChart = LC.createChart(eurusdPivotChartEl, {
    width: eurusdPivotChartEl.clientWidth,
    height: eurusdPivotChartEl.clientHeight,
    attributionLogo: true,
    layout: { background: { type: "solid", color: "#071311" }, textColor: "#8fa9a3", fontFamily: "Inter, system-ui, sans-serif" },
    grid: { vertLines: { color: "rgba(113, 151, 142, 0.08)" }, horzLines: { color: "rgba(113, 151, 142, 0.1)" } },
    rightPriceScale: { borderColor: "rgba(126, 165, 155, 0.22)", scaleMargins: { top: 0.12, bottom: 0.12 } },
    timeScale: { borderColor: "rgba(126, 165, 155, 0.22)", timeVisible: timeframe !== "d1", secondsVisible: false, rightOffset: 5 },
    crosshair: { mode: LC.CrosshairMode?.Normal ?? 0 }
  });
  const seriesOptions = {
    upColor: "#35d39a", downColor: "#ff5f72", borderVisible: false,
    wickUpColor: "#35d39a", wickDownColor: "#ff5f72", priceFormat: { type: "price", precision: 5, minMove: 0.00001 }
  };
  const series = eurusdPivotChart.addSeries
    ? eurusdPivotChart.addSeries(LC.CandlestickSeries, seriesOptions)
    : eurusdPivotChart.addCandlestickSeries(seriesOptions);
  eurusdPivotSeries = series;
  series.setData(frame.candles.map((candle) => ({
    time: Math.floor(new Date(candle.date).getTime() / 1000),
    open: Number(candle.open), high: Number(candle.high), low: Number(candle.low), close: Number(candle.close)
  })));
  const liveCandle = buildLivePivotCandle("eurusd", frame, timeframe);
  if (liveCandle) series.update(liveCandle);
  addPivotHistoryLines(eurusdPivotChart, LC, frame, timeframe, levelStyles, liveCandle?.time);
  const autoLines = addPivotAutoLines(eurusdPivotChart, LC, frame.candles, autoLineEnabled.eurusd);
  eurusdPivotChart.timeScale().fitContent();
  eurusdPivotResizeObserver = new ResizeObserver(() => {
    eurusdPivotChart?.applyOptions({ width: eurusdPivotChartEl.clientWidth, height: eurusdPivotChartEl.clientHeight });
  });
  eurusdPivotResizeObserver.observe(eurusdPivotChartEl);
  const calculated = frame.calculatedFrom ? new Date(frame.calculatedFrom).toLocaleString("ja-JP", { month: "numeric", day: "numeric", hour: "2-digit", minute: "2-digit" }) : "--";
  eurusdPivotStatusEl.textContent = `${frame.label} / ${frame.candleCount}本 / 履歴ピボット ${frame.pivotHistory?.length || 0}期間 / AUTO ${autoLines.length}本 / 基準 ${calculated}${pivotBasisSummary(frame, 5)}`;
  appendLivePivotStatus(eurusdPivotStatusEl, latestLiveFxById.get("eurusd"));
  eurusdPivotLevelsEl.innerHTML = Object.entries(levelStyles).map(([key, [label, color]]) => `
    <div style="--pivot-color:${color}"><span>${label}</span><strong>${Number(frame.levels?.[key]).toFixed(5)}</strong></div>
  `).join("");
}

function renderEurusdSovereignSpreadChart() {
  if (!eurusdPivotChartEl || !eurusdPivotLevelsEl || !eurusdPivotStatusEl) return;
  eurusdPivotChart?.remove();
  eurusdPivotChart = null;
  eurusdPivotSeries = null;
  eurusdPivotResizeObserver?.disconnect();
  eurusdPivotResizeObserver = null;
  eurusdPivotButtons.forEach((button) => {
    button.classList.remove("active");
    button.setAttribute("aria-selected", "false");
  });
  euroSovereignSpreadToggleEl?.classList.add("active");
  euroSovereignSpreadToggleEl?.setAttribute("aria-pressed", "true");
  if (eurusdPivotTradeEl) eurusdPivotTradeEl.hidden = true;
  eurusdPivotLevelsEl.hidden = true;
  const intradayRows = latestEuroSovereignSpread?.intraday?.series || [];
  const rows = intradayRows.length ? intradayRows : latestEuroSovereignSpread?.series || [];
  const latest = rows.at(-1);
  const officialValue = latest ? ` / 最新 ${Number(latest.spreadBp).toFixed(1)}bp` : "";
  const isIntraday = intradayRows.length > 0;
  eurusdPivotStatusEl.textContent = isIntraday
    ? `仏独10年金利差 15分足 / 実測 ${intradayRows.length}本 / フランス10年 − ドイツ10年${officialValue}`
    : `仏独10年金利差 / ECB公式${latestEuroSovereignSpread?.frequency || ""} / 15分実測を蓄積中${officialValue}`;
  eurusdPivotChartEl.innerHTML = "";
  if (!rows.length) {
    eurusdPivotChartEl.innerHTML = '<div class="pivot-chart-empty">ECB公式金利差データを取得しています。</div>';
    return;
  }
  if (!window.LightweightCharts) {
    eurusdPivotChartEl.innerHTML = `<div class="pivot-chart-empty">仏独10年金利差 ${Number(latest.spreadBp).toFixed(1)}bp<br>チャートライブラリを再読込してください。</div>`;
    return;
  }
  const LC = window.LightweightCharts;
  eurusdPivotChart = LC.createChart(eurusdPivotChartEl, {
    width: eurusdPivotChartEl.clientWidth,
    height: eurusdPivotChartEl.clientHeight,
    attributionLogo: true,
    layout: { background: { type: "solid", color: "#071311" }, textColor: "#8fa9a3", fontFamily: "Inter, system-ui, sans-serif" },
    grid: { vertLines: { color: "rgba(113, 151, 142, 0.08)" }, horzLines: { color: "rgba(113, 151, 142, 0.1)" } },
    rightPriceScale: { borderColor: "rgba(126, 165, 155, 0.22)", scaleMargins: { top: 0.12, bottom: 0.12 } },
    leftPriceScale: { visible: true, borderColor: "rgba(255, 209, 102, 0.28)", scaleMargins: { top: 0.12, bottom: 0.12 } },
    timeScale: { borderColor: "rgba(126, 165, 155, 0.22)", timeVisible: isIntraday, secondsVisible: false, rightOffset: 3 },
    crosshair: { mode: LC.CrosshairMode?.Normal ?? 0 },
    localization: { priceFormatter: (value) => `${Number(value).toFixed(2)}%` }
  });
  const addLine = (title, color, field, width = 2, priceScaleId = "right") => {
    const options = { title, color, lineWidth: width, priceScaleId, priceFormat: { type: "price", precision: 3, minMove: 0.001 }, lastValueVisible: true, priceLineVisible: false };
    const line = eurusdPivotChart.addSeries
      ? eurusdPivotChart.addSeries(LC.LineSeries, options)
      : eurusdPivotChart.addLineSeries(options);
    line.setData(rows.map((row) => ({
      time: isIntraday ? Math.floor(Date.parse(row.at) / 1000) : `${row.date}-01`,
      value: Number(row[field])
    })).filter((point) => Number.isFinite(point.time) || typeof point.time === "string").filter((point) => Number.isFinite(point.value)));
  };
  addLine("フランス10年", "#ff7181", "france", 2);
  addLine("ドイツ10年", "#61d8ff", "germany", 2);
  addLine("金利差", "#ffd166", "spreadPct", 3, "left");
  eurusdPivotChart.timeScale().fitContent();
  eurusdPivotResizeObserver = new ResizeObserver(() => {
    eurusdPivotChart?.applyOptions({ width: eurusdPivotChartEl.clientWidth, height: eurusdPivotChartEl.clientHeight });
  });
  eurusdPivotResizeObserver.observe(eurusdPivotChartEl);
}

function initGlobe() {
  globe = Globe()(globeEl)
    .backgroundColor("rgba(0,0,0,0)")
    .globeImageUrl("https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg")
    .bumpImageUrl("https://unpkg.com/three-globe/example/img/earth-topology.png")
    .atmosphereColor("#61d8ff")
    .atmosphereAltitude(0.18)
    .pointAltitude((point) => point.kind === "financial-center" ? 0.045 + Number(point.pressure || 0) / 2600 : point.kind === "geopolitical-risk" ? 0.07 + Number(point.severity || 0) / 900 : Math.max(0.03, point.mag * 0.015))
    .pointRadius((point) => point.kind === "financial-center" ? 0.24 + Number(point.pressure || 0) / 220 : point.kind === "geopolitical-risk" ? 0.3 + Number(point.severity || 0) / 260 : Math.max(0.18, point.mag * 0.08))
    .pointColor((point) => point.kind === "financial-center"
      ? point.status === "警戒" ? "#ff5e7d" : point.status === "注目" ? "#ffdb70" : "#61d8ff"
      : point.kind === "geopolitical-risk" ? point.severity >= 70 ? "#ff6b68" : point.severity >= 45 ? "#f0b84f" : "#61d8ff"
        : point.mag >= 5 ? "#ff6b68" : point.mag >= 3 ? "#f0b84f" : "#46d58c")
    .pointLabel((point) => {
      const escapeHtml = (value) => String(value || "").replace(/[&<>"']/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[character]);
      if (point.kind === "financial-center") {
        const level = point.status === "警戒" ? "赤 / 警報級" : point.status === "注目" ? "黄 / 異変" : "青 / 通常監視";
        return `<div class="globe-point-tooltip"><b>金融拠点マーカー</b><strong>${escapeHtml(point.name)}</strong><span>${escapeHtml(point.role || "市場監視")}</span><span>${level} / 市場圧力 ${Math.round(Number(point.pressure || 0))}%</span><small>${escapeHtml((point.reasons || []).join(" / ") || "特殊要因なし")}</small></div>`;
      }
      if (point.kind === "geopolitical-risk") {
        const level = point.severity >= 70 ? "赤 / 警報級" : point.severity >= 45 ? "黄 / 警戒" : "青 / 監視";
        return `<div class="globe-point-tooltip"><b>地政学リスク</b><strong>${escapeHtml(point.label)}</strong><span>${escapeHtml(point.location)} / ${level}</span><small>${escapeHtml(point.message)}</small></div>`;
      }
      const occurredAt = point.time ? new Date(point.time).toLocaleString("ja-JP") : "時刻確認中";
      const magnitude = Number.isFinite(Number(point.mag)) ? ` / 規模 ${Number(point.mag).toFixed(1)}` : "";
      return `<div class="globe-point-tooltip"><b>自然現象マーカー</b><strong>${escapeHtml(point.title || "世界イベント")}</strong><span>${escapeHtml(occurredAt)}${magnitude}</span><small>地球儀の棒は発生地点と影響強度を示します。</small></div>`;
    })
    .arcColor((arc) => arc.kind === "market-flow"
      ? ["rgba(97,216,255,0.18)", Number(arc.strength || 0) >= 70 ? "rgba(255,94,125,0.85)" : "rgba(70,213,140,0.82)"]
      : ["rgba(97,216,255,0.15)", "rgba(70,213,140,0.72)"])
    .arcAltitude((arc) => arc.kind === "market-flow" ? 0.22 + Number(arc.strength || 0) / 600 : 0.18)
    .arcStroke((arc) => arc.kind === "market-flow" ? 0.55 + Number(arc.strength || 0) / 180 : 0.35)
    .arcDashLength(0.35)
    .arcDashGap(1.2)
    .arcDashAnimateTime(2200)
    .arcLabel((arc) => `<strong>${arc.label || "市場連動"}</strong><br>${arc.fromName || "主要市場"} → ${arc.toName || "関連市場"}<br>影響強度 ${Math.round(Number(arc.strength || 0))}%`)
    .ringsData([])
    .ringLat((alert) => alert.lat)
    .ringLng((alert) => alert.lng)
    .ringColor((alert) => alert.severity === "critical" || alert.level === "critical" || Number(alert.severity || 0) >= 70 ? "#ff6b68" : "#f0b84f")
    .ringMaxRadius((alert) => alert.severity === "critical" || alert.level === "critical" || Number(alert.severity || 0) >= 70 ? 8 : 5)
    .ringPropagationSpeed(2.4)
    .ringRepeatPeriod(700);

  globe.controls().autoRotate = true;
  globe.controls().autoRotateSpeed = 0.45;
  resizeGlobe();
  window.addEventListener("resize", resizeGlobe);
}

function resizeGlobe() {
  if (!globe) return;
  const rect = globeEl.getBoundingClientRect();
  globe.width(rect.width);
  globe.height(rect.height);
}

function formatValue(market, value) {
  if (!Number.isFinite(value)) return "--";
  const fixed = Number(value).toLocaleString("ja-JP", {
    minimumFractionDigits: market.decimals,
    maximumFractionDigits: market.decimals
  });
  return market.unit === "$" ? `$${fixed}` : `${fixed}${market.unit || ""}`;
}

function formatQuoteAge(market) {
  const quoteAt = Date.parse(market.quote?.at || "");
  if (!Number.isFinite(quoteAt)) return "取得時刻不明";
  const seconds = Math.max(0, Math.round((Date.now() - quoteAt) / 1000));
  if (seconds < 90) return `${seconds}秒前`;
  const minutes = Math.round(seconds / 60);
  return `${minutes}分前`;
}

function renderMarketTape(markets) {
  if (!marketTapeEl) return;
  marketTapeEl.innerHTML = (markets || []).slice(0, 7).map((market) => {
    const change = Number(market.forecast?.dailyDeltaPct ?? market.forecast?.deltaPct ?? 0);
    const current = Number(market.forecast?.current);
    const tone = change > 0 ? "up" : change < 0 ? "down" : "flat";
    return `<div class="tape-quote ${tone}"><span>${market.label}</span><strong>${formatValue(market, current)}</strong><small>${change >= 0 ? "+" : ""}${change.toFixed(2)}%</small></div>`;
  }).join("");
}

function formatCandleTime(value) {
  const time = Date.parse(value || "");
  if (!Number.isFinite(time)) return "--:--";
  return new Date(time).toLocaleTimeString("ja-JP", { hour: "2-digit", minute: "2-digit" });
}

function formatTime(value) {
  const time = Date.parse(value || "");
  if (!Number.isFinite(time)) return "--:--";
  return new Date(time).toLocaleTimeString("ja-JP", { hour: "2-digit", minute: "2-digit" });
}

function renderEuroSovereignSpread(data) {
  if (!euroSovereignSpreadStatusEl) return;
  latestEuroSovereignSpread = data;
  const rows = data?.series || [];
  if (!rows.length) {
    euroSovereignSpreadStatusEl.textContent = "公式データ取得待ち";
    if (euroSovereignSpreadValuesEl) euroSovereignSpreadValuesEl.innerHTML = "";
    if (!euroSovereignSpreadFallbackRequested) {
      euroSovereignSpreadFallbackRequested = true;
      fetch("./euro-sovereign-spread.json", { cache: "no-cache" })
        .then((response) => response.ok ? response.json() : Promise.reject(new Error(`HTTP ${response.status}`)))
        .then((fallback) => renderEuroSovereignSpread(fallback))
        .catch(() => {});
    }
    return;
  }
  const intradayRows = data?.intraday?.series || [];
  const intradaySignal = data?.intraday?.signal;
  const last = intradayRows.at(-1) || rows.at(-1);
  const intradayUpdatedAt = data?.intraday?.updatedAt;
  const signalLabel = intradaySignal?.usableForPrediction
    ? `予測採用中・1時間 ${signedNumber(intradaySignal.oneHourChangeBp, 1, "bp")}`
    : `予測未採用・${intradaySignal?.reason || "実測蓄積中"}`;
  euroSovereignSpreadStatusEl.textContent = intradayRows.length
    ? `15分実測 ${formatDateTime(intradayUpdatedAt)} / ${intradayRows.length}本蓄積 / ${signalLabel} / ECB ${data.updatedAt}`
    : `ECB公式 ${data.updatedAt} / ${data.frequency || "更新周期不明"} / 15分実測を蓄積中`;
  if (euroSovereignSpreadValuesEl) euroSovereignSpreadValuesEl.innerHTML = `
    <div><span>フランス10年</span><strong>${last.france.toFixed(2)}%</strong></div>
    <div><span>ドイツ10年</span><strong>${last.germany.toFixed(2)}%</strong></div>
    <div><span>信用リスク差・${intradaySignal?.direction || data.direction || "判定中"}</span><strong class="${(intradaySignal?.direction || data.direction) === "拡大" ? "down" : "up"}">${last.spreadBp.toFixed(1)}bp</strong></div>`;
  if (selectedEurusdChartMode === "spread") renderEurusdSovereignSpreadChart();
}

function formatDateTime(value) {
  const time = Date.parse(value || "");
  if (!Number.isFinite(time)) return "--";
  return new Date(time).toLocaleString("ja-JP", {
    month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit"
  });
}

function pctJa(value) {
  return Number.isFinite(Number(value)) ? `${Math.round(Number(value) * 100)}パーセント` : "未計算";
}

function directionJa(direction) {
  return direction === "up" ? "上方向" : direction === "down" ? "下方向" : "横ばい";
}

function pickJapaneseVoice() {
  const voices = window.speechSynthesis?.getVoices?.() || [];
  const score = (voice) => {
    const descriptor = `${voice.lang} ${voice.name}`;
    let points = /^ja-JP/i.test(voice.lang) ? 100 : /^ja/i.test(voice.lang) ? 80 : 0;
    if (/Natural|Neural|Premium|Online/i.test(descriptor)) points += 35;
    if (/Nanami|Keita|Haruka|Kyoko|Otoya|Google.*日本語|Japanese/i.test(descriptor)) points += 20;
    if (voice.localService) points += 4;
    return points;
  };
  return [...voices].sort((a, b) => score(b) - score(a))[0] || null;
}

function voiceSupported() {
  return "speechSynthesis" in window && "SpeechSynthesisUtterance" in window;
}

function updateVoiceStatus(text) {
  if (voiceStatusEl) voiceStatusEl.textContent = text;
}

function unlockVoiceEngine() {
  if (!voiceSupported()) return false;
  try {
    window.speechSynthesis.resume();
    voiceUnlocked = true;
    updateVoiceStatus("音声準備済み");
    return true;
  } catch {
    updateVoiceStatus("音声開始に失敗");
    return false;
  }
}

function buildVoiceBriefing(snapshot) {
  const eurusd = (snapshot.markets || []).find((market) => market.id === "eurusd");
  const command = snapshot.eurusdCommand || {};
  const compass = snapshot.swingTradeCompass || {};
  const sim = snapshot.probabilitySimulation || {};
  const topAlert = (snapshot.alerts || [])[0];
  const topImportant = (snapshot.importantEurusdItems || [])[0];
  const mainTechnical = (snapshot.aiImprovement?.technicalRows || []).find((row) => row.key === "d1")
    || (snapshot.aiImprovement?.technicalRows || [])[0];
  const smartMoney = snapshot.aiImprovement?.smartMoney;
  const current = eurusd ? formatValue(eurusd, eurusd.forecast.current) : "未取得";
  const prob = sim.probabilities || {};
  const alertText = topAlert
    ? `現在、${topAlert.label}の${topAlert.severity === "critical" ? "重大" : "注意"}アラートがあります。`
    : "重大なアラートはありません。";
  const newsText = topImportant
    ? `注目材料は、${topImportant.japaneseTitle || topImportant.title}です。`
    : "重要ニュースは監視中です。";
  const text = [
    `現在のユーロドルは、${current}です。`,
    `結論は、${command.stance || "分析中"}。スイング方向は、${compass.status || "分析中"}です。`,
    `予測は、上方向${pctJa(prob.up)}、下方向${pctJa(prob.down)}。主方向の信頼度は${pctJa(prob.calibratedMain)}です。`,
    `時間足の一致度は、${compass.agreement || 0}パーセントです。`,
    mainTechnical ? `${mainTechnical.label}のテクニカルは、${mainTechnical.summary}です。主な根拠は${(mainTechnical.patterns || [])[0]?.name || "形状確認中"}です。` : "",
    smartMoney?.status ? `大口監視は${smartMoney.status}、スコア${smartMoney.score || 0}点です。${(smartMoney.top?.reasons || [])[0] || ""}` : "",
    alertText,
    newsText
  ].filter(Boolean).slice(0, 7).join(" ");
  const headline = `${command.stance || "分析中"} / ${compass.status || "分析中"} / ${sim.status || "確率計算中"}`;
  const detail = `${alertText} ${newsText}`;
  const signature = [
    command.stance,
    compass.status,
    sim.status,
    Math.round(Number(prob.calibratedMain || 0) * 100),
    topAlert?.id || "",
    topImportant?.url || topImportant?.title || ""
  ].join("|");
  return { text, headline, detail, signature };
}

function updateVoiceUi() {
  if (!voiceToggleEl) return;
  const supported = voiceSupported();
  voiceToggleEl.disabled = !supported;
  if (voiceModeEl) voiceModeEl.value = voiceMode;
  if (voiceTestEl) voiceTestEl.disabled = !supported;
  voiceToggleEl.textContent = supported
    ? voiceEnabled ? "AI音声 ON" : "AI音声 OFF"
    : "音声非対応";
  voiceStatusEl.textContent = supported
    ? voiceEnabled ? voiceUnlocked ? "報告中" : "タップで開始" : "待機中"
    : "非対応";
  if (voiceDetailEl && /Android|Mobile/i.test(navigator.userAgent) && !voiceEnabled) {
    voiceDetailEl.textContent = "Androidではブラウザ制限により、最初に「今すぐ読む」または「AI音声 ON」を1回押すと音声が開始します。";
  }
}

function speakVoiceBriefing(briefing, force = false) {
  if (!voiceEnabled || !voiceSupported()) return;
  if (!voiceUnlocked && !force) {
    updateVoiceStatus("タップで開始");
    return;
  }
  const now = Date.now();
  const changed = briefing.signature !== lastVoiceSignature;
  const intervalMs = voiceMode === "important"
    ? Number.POSITIVE_INFINITY
    : Math.max(1, Number(voiceMode) || 1) * 60 * 1000 - 5000;
  if (!force && !changed && now - lastVoiceAt < intervalMs) return;
  const runId = ++voiceRunId;
  window.speechSynthesis.cancel();
  window.speechSynthesis.resume();
  const voice = pickJapaneseVoice();
  const chunks = (briefing.text.match(/[^。！？]+[。！？]?/g) || [briefing.text])
    .flatMap((sentence) => {
      const parts = [];
      for (let index = 0; index < sentence.length; index += 90) parts.push(sentence.slice(index, index + 90));
      return parts;
    });
  lastVoiceAt = now;
  lastVoiceSignature = briefing.signature;
  updateVoiceStatus(voice ? `読み上げ中: ${voice.name}` : "読み上げ中: 端末標準音声");

  const speakChunk = (index, useSelectedVoice = true) => {
    if (runId !== voiceRunId || !voiceEnabled) return;
    if (index >= chunks.length) {
      updateVoiceStatus("報告中");
      return;
    }
    const utterance = new SpeechSynthesisUtterance(chunks[index]);
    utterance.lang = "ja-JP";
    const naturalVoice = /Natural|Neural|Premium|Online/i.test(voice?.name || "");
    utterance.rate = naturalVoice ? 0.96 : 0.9;
    utterance.pitch = naturalVoice ? 0.98 : 1;
    utterance.volume = 0.96;
    if (voice && useSelectedVoice) utterance.voice = voice;
    utterance.onstart = () => updateVoiceStatus(
      voice && useSelectedVoice ? `読み上げ中: ${voice.name}` : "読み上げ中: 端末標準音声",
    );
    utterance.onend = () => speakChunk(index + 1, useSelectedVoice);
    utterance.onerror = (event) => {
      if (runId !== voiceRunId || ["canceled", "interrupted"].includes(event.error)) return;
      if (useSelectedVoice && ["synthesis-failed", "voice-unavailable"].includes(event.error)) {
        speakChunk(index, false);
        return;
      }
      const reason = event.error === "not-allowed"
        ? "Androidの再生許可が必要です。「今すぐ読む」を押してください。"
        : `端末音声を再準備します（${event.error || "一時停止"}）。`;
      updateVoiceStatus("再タップで復帰");
      if (voiceDetailEl) voiceDetailEl.textContent = reason;
    };
    window.speechSynthesis.speak(utterance);
  };
  speakChunk(0);
}

function candleStats(market) {
  const candles = market.candles || [];
  const valid = candles.filter((candle) => {
    const values = [candle.open, candle.high, candle.low, candle.close].map(Number);
    return values.every((value) => Number.isFinite(value) && value > 0)
      && Number(candle.high) >= Math.max(Number(candle.open), Number(candle.close))
      && Number(candle.low) <= Math.min(Number(candle.open), Number(candle.close));
  });
  if (!valid.length) return null;
  const high = valid.reduce((best, candle) => Number(candle.high) > Number(best.high) ? candle : best, valid[0]);
  const low = valid.reduce((best, candle) => Number(candle.low) < Number(best.low) ? candle : best, valid[0]);
  const latest = valid[valid.length - 1];
  return { high, low, latest, count: valid.length };
}

function renderCandleSvg(market) {
  const stats = candleStats(market);
  const candles = (market.candles || []).filter((candle) => [candle.open, candle.high, candle.low, candle.close]
    .every((value) => Number.isFinite(Number(value)) && Number(value) > 0)).slice(-32);
  if (!candles.length) return `<div class="candle-empty">5分足データ待機中</div>`;

  const forecast = market.forecast.predicted;
  const values = candles.flatMap((candle) => [candle.open, candle.high, candle.low, candle.close]);
  if (Number.isFinite(forecast)) values.push(forecast);
  if (stats) values.push(stats.high.high, stats.low.low);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const pad = (max - min || Math.abs(max) || 1) * 0.08;
  const lowBound = min - pad;
  const highBound = max + pad;
  const width = 260;
  const height = 128;
  const left = 8;
  const right = 48;
  const top = 12;
  const bottom = 24;
  const chartWidth = width - left - right;
  const chartHeight = height - top - bottom;
  const candleWidth = Math.max(3, chartWidth / candles.length * 0.54);
  const y = (value) => top + (1 - ((value - lowBound) / (highBound - lowBound))) * chartHeight;
  const x = (index) => left + index * (chartWidth / Math.max(1, candles.length - 1));
  const mid = (highBound + lowBound) / 2;
  const startTime = formatCandleTime(candles[0]?.date);
  const midTime = formatCandleTime(candles[Math.floor(candles.length / 2)]?.date);
  const endTime = formatCandleTime(candles[candles.length - 1]?.date);

  const shapes = candles.map((candle, index) => {
    const cx = x(index);
    const openY = y(candle.open);
    const closeY = y(candle.close);
    const highY = y(candle.high);
    const lowY = y(candle.low);
    const up = candle.close >= candle.open;
    const color = up ? "#46d58c" : "#ff6b68";
    const bodyY = Math.min(openY, closeY);
    const bodyH = Math.max(2, Math.abs(closeY - openY));
    return `
      <line x1="${cx.toFixed(1)}" y1="${highY.toFixed(1)}" x2="${cx.toFixed(1)}" y2="${lowY.toFixed(1)}" stroke="${color}" stroke-width="1" />
      <rect x="${(cx - candleWidth / 2).toFixed(1)}" y="${bodyY.toFixed(1)}" width="${candleWidth.toFixed(1)}" height="${bodyH.toFixed(1)}" fill="${color}" opacity="0.9" />
    `;
  }).join("");

  const forecastY = y(forecast);
  const lastX = width - 28;
  const forecastColor = forecast >= candles[candles.length - 1].close ? "#46d58c" : "#ff6b68";
  const highLine = stats ? `<line x1="${left}" y1="${y(stats.high.high).toFixed(1)}" x2="${width - right + 6}" y2="${y(stats.high.high).toFixed(1)}" class="today-high" />` : "";
  const lowLine = stats ? `<line x1="${left}" y1="${y(stats.low.low).toFixed(1)}" x2="${width - right + 6}" y2="${y(stats.low.low).toFixed(1)}" class="today-low" />` : "";

  return `
    <svg class="candle-chart" viewBox="0 0 ${width} ${height}" role="img" aria-label="${market.label}の5分足ローソク足">
      <line x1="${left}" y1="${y(highBound).toFixed(1)}" x2="${width - right}" y2="${y(highBound).toFixed(1)}" class="candle-grid" />
      <line x1="${left}" y1="${y(mid).toFixed(1)}" x2="${width - right}" y2="${y(mid).toFixed(1)}" class="candle-grid" />
      <line x1="${left}" y1="${y(lowBound).toFixed(1)}" x2="${width - right}" y2="${y(lowBound).toFixed(1)}" class="candle-grid" />
      ${highLine}
      ${lowLine}
      <line x1="${left}" y1="${y(candles[candles.length - 1].close).toFixed(1)}" x2="${width - right}" y2="${y(candles[candles.length - 1].close).toFixed(1)}" class="last-close" />
      ${shapes}
      <line x1="${(lastX - 10).toFixed(1)}" y1="${forecastY.toFixed(1)}" x2="${(lastX + 10).toFixed(1)}" y2="${forecastY.toFixed(1)}" stroke="${forecastColor}" stroke-width="2" stroke-dasharray="3 2" />
      <circle cx="${lastX}" cy="${forecastY.toFixed(1)}" r="3.2" fill="${forecastColor}" />
      <text x="${width - 44}" y="${y(highBound).toFixed(1)}" class="candle-axis">${formatValue(market, highBound)}</text>
      <text x="${width - 44}" y="${y(mid).toFixed(1)}" class="candle-axis">${formatValue(market, mid)}</text>
      <text x="${width - 44}" y="${y(lowBound).toFixed(1)}" class="candle-axis">${formatValue(market, lowBound)}</text>
      <text x="${left}" y="${height - 7}" class="candle-time">${startTime}</text>
      <text x="${left + chartWidth / 2 - 17}" y="${height - 7}" class="candle-time">${midTime}</text>
      <text x="${width - right - 28}" y="${height - 7}" class="candle-time">${endTime}</text>
      <text x="${lastX - 18}" y="${Math.max(10, forecastY - 6).toFixed(1)}" class="forecast-label">10分</text>
    </svg>
  `;
}

function renderCandleDetails(market) {
  const stats = candleStats(market);
  if (!stats) return "";
  const latest = stats.latest;
  const direction = latest.close >= latest.open ? "up" : "down";
  return `
    <div class="candle-detail">
      <div>
        <span>本日高値</span>
        <strong class="up">${formatValue(market, stats.high.high)}</strong>
        <small>${formatCandleTime(stats.high.date)}</small>
      </div>
      <div>
        <span>本日安値</span>
        <strong class="down">${formatValue(market, stats.low.low)}</strong>
        <small>${formatCandleTime(stats.low.date)}</small>
      </div>
      <div>
        <span>最新5分足 ${formatCandleTime(latest.date)}</span>
        <strong class="${direction}">${formatValue(market, latest.close)}</strong>
        <small>O ${formatValue(market, latest.open)} / H ${formatValue(market, latest.high)} / L ${formatValue(market, latest.low)}</small>
      </div>
    </div>
  `;
}

function renderIntradayTrend(trend) {
  if (!trend) return "";
  const direction = trend.direction || "flat";
  const mark = direction === "up" ? "↑" : direction === "down" ? "↓" : "→";
  const pct = Number(trend.changePct || 0);
  return `
    <div class="intraday-trend ${direction}">
      <span>${trend.label || "5分足 分析中"}</span>
      <strong>${mark} ${pct >= 0 ? "+" : ""}${pct.toFixed(3)}%</strong>
    </div>
  `;
}

function renderBacktestFit(fit) {
  if (!fit) return "";
  const tone = fit.label === "得意局面" ? "up" : fit.label === "苦手局面" ? "down" : "flat";
  return `
    <div class="backtest-fit ${tone}">
      <span>${fit.label}</span>
      <strong>${fit.score}%</strong>
      <small>${(fit.matches || []).join(" / ") || "過去条件を照合中"}</small>
    </div>
  `;
}

function renderEnsemble(ensemble) {
  const models = (ensemble?.models || []).slice(0, 6);
  if (!models.length) return "";
  return `
    <div class="ensemble-row" title="複数モデルの合議予測">
      <div>
        <span>合議</span>
        <strong>${Math.round((ensemble.agreement || 0) * 100)}%</strong>
        <small>主導: ${ensemble.leader || "分析中"}</small>
      </div>
      <div class="ensemble-models">
        ${models.map((model) => `
          <span class="${model.direction}" title="${model.label}: ${model.impulsePct >= 0 ? "+" : ""}${model.impulsePct}% / 信頼 ${Math.round(model.confidence * 100)}% / 学習重み ${Number(model.adaptiveWeight || 1).toFixed(2)}">
            ${model.label.slice(0, 2)}
          </span>
        `).join("")}
      </div>
    </div>
  `;
}

function renderPositioning(positioning) {
  if (!positioning) return "";
  return `
    <div class="positioning-panel">
      <div class="positioning-head">
        <strong>${positioning.verdict || "分析中"}</strong>
        <span>${positioning.dataQuality || "推定"}</span>
      </div>
      <div class="position-bars">
        <div>
          <span>買い注文</span>
          <i><b class="buy" style="width:${positioning.buyPressure || 0}%"></b></i>
          <strong>${Number(positioning.buyPressure || 0).toFixed(1)}%</strong>
        </div>
        <div>
          <span>売り注文</span>
          <i><b class="sell" style="width:${positioning.sellPressure || 0}%"></b></i>
          <strong>${Number(positioning.sellPressure || 0).toFixed(1)}%</strong>
        </div>
      </div>
      <div class="position-hold">
        <span>買い持ち ${Number(positioning.longPct || 0).toFixed(1)}%</span>
        <span>売り持ち ${Number(positioning.shortPct || 0).toFixed(1)}%</span>
      </div>
      <small>${(positioning.sources || []).join(" / ") || positioning.notes || "分析中"}</small>
    </div>
  `;
}

function renderMarkets(markets) {
  const visibleMarkets = markets.filter((market) => market.id !== "eth" && (detailMode === "full" || ["eurusd", "usdjpy"].includes(market.id)));
  gridEl.innerHTML = visibleMarkets.map((market) => {
    const up = market.forecast.delta >= 0;
    const direction = up ? "up" : "down";
    const arrow = up ? "上昇" : "下落";
    return `
      <article class="market-card">
        <header>
          <strong>${market.label}</strong>
          <span class="provider" title="${market.quote.provider}">${market.quote.provider}</span>
        </header>
        <div class="price">${formatValue(market, market.forecast.current)}</div>
        <div class="forecast ${direction}">
          <span class="arrow">${arrow}</span>
          <strong>${formatValue(market, market.forecast.predicted)}</strong>
          <span>${Math.abs(market.forecast.deltaPct).toFixed(3)}%</span>
        </div>
        <div class="confidence">
          信頼度 ${(market.forecast.confidence * 100).toFixed(0)}% / 学習 ${market.forecast.calibration.samples}件
        </div>
        <div class="quote-age ${market.quote.marketSession?.isOpen === false ? "closed" : Number(market.quote.freshnessSeconds || 0) > 180 ? "stale" : "fresh"}">
          ${market.quote.marketSession?.isOpen === false ? "最終取引値" : "現在値"} ${formatQuoteAge(market)}
          ${market.quote.marketSession?.label ? ` / ${market.quote.marketSession.label}` : ""}
        </div>
        ${market.quote.sourceCount ? `
          <div class="quote-source-row">
            <span>価格ソース 採用${market.quote.trustedSourceCount ?? market.quote.sourceCount}/${market.quote.sourceCount}系統</span>
            <strong>${market.id === "eurusd" && Number.isFinite(Number(market.quote.qualityScore)) ? `品質 ${Number(market.quote.qualityScore).toFixed(0)}点 / ` : ""}乖離 ${Number(market.quote.sourceDeviationPct || 0).toFixed(4)}%</strong>
          </div>
        ` : ""}
        <div class="driver-row">
          ${(market.forecast.drivers || []).map((driver) => `
            <span class="${driver.direction}">${driver.label}</span>
          `).join("")}
        </div>
        <div class="daily-row">
          <span>日足予測</span>
          <strong class="${market.forecast.dailyDeltaPct >= 0 ? "up" : "down"}">${formatValue(market, market.forecast.dailyPredicted)}</strong>
          <span>${market.forecast.dailyDeltaPct >= 0 ? "+" : ""}${market.forecast.dailyDeltaPct.toFixed(2)}%</span>
        </div>
        ${renderPositioning(market.positioning)}
        ${renderEnsemble(market.forecast.ensemble)}
        ${renderIntradayTrend(market.intradayTrend)}
        ${renderBacktestFit(market.backtestFit)}
        ${renderCandleDetails(market)}
        ${renderCandleQuality(market.candleQuality)}
        ${renderCandleSvg(market)}
      </article>
    `;
  }).join("");
}

function renderGlobe(snapshot) {
  const eventPoints = snapshot.events.map((event) => ({
    ...event,
    lat: event.coordinates.lat,
    lng: event.coordinates.lng
  }));
  const centerPoints = (snapshot.marketCommandCenter?.centers || []).map((center) => ({
    ...center,
    kind: "financial-center"
  }));
  const flowArcs = (snapshot.marketCommandCenter?.links || []).map((link) => ({
    kind: "market-flow",
    startLat: link.fromCenter.lat,
    startLng: link.fromCenter.lng,
    endLat: link.toCenter.lat,
    endLng: link.toCenter.lng,
    strength: link.strength,
    label: link.label,
    fromName: link.fromCenter.name,
    toName: link.toCenter.name
  }));
  const centerRings = (snapshot.marketCommandCenter?.centers || [])
    .filter((center) => center.status === "警戒" || center.pressure >= 68)
    .map((center) => ({
      ...center,
      lat: center.lat,
      lng: center.lng,
      severity: center.status === "警戒" ? "critical" : "warning"
    }));
  const currentAlerts = (snapshot.alerts || []).filter((item) => !item.expiresAt || Date.parse(item.expiresAt) > Date.now());
  const geopoliticalPoints = globeLayers.geopolitics ? (snapshot.fundamentalNews?.geopoliticalRisk?.latest || []).map((item) => ({
    ...item,
    kind: "geopolitical-risk",
    markerType: "geopolitical-risk",
    label: `地政学: ${item.typeLabel || "情勢変化"}`,
    message: `${item.title || "情勢を確認中"} / ${item.marketChannel || "市場初動を監視"}`,
    location: item.regionLabel || "地域確認中",
    severity: Number(item.severity || 0),
    level: Number(item.severity || 0) >= 70 ? "critical" : Number(item.severity || 0) >= 45 ? "warning" : "watch",
    detectedAt: item.capturedAt || item.publishedAt,
    direction: item.reaction15m?.direction || "flat"
  })) : [];
  const visibleAlerts = [...(globeLayers.alerts ? currentAlerts : []), ...geopoliticalPoints];
  if (globe) {
    globe.pointsData([
      ...(globeLayers.events ? eventPoints : []),
      ...(globeLayers.centers ? centerPoints : []),
      ...geopoliticalPoints
    ]);
    globe.arcsData(globeLayers.flows ? flowArcs : []);
    globe.ringsData([...visibleAlerts, ...(globeLayers.alerts ? centerRings : [])]);
  }
  renderFlowExplanation(flowArcs);
  renderMap2d(eventPoints, centerPoints, visibleAlerts);
  clearTimeout(mapAlertExpiryTimer);
  const nextExpiry = currentAlerts.map((item) => Date.parse(item.expiresAt || "")).filter((value) => Number.isFinite(value) && value > Date.now()).sort((a, b) => a - b)[0];
  if (nextExpiry) mapAlertExpiryTimer = setTimeout(() => {
    if (latestSnapshot) {
      renderGlobe(latestSnapshot);
      renderAlerts((latestSnapshot.alerts || []).filter((item) => !item.expiresAt || Date.parse(item.expiresAt) > Date.now()));
    }
  }, Math.max(50, nextExpiry - Date.now() + 50));
}

function renderFlowExplanation(flows) {
  if (!flowCountEl || !flowExplanationEl) return;
  const ranked = [...flows].sort((a, b) => Number(b.strength || 0) - Number(a.strength || 0));
  flowCountEl.textContent = globeLayers.flows ? `${ranked.length}経路を表示` : "線は非表示";
  if (!globeLayers.flows) {
    flowExplanationEl.textContent = "「市場フロー」を押すと影響経路を表示します。";
    return;
  }
  flowExplanationEl.innerHTML = ranked.slice(0, 3).map((flow, index) => `
    <article data-flow-index="${index}">
      <span>${flow.fromName} → ${flow.toName}</span>
      <strong>${Math.round(Number(flow.strength || 0))}%</strong>
      <small>${flow.label}</small>
    </article>
  `).join("") || "現在、表示対象となる市場連動はありません。";
}

function applyDesignMode() {
  document.body.classList.toggle("design-command", designMode === "command");
  designModeButtons.forEach((button) => {
    const active = button.dataset.designMode === designMode;
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", String(active));
  });
  setTimeout(resizeGlobe, 80);
}

function renderMap2d(events, centers, alerts) {
  if (!mapAlertMarkersEl) return;
  const eventMarkers = globeLayers.events ? events.filter((item) => {
    const occurredAt = Date.parse(item.time || item.at || "");
    const recent = Number.isFinite(occurredAt) && Date.now() - occurredAt >= 0 && Date.now() - occurredAt < 5 * 60 * 1000;
    return recent && (Number(item.mag || 0) >= 4.5 || item.tsunami || item.severity === "critical");
  }).map((item) => ({
    ...item,
    markerType: "event",
    label: item.title || "自然現象",
    detail: item.detail || item.message || `規模 ${Number(item.mag || 0).toFixed(1)} の変動を検知`,
    level: Number(item.mag || 0) >= 6 || item.tsunami ? "critical" : "warning"
  })) : [];
  const alertMarkers = alerts.map((item) => ({
    ...item,
    markerType: item.markerType || "alert",
    label: item.label || item.location || "市場警報",
    detail: item.message || "特殊要因による市場変動を検知しました。",
    level: item.level === "critical" || item.severity === "critical" || Number(item.severity || 0) >= 70 ? "critical"
      : item.level === "watch" ? "watch" : "warning"
  }));
  const calmMarkers = globeLayers.centers && !alertMarkers.length && !eventMarkers.length ? [{
    markerType: "calm", label: "世界監視: 異常なし", detail: "現在、警報級または注意級の特殊要因は検出されていません。", level: "calm", location: "世界市場"
  }] : [];
  const uniqueMarkers = new Map();
  for (const item of [...alertMarkers, ...eventMarkers, ...calmMarkers]) {
    const key = `${item.label || ""}|${item.location || item.place || ""}|${item.detail || ""}`;
    if (!uniqueMarkers.has(key)) uniqueMarkers.set(key, item);
  }
  const marketLocations = {
    eurusd: { lat: 51.5, lng: -0.1 }, usd: { lat: 40.7, lng: -74.0 }, sp500: { lat: 40.7, lng: -74.0 },
    us10y: { lat: 38.9, lng: -77.0 }, policy: { lat: 38.9, lng: -77.0 }, gold: { lat: 51.5, lng: -0.1 },
    crude: { lat: 29.8, lng: -95.4 }, vix: { lat: 41.9, lng: -87.6 }, usdjpy: { lat: 35.7, lng: 139.7 }
  };
  const positionCounts = new Map();
  const deduplicatedMarkers = [...uniqueMarkers.values()];
  const geopoliticalMarkers = deduplicatedMarkers.filter((item) => item.markerType === "geopolitical-risk").slice(0, 2);
  const otherMarkers = deduplicatedMarkers.filter((item) => item.markerType !== "geopolitical-risk");
  const markers = [...geopoliticalMarkers, ...otherMarkers.slice(0, Math.max(0, 6 - geopoliticalMarkers.length))];
  mapAlertMarkersEl.innerHTML = markers.map((item) => {
    const sourceLocation = item.location || item.place || item.name || (Number.isFinite(Number(item.lat)) ? `${Number(item.lat).toFixed(1)}, ${Number(item.lng).toFixed(1)}` : "世界市場");
    const direction = item.direction === "up" ? "上方向" : item.direction === "down" ? "下方向" : "方向監視";
    const timestamp = item.detectedAt || item.createdAt || item.at || item.time || "";
    const fallback = marketLocations[String(item.assetId || "").toLowerCase()] || { lat: 48.9, lng: 2.35 };
    const lat = Number.isFinite(Number(item.lat)) ? Number(item.lat) : fallback.lat;
    const lng = Number.isFinite(Number(item.lng)) ? Number(item.lng) : fallback.lng;
    const key = `${Math.round(lat)}:${Math.round(lng)}`;
    const collisionIndex = positionCounts.get(key) || 0;
    positionCounts.set(key, collisionIndex + 1);
    const left = Math.max(4, Math.min(96, ((lng + 180) / 360) * 100 + collisionIndex * 3.2));
    const top = Math.max(25, Math.min(82, ((90 - lat) / 180) * 100 + collisionIndex * 4));
    const levelLabel = item.level === "critical" ? "赤 / 警報級" : item.level === "warning" ? "黄 / 異変" : item.level === "watch" ? "青 / 監視" : "青 / 異常なし";
    const timeLabel = timestamp ? new Date(timestamp).toLocaleString("ja-JP") : "監視中";
    const tooltipSide = left > 70 ? " tooltip-left" : "";
    return `<button type="button" class="map-marker-pole ${item.level}${tooltipSide}" style="left:${left.toFixed(2)}%;top:${top.toFixed(2)}%" data-level="${item.level}" data-title="${escapeMarkup(item.label)}" data-detail="${escapeMarkup(item.detail)}" data-meta="${escapeMarkup(`${sourceLocation} / ${direction} / ${timeLabel}`)}" title="${escapeMarkup(`${levelLabel}: ${item.label} - ${item.detail}`)}" aria-label="${escapeMarkup(`${levelLabel} ${item.label}。${item.detail}。${sourceLocation}。${direction}。${timeLabel}`)}"><i></i><b>${item.level === "critical" ? "警報" : item.level === "warning" ? "異変" : item.level === "watch" ? "監視" : "正常"}</b><span class="map-marker-tooltip" role="tooltip"><strong>${escapeMarkup(item.label)}</strong><span>${escapeMarkup(levelLabel)} / ${escapeMarkup(sourceLocation)}</span><small>${escapeMarkup(item.detail)}</small><em>${escapeMarkup(`${direction} / ${timeLabel}`)}</em></span></button>`;
  }).join("");
}

function applyDetailMode({ rerender = true } = {}) {
  const full = detailMode === "full";
  document.body.classList.toggle("compact-operations", !full);
  secondaryPanelIds.forEach((id) => {
    const panel = document.getElementById(id);
    if (panel) panel.hidden = !full;
  });
  if (detailModeToggleEl) {
    detailModeToggleEl.textContent = full ? "詳細を閉じる" : "詳細表示";
    detailModeToggleEl.title = full ? "補助パネルを閉じて軽量表示に戻す" : "保存済みの補助パネルを表示";
    detailModeToggleEl.classList.toggle("active", full);
    detailModeToggleEl.setAttribute("aria-pressed", String(full));
  }
  if (!rerender || !latestSnapshot) return;
  renderMarkets(latestSnapshot.markets || []);
  if (full) {
    renderEurusdOptions(latestSnapshot.eurusdOptions);
    renderYttDemoTrading(latestSnapshot.yttDemoTrading);
    renderConformalCalibration(latestSnapshot.eurusdConformal);
    renderChampionChallenger(latestSnapshot.championChallenger);
    renderPaperAccount(latestSnapshot.shadowPaperTrading, shadowPaperTradingPanelEl, shadowPaperTradingStatusEl, shadowPaperTradingEl, { shadow: true });
  }
  requestAnimationFrame(rebalanceIntelligenceRail);
}

function renderUsdjpyPivotChart(data, timeframe = selectedUsdjpyPivotTimeframe) {
  if (!usdjpyPivotChartEl || !usdjpyPivotLevelsEl || !usdjpyPivotStatusEl) return;
  latestUsdjpyPivotChart = data;
  const frame = data?.frames?.[timeframe];
  const decimals = Number(data?.decimals || 3);
  usdjpyPivotButtons.forEach((button) => {
    const active = button.dataset.usdjpyPivotTimeframe === timeframe;
    button.classList.toggle("active", active);
    button.setAttribute("aria-selected", String(active));
  });
  if (!frame?.candles?.length) {
    usdjpyPivotStatusEl.textContent = frame?.error || "チャートデータを取得できません";
    usdjpyPivotChartEl.innerHTML = '<div class="pivot-chart-empty">ドル円の確定足を再取得しています。</div>';
    usdjpyPivotLevelsEl.innerHTML = "";
    return;
  }
  const levelStyles = {
    r3: ["R3", "#ff5971"], r2: ["R2", "#ff7181"], r1: ["R1", "#ff9a73"],
    p: ["P", "#ffd166"], s1: ["S1", "#69d7c3"], s2: ["S2", "#48b8d0"], s3: ["S3", "#5b96df"]
  };
  const calculated = frame.calculatedFrom ? new Date(frame.calculatedFrom).toLocaleString("ja-JP", { month: "numeric", day: "numeric", hour: "2-digit", minute: "2-digit" }) : "--";
  const updateSummary = () => {
    const autoCount = autoLineEnabled.usdjpy ? buildPivotAutoLines(frame.candles).length : 0;
    usdjpyPivotStatusEl.textContent = `${frame.label} / ${frame.candleCount}本 / 履歴ピボット ${frame.pivotHistory?.length || 0}期間 / AUTO ${autoCount}本 / 基準 ${calculated}${pivotBasisSummary(frame, decimals)}`;
    usdjpyPivotLevelsEl.innerHTML = Object.entries(levelStyles).map(([key, [label, color]]) => `<div style="--pivot-color:${color}"><span>${label}</span><strong>${Number(frame.levels?.[key]).toFixed(decimals)}</strong></div>`).join("");
  };
  if (!window.LightweightCharts) {
    renderPivotFallback(frame, timeframe, levelStyles, usdjpyPivotChartEl, "USD/JPY", decimals, autoLineEnabled.usdjpy);
    updateSummary();
    return;
  }
  usdjpyPivotChart?.remove();
  usdjpyPivotSeries = null;
  usdjpyPivotResizeObserver?.disconnect();
  usdjpyPivotChartEl.innerHTML = "";
  const LC = window.LightweightCharts;
  usdjpyPivotChart = LC.createChart(usdjpyPivotChartEl, {
    width: usdjpyPivotChartEl.clientWidth,
    height: usdjpyPivotChartEl.clientHeight,
    attributionLogo: true,
    layout: { background: { type: "solid", color: "#071311" }, textColor: "#8fa9a3", fontFamily: "Inter, system-ui, sans-serif" },
    grid: { vertLines: { color: "rgba(113, 151, 142, 0.08)" }, horzLines: { color: "rgba(113, 151, 142, 0.1)" } },
    rightPriceScale: { borderColor: "rgba(126, 165, 155, 0.22)", scaleMargins: { top: 0.12, bottom: 0.12 } },
    timeScale: { borderColor: "rgba(126, 165, 155, 0.22)", timeVisible: timeframe !== "d1", secondsVisible: false, rightOffset: 5 },
    crosshair: { mode: LC.CrosshairMode?.Normal ?? 0 }
  });
  const options = {
    upColor: "#35d39a", downColor: "#ff5f72", borderVisible: false,
    wickUpColor: "#35d39a", wickDownColor: "#ff5f72", priceFormat: { type: "price", precision: decimals, minMove: 10 ** -decimals }
  };
  const series = usdjpyPivotChart.addSeries
    ? usdjpyPivotChart.addSeries(LC.CandlestickSeries, options)
    : usdjpyPivotChart.addCandlestickSeries(options);
  usdjpyPivotSeries = series;
  series.setData(frame.candles.map((candle) => ({
    time: Math.floor(new Date(candle.date).getTime() / 1000),
    open: Number(candle.open), high: Number(candle.high), low: Number(candle.low), close: Number(candle.close)
  })));
  const liveCandle = buildLivePivotCandle("usdjpy", frame, timeframe);
  if (liveCandle) series.update(liveCandle);
  addPivotHistoryLines(usdjpyPivotChart, LC, frame, timeframe, levelStyles, liveCandle?.time);
  addPivotAutoLines(usdjpyPivotChart, LC, frame.candles, autoLineEnabled.usdjpy);
  usdjpyPivotChart.timeScale().fitContent();
  usdjpyPivotResizeObserver = new ResizeObserver(() => {
    usdjpyPivotChart?.applyOptions({ width: usdjpyPivotChartEl.clientWidth, height: usdjpyPivotChartEl.clientHeight });
  });
  usdjpyPivotResizeObserver.observe(usdjpyPivotChartEl);
  updateSummary();
  appendLivePivotStatus(usdjpyPivotStatusEl, latestLiveFxById.get("usdjpy"));
}

function openMapEventDetail(marker) {
  if (!mapEventDetailEl || !marker) return;
  const level = marker.dataset.level || "calm";
  mapEventDetailEl.className = `map-event-detail ${level}`;
  mapEventDetailLevelEl.textContent = level === "critical" ? "警報級" : level === "warning" ? "異変を検知" : "異常なし";
  mapEventDetailTitleEl.textContent = marker.dataset.title || "世界市場監視";
  mapEventDetailBodyEl.textContent = marker.dataset.detail || "詳細情報を確認しています。";
  mapEventDetailMetaEl.textContent = marker.dataset.meta || "世界市場";
  mapEventDetailEl.hidden = false;
}

function applyGlobeMode() {
  const is2d = globeMode === "2d";
  document.querySelector(".globe-section")?.classList.toggle("mode-2d", is2d);
  globeEl?.classList.toggle("hidden", is2d);
  map2dEl?.classList.toggle("visible", is2d);
  if (globe?.controls) globe.controls().autoRotate = !is2d;
  globeModeButtons.forEach((button) => {
    const active = button.dataset.globeMode === globeMode;
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", String(active));
  });
}

function renderFinanceMonitorOverview(monitor) {
  if (!financeMonitorPanelEl || !financeMonitorStatusEl || !financeMonitorOverviewEl) return;
  if (!monitor) {
    financeMonitorOverviewEl.innerHTML = `<div class="finance-monitor-empty">世界市場の状態を集約しています。</div>`;
    return;
  }
  financeMonitorPanelEl.className = `finance-monitor-wrap ${monitor.level || "calm"}`;
  financeMonitorStatusEl.textContent = monitor.headline || "世界市場を監視中";
  const breadth = monitor.breadth || {};
  financeMonitorOverviewEl.innerHTML = `
    <div class="finance-monitor-lead ${monitor.regime?.tone || "neutral"}">
      <span>現在の市場環境</span>
      <strong>${monitor.regime?.label || "中立"}</strong>
      <p>${monitor.regime?.detail || "株・金利・為替・商品を統合しています。"}</p>
      <small>EUR/USDへの示唆: ${monitor.eurusdMessage || "方向を分析中"}</small>
    </div>
    <div class="market-breadth">
      <div class="market-breadth-head"><span>市場の広がり</span><strong>${breadth.up || 0}上昇 / ${breadth.down || 0}下落</strong></div>
      <i><b class="up" style="width:${breadth.upPct || 0}%"></b><b class="down" style="width:${breadth.downPct || 0}%"></b></i>
      <small>${breadth.label || "方向を集計中"}</small>
    </div>
    <div class="session-board">
      ${(monitor.sessions || []).map((session) => `<div class="market-session ${session.state}"><span>${session.name}</span><strong>${session.label}</strong><small>${session.hours}</small></div>`).join("")}
    </div>
    <div class="finance-monitor-grid">
      ${(monitor.tiles || []).map((tile) => `<div class="finance-monitor-tile ${tile.tone || "neutral"}"><span>${tile.label}</span><strong>${tile.value}</strong><small>${tile.detail}</small></div>`).join("")}
    </div>
    <div class="finance-hotspots">
      <span>注目拠点</span>
      ${(monitor.hotspots || []).map((item) => `<strong>${item.name} <em>${item.pressure}%</em></strong>`).join("")}
      <small>${monitor.freshness || "データ鮮度を確認中"}</small>
    </div>
  `;
}

function renderNewsTicker(items) {
  const ticker = (items || []).slice(0, 8);
  newsTickerEl.innerHTML = ticker.map((item) => `
    <a class="${item.hot ? "hot" : ""}" href="${item.url || "#"}" target="_blank" rel="noreferrer">
      <strong>${item.source}</strong>
      <span>${item.title}</span>
    </a>
  `).join("");
}

function renderShockRadar(items, watchPoints) {
  shockRadarEl.innerHTML = (items || []).map((item) => `
    <div class="radar-item">
      <div>
        <strong>${item.label}</strong>
        <span>${item.value}%</span>
      </div>
      <i><b style="width:${item.value}%"></b></i>
      <small>${item.detail}</small>
    </div>
  `).join("");

  watchPointsEl.innerHTML = (watchPoints || []).map((point) => `
    <div class="watch-point">${point}</div>
  `).join("");
}

function renderShockLog(items, shadowReplay) {
  latestShockLogs = items || [];
  if (shockShadowSummaryEl) {
    const rate = shadowReplay?.explanationRate === null || shadowReplay?.explanationRate === undefined
      ? "--" : `${Math.round(shadowReplay.explanationRate * 100)}%`;
    const best = shadowReplay?.factors?.[0];
    shockShadowSummaryEl.innerHTML = shadowReplay
      ? `<strong>後知恵なし影検証</strong><span>${shadowReplay.status}</span><span>自動抽出 ${shadowReplay.autoDetectedCandidates || 0}件</span><span>説明可能 ${rate}</span><span>${best ? `最多要因 ${best.label} ${best.samples}件` : "要因標本なし"}</span><small>過去再生は仮説選別専用。本番重みは前向き40件で判定</small>`
      : "過去急変の時刻監査を準備中";
  }
  const query = (shockSearchInputEl?.value || "").trim().toLowerCase();
  const direction = shockDirectionFilterEl?.value || "";
  const logs = latestShockLogs.filter((item) => {
    if (direction && item.direction !== direction) return false;
    if (!query) return true;
    const text = [
      item.label,
      item.message,
      item.reason,
      item.location,
      item.smartMoney?.verdict,
      item.attribution?.primaryCause,
      item.attribution?.explanation,
      ...((item.smartMoney?.labels || [])),
      ...((item.smartMoney?.reasons || [])),
      ...((item.relatedSignals || []).map((signal) => `${signal.title} ${signal.source} ${signal.domain}`))
    ].join(" ").toLowerCase();
    return text.includes(query);
  }).slice(0, 10);
  shockLogCountEl.textContent = `${logs.length}件`;
  if (!logs.length) {
    shockLogEl.innerHTML = `<div class="shock-log-empty">条件に合う急変理由はまだありません。</div>`;
    return;
  }

  shockLogEl.innerHTML = logs.map((item) => {
    const news = (item.relatedSignals || [])[0];
    const comove = (item.comoves || [])[0];
    const quake = (item.nearbyEvents || [])[0];
    const directionLabel = item.direction === "up" ? "上方向" : item.direction === "down" ? "下方向" : "横ばい";
    const directionMark = item.direction === "up" ? "↑" : item.direction === "down" ? "↓" : "→";
    const attribution = item.attribution;
    const beforeNews = (attribution?.news || []).filter((signal) => signal.timing === "known_before_move");
    const afterNews = (attribution?.news || []).filter((signal) => signal.timing === "reported_after_move");
    const outcome15 = attribution?.outcome15;
    const outcome60 = attribution?.outcome60;
    return `
      <article class="shock-log-item ${item.severity}">
        <time>${new Date(item.createdAt).toLocaleTimeString("ja-JP")}</time>
        <strong>${item.label}</strong>
        <div class="shock-direction ${item.direction || "flat"}">${directionMark} ${directionLabel}</div>
        <span>${item.location || "Global"} / 信頼 ${item.confidence}%</span>
        <p>${item.reason}</p>
        ${attribution ? `
          <section class="shock-attribution">
            <header><b>事後原因分析</b><em>${attribution.status} / 根拠信頼 ${attribution.confidence}%</em></header>
            <p>${attribution.explanation}</p>
            <div class="shock-outcomes">
              <span>検知 ${Number(attribution.priceAtShock).toFixed(5)}</span>
              <span>15分 ${outcome15 ? `${outcome15.movePct >= 0 ? "+" : ""}${outcome15.movePct.toFixed(3)}%${outcome15.valid ? "" : " (時刻外)"}` : "追跡中"}</span>
              <span>60分 ${outcome60 ? `${outcome60.movePct >= 0 ? "+" : ""}${outcome60.movePct.toFixed(3)}%${outcome60.valid ? "" : " (時刻外)"}` : "追跡中"}</span>
            </div>
            <small>主因候補: ${attribution.primaryCause} / 変動前資料 ${beforeNews.length}件 / 事後報道 ${afterNews.length}件 / ${attribution.learningEligible ? "学習候補" : "学習保留"}</small>
          </section>
        ` : ""}
        ${item.smartMoney ? `<p class="shock-smartmoney">大口/だまし: ${item.smartMoney.verdict} / ${(item.smartMoney.labels || []).join(" / ")}</p>` : ""}
        <small>${news ? `ニュース: ${news.title}` : quake ? `災害: ${quake.title}` : comove ? `連動: ${comove.label} ${comove.dailyDeltaPct >= 0 ? "+" : ""}${comove.dailyDeltaPct.toFixed(2)}%` : item.message}</small>
      </article>
    `;
  }).join("");
}

function renderExternalSignalShadow(view) {
  if (!externalSignalShadowEl) return;
  if (!view) {
    externalSignalShadowEl.textContent = "外部シグナル影検証を準備中";
    return;
  }
  const expectancy = view.expectancyPct == null
    ? "--"
    : `${view.expectancyPct >= 0 ? "+" : ""}${Number(view.expectancyPct).toFixed(4)}%`;
  externalSignalShadowEl.innerHTML = `<strong>外部シグナル影検証</strong><span>${escapeMarkup(view.status)}</span><span>照合 ${view.samples}/${view.minimumSamples}件</span><span>待ち ${view.pending}件</span><span>コスト後平均 ${expectancy}</span><small>Webhookは影検証のみ・実資金注文なし</small>`;
}

function renderDataHealth(health) {
  if (!health) return;
  healthStatusEl.textContent = `${health.status || "確認中"} / ${health.checkedSources || 0}系統`;
  const rows = (health.sources || []).slice(0, 8);
  if (!rows.length) {
    dataHealthEl.innerHTML = `<div class="health-empty">データ取得状況を集計中です。</div>`;
    return;
  }
  dataHealthEl.innerHTML = rows.map((row) => {
    const rate = row.successRate === null || row.successRate === undefined ? "--" : `${Math.round(row.successRate * 100)}%`;
    const last = row.lastSuccessAt ? new Date(row.lastSuccessAt).toLocaleTimeString("ja-JP") : "未成功";
    return `
      <div class="health-item ${row.status === "不安定" ? "critical" : row.status === "注意" ? "warning" : "ok"}">
        <strong>${row.source}</strong>
        <span>${row.status} / 成功率 ${rate}</span>
        <small>最終成功 ${last}</small>
      </div>
    `;
  }).join("");
}

function renderDesktopOperations(ops, access) {
  if (!ops) return;
  const tone = ops.readiness >= 78 ? "good" : ops.readiness >= 58 ? "watch" : "danger";
  const storage = ops.storage || {};
  const backup = ops.backup || {};
  const assessment = ops.assessment || {};
  const elite = ops.eliteTraderReadiness || {};
  const backupSize = backup.sizeBytes ? `${(backup.sizeBytes / 1024 / 1024).toFixed(1)} MB` : "計算中";
  const databaseExpiry = storage.expiresAt ? new Date(storage.expiresAt).toLocaleDateString("ja-JP") : "";
  mobileAccessStatusEl.textContent = `${ops.status} / ${ops.readiness}点`;
  mobileAccessEl.innerHTML = `
    <div class="system-assessment ${assessment.realMoneyReady ? "ready" : "restricted"}">
      <div>
        <span>FX実運用 総合評価</span>
        <strong>${assessment.score ?? "--"}<small>/100</small></strong>
      </div>
      <div>
        <b>評価 ${assessment.grade || "--"} / ${assessment.status || "判定中"}</b>
        <small>厳格評価 ${assessment.evaluationSamples || 0}/${assessment.minimumPromotionSamples || 120}件</small>
        <small>${assessment.realMoneyReady ? "実資金検討条件を満たしています" : "実資金投入条件は未達です"}</small>
      </div>
      <div class="assessment-evidence">
        <small>公式デモ ${assessment.paperTrades || 0}/${assessment.minimumPaperTrades || 30}回</small>
        <small>公式勝率 ${assessment.paperWinRate == null ? "--" : `${(Number(assessment.paperWinRate) * 100).toFixed(1)}%`} / 収益率 ${assessment.paperReturnPct == null ? "--" : `${Number(assessment.paperReturnPct).toFixed(3)}%`} / PF ${assessment.paperProfitFactor == null ? "--" : Number(assessment.paperProfitFactor).toFixed(2)}</small>
        <small>照合済み方向予測 ${assessment.verifiedDirectionalHitRate == null ? "--" : `${(Number(assessment.verifiedDirectionalHitRate) * 100).toFixed(1)}%`} / ${assessment.verifiedDirectionalSamples || 0}件</small>
        <small>厳格実績認定 ${elite.score ?? 0}/100 / ${elite.status || "判定準備中"}</small>
        ${elite.blockers?.[0] ? `<span>${elite.blockers[0]}</span>` : ""}
        ${(assessment.blockers || []).slice(0, 3).map((item) => `<span>${item}</span>`).join("")}
      </div>
    </div>
    <div class="mobile-access-note desktop-ops-score ${tone}">
      <strong>運用レディネス ${ops.readiness}点</strong>
      <span>保存予測 ${ops.savedPredictions}件 / 急変理由 ${ops.savedShocks}件 / 反省ログ ${ops.savedReflections}件 / 保存先 ${storage.backend || "確認中"}</span>
      <small>${storage.durable ? `永続保存 有効 / DB実測 ${storage.recordCount || 0}件 / 整合性 ${storage.verificationMatch ? "確認済み" : "確認中"}` : "注意: 再起動で履歴を失う可能性があります"}${storage.lastPersistedAt ? ` / DB更新 ${formatTime(storage.lastPersistedAt)}` : ""}</small>
      ${databaseExpiry ? `<small class="${storage.expiryWarning ? "critical-text" : ""}">無料DB期限目安 ${databaseExpiry} / 残り ${storage.daysRemaining}日</small>` : ""}
    </div>
    <div class="desktop-ops-grid">
      ${(ops.checks || []).map((item) => `
        <div class="desktop-ops-check ${item.score >= 78 ? "good" : item.score >= 58 ? "watch" : "danger"}">
          <span>${item.label}</span>
          <strong>${item.score}</strong>
          <small>${item.detail}</small>
          <i style="width:${Math.max(5, Math.min(100, item.score))}%"></i>
        </div>
      `).join("")}
    </div>
    <div class="desktop-ops-actions">
      ${(ops.actions || []).map((item) => `<span>${item}</span>`).join("")}
      ${(assessment.blockers || []).map((item) => `<span class="critical-text">${item}</span>`).join("")}
      <div class="backup-control ${backup.ready ? "ready" : "preparing"}">
        <span>学習履歴バックアップ: ${backup.ready ? `準備完了 / ${backupSize}` : "バックグラウンドで準備中"}</span>
        ${backup.ready ? `<a href="${backup.downloadUrl}" download>バックアップを保存</a>` : `<small>準備完了後に保存ボタンが表示されます</small>`}
      </div>
      <small>最終学習 ${ops.lastLearningAt ? formatTime(ops.lastLearningAt) : "待機中"} / 次回 ${ops.nextLearningAt ? formatTime(ops.nextLearningAt) : "計算中"} / PC URL ${access?.localUrl || location.origin}</small>
    </div>
  `;
}

function renderAndroidAccess(access, highConfidenceNotification = latestSnapshot?.highConfidenceNotification || {}) {
  if (!androidAccessEl || !androidAccessStatusEl || !access) return;
  const remoteUrl = access.remoteUrl || "";
  const cloud = access.cloud || {};
  const cloudUrl = cloud.publicUrl || "";
  const lanUrl = (access.lanUrls || [])[0] || "";
  const currentUrl = new URL("./", location.href).href;
  const isHttps = location.protocol === "https:";
  const standalone = window.matchMedia?.("(display-mode: standalone)")?.matches || navigator.standalone;
  const sleepIndependent = Boolean(cloud.sleepIndependent);
  const nativePushReady = NATIVE_APP_MODE && ["local-monitor-ready", "instant-ready", "server-waiting-firebase"].includes(nativePushStatus?.state);
  const webPushReady = !STATIC_PREVIEW_MODE && notificationSupported() && notificationsEnabled && Notification.permission === "granted";
  const notifyReady = nativePushReady || webPushReady;
  const notificationPermission = NATIVE_APP_MODE
    ? nativePushStatus?.state === "permission-denied" ? "denied" : nativePushReady ? "granted" : "default"
    : "Notification" in window ? Notification.permission : "unsupported";
  const notificationHelp = notificationPermission === "denied"
    ? "通知が拒否済みです。Android Chromeの設定 → サイトの設定 → 通知 → world-prediction-system.onrender.com を許可してください。"
    : STATIC_PREVIEW_MODE && !NATIVE_APP_MODE
      ? "GitHub Pages確認版だけでは、画面を閉じた後の通知登録はできません。Androidアプリ最新版を使用してください。"
      : !notificationSupported()
      ? NATIVE_APP_MODE ? "Androidアプリの通知登録を確認しています。" : "ChromeでHTTPS公開URLを直接開いてください。LINE・ChatGPTなどのアプリ内ブラウザでは通知を登録できない場合があります。"
      : notificationStatusMessage || "ボタンを押すとAndroidの通知許可画面が表示されます。";
  const voiceReady = voiceSupported() && voiceEnabled;
  const installReady = Boolean(deferredInstallPrompt) || standalone;
  const publicReady = sleepIndependent || /^https:\/\//.test(remoteUrl) || isHttps;
  const highConfidenceReady = notifyReady && Number(highConfidenceNotification.subscriptions || 0) > 0;
  const pushDelivery = highConfidenceNotification.delivery || {};
  const nativeDelivery = highConfidenceNotification.native?.delivery || {};
  const registrationTest = highConfidenceNotification.registrationTest || {};
  const serverPushDetail = registrationTest.attemptedAt
    ? `${registrationTest.result || "テスト結果確認中"} / ${formatTime(registrationTest.attemptedAt)}`
    : pushDelivery.attemptedAt
      ? `${pushDelivery.result || "送信結果確認中"} / ${formatTime(pushDelivery.attemptedAt)}`
      : nativeDelivery.attemptedAt
        ? `${nativeDelivery.result || "即時通知確認中"} / ${formatTime(nativeDelivery.attemptedAt)}`
        : NATIVE_APP_MODE
          ? nativePushStatus?.state === "instant-ready" ? "Firebase即時通知の端末登録済み" : nativePushReady ? "端末の15分バックグラウンド監視を登録済み" : "端末通知を未登録"
          : "テスト通知はまだ送信されていません。通知を有効化すると1回だけ届きます。";
  androidAccessStatusEl.textContent = publicReady
    ? sleepIndependent ? "PCスリープ対応" : "ネット公開URLあり"
    : lanUrl ? "自宅Wi-Fi用URLあり" : "公開準備中";

  const mainUrl = sleepIndependent ? cloudUrl : remoteUrl || (isHttps ? currentUrl : lanUrl || currentUrl);
  const mainLabel = sleepIndependent
    ? "PCスリープ対応URL"
    : remoteUrl ? "外出先Android用URL"
      : isHttps ? "現在のHTTPS URL" : "同じWi-Fi用URL";
  const guide = sleepIndependent
    ? "AndroidのChromeでこのURLを開き、ホーム画面に追加してください。PCがスリープしてもクラウド側で動きます。"
    : remoteUrl
      ? "この一時URLはPCが起きている間だけ使えます。PCスリープ中も見るにはクラウド常時稼働へ移行してください。"
      : "外出先からPCスリープ中も見るにはRenderなどのクラウド常時稼働URLが必要です。";
  const pin = access.pinProtected ? "PIN保護あり" : "PIN未設定";

  androidAccessEl.innerHTML = `
    <div class="android-access-primary ${sleepIndependent ? "cloud" : publicReady ? "ready" : "local"}">
      <span>${mainLabel}</span>
      <strong>${mainUrl || "URL準備中"}</strong>
      <small>${pin} / ${standalone ? "PWA起動中" : "Chromeでホーム画面に追加できます"} / ${cloud.status || "クラウド未確認"}</small>
    </div>
    <div class="android-access-actions">
      <button type="button" data-copy-url="${mainUrl || ""}">URLコピー</button>
      <a href="docs/mobile-access.md" target="_blank" rel="noreferrer">手順を見る</a>
      <button id="pwa-install" type="button" ${deferredInstallPrompt ? "" : "disabled"}>ホーム画面に追加</button>
    </div>
    <div class="android-access-guide">
      <strong>${sleepIndependent ? "PCを閉じても見られます" : publicReady ? "一時的にスマホ利用できます" : "まだ外出先URLは未発行です"}</strong>
      <span>${guide}</span>
      <span>${cloud.note || ""}</span>
    </div>
    <div class="android-checklist">
      <div class="${publicReady ? "ok" : "warn"}"><strong>${publicReady ? "OK" : "要設定"}</strong><span>外出先URL</span><small>${publicReady ? "AndroidからURLで開けます" : "クラウド公開URLが必要です"}</small></div>
      <div class="${notifyReady ? "ok" : "warn"}"><strong>${notifyReady ? "ON" : "OFF"}</strong><span>取引通知</span><small>${NATIVE_APP_MODE || notificationSupported() ? "公式仮想取引の開始・終了だけを通知" : "HTTPS公開URLで有効化できます"}</small></div>
      <div class="${voiceReady ? "ok" : "warn"}"><strong>${voiceReady ? "ON" : "OFF"}</strong><span>AI音声</span><small>${voiceSupported() ? "初回はタップで音声許可" : "この端末は音声非対応です"}</small></div>
      <div class="${standalone ? "ok" : installReady ? "warn" : "warn"}"><strong>${standalone ? "済" : "未"}</strong><span>ホーム画面</span><small>${deferredInstallPrompt ? "追加ボタンが使えます" : "Chromeのメニューから追加できます"}</small></div>
      <div class="${notifyReady ? "ok" : "warn"}"><strong>${notifyReady ? "ON" : "OFF"}</strong><span>開始・終了</span><small>約定値、ロット、決済値、損益を通知</small></div>
    </div>
    <div class="android-quick-actions">
      <button type="button" data-enable-notify ${(NATIVE_APP_MODE || (notificationSupported() && !STATIC_PREVIEW_MODE)) && !notificationBusy ? "" : "disabled"}>${notificationBusy ? "登録中..." : notifyReady ? "通知を再登録" : "通知を有効化"}</button>
      <button type="button" data-test-notify ${notifyReady && !notificationBusy ? "" : "disabled"}>テスト通知を送る</button>
      <button type="button" data-enable-voice ${voiceSupported() ? "" : "disabled"}>AI音声を開始</button>
      <a href="https://pipihamesu-cell.github.io/world-prediction-system-preview/downloads/World-Prediction-System-Android-latest.apk">Android最新版</a>
      <a href="${mainUrl || "#"}" target="_blank" rel="noreferrer">スマホ用URLを開く</a>
    </div>
    <div class="notification-feedback ${notifyReady ? "ok" : notificationPermission === "denied" ? "error" : "info"}" role="status">
      <strong>${notifyReady ? "通知登録済み" : notificationPermission === "denied" ? "通知が拒否されています" : "通知設定"}</strong>
      <span>${notificationHelp}</span>
      <small>Web ${Number(highConfidenceNotification.subscriptions || 0)}台 / Android即時 ${Number(highConfidenceNotification.native?.devices || 0)}台 / ${serverPushDetail}</small>
    </div>
  `;

  androidAccessEl.querySelector("[data-copy-url]")?.addEventListener("click", async (event) => {
    const url = event.currentTarget.getAttribute("data-copy-url");
    if (!url) return;
    try {
      await navigator.clipboard.writeText(url);
      event.currentTarget.textContent = "コピー済み";
      setTimeout(() => { event.currentTarget.textContent = "URLコピー"; }, 1600);
    } catch {
      event.currentTarget.textContent = "コピー不可";
    }
  });

  androidAccessEl.querySelector("#pwa-install")?.addEventListener("click", async () => {
    if (!deferredInstallPrompt) return;
    deferredInstallPrompt.prompt();
    await deferredInstallPrompt.userChoice.catch(() => undefined);
    deferredInstallPrompt = null;
    renderAndroidAccess(access);
  });
  androidAccessEl.querySelector("[data-enable-notify]")?.addEventListener("click", async () => {
    notificationBusy = true;
    notificationStatusMessage = "通知サービスへ登録しています。";
    renderAndroidAccess(access, highConfidenceNotification);
    const ok = await requestNotificationAccess();
    notificationBusy = false;
    renderAndroidAccess(access);
    if (!ok) renderAndroidAccess(access);
  });
  androidAccessEl.querySelector("[data-test-notify]")?.addEventListener("click", async () => {
    notificationBusy = true;
    notificationStatusMessage = "テスト通知を送信しています。";
    renderAndroidAccess(access, highConfidenceNotification);
    try {
      if (NATIVE_APP_MODE) {
        await globalThis.WpsNative.showNotificationTest();
        notificationStatusMessage = "端末へテスト通知を送信しました。";
      } else {
        const response = await fetch("/api/push/test", { method: "POST" });
        const result = await response.json();
        notificationStatusMessage = result.ok
          ? `${result.sent}台へテスト通知を送信しました。`
          : `テスト通知は未達です。${result.result || "通知を再登録してください。"}`;
      }
    } catch (error) {
      notificationStatusMessage = `テスト通知に失敗しました: ${error.message || "通信エラー"}`;
    } finally {
      notificationBusy = false;
      renderAndroidAccess(access);
    }
  });
  androidAccessEl.querySelector("[data-enable-voice]")?.addEventListener("click", () => {
    voiceEnabled = true;
    localStorage.setItem("worldPredictionVoice", "on");
    unlockVoiceEngine();
    updateVoiceUi();
    renderAndroidAccess(access);
    if (latestVoiceBriefing) speakVoiceBriefing(latestVoiceBriefing, true);
  });
}

function renderEconomicCalendar(calendar) {
  if (!calendar) return;
  calendarStatusEl.textContent = `${calendar.status || "監視中"} / 圧力 ${Math.round(Number(calendar.releasePressure || 0) * 100)}% / サプライズ ${Math.round(Number(calendar.surprisePressure || 0) * 100)}%`;
  const rows = (calendar.rows || []).slice(0, 6);
  if (!rows.length) {
    economicCalendarEl.innerHTML = `<div class="calendar-empty">EUR/USDに影響しやすい重要指標を監視しています。</div>`;
    return;
  }
  economicCalendarEl.innerHTML = rows.map((item) => `
    <a class="calendar-item ${item.level || "watch"}" href="${item.url || "#"}" target="_blank" rel="noreferrer">
      <div>
        <strong>${item.phase || "監視"}</strong>
        <span>重要度 ${item.importance}%</span>
      </div>
      <p>${item.japaneseTitle || item.title}</p>
      ${item.surprise ? `
        <div class="calendar-surprise ${Number(item.surprise.bias || 0) > 0 ? "up" : Number(item.surprise.bias || 0) < 0 ? "down" : "flat"}">
          <strong>${item.surprise.impact || "方向判定中"}</strong>
          <span>${item.surprise.label || "数値待ち"} / 乖離 ${Math.round(Number(item.surprise.score || 0) * 100)}%</span>
          <small>${item.surprise.detail || ""}</small>
        </div>
      ` : ""}
      <small>${item.source || "経済指標"} / ${item.domain || ""}</small>
    </a>
  `).join("");
}

function renderCotAnalysis(cot) {
  if (!cotPanelEl || !cotStatusEl || !cotAnalysisEl) return;
  const tone = cot?.direction || "flat";
  cotPanelEl.className = `cot-wrap ${tone}`;
  cotStatusEl.textContent = cot ? `${cot.verdict || "週次監視"} / ${new Date(cot.reportDate).toLocaleDateString("ja-JP")}` : "取得待ち";

  if (!cot) {
    cotAnalysisEl.innerHTML = `
      <a class="cot-empty" href="https://www.cftc.gov/MarketReports/CommitmentsofTraders/index.htm" target="_blank" rel="noreferrer">
        CFTC COTのユーロ先物大口建玉を取得中です。取得できない場合は公式ページを確認します。
      </a>
    `;
    return;
  }

  const leveraged = cot.layers?.leveragedFunds || cot.groups?.leveragedFunds || {};
  const assetManager = cot.layers?.assetManager || cot.groups?.assetManager || {};
  const legacySpeculators = cot.layers?.legacySpeculators || {};
  const crowdingRisk = cot.crowdingRisk || {};
  const cotForward = cot.forwardValidation || {};
  const cotForwardLayers = Object.values(cotForward.layers || {});
  const longShare = Math.max(0, Math.min(100, Number(cot.longShare || 0) * 100));
  const shortShare = Math.max(0, Math.min(100, Number(cot.shortShare || 0) * 100));
  const isNetLong = Number(cot.netLong || 0) > 0;
  const cotHistory = (cot.history || []).slice(-20);
  const historyNets = cotHistory.map((item) => Number(item.net || 0));
  const historyMin = Math.min(0, ...historyNets);
  const historyMax = Math.max(0, ...historyNets);
  const historySpan = Math.max(1, historyMax - historyMin);
  const historyPoints = cotHistory.map((item, index) => {
    const x = cotHistory.length > 1 ? index / (cotHistory.length - 1) * 100 : 50;
    const y = 92 - ((Number(item.net || 0) - historyMin) / historySpan) * 80;
    return `${x.toFixed(2)},${y.toFixed(2)}`;
  }).join(" ");
  const zeroY = 92 - ((0 - historyMin) / historySpan) * 80;
  cotAnalysisEl.innerHTML = `
    <a class="cot-main ${tone}" href="${cot.url}" target="_blank" rel="noreferrer">
      <span>4時間・日足の短期投機筋方向</span>
      <strong>${cot.verdict}</strong>
      <small>${cot.detail}</small>
    </a>
    <div class="cot-position-balance ${isNetLong ? "up" : Number(cot.netShort || 0) > 0 ? "down" : "flat"}">
      <div class="cot-net-value long">
        <span>ネットロング</span>
        <strong>${Number(cot.netLong || 0).toLocaleString("ja-JP")}枚</strong>
        <small>総ロング ${Number(cot.speculativeLong || 0).toLocaleString("ja-JP")} / 前週比 ${Number(cot.speculativeLongChange || 0).toLocaleString("ja-JP")}</small>
      </div>
      <div class="cot-balance-meter" aria-label="投機筋ロング・ショート比率">
        <div><i style="width:${longShare}%"></i><b style="width:${shortShare}%"></b></div>
        <small><span>LONG ${longShare.toFixed(1)}%</span><span>SHORT ${shortShare.toFixed(1)}%</span></small>
      </div>
      <div class="cot-net-value short">
        <span>ネットショート</span>
        <strong>${Number(cot.netShort || 0).toLocaleString("ja-JP")}枚</strong>
        <small>総ショート ${Number(cot.speculativeShort || 0).toLocaleString("ja-JP")} / 前週比 ${Number(cot.speculativeShortChange || 0).toLocaleString("ja-JP")}</small>
      </div>
    </div>
    ${cotHistory.length ? `
      <div class="cot-history-panel">
        <div class="cot-history-head">
          <div><span>ネットポジション推移</span><strong>直近${cotHistory.length}週</strong></div>
          <div><span>4週変化</span><strong class="${Number(cot.fourWeekChange || 0) >= 0 ? "up" : "down"}">${Number(cot.fourWeekChange || 0) >= 0 ? "+" : ""}${Number(cot.fourWeekChange || 0).toLocaleString("ja-JP")}枚</strong></div>
          <div><span>過密反転リスク</span><strong class="${crowdingRisk.active ? "alert" : ""}">${crowdingRisk.label || (cot.extreme ? "極端値" : "通常圏")}</strong><small>過去分布 ${Math.round(Number(crowdingRisk.percentile ?? 0.5) * 100)}%位置</small></div>
          <div><span>時系列検証</span><strong class="${cot.calibration?.active ? "up" : ""}">${cot.calibration?.testSamples ? `${Math.round(Number(cot.calibration.hitRate || 0) * 100)}%` : "準備中"}</strong><small>${cot.calibration?.status || "検証待ち"} / ${cot.calibration?.testSamples || 0}件 / 95%下限 ${cot.calibration?.confidenceLower !== undefined ? `${Math.round(Number(cot.calibration.confidenceLower) * 100)}%` : "--"}</small></div>
        </div>
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" role="img" aria-label="CFTCネットポジション20週推移">
          <line x1="0" y1="${zeroY.toFixed(2)}" x2="100" y2="${zeroY.toFixed(2)}"></line>
          <polyline points="${historyPoints}"></polyline>
        </svg>
        <small>${new Date(cotHistory[0].date).toLocaleDateString("ja-JP")} → ${new Date(cotHistory.at(-1).date).toLocaleDateString("ja-JP")} / 短期投機筋の週次推移 / 公表後のみ検証利用 / ${cot.calibration?.method || "検証を準備中"}</small>
      </div>
    ` : ""}
    <div class="cot-grid">
      <div><span>短期投機筋</span><strong>${Number(leveraged.net ?? cot.speculativeNet ?? 0).toLocaleString("ja-JP")}枚</strong><small>4時間・日足 / 前週変化 ${Number(leveraged.netChange ?? cot.speculativeChange ?? 0).toLocaleString("ja-JP")}</small></div>
      <div><span>従来区分の投機筋</span><strong>${Number(legacySpeculators.net || 0).toLocaleString("ja-JP")}枚</strong><small>方向確認 / 前週変化 ${Number(legacySpeculators.netChange || 0).toLocaleString("ja-JP")}</small></div>
      <div><span>長期運用会社</span><strong>${Number(assetManager.net || 0).toLocaleString("ja-JP")}枚</strong><small>週足・月足 / 前週変化 ${Number(assetManager.netChange || 0).toLocaleString("ja-JP")}</small></div>
      <div><span>短期投機筋の建玉比率</span><strong>${Math.round(Number(leveraged.netPct ?? cot.netPct ?? 0) * 1000) / 10}%</strong><small>${crowdingRisk.label || `混み具合 ${Math.round(Number(cot.crowding || 0) * 100)}%`}</small></div>
      <div><span>4時間方向圧力</span><strong class="${Number(cot.horizonSignals?.h4?.pressure || 0) >= 0 ? "up" : "down"}">${Number(cot.horizonSignals?.h4?.pressure || 0) >= 0 ? "+" : ""}${Number(cot.horizonSignals?.h4?.pressure || 0).toFixed(2)}</strong><small>${cot.horizonSignals?.h4?.role || "レバレッジファンド主導"}</small></div>
      <div><span>月足方向圧力</span><strong class="${Number(cot.horizonSignals?.mo1?.pressure || 0) >= 0 ? "up" : "down"}">${Number(cot.horizonSignals?.mo1?.pressure || 0) >= 0 ? "+" : ""}${Number(cot.horizonSignals?.mo1?.pressure || 0).toFixed(2)}</strong><small>${cot.horizonSignals?.mo1?.role || "資産運用会社主導"}</small></div>
    </div>
    <div class="cot-forward-ledger" id="cot-forward-ledger">
      <div class="cot-forward-head">
        <div><span>COT層別 前向き成績台帳</span><strong>${cotForward.settledReports || 0}公表を照合済み</strong></div>
        <small>${cotForward.policy || "次回公表から前向き検証を開始"}</small>
      </div>
      <div class="cot-forward-grid">
        ${cotForwardLayers.length ? cotForwardLayers.map((layer) => `
          <article>
            <h4>${layer.label}</h4>
            ${["h4", "d1", "w1", "mo1"].map((key) => {
              const row = layer.horizons?.[key] || {};
              const required = cotForward.minimumSamplesByHorizon?.[key] || cotForward.minimumSamples || 30;
              const rate = row.hitRate === null || row.hitRate === undefined ? "--" : `${Math.round(Number(row.hitRate) * 100)}%`;
              const net = row.averageNetPct === null || row.averageNetPct === undefined ? "--" : `${Number(row.averageNetPct) >= 0 ? "+" : ""}${Number(row.averageNetPct).toFixed(3)}%`;
              return `<div class="cot-forward-row ${row.profitable ? "up" : row.harmful ? "down" : "pending"}">
                <span>${row.label || key}</span>
                <strong>${rate}</strong>
                <b>${net}</b>
                <small>${row.samples || 0}/${required}件・${row.status || "検証待ち"}</small>
              </div>`;
            }).join("")}
          </article>
        `).join("") : `<p>次回CFTC公表直後から、同一レポートの重複を除いて4時間・24時間・1週間・4週間後を記録します。</p>`}
      </div>
    </div>
  `;
}

function renderMarketCommandCenter(center) {
  if (!commandCenterPanelEl || !commandCenterStatusEl || !commandCenterEl) return;
  const level = center?.alertLevel || "calm";
  commandCenterPanelEl.className = `command-center-wrap ${level}`;
  commandCenterStatusEl.textContent = center?.headline || "レジーム分析中";

  if (!center) {
    commandCenterEl.innerHTML = `<div class="command-center-empty">金融センターと市場レジームを分析中です。</div>`;
    return;
  }

  const centers = (center.centers || []).slice(0, 6);
  const links = (center.links || []).slice(0, 5);
  commandCenterEl.innerHTML = `
    <div class="command-center-main">
      <div class="command-regime ${center.regime?.tone || "neutral"}">
        <span>市場レジーム</span>
        <strong>${center.regime?.label || "中立・様子見"}</strong>
        <small>${center.regime?.detail || ""}</small>
        <p>${center.regime?.watch || "クロスアセット連動を監視しています。"}</p>
      </div>
      <div class="command-flow">
        <span>波及経路</span>
        ${links.map((link) => `
          <div>
            <strong>${link.label}</strong>
            <i><b style="width:${Math.max(4, Math.round(Number(link.strength || 0)))}%"></b></i>
            <small>${link.fromCenter?.name || ""} → ${link.toCenter?.name || ""} / 強度 ${Math.round(Number(link.strength || 0))}%</small>
          </div>
        `).join("")}
      </div>
    </div>
    <div class="financial-centers">
      ${centers.map((item) => `
        <div class="financial-center ${item.status === "警戒" ? "critical" : item.status === "注目" ? "warning" : "calm"}">
          <span>${item.name}</span>
          <strong>${item.status} ${item.pressure}%</strong>
          <small>${item.role}</small>
          <em>${(item.reasons || []).join(" / ")}</em>
        </div>
      `).join("")}
    </div>
  `;
}

function renderFxNews(items) {
  const news = (items || []).slice(0, 8);
  if (!news.length) {
    fxNewsEl.innerHTML = `<div class="fx-news-empty">為替ニュースを取得中です。</div>`;
    return;
  }
  fxNewsEl.innerHTML = news.map((item) => `
    <a class="fx-news-item" href="${item.url || "#"}" target="_blank" rel="noreferrer">
      <div>
        <strong>${item.source || "為替ニュース"}</strong>
        <span>${item.domain || ""}</span>
      </div>
      <p>${item.japaneseTitle || item.title}</p>
      <small>${new Date(item.publishedAt).toLocaleString("ja-JP")}</small>
    </a>
  `).join("");
}

function renderImportantInfo(items) {
  const rows = (items || []).slice(0, 8);
  const hasCritical = rows.some((item) => item.level === "critical");
  const hasWarning = rows.some((item) => item.level === "warning");
  importantInfoPanelEl.className = `important-info-wrap ${hasCritical ? "critical" : hasWarning ? "warning" : "calm"}`;
  importantInfoStatusEl.textContent = hasCritical ? "重要警報" : hasWarning ? "注意" : "監視中";

  if (!rows.length) {
    importantInfoEl.innerHTML = `<div class="important-info-empty">EUR/USDに関係する重要ニュースと経済指標を監視しています。</div>`;
    return;
  }

  const keys = new Set(rows
    .filter((item) => item.level === "critical" || item.level === "warning")
    .map((item) => `${item.source}:${item.title}:${item.importance}`));
  const newImportant = [...keys].some((key) => !lastImportantKeys.has(key));
  lastImportantKeys = keys;
  if (newImportant) playAlertTone(hasCritical ? "critical" : "warning");

  importantInfoEl.innerHTML = rows.map((item) => `
    <a class="important-info-item ${item.level}" href="${item.url || "#"}" target="_blank" rel="noreferrer">
      <div>
        <strong>${item.source || "重要情報"}</strong>
        <span>重要度 ${item.importance}%</span>
      </div>
      <p>${item.japaneseTitle || item.title}</p>
      ${item.surprise && Number(item.surprise.score || 0) >= 0.28 ? `<small class="important-surprise">${item.surprise.impact} / ${item.surprise.detail}</small>` : ""}
      <small>${item.reason} / ${item.domain || ""}</small>
    </a>
  `).join("");
}

function renderEurusdCommand(command, market, sim = null) {
  if (!command || !market) {
    eurusdCommandEl.innerHTML = `<div class="eurusd-command-empty">EUR/USD司令塔を準備中です。</div>`;
    return;
  }
  eurusdCommandPanelEl.className = `eurusd-command-wrap ${command.stanceTone || "flat"}`;
  eurusdCommandStatusEl.textContent = command.stance || "分析中";
  const range = command.range || {};
  const confidence = command.confidence || {};
  const reflection = command.latestReflection;
  const topNews = command.topNews;
  const simulation = sim || {};
  const scenarios = simulation.scenarios || [];
  const calibration = simulation.calibration || {};
  const gate = simulation.qualityGate || {};
  const votes = simulation.modelVotes || {};
  const performanceGuard = simulation.timeframePerformanceGuard || {};
  const calibratedProbability = Math.round(Number(simulation.probabilities?.calibratedMain || 0) * 100);
  const formatSimulationPrice = (value) => Number(value || 0).toLocaleString("ja-JP", { minimumFractionDigits: 5, maximumFractionDigits: 5 });
  eurusdCommandEl.innerHTML = `
    <div class="command-main">
      <div class="command-stance">
        <span>${command.headline || "EUR/USD司令塔"}</span>
        <strong>${command.stance || "様子見"}</strong>
        <p>${command.action || "短期とニュースを監視しています。"}</p>
      </div>
      <div class="command-range">
        <span>10分後 予測レンジ</span>
        <strong>${formatValue(market, range.low)} - ${formatValue(market, range.high)}</strong>
        <small>中心 ${formatValue(market, range.center)} / ${range.label || "標準レンジ"} 幅 ${Number(range.widthPct || 0).toFixed(4)}%</small>
      </div>
    </div>
    <div class="command-drivers">
      ${(command.drivers || []).map((item) => `<span>${item}</span>`).join("")}
    </div>
    ${sim ? `<div class="command-probability">
      <div class="command-probability-head">
        <div><span>予測確率・品質判定</span><strong>${simulation.status || "計算中"} ${calibratedProbability}%</strong></div>
        <div class="${gate.currentAccepted ? "accepted" : "rejected"}"><span>現在判断</span><strong>${gate.currentAccepted ? "検証候補" : "見送り"}</strong><small>${gate.reason || gate.status || "判定中"}</small></div>
      </div>
      <div class="command-scenarios">
        ${scenarios.map((item) => `<div><span>${item.label}</span><i><b style="width:${Math.max(2, Math.round(Number(item.probability || 0) * 100))}%"></b></i><strong>${Math.round(Number(item.probability || 0) * 100)}%</strong></div>`).join("")}
      </div>
      <div class="command-probability-grid">
        <div><span>分布レンジ 10-90%</span><strong>${formatSimulationPrice(simulation.rangePrice?.low)} - ${formatSimulationPrice(simulation.rangePrice?.high)}</strong><small>中央値 ${formatSimulationPrice(simulation.rangePrice?.mid)}</small></div>
        <div><span>開始からの方向一致</span><strong>${calibration.actualHitRate == null ? "--" : `${Math.round(Number(calibration.actualHitRate) * 100)}%`}</strong><small>${calibration.samples || 0}件 / Brier ${calibration.brierScore ?? "--"}</small></div>
        <div><span>6モデル合議</span><strong>${votes.label || "集計中"}</strong><small>一致 ${votes.agreement || 0}/${votes.models?.length || 6}</small></div>
        <div><span>低成績時間足</span><strong>${performanceGuard.status || "成績蓄積中"}</strong><small>${performanceGuard.active ? performanceGuard.weakTimeframes.map((row) => `${row.label} ${Math.round(Number(row.hitRate || 0) * 100)}%→重み${Math.round(Number(row.weight || 0) * 100)}%`).join(" / ") : performanceGuard.method || "前向き成績を監視"}</small></div>
      </div>
    </div>` : ""}
    <div class="confidence-breakdown">
      <div class="confidence-breakdown-head">
        <span>信頼度分解</span>
        <strong>${confidence.score || 0}% / ${confidence.label || "中立"}</strong>
      </div>
      ${(confidence.rows || []).map((item) => `
        <div class="confidence-row">
          <span>${item.label}</span>
          <i><b style="width:${Math.max(0, Math.min(100, item.score || 0))}%"></b></i>
          <strong>${item.score || 0}%</strong>
          <small>${item.detail || ""}</small>
        </div>
      `).join("")}
    </div>
    <div class="command-lower">
      <a class="command-news" href="${topNews?.url || "#"}" target="_blank" rel="noreferrer">
        <span>重要材料</span>
        <strong>${topNews?.title || "重要ニュース・経済指標を監視中"}</strong>
        <small>${topNews ? `${topNews.source || "ニュース"} / 重要度 ${topNews.importance}%` : "更新待ち"}</small>
      </a>
      <div class="command-reflection">
        <span>外れた理由の自動反省</span>
        <strong>${reflection?.summary || "大きな外れを検出したら、ここに理由を保存します。"}</strong>
        <small>${reflection?.adjustmentHint || "10分後照合で方向外れ・大きな誤差を検出すると自動生成します。"}</small>
      </div>
    </div>
  `;
}

function safeText(value) {
  return String(value ?? "").replace(/[&<>"']/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[character]);
}

function renderFxAnalysisPartner(partner) {
  if (!fxAnalysisPartnerEl || !fxAnalysisPartnerPanelEl || !fxAnalysisPartnerStatusEl) return;
  const pairs = partner?.pairs || [];
  if (!pairs.length) {
    fxAnalysisPartnerEl.innerHTML = '<p class="fx-analysis-empty">確定足とファンダメンタルズを統合しています。</p>';
    return;
  }
  const actionable = pairs.filter((row) => row.conclusion?.action !== "WAIT");
  fxAnalysisPartnerPanelEl.className = `fx-analysis-partner-wrap ${actionable.length ? "ready" : "waiting"}`;
  fxAnalysisPartnerStatusEl.textContent = actionable.length ? `${actionable.length}通貨ペア 条件付き候補` : "現在はノートレード";
  fxAnalysisPartnerEl.innerHTML = `
    <div class="fx-analysis-method">判断順序: ${safeText(partner.method)}</div>
    <div class="fx-analysis-pairs">
      ${pairs.map((pair) => {
        const conclusion = pair.conclusion || {};
        const scenario = pair.primaryScenario || {};
        const candidate = scenario.candidate || scenario;
        const validation = partner.forwardValidation?.pairs?.[pair.pairId] || {};
        const minimumSamples = partner.forwardValidation?.minimumSamples || 40;
        const tone = conclusion.action === "LONG" ? "up" : conclusion.action === "SHORT" ? "down" : "flat";
        const prices = pair.importantPrices || {};
        return `
          <article class="fx-analysis-card ${tone}">
            <header><div><span>${safeText(pair.pairLabel)}</span><strong>${safeText(conclusion.action || "WAIT")}</strong></div><b>${safeText(pair.probability?.confidence)} ${Number(pair.probability?.percent || 0)}%</b></header>
            <p class="fx-analysis-conclusion">${safeText(conclusion.text)}</p>
            <div class="fx-analysis-timeframes">${(pair.multiTimeframe || []).map((row) => `<span class="${row.direction || "flat"}"><b>${safeText(row.label)}</b>${safeText(row.directionLabel)}<small>${safeText(row.state)}</small></span>`).join("")}</div>
            <div class="fx-analysis-levels">
              <span>支持<strong>${prices.support ?? "-"}</strong></span>
              <span>分岐P<strong>${prices.decisionPoint ?? "-"}</strong></span>
              <span>抵抗<strong>${prices.resistance ?? "-"}</strong></span>
            </div>
            <div class="fx-analysis-order">
              <span>${conclusion.action === "WAIT" ? "監視条件（未発注）" : "条件付き候補"} <strong>${safeText(candidate.side || "WAIT")}</strong></span>
              <span>ENTRY <strong>${candidate.entry ?? "-"}</strong></span>
              <span>SL <strong>${candidate.stop ?? "-"}</strong></span>
              <span>TP <strong>${candidate.target ?? "-"}</strong></span>
              <span>RR <strong>${candidate.riskReward ?? "-"}</strong></span>
              <span>注文 <strong>${safeText(candidate.orderType || "見送り")}</strong></span>
            </div>
            <div class="fx-analysis-validation">
              <b>前向き検証</b>
              <span>15分 有効${validation.m15?.samples || 0}/${minimumSamples}・未照合${validation.m15?.pendingSamples || 0}・無効${validation.m15?.invalidSamples || 0}・勝率${validation.m15?.winRate == null ? "--" : `${(Number(validation.m15.winRate) * 100).toFixed(1)}%`}</span>
              <span>1時間 有効${validation.h1?.samples || 0}/${minimumSamples}・未照合${validation.h1?.pendingSamples || 0}・無効${validation.h1?.invalidSamples || 0}・勝率${validation.h1?.winRate == null ? "--" : `${(Number(validation.h1.winRate) * 100).toFixed(1)}%`}</span>
              <span>4時間 有効${validation.h4?.samples || 0}/${minimumSamples}・未照合${validation.h4?.pendingSamples || 0}・無効${validation.h4?.invalidSamples || 0}・勝率${validation.h4?.winRate == null ? "--" : `${(Number(validation.h4.winRate) * 100).toFixed(1)}%`}</span>
              <small>15分ごとに全判断を固定保存。各期限は重複しない標本だけを採点し、WAIT・無効・未照合も隠しません。</small>
            </div>
            <div class="fx-analysis-fundamentals">
              <div><b>買い材料</b><span>${safeText((pair.fundamentals?.buyFactors || []).join(" / ") || "明確な材料なし")}</span></div>
              <div><b>売り材料</b><span>${safeText((pair.fundamentals?.sellFactors || []).join(" / ") || "明確な材料なし")}</span></div>
            </div>
            <details>
              <summary>根拠・破綻条件・別シナリオ</summary>
              <p><b>ENTRY:</b> ${safeText(candidate.entryReason || "条件不足")}</p>
              <p><b>SL:</b> ${safeText(candidate.stopReason || "構造確定待ち")}</p>
              <p><b>TP:</b> ${safeText(candidate.targetReason || "構造確定待ち")}</p>
              <p><b>取消:</b> ${safeText((candidate.cancellationConditions || []).join(" / ") || "未設定")}</p>
              <p><b>別案:</b> ${safeText(pair.alternateScenario?.condition || "反対構造成立時に再計算")}</p>
              <div class="fx-analysis-evidence"><b>事実</b>${(pair.facts || []).map((item) => `<span>${safeText(item)}</span>`).join("")}</div>
              <div class="fx-analysis-evidence inference"><b>推測</b>${(pair.inferences || []).map((item) => `<span>${safeText(item)}</span>`).join("")}</div>
            </details>
            <small class="fx-analysis-note">${safeText(pair.probability?.type)}。${safeText(pair.probability?.note)} ${safeText(pair.disclaimer)}</small>
          </article>`;
      }).join("")}
    </div>`;
}

function formatHorizon(minutes) {
  const value = Number(minutes || 0);
  if (value >= 43200) return "1か月後";
  if (value >= 10080) return "1週間後";
  if (value >= 1440) return "1日後";
  if (value >= 60) return `${Math.round(value / 60)}時間後`;
  return `${value}分後`;
}

function renderEurusdTimeframes(items, learning, dailyReference) {
  const rows = (items || []).slice(0, 7);
  const learningRows = Object.fromEntries((learning?.rows || []).map((row) => [row.key, row]));
  if (dailyForecastReferenceEl) {
    const direction = dailyReference?.direction === "up" ? "上方向" : dailyReference?.direction === "down" ? "下方向" : "横ばい";
    const mark = dailyReference?.direction === "up" ? "↑" : dailyReference?.direction === "down" ? "↓" : "→";
    dailyForecastReferenceEl.innerHTML = dailyReference ? `
      <div class="daily-reference-main ${dailyReference.direction || "flat"}">
        <span>指定IDの日次予測</span>
        <strong>${mark} ${direction} ${Number(dailyReference.predicted || 0).toFixed(5)}</strong>
        <small>${Number(dailyReference.deltaPct || 0) >= 0 ? "+" : ""}${Number(dailyReference.deltaPct || 0).toFixed(4)}% / 信頼 ${Math.round(Number(dailyReference.probability || 0) * 100)}%</small>
      </div>
      <div class="daily-reference-meta">
        <span>分析日時</span><strong>${formatDateTime(dailyReference.analyzedAt)}</strong>
        <span>分析元ID</span><code>${dailyReference.sourceThreadId}</code>
      </div>
    ` : `<span class="daily-reference-empty">指定IDの日次予測を保存中です。</span>`;
  }
  if (eurusdTimeframeLearningStatusEl) {
    eurusdTimeframeLearningStatusEl.textContent = learning?.completed
      ? `時間足学習 ${learning.completed}件 / 総合一致 ${pctText(learning.overallHitRate)}`
      : "スイング重視: 日足・週足・4時間足";
  }
  if (eurusdTimeframeLearningEl) {
    const recent = (learning?.recent || []).slice(0, 3);
    eurusdTimeframeLearningEl.innerHTML = recent.length
      ? recent.map((item) => `
        <div class="timeframe-learning-item ${item.directionHit ? "hit" : "miss"}">
          <strong>${item.timeframeLabel}</strong>
          <span>${item.directionHit ? "方向一致" : "再学習"} / 誤差 ${maeText(Math.abs(Number(item.errorPct || 0)) * 100)}</span>
          <small>${item.missReason || `${formatTime(item.checkedAt)} に照合済み`}</small>
        </div>
      `).join("")
      : `<div class="timeframe-learning-empty">表示した時間足予測を保存中です。期限到達後に、ここへ照合結果が出ます。</div>`;
  }
  if (!rows.length) {
    eurusdTimeframesEl.innerHTML = `<div class="timeframe-empty">EUR/USDの時間足予測を生成中です。</div>`;
    return;
  }
  eurusdTimeframesEl.innerHTML = rows.map((item) => {
    const directionLabel = item.direction === "up" ? "上方向" : item.direction === "down" ? "下方向" : "横ばい";
    const directionMark = item.direction === "up" ? "↑" : item.direction === "down" ? "↓" : "→";
    const stat = learningRows[item.key] || item.learning || {};
    const hitRate = stat.hitRate === null || stat.hitRate === undefined ? "--" : pctText(stat.hitRate);
    const mae = stat.maePct === null || stat.maePct === undefined ? "--" : maeText(stat.maePct);
    const correction = Number(stat.biasPct || 0);
    return `
      <article class="timeframe-card ${item.direction}">
        <div class="timeframe-top">
          <strong>${item.label}</strong>
          <span>${directionMark} ${directionLabel} / ${formatHorizon(item.minutes)}</span>
        </div>
        <div class="timeframe-role">
          <span>${item.swingRole || "時間足分析"}</span>
          <strong>重要度 ${item.importanceLabel || "通常"} / ${item.importance || 0}</strong>
        </div>
        <div class="timeframe-model-family">
          <span>専用モデル</span>
          <strong>${item.modelFamily || "時間足モデル"}</strong>
        </div>
        <div class="timeframe-price">
          <span>予測値</span>
          <strong>${Number(item.predicted).toLocaleString("ja-JP", { minimumFractionDigits: 5, maximumFractionDigits: 5 })}</strong>
        </div>
        <div class="timeframe-delta ${item.direction}">
          ${item.deltaPct >= 0 ? "+" : ""}${Number(item.deltaPct).toFixed(4)}% / 校正確率 ${(Number(item.calibratedProbability ?? item.confidence ?? 0) * 100).toFixed(0)}%
        </div>
        <div class="timeframe-range">
          <span>想定レンジ</span>
          <strong>±${Number(item.expectedRangePct || 0).toFixed(4)}%</strong>
        </div>
        <div class="timeframe-stat">
          <span>学習 ${stat.samples || 0}件</span>
          <strong>方向一致 ${hitRate}</strong>
          <small>平均誤差 ${mae} / 補正 ${correction >= 0 ? "+" : ""}${correction.toFixed(4)}%</small>
          <small>将来検証 ${stat.walkForward?.validationSamples || 0}件 / ${stat.walkForward?.ready ? `一致 ${pctText(stat.walkForward.hitRate)}` : "蓄積中"}</small>
        </div>
        <div class="timeframe-trend">
          <span>${item.trend?.label || "方向分析中"}</span>
          <strong>${Number(item.trend?.changePct || 0) >= 0 ? "+" : ""}${Number(item.trend?.changePct || 0).toFixed(3)}%</strong>
        </div>
        <div class="timeframe-technical">
          <span>${item.technical?.summary || "テクニカル判定中"}</span>
          <strong>${(item.technical?.patterns || []).filter((pattern) => pattern.strength > 0).map((pattern) => pattern.name).slice(0, 3).join(" / ") || "形状確認中"}</strong>
        </div>
        <div class="timeframe-reversal ${item.reversalConfluence?.aligned ? "aligned" : ""}">
          <span>反転コンフルエンス</span>
          <strong>${item.reversalConfluence?.label || "判定中"}</strong>
        </div>
        <div class="timeframe-smartmoney">
          <span>大口/だまし</span>
          <strong>${item.smartMoney?.verdict || "通常監視"}</strong>
        </div>
        <div class="timeframe-drivers">
          ${(item.drivers || []).map((driver) => `<span class="${driver.direction}">${driver.label}</span>`).join("")}
        </div>
        <small>${item.provider || ""} / ${item.candleCount || 0}本</small>
        ${stat.lastMissReason ? `<em>${stat.lastMissReason}</em>` : ""}
      </article>
    `;
  }).join("");
}

function renderForecastNewsflash(items, eurusdMarket) {
  if (!forecastNewsflashTrackEl) return;
  const order = { m5: 0, m15: 1, h1: 2, h4: 3, d1: 4, w1: 5, mo1: 6 };
  const rows = [...(items || [])]
    .sort((a, b) => (order[a.key] ?? 99) - (order[b.key] ?? 99));
  if (!rows.length) {
    forecastNewsflashTrackEl.innerHTML = `<div class="forecast-newsflash-group"><span>時間足予測を同期中です</span></div>`;
    return;
  }
  const current = Number(eurusdMarket?.quote?.value || eurusdMarket?.forecast?.current || 0);
  const currentText = Number.isFinite(current) && current > 0 ? current.toFixed(5) : "--";
  const content = [
    `<span class="newsflash-current">現在値 <strong>${currentText}</strong></span>`,
    ...rows.map((item) => {
      const directionMark = item.direction === "up" ? "↑" : item.direction === "down" ? "↓" : "→";
      const probability = Math.round(Number(item.calibratedProbability ?? item.confidence ?? 0) * 100);
      const predicted = Number(item.predicted);
      return `<span class="newsflash-item ${item.direction || "flat"}"><b>${item.label}</b> ${directionMark} <strong>${Number.isFinite(predicted) ? predicted.toFixed(5) : "--"}</strong> <em>${Number(item.deltaPct || 0) >= 0 ? "+" : ""}${Number(item.deltaPct || 0).toFixed(4)}%</em> <small>${probability}%</small></span>`;
    })
  ].join("");
  forecastNewsflashTrackEl.innerHTML = `
    <div class="forecast-newsflash-group">${content}</div>
    <div class="forecast-newsflash-group" aria-hidden="true">${content}</div>
  `;
}

function renderPairDecisionDeck(snapshot) {
  if (!pairDecisionDeckEl || !pairDecisionCardsEl) return;
  const markets = snapshot?.markets || [];
  const eurusdMarket = markets.find((market) => market.id === "eurusd");
  const usdjpyMarket = markets.find((market) => market.id === "usdjpy");
  const eurusdCommand = snapshot?.eurusdCommand || {};
  const yenCommand = snapshot?.yenCrossCommand || {};
  const usdjpy = yenCommand.activePair || {};
  const eurusdFrames = snapshot?.eurusdTimeframes || [];
  const usdjpyFrames = yenCommand.timeframes || [];
  const eurusdSimulation = snapshot?.probabilitySimulation || {};
  const findFrame = (items, key) => items.find((item) => item.key === key);
  const direction = (value) => value === "up" ? "buy" : value === "down" ? "sell" : "waiting";
  const action = (value) => value === "up" ? "買い" : value === "down" ? "売り" : "見送り";
  const arrow = (value) => value === "up" ? "↑" : value === "down" ? "↓" : "→";
  const horizon = (item) => item ? `${arrow(item.direction)} ${action(item.direction)} ${Math.round(Number(item.calibratedProbability ?? item.confidence ?? 0.5) * 100)}%` : "確認中";
  const price = (value, digits) => Number.isFinite(Number(value)) && Number(value) > 0 ? Number(value).toFixed(digits) : "--";
  const eurusdDirection = eurusdSimulation.direction || eurusdCommand.stanceTone || eurusdMarket?.forecast?.direction || "flat";
  const usdjpyDirection = usdjpy.direction || "flat";
  const eurusdConfidence = Number(eurusdSimulation.probabilities?.calibratedMain ?? eurusdMarket?.forecast?.confidence ?? 0.5) * 100;
  const usdjpyConfidence = Number(usdjpy.confidence || usdjpyMarket?.forecast?.confidence || 0) * 100;
  const cards = [
    {
      id: "eurusd",
      label: "EUR/USD",
      direction: eurusdDirection,
      current: eurusdMarket?.quote?.value ?? eurusdMarket?.forecast?.current,
      predicted: eurusdMarket?.forecast?.predicted,
      deltaPct: eurusdMarket?.forecast?.deltaPct,
      confidence: eurusdDirection === "flat" ? null : eurusdConfidence,
      fresh: eurusdMarket?.quote?.freshnessSeconds,
      h4: findFrame(eurusdFrames, "h4"),
      d1: findFrame(eurusdFrames, "d1"),
      digits: 5
    },
    {
      id: "usdjpy",
      label: "USD/JPY",
      direction: usdjpyDirection,
      current: usdjpy.current ?? usdjpyMarket?.quote?.value,
      predicted: usdjpy.predicted ?? usdjpyMarket?.forecast?.predicted,
      deltaPct: usdjpy.deltaPct ?? usdjpyMarket?.forecast?.deltaPct,
      confidence: usdjpyDirection === "flat" ? null : usdjpyConfidence,
      fresh: usdjpy.freshnessSeconds ?? usdjpyMarket?.quote?.freshnessSeconds,
      h4: findFrame(usdjpyFrames, "h4"),
      d1: findFrame(usdjpyFrames, "d1"),
      digits: 3
    }
  ];
  pairDecisionDeckEl.className = "pair-decision-deck live";
  pairDecisionCardsEl.innerHTML = cards.map((card) => {
    const tone = direction(card.direction);
    const delta = Number(card.deltaPct || 0);
    return `<a class="pair-decision-card ${tone}" href="#${card.id}-pivot-panel" aria-label="${card.label} ${action(card.direction)}">
      <div class="pair-decision-symbol"><span>${card.label}</span><small>現在予測</small></div>
      <div class="pair-decision-action"><b>${arrow(card.direction)}</b><strong>${action(card.direction)}</strong><em>${card.direction === "flat" ? "方向確率 --" : `短期方向 ${Math.round(card.confidence)}%`}</em></div>
      <div class="pair-decision-price"><span>現在値</span><strong>${price(card.current, card.digits)}</strong><small>10分 ${price(card.predicted, card.digits)} / ${delta >= 0 ? "+" : ""}${delta.toFixed(4)}%</small></div>
      <div class="pair-decision-horizons"><span>4時間 <b>${horizon(card.h4)}</b></span><span>日足 <b>${horizon(card.d1)}</b></span></div>
      <div class="pair-decision-freshness"><i></i>${Number.isFinite(Number(card.fresh)) ? `価格 ${Math.round(Number(card.fresh))}秒前` : "価格時刻を確認中"}</div>
    </a>`;
  }).join("");
  if (pairDecisionUpdatedEl) {
    pairDecisionUpdatedEl.textContent = `分析 ${new Date(snapshot?.generatedAt || Date.now()).toLocaleTimeString("ja-JP", { hour: "2-digit", minute: "2-digit", second: "2-digit" })}`;
  }
}

function timeframeDirectionText(item) {
  if (!item) return "未確認";
  const mark = item.direction === "up" ? "↑" : item.direction === "down" ? "↓" : "→";
  const label = item.direction === "up" ? "上方向" : item.direction === "down" ? "下方向" : "横ばい";
  return `${mark} ${label} ${Number(item.deltaPct || 0) >= 0 ? "+" : ""}${Number(item.deltaPct || 0).toFixed(4)}%`;
}

function voteDirectionLabel(direction) {
  if (direction === "up") return "買い";
  if (direction === "down") return "売り";
  return "中立";
}

function renderSwingCompass(compass) {
  if (!swingCompassEl || !compass) return;
  const tone = compass.direction || "flat";
  swingCompassPanelEl.className = `swing-compass-wrap ${tone}`;
  swingCompassStatusEl.textContent = `${compass.status || "分析中"} / 一致 ${compass.agreement || 0}%`;
  const priorityRows = (compass.priorities || []).map((item) => `
    <div class="swing-priority ${item.weight >= 24 ? "highest" : item.weight >= 18 ? "high" : "low"}">
      <strong>${item.label}</strong>
      <span>${item.role}</span>
      <i style="width:${item.weight * 3}%"></i>
    </div>
  `).join("");

  swingCompassEl.innerHTML = `
    <div class="swing-main">
      <div class="swing-bias ${tone}">
        <span>スイング総合判断</span>
        <strong>${compass.status || "分析中"}</strong>
        <small>方向スコア ${compass.biasScore || 0} / 時間足一致 ${compass.agreement || 0}% / 照合 ${compass.completed || 0}件</small>
      </div>
      <div class="swing-map">
        <div><span>主方向</span><strong>日足</strong><small>${timeframeDirectionText(compass.primary)}</small></div>
        <div><span>大局</span><strong>週足</strong><small>${timeframeDirectionText(compass.confirmation)}</small></div>
        <div><span>仕掛け</span><strong>4時間足</strong><small>${timeframeDirectionText(compass.entry)}</small></div>
        <div><span>タイミング</span><strong>1時間足</strong><small>${timeframeDirectionText(compass.timing)}</small></div>
      </div>
    </div>
    <div class="swing-warning">${compass.warning || "日足・週足・4時間足を中心に確認してください。"}</div>
    <div class="swing-priorities">${priorityRows}</div>
  `;
}

function renderProbabilitySimulation(sim) {
  if (!probabilitySimulationEl || !sim) return;
  const tone = sim.direction || "flat";
  probabilitySimulationPanelEl.className = `prob-sim-wrap ${tone}`;
  probabilitySimulationStatusEl.textContent = `${sim.status || "計算中"} / 10分方向確率 ${Math.round(Number(sim.probabilities?.calibratedMain || 0) * 100)}%`;
  const scenarios = sim.scenarios || [];
  const calibration = sim.calibration || {};
  const conditional = sim.conditionalCalibration || {};
  const residual = sim.adaptiveResidual || {};
  const structure = sim.structure || {};
  const votes = sim.modelVotes || {};
  const gate = sim.qualityGate || {};
  const maturity = sim.evidenceMaturity || {};
  const reliability = sim.evidenceReliability || {};
  const probabilityDrift = sim.probabilityDrift || {};
  const empiricalGuard = sim.empiricalEvidenceGuard || {};
  const eventEmbargo = gate.eventEmbargo || {};
  const bins = (calibration.bins || []).filter((bin) => bin.samples > 0).slice(-5);
  probabilitySimulationEl.innerHTML = `
    <div class="prob-sim-main">
      <div class="prob-sim-verdict ${tone}">
        <span>${sim.method || "シミュレーション"}</span>
        <strong>${sim.status || "計算中"}</strong>
        <small>${sim.simulations || 0}本 / 校正後の10分方向確率 ${Math.round(Number(sim.probabilities?.calibratedMain || 0) * 100)}%</small>
      </div>
      <div class="prob-sim-bars">
        ${scenarios.map((item) => `
          <div class="prob-sim-bar">
            <div>
              <strong>${item.label}</strong>
              <span>${Math.round(Number(item.probability || 0) * 100)}%</span>
            </div>
            <i><b style="width:${Math.max(2, Math.round(Number(item.probability || 0) * 100))}%"></b></i>
            <small>${item.detail}</small>
          </div>
        `).join("")}
      </div>
    </div>
    <div class="prob-sim-range">
      <div><span>下側10%</span><strong>${Number(sim.rangePrice?.low || 0).toLocaleString("ja-JP", { minimumFractionDigits: 5, maximumFractionDigits: 5 })}</strong><small>${Number(sim.rangePct?.p10 || 0).toFixed(4)}%</small></div>
      <div><span>中央値</span><strong>${Number(sim.rangePrice?.mid || 0).toLocaleString("ja-JP", { minimumFractionDigits: 5, maximumFractionDigits: 5 })}</strong><small>${Number(sim.rangePct?.p50 || 0).toFixed(4)}%</small></div>
      <div><span>上側90%</span><strong>${Number(sim.rangePrice?.high || 0).toLocaleString("ja-JP", { minimumFractionDigits: 5, maximumFractionDigits: 5 })}</strong><small>${Number(sim.rangePct?.p90 || 0).toFixed(4)}%</small></div>
      <div><span>確率校正</span><strong>${calibration.label || "校正待ち"}</strong><small>Brier ${calibration.brierScore ?? "--"} / 誤差 ${calibration.calibrationError ?? "--"} / ${calibration.samples || 0}件</small></div>
    </div>
    <div class="prob-sim-upgrade">
      <div><span>証拠成熟度</span><strong>${maturity.status || "算定中"} ${maturity.maturityPercent ?? 0}%</strong><small>補正前 ${Math.round(Number(maturity.rawProbability || 0) * 100)}% → 採用 ${Math.round(Number(sim.probabilities?.calibratedMain || 0) * 100)}% / ${maturity.samples || 0}/${maturity.targetSamples || 80}件</small></div>
      <div><span>証拠信頼性</span><strong>${Math.round(Number(reliability.score || 0) * 100)}%</strong><small>価格鮮度 ${reliability.quoteFresh ? "合格" : "不合格"} / 複数ソース ${reliability.quoteConsensus ? "一致" : "未照合"} / 時間足一致 ${Math.round(Number(reliability.timeframeAgreement || 0) * 100)}%</small></div>
      <div><span>確率ドリフト</span><strong class="${probabilityDrift.state === "drift" ? "down" : probabilityDrift.state === "stable" ? "up" : ""}">${probabilityDrift.label || "判定中"}</strong><small>${probabilityDrift.reason || probabilityDrift.requirement || "直近Brierを監視"}</small></div>
      <div><span>局面別校正</span><strong>${conditional.label || "校正待ち"}</strong><small>類似局面 ${conditional.matchedSamples || 0}件 / 全体 ${conditional.samples || 0}件</small></div>
      <div><span>低成績根拠の抑制</span><strong class="${empiricalGuard.active ? "down" : "up"}">${empiricalGuard.status || "判定中"}</strong><small>${empiricalGuard.active ? `${(empiricalGuard.weakEvidence || []).map((row) => `${row.label} ${Math.round(Number(row.hitRate || 0) * 100)}%/${row.samples}件`).join("・")} / ${Math.round(Number(empiricalGuard.rawProbability || 0) * 100)}%→${Math.round(Number(empiricalGuard.adjustedProbability || 0) * 100)}%` : empiricalGuard.method || "前向き根拠成績を監視"}</small></div>
      <div><span>根拠一致補正</span><strong>${structure.label || "中立補正"}</strong><small>補正 ${Number(structure.adjustment || 0) >= 0 ? "+" : ""}${Math.round(Number(structure.adjustment || 0) * 100)}pt</small></div>
      <div><span>テクニカル一致</span><strong>${structure.technicalAligned || 0}本</strong><small>実績倍率 ${Math.round(Number(structure.technicalMultiplier ?? 1) * 100)}% / 低成績なら加点を縮小</small></div>
      <div><span>大口警戒</span><strong>${structure.smartMoneyRisk || 0}点</strong><small>だまし・政策フロー疑いを減点材料に使用</small></div>
      <div><span>残差学習</span><strong>${residual.status || "蓄積中"}</strong><small>${Number(residual.correctionPct || 0) >= 0 ? "+" : ""}${Number(residual.correctionPct || 0).toFixed(4)}%補正 / ${residual.source || "全体"} ${residual.samples || 0}件</small></div>
    </div>
    <div class="prob-sim-votes">
      <div class="prob-sim-vote-head">
        <span>${votes.title || "6モデル投票"}</span>
        <strong>${votes.label || "集計中"}</strong>
        <small>一致 ${votes.agreement || 0}/${votes.models?.length || 6} / 確率補正 ${Number(votes.confidenceBoost || 0) >= 0 ? "+" : ""}${Math.round(Number(votes.confidenceBoost || 0) * 100)}pt</small>
      </div>
      <div class="prob-sim-vote-grid">
        ${(votes.models || []).map((model) => `
          <div class="prob-sim-vote-card ${model.direction || "flat"}">
            <span>${model.label}</span>
            <strong>${voteDirectionLabel(model.direction)}</strong>
            <small>信頼 ${Math.round(Number(model.confidence || 0) * 100)}% / 重み ${Number(model.weight || 0).toFixed(2)}</small>
            <em>${model.reason || "判定中"}</em>
          </div>
        `).join("") || `<div class="prob-sim-vote-card flat"><span>投票</span><strong>蓄積中</strong><small>モデル判定を準備中</small><em>次の更新で表示します</em></div>`}
      </div>
    </div>
    <div class="prob-sim-audit">
      <div><span>開始から現在まで</span><strong>${calibration.actualHitRate !== null && calibration.actualHitRate !== undefined ? `${Math.round(Number(calibration.actualHitRate) * 100)}%` : "--"}</strong><small>方向一致率 / ${calibration.samples || 0}件</small></div>
      <div><span>平均予測確率</span><strong>${calibration.expectedProbability !== null && calibration.expectedProbability !== undefined ? `${Math.round(Number(calibration.expectedProbability) * 100)}%` : "--"}</strong><small>表示していた信頼度の平均</small></div>
      <div><span>確率との差</span><strong>${calibration.calibrationGap !== null && calibration.calibrationGap !== undefined ? `${Number(calibration.calibrationGap) >= 0 ? "+" : ""}${Math.round(Number(calibration.calibrationGap) * 100)}pt` : "--"}</strong><small>実績 - 予測確率</small></div>
      <div><span>高信頼時</span><strong>${calibration.highConfidence ? `${Math.round(Number(calibration.highConfidence.hitRate) * 100)}%` : "--"}</strong><small>${calibration.highConfidence ? `平均予測${Math.round(Number(calibration.highConfidence.avgProbability) * 100)}% / ${calibration.highConfidence.samples}件` : "65%以上の予測を蓄積中"}</small></div>
    </div>
    <div class="prob-sim-calibration">
      ${bins.map((bin) => `
        <div>
          <span>${bin.label}</span>
          <strong>${Math.round(Number(bin.actualRate || 0) * 100)}%</strong>
          <small>予測${Math.round(Number(bin.forecastProb || 0) * 100)}% / ${bin.samples}件</small>
        </div>
      `).join("") || `<div><span>校正</span><strong>蓄積中</strong><small>確率と実績のズレを集計します</small></div>`}
    </div>
    <div class="prob-sim-tags">
      ${(conditional.tagStats || []).map((tag) => `
        <span>${tag.label}: ${tag.samples || 0}件 / 実績${tag.hitRate !== null && tag.hitRate !== undefined ? `${Math.round(Number(tag.hitRate) * 100)}%` : "--"}</span>
      `).join("")}
    </div>
    <div class="forecast-quality-gate ${gate.currentAccepted ? "accepted" : "rejected"}">
      <div><span>重要指標回避</span><strong class="${eventEmbargo.active ? "down" : "up"}">${eventEmbargo.label || "確認中"}</strong><small>${eventEmbargo.reason || "経済指標圧力を監視"}</small></div>
      <div><span>予測品質ゲート</span><strong>${gate.status || "学習中"}</strong><small>${gate.reason || gate.method || "過去照合を蓄積中"}</small></div>
      <div><span>選別後の実績</span><strong>${gate.hitRate !== null && gate.hitRate !== undefined ? `${Math.round(Number(gate.hitRate) * 100)}%` : "--"}</strong><small>採用 ${gate.acceptedSamples || 0}件 / 検証 ${gate.validationSamples || 0}件 / 採用率 ${Math.round(Number(gate.coverage || 0) * 100)}%</small></div>
      <div><span>現在の基準値</span><strong>${Math.round(Number(gate.current?.confidence || 0) * 100)}% / 一致 ${Math.round(Number(gate.current?.agreement || 0) * 100)}%</strong><small>値幅÷コスト ${Number(gate.current?.edgeCostRatio || 0).toFixed(2)}倍</small></div>
      <div><span>採用閾値</span><strong>${Math.round(Number(gate.thresholds?.confidence || 0) * 100)}% / 一致 ${Math.round(Number(gate.thresholds?.agreement || 0) * 100)}%</strong><small>値幅はコストの${Number(gate.thresholds?.edgeCostRatio || 0).toFixed(1)}倍以上</small></div>
    </div>
    <div class="prob-sim-weakness">
      ${maturity.method ? `<span>${maturity.method}</span>` : ""}
      ${(sim.weakness?.length ? sim.weakness : ["過去誤差、時間足、合議モデルを使って確率を毎分更新しています。"]).map((item) => `<span>${item}</span>`).join("")}
    </div>
  `;
}

function renderConformalCalibration(report) {
  if (!conformalCalibrationEl || !report) return;
  const drift = report.drift || {};
  const active = report.active || {};
  const ranges = active.ranges || {};
  const tone = drift.state || "learning";
  conformalPanelEl.className = `conformal-wrap ${tone}`;
  conformalStatusEl.textContent = `${drift.label || "校正中"} / ${report.currentRegime?.label || "全体"}`;
  const coverageText = (row) => row?.actualCoverage === null || row?.actualCoverage === undefined
    ? "--"
    : `${Math.round(Number(row.actualCoverage) * 100)}%`;
  const segmentRows = ["overall", "trend", "range", "highVolatility", "eventPolicy"]
    .map((key) => report.segments?.[key])
    .filter(Boolean);
  conformalCalibrationEl.innerHTML = `
    <div class="conformal-ranges">
      ${["50", "80", "90"].map((key) => {
        const row = ranges[key] || {};
        const evaluation = report.walkForward?.coverage?.[key] || {};
        return `<div>
          <span>${key}%予測区間</span>
          <strong>${Number(row.low || 0).toFixed(5)} – ${Number(row.high || 0).toFixed(5)}</strong>
          <small>半幅 ${Number(row.widthPct || 0).toFixed(4)}% / 実測 ${coverageText(evaluation)} / ${evaluation.samples || 0}件</small>
        </div>`;
      }).join("")}
    </div>
    <div class="conformal-summary">
      <div><span>現在の校正</span><strong>${report.currentRegime?.label || "全体"}</strong><small>${active.source || "全体分布"} / 局面 ${active.samples || 0}件 / 全体 ${active.globalSamples || 0}件</small></div>
      <div><span>時刻境界</span><strong>${report.trainedThrough ? formatTime(report.trainedThrough) : "蓄積中"}</strong><small>ラベル利用可能時刻まで / 重複除外 ${report.overlappingRowsRemoved || 0}件</small></div>
      <div><span>ドリフト</span><strong>${drift.label || "判定中"}</strong><small>${drift.recentCoverageDrop ? `直近${drift.recentCoverageDrop.recentSamples}件 / 最大低下 ${Math.round(Number(drift.recentCoverageDrop.drop || 0) * 100)}pt` : "判定用サンプルを蓄積中"}</small></div>
      <div><span>信頼度減点</span><strong>-${Math.round(Number(report.confidencePenalty || 0) * 100)}pt</strong><small>${(report.penaltyReasons || []).join(" / ") || "減点なし"}</small></div>
    </div>
    <div class="conformal-segments">
      <div class="conformal-segment-head"><span>校正区分</span><span>標本</span><span>50%実測</span><span>80%実測</span><span>90%実測</span></div>
      ${segmentRows.map((segment) => `<div class="conformal-segment-row ${segment.key === report.currentRegime?.key ? "active" : ""}">
        <strong>${segment.label}</strong>
        <span>${segment.samples || 0}件${segment.fallback ? "・全体へ収縮" : ""}</span>
        <span>${coverageText(segment.coverage?.["50"])}</span>
        <span>${coverageText(segment.coverage?.["80"])}</span>
        <span>${coverageText(segment.coverage?.["90"])}</span>
      </div>`).join("")}
    </div>
    <div class="conformal-note">${report.method || "時系列コンフォーマル校正"}。点予測は変更せず、区間と運用品質だけを制御します。</div>
  `;
}

function renderChampionChallenger(data) {
  if (!championChallengerEl || !data) return;
  const promoted = data.decision === "昇格" || data.challenger?.status === "昇格済み" || data.regimeChallenger?.status === "昇格済み";
  const tone = promoted ? "promoted" : "waiting";
  championChallengerPanelEl.className = `champion-challenger-wrap ${tone}`;
  championChallengerStatusEl.textContent = promoted ? "候補モデルを昇格" : "現行モデルを維持";
  const eligible = data.evaluation || {};
  const reference = data.referenceEvaluation || {};
  const comparison = Number(eligible.samples || 0) > 0 ? eligible : reference;
  const regimeEligible = data.regimeEvaluation || {};
  const regimeReference = data.regimeReferenceEvaluation || {};
  const regimeComparison = Number(regimeEligible.samples || 0) > 0 ? regimeEligible : regimeReference;
  const comparisonLabel = Number(eligible.samples || 0) > 0 ? "昇格審査データ" : "旧形式の参考比較（昇格には不使用）";
  const overlappingRowsRemoved = Number(eligible.samples || 0) > 0
    ? data.dataAudit?.overlappingRowsRemoved
    : data.dataAudit?.referenceOverlappingRowsRemoved;
  const champion = comparison.champion || {};
  const challenger = comparison.challenger || {};
  const regimeChallenger = regimeComparison.challenger || {};
  const uncertainty = comparison.uncertainty95 || {};
  const regimeUncertainty = regimeComparison.uncertainty95 || {};
  const regime = data.currentRegime || {};
  const formatRate = (value) => value === null || value === undefined ? "--" : `${(Number(value) * 100).toFixed(1)}%`;
  const formatNumber = (value, digits = 4) => value === null || value === undefined ? "--" : Number(value).toFixed(digits);
  const interval = (value, scale = 1, digits = 3) => value?.low === null || value?.low === undefined
    ? "95%区間 --"
    : `95%区間 ${(Number(value.low) * scale).toFixed(digits)}〜${(Number(value.high) * scale).toFixed(digits)}`;
  championChallengerEl.innerHTML = `
    <div class="cc-active-model">
      <div><span>現在採用中</span><strong>${data.champion?.label || "現行モデル"}</strong><small>${data.activeModelId || "--"}</small></div>
      <div><span>既存候補</span><strong>${data.challenger?.label || "候補モデル"}</strong><small>${data.challenger?.status || "検証中"}</small></div>
      <div><span>局面別候補</span><strong>${data.regimeChallenger?.label || "局面別モデル"}</strong><small>${data.regimeChallenger?.status || "検証中"}</small></div>
      <div><span>判定</span><strong>${data.decision || "現行維持"}</strong><small>全条件必須 / 未採用は影予測</small></div>
    </div>
    <div class="cc-decision ${promoted ? "promoted" : "held"}">
      <strong>${data.decisionReason || "確定照合を蓄積しています。"}</strong>
      <span>${data.disclaimer || "検証用システムであり、実際の投資助言ではありません。"}</span>
    </div>
    <div class="cc-regime-state ${regime.fallback ? "fallback" : "specialized"}">
      <div><span>現在局面</span><strong>${regime.label || "判定待ち"}</strong><small>${(regime.evidence || []).join(" / ") || "予測時点の特徴量で分類"}</small></div>
      <div><span>局面サンプル</span><strong>${regime.samples || 0}件</strong><small>専用化に必要 ${data.minimumRegimeSamples || 24}件</small></div>
      <div><span>適用状態</span><strong>${regime.fallback ? "全体モデルへフォールバック" : "局面別モデルを混合"}</strong><small>${regime.fallbackReason || `信頼係数 ${formatNumber(regime.reliability, 3)}`}</small></div>
      <div><span>学習予測レンジ</span><strong>${formatNumber(regime.predictionRangePct?.low, 3)}〜${formatNumber(regime.predictionRangePct?.high, 3)}%</strong><small>中央値 ${formatNumber(regime.predictionRangePct?.median, 3)}%</small></div>
    </div>
    <div class="cc-sample-audit">
      <div><span>昇格審査</span><strong>${eligible.samples || 0}件</strong><small>必要 ${data.minimumSamples || 120}件</small></div>
      <div><span>候補方向評価</span><strong>${eligible.directionSamples || 0}件</strong><small>必要 ${data.minimumDirectionSamples || 80}件 / 現行 ${eligible.championDirectionSamples || 0}件</small></div>
      <div><span>旧形式除外</span><strong>${data.dataAudit?.excludedLegacyRows || 0}件</strong><small>参考値のみ</small></div>
      <div><span>期限時刻ずれ除外</span><strong>${data.dataAudit?.excludedMisalignedRows || 0}件</strong><small>期限±3分を超過</small></div>
      <div><span>重複除外</span><strong>${overlappingRowsRemoved || 0}件</strong><small>10分予測の期間重複</small></div>
      <div><span>長期評価履歴</span><strong>${data.dataAudit?.archivedRows || 0}件</strong><small>非重複・最大900件</small></div>
      <div><span>確定済み総数</span><strong>${data.dataAudit?.finalizedRows || 0}件</strong><small>${data.dataAudit?.exclusionReason || "監査済み"}</small></div>
    </div>
    <div class="cc-comparison-label">${comparisonLabel} / 既存 ${comparison.samples || 0}件・局面別 ${regimeComparison.samples || 0}件</div>
    <div class="cc-metrics">
      <div class="cc-metric-head"><span>評価指標</span><strong>現行</strong><strong>既存候補</strong><strong>局面別候補</strong><small>既存 / 局面別 95%区間</small></div>
      <div><span>方向一致率</span><strong>${formatRate(champion.directionHitRate)}</strong><strong>${formatRate(challenger.directionHitRate)}</strong><strong>${formatRate(regimeChallenger.directionHitRate)}</strong><small>${interval(uncertainty.directionHitRate, 100, 1)}pt / ${interval(regimeUncertainty.directionHitRate, 100, 1)}pt</small></div>
      <div><span>方向網羅率</span><strong>${formatRate(champion.directionCoverage)}</strong><strong>${formatRate(challenger.directionCoverage)}</strong><strong>${formatRate(regimeChallenger.directionCoverage)}</strong><small>見送りを除く方向シグナルの比率</small></div>
      <div><span>Brierスコア</span><strong>${formatNumber(champion.brierScore, 4)}</strong><strong>${formatNumber(challenger.brierScore, 4)}</strong><strong>${formatNumber(regimeChallenger.brierScore, 4)}</strong><small>${interval(uncertainty.brierImprovement, 1, 4)} / ${interval(regimeUncertainty.brierImprovement, 1, 4)}</small></div>
      <div><span>MAE</span><strong>${formatNumber(champion.maePct, 4)}%</strong><strong>${formatNumber(challenger.maePct, 4)}%</strong><strong>${formatNumber(regimeChallenger.maePct, 4)}%</strong><small>${interval(uncertainty.maeImprovement, 1, 4)} / ${interval(regimeUncertainty.maeImprovement, 1, 4)}</small></div>
      <div><span>コスト控除後/信号</span><strong>${formatNumber(champion.netReturnPctPerSignal, 4)}%</strong><strong>${formatNumber(challenger.netReturnPctPerSignal, 4)}%</strong><strong>${formatNumber(regimeChallenger.netReturnPctPerSignal, 4)}%</strong><small>${interval(uncertainty.netReturnPctPerSignal, 1, 4)} / ${interval(regimeUncertainty.netReturnPctPerSignal, 1, 4)}pt</small></div>
      <div><span>コスト控除後/機会</span><strong>${formatNumber(champion.netReturnPctPerOpportunity, 4)}%</strong><strong>${formatNumber(challenger.netReturnPctPerOpportunity, 4)}%</strong><strong>${formatNumber(regimeChallenger.netReturnPctPerOpportunity, 4)}%</strong><small>${interval(uncertainty.netReturnPctPerOpportunity, 1, 4)} / ${interval(regimeUncertainty.netReturnPctPerOpportunity, 1, 4)}pt</small></div>
    </div>
    <div class="cc-rules">
      <span class="${data.promotionGates?.challenger?.canPromote ? "ok" : "ng"}">既存候補: ${data.promotionGates?.challenger?.canPromote ? "採用可" : "採用不可"}</span>
      <span class="${data.promotionGates?.regimeChallenger?.canPromote ? "ok" : "ng"}">局面別候補: ${data.promotionGates?.regimeChallenger?.canPromote ? "採用可" : "採用不可"}</span>
      <span>${(data.promotionGates?.regimeChallenger?.reasons || ["局面別の条件を確認中"]).join(" / ")}</span>
    </div>
  `;
}

function renderTimeMachineFrame() {
  if (!timeMachineEl || !latestTimeMachine?.frames?.length) return;
  const frame = latestTimeMachine.frames[Math.max(0, Math.min(timeMachineFrameIndex, latestTimeMachine.frames.length - 1))];
  const episode = latestTimeMachine.episode || {};
  const escape = (value) => String(value ?? "").replace(/[&<>"']/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[character]);
  const digits = latestTimeMachine.assetId === "usdjpy" ? 3 : 5;
  const number = (value) => value == null ? "記録なし" : Number(value).toFixed(digits);
  const directionLabel = frame.direction === "up" ? "上方向" : frame.direction === "down" ? "下方向" : frame.direction === "flat" ? "横ばい" : "記録なし";
  const isScorableShock = episode.evaluationEligible !== false;
  const eventWord = isScorableShock ? "急変" : "情報確認";
  const offset = frame.minute === 0 ? `${eventWord}時点` : frame.minute < 0 ? `${eventWord} ${Math.abs(frame.minute)}分前` : `${eventWord} ${frame.minute}分後`;
  const confidence = frame.confidence == null ? "--" : `${Math.round(frame.confidence * 100)}%`;
  const confidenceChange = frame.confidenceChange == null ? "--" : `${frame.confidenceChange >= 0 ? "+" : ""}${Math.round(frame.confidenceChange * 100)}pt`;
  timeMachineSliderEl.max = String(latestTimeMachine.frames.length - 1);
  timeMachineSliderEl.value = String(timeMachineFrameIndex);
  timeMachineClockEl.textContent = `${new Date(frame.at).toLocaleTimeString("ja-JP", { hour: "2-digit", minute: "2-digit" })} / ${offset}`;
  timeMachineAuditEl.textContent = latestTimeMachine.audit?.hindsightBlocked ? "後知恵を遮断" : "監査要確認";
  const earlyWarning = latestTimeMachine.earlyWarning || {};
  const scorecard = latestTimeMachine.warningScorecard || {};
  const shadowPolicies = latestTimeMachine.shadowPolicies || {};
  const detectionRate = scorecard.detectionRate == null ? "--" : `${Math.round(scorecard.detectionRate * 100)}%`;
  timeMachineEl.innerHTML = `
    <div class="time-machine-event-summary"><strong>${escape(episode.label || "市場イベント")}</strong><span class="${episode.direction || "flat"}">${escape(episode.reason || "原因を検証中")}</span></div>
    <div class="time-machine-warning ${earlyWarning.scorable === false ? "" : earlyWarning.detected ? "detected" : "missed"}"><span>${earlyWarning.scorable === false ? "情報イベント再生" : "事前警戒検証"}</span><strong>${earlyWarning.scorable === false ? "成績対象外" : earlyWarning.detected ? `急変${earlyWarning.leadMinutes}分前に警戒` : "事前警戒なし"}</strong><small>${escape(earlyWarning.reason || "評価中")}</small></div>
    <div class="time-machine-scorecard">
      <div><span>事前警戒率</span><strong>${detectionRate}</strong><small>${scorecard.detected || 0}検出 / ${scorecard.missed || 0}見逃し</small></div>
      <div><span>平均リード時間</span><strong>${scorecard.averageLeadMinutes == null ? "--" : `${scorecard.averageLeadMinutes}分`}</strong><small>急変前30分だけで採点</small></div>
      <div><span>学習昇格</span><strong class="${scorecard.eligibleForAdjustment ? "ready" : "locked"}">${escape(scorecard.status || "蓄積中")}</strong><small>価格急変 ${scorecard.verifiedPriceShocks || 0}件 / 情報除外 ${scorecard.informationEventsExcluded || 0}件</small></div>
      <div><span>主な見逃し理由</span><strong>${escape(scorecard.missedReasons?.[0]?.label || "蓄積中")}</strong><small>${scorecard.missedReasons?.[0]?.count || 0}件</small></div>
    </div>
    <div class="time-machine-shadow">
      <div class="time-machine-shadow-head"><span>警戒閾値の影モデル比較</span><strong>${escape(shadowPolicies.status || "比較準備中")}</strong></div>
      <div class="time-machine-shadow-grid">${(shadowPolicies.rows || []).map((row) => `
        <div class="${row.id === shadowPolicies.candidateId ? "candidate" : ""}">
          <span>${escape(row.label)}${row.researchOnly ? "（自動採用なし）" : ""}</span>
          <strong>検出 ${row.recall == null ? "--" : `${Math.round(row.recall * 100)}%`}</strong>
          <small>誤警報 ${row.falseAlarmRate == null ? "--" : `${Math.round(row.falseAlarmRate * 100)}%`} / 適合 ${row.precision == null ? "--" : `${Math.round(row.precision * 100)}%`}</small>
          <small>指標 ${row.indicatorPressure} / 驚き ${row.surprisePressure} / ニュース ${row.newsBias}</small>
        </div>`).join("")}</div>
      <p>${escape(shadowPolicies.policy || "急変と平常を同時比較")}</p>
    </div>
    <div class="time-machine-metrics">
      <div><span>当時価格</span><strong>${number(frame.price)}</strong><small>${frame.hasExactRecord ? "当時記録" : "直近記録・5分超"}</small></div>
      <div><span>10分予測</span><strong>${number(frame.predicted)}</strong><small class="${frame.direction}">${directionLabel}</small></div>
      <div><span>予測信頼度</span><strong>${confidence}</strong><small>前回記録比 ${confidenceChange}</small></div>
      <div><span>指標・サプライズ圧力</span><strong>${frame.indicatorPressure == null ? "--" : `${Math.round(frame.indicatorPressure * 100)} / ${Math.round((frame.surprisePressure || 0) * 100)}`}</strong><small>${escape(frame.strongestSurprise?.detail || frame.regime || "記録なし")}</small></div>
    </div>
    <div class="time-machine-evidence">
      <div><h3>この時点までに確認したニュース</h3>${frame.news.length ? frame.news.map((item) => `<a href="${escape(item.url)}" target="_blank" rel="noreferrer"><time>${new Date(item.availableAt).toLocaleTimeString("ja-JP", { hour: "2-digit", minute: "2-digit" })}</time><strong>${escape(item.title)}</strong><small>${escape(item.source)} / ${escape(item.category)}</small></a>`).join("") : "<p>この時間窓で確認済みのニュースはありません。</p>"}</div>
      <div><h3>当時判明していた急変理由</h3>${frame.knownShocks.length ? frame.knownShocks.map((item) => `<article><time>${new Date(item.at).toLocaleTimeString("ja-JP", { hour: "2-digit", minute: "2-digit" })}</time><strong>${escape(item.label)}</strong><small>${escape(item.reason)}</small></article>`).join("") : "<p>価格が先行。原因はまだ確定していません。</p>"}</div>
    </div>
    <p class="time-machine-audit-note">知識の締切 ${new Date(frame.knowledgeCutoffAt).toLocaleString("ja-JP")} / ${escape(latestTimeMachine.audit?.rule || "未来情報を遮断")}</p>
    <p class="time-machine-audit-note">事前警戒学習: ${escape(scorecard.policy || "30件までは閾値を固定")}</p>
  `;
}

function stopTimeMachine() {
  const wasPlaying = Boolean(timeMachineTimer);
  if (timeMachineTimer) clearInterval(timeMachineTimer);
  timeMachineTimer = null;
  if (timeMachinePlayEl) timeMachinePlayEl.textContent = "▶ 再生";
  if (timeMachineAudioEl) timeMachineAudioEl.textContent = wasPlaying ? "音声一時停止" : "音声待機";
  if (timeMachineSpeechActive && voiceSupported()) window.speechSynthesis.cancel();
  timeMachineSpeechActive = false;
}

function timeMachineFrameSpeech(frame, episode, force = false) {
  if (!voiceSupported() || !frame) {
    if (timeMachineAudioEl) timeMachineAudioEl.textContent = "音声非対応";
    return;
  }
  const importantMinute = frame.minute === 0 || Math.abs(Number(frame.minute || 0)) % 10 === 0;
  if (!force && !importantMinute) return;
  if (!force && window.speechSynthesis.speaking) return;
  const eventWord = episode?.evaluationEligible === false ? "情報確認" : "急変";
  const offset = frame.minute === 0
    ? `${eventWord}時点`
    : frame.minute < 0 ? `${eventWord}${Math.abs(frame.minute)}分前` : `${eventWord}${frame.minute}分後`;
  const direction = frame.direction === "up" ? "上方向" : frame.direction === "down" ? "下方向" : "横ばい";
  const confidence = frame.confidence == null ? "信頼度記録なし" : `予測信頼度${Math.round(frame.confidence * 100)}パーセント`;
  const price = frame.price == null ? "価格記録なし" : `価格${Number(frame.price).toFixed(latestTimeMachine?.assetId === "usdjpy" ? 3 : 5)}`;
  const prefix = force ? `相場のタイムマシンを再生します。${episode?.label || "市場イベント"}。` : "";
  const utterance = new SpeechSynthesisUtterance(`${prefix}${offset}。${price}。予測は${direction}。${confidence}。`);
  utterance.lang = "ja-JP";
  utterance.rate = 0.94;
  utterance.pitch = 1;
  utterance.volume = 1;
  const voice = pickJapaneseVoice();
  if (voice) utterance.voice = voice;
  utterance.onstart = () => {
    timeMachineSpeechActive = true;
    if (timeMachineAudioEl) timeMachineAudioEl.textContent = "音声再生中";
  };
  utterance.onend = () => {
    timeMachineSpeechActive = false;
    if (timeMachineAudioEl) timeMachineAudioEl.textContent = timeMachineTimer ? "音声進行中" : "音声待機";
  };
  utterance.onerror = (event) => {
    timeMachineSpeechActive = false;
    if (timeMachineAudioEl) timeMachineAudioEl.textContent = event.error === "not-allowed" ? "もう一度再生を押してください" : "音声再準備中";
  };
  if (force) window.speechSynthesis.cancel();
  window.speechSynthesis.resume();
  window.speechSynthesis.speak(utterance);
}

function playTimeMachineTick(frameIndex) {
  if (frameIndex % 5 !== 0) return;
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  if (!AudioContext) return;
  try {
    timeMachineAudioContext ||= new AudioContext();
    timeMachineAudioContext.resume();
    const oscillator = timeMachineAudioContext.createOscillator();
    const gain = timeMachineAudioContext.createGain();
    const start = timeMachineAudioContext.currentTime;
    oscillator.type = "sine";
    oscillator.frequency.value = 520 + (frameIndex % 10) * 18;
    gain.gain.setValueAtTime(0.0001, start);
    gain.gain.exponentialRampToValueAtTime(0.045, start + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.12);
    oscillator.connect(gain);
    gain.connect(timeMachineAudioContext.destination);
    oscillator.start(start);
    oscillator.stop(start + 0.13);
  } catch {
    if (timeMachineAudioEl) timeMachineAudioEl.textContent = "端末音量を確認";
  }
}

function renderTimeMachine(data) {
  if (!timeMachineEl || !data) return;
  stopTimeMachine();
  latestTimeMachine = data;
  timeMachineFrameIndex = 0;
  if (!data.episodes?.length) {
    timeMachineEventEl.innerHTML = `<option>急変履歴を蓄積中</option>`;
    timeMachineEl.innerHTML = `<p class="time-machine-empty">急変と予測履歴が蓄積されると、前後30分を1分単位で再生できます。</p>`;
    return;
  }
  timeMachineEventEl.innerHTML = data.episodes.map((item) => `<option value="${item.id}" ${item.id === data.selectedId ? "selected" : ""}>${new Date(item.at).toLocaleString("ja-JP")}｜${item.label}</option>`).join("");
  renderTimeMachineFrame();
}

async function loadTimeMachineEpisode(episodeId) {
  stopTimeMachine();
  timeMachineEl.innerHTML = `<p class="time-machine-empty">当時の記録を復元中...</p>`;
  const response = await fetch(`/api/time-machine?episode=${encodeURIComponent(episodeId)}`, { cache: "no-store" });
  if (!response.ok) throw new Error(`タイムマシン API ${response.status}`);
  renderTimeMachine(await response.json());
}

function renderYenCrossCommand(command) {
  if (!yenCrossCommandEl || !command?.activePair) return;
  const pair = command.activePair;
  const tone = pair.direction || "flat";
  yenCrossCommandPanelEl.className = `yen-cross-command-wrap ${tone}`;
  yenCrossCommandStatusEl.textContent = `${command.phase || "USD/JPY前向き検証中"}・完成度 ${command.completion || 0}%`;
  const price = (value) => Number(value || 0).toLocaleString("ja-JP", { minimumFractionDigits: 3, maximumFractionDigits: 3 });
  const hitRate = pair.hitRate == null ? "--" : `${Math.round(Number(pair.hitRate) * 100)}%`;
  const direction = tone === "up" ? "円安・ドル高" : tone === "down" ? "円高・ドル安" : "中立";
  const usdLedger = command.attributionLedger || {};
  const usdGuard = command.attributionQualityGuard || {};
  const usdReleaseRows = usdLedger.segmentGuardValidation?.rows || [];
  yenCrossCommandEl.innerHTML = `
    <div class="yen-cross-primary">
      <div><span>稼働ペア</span><strong>${pair.label}</strong><small>${direction} / 信頼 ${Math.round(Number(pair.confidence || 0) * 100)}%</small></div>
      <div><span>現在値 → 10分予測</span><strong>${price(pair.current)} → ${price(pair.predicted)}</strong><small>${Number(pair.deltaPct || 0) >= 0 ? "+" : ""}${Number(pair.deltaPct || 0).toFixed(4)}%</small></div>
      <div><span>日足予測</span><strong>${price(pair.dailyPredicted)}</strong><small>${Number(pair.dailyDeltaPct || 0) >= 0 ? "+" : ""}${Number(pair.dailyDeltaPct || 0).toFixed(3)}%</small></div>
      <div><span>独立した前向き成績</span><strong>${pair.directionalSamples || 0}件 / ${hitRate}</strong><small>平均誤差 ${pair.maePct == null ? "--" : `${Number(pair.maePct).toFixed(4)}%`}</small></div>
    </div>
    <div class="yen-cross-quality ${pair.consensusVerified ? "verified" : "waiting"}">
      <strong>${pair.consensusVerified ? "複数価格照合済み" : "表示専用・照合待ち"}</strong>
      <span>${pair.trustedSources || 0}系統一致 / 鮮度 ${pair.freshnessSeconds || 0}秒</span>
      <small>${pair.provider || "価格取得中"}</small>
    </div>
    ${command.eurjpyShadow ? `<div class="yen-cross-challenger shadow">
      <header><div><span>EUR/JPY 15分足・影モデル</span><strong>${command.eurjpyShadow.verified ? `${price(command.eurjpyShadow.current)} → ${price(command.eurjpyShadow.predicted)}` : "二系統の価格照合待ち"}</strong></div><b>公式取引未接続</b></header>
      <div>
        <article><span>予測方向</span><strong>${command.eurjpyShadow.direction === "up" ? "上方向" : command.eurjpyShadow.direction === "down" ? "下方向" : "中立"}</strong><small>${Number(command.eurjpyShadow.deltaPct || 0) >= 0 ? "+" : ""}${Number(command.eurjpyShadow.deltaPct || 0).toFixed(4)}% / 信頼 ${Math.round(Number(command.eurjpyShadow.confidence || 0.5) * 100)}%</small></article>
        <article><span>独立前向き照合</span><strong>${command.eurjpyShadow.performance?.samples || 0}/30件</strong><small>方向一致 ${command.eurjpyShadow.performance?.hitRate == null ? "--" : `${Math.round(command.eurjpyShadow.performance.hitRate * 100)}%`} / 待ち ${command.eurjpyShadow.performance?.pending || 0}件</small></article>
        <article><span>コスト控除後</span><strong>${Number(command.eurjpyShadow.performance?.netReturnPct || 0) >= 0 ? "+" : ""}${Number(command.eurjpyShadow.performance?.netReturnPct || 0).toFixed(3)}%</strong><small>EUR−JPY強度差 ${Number(command.eurjpyShadow.strengthSpread || 0) >= 0 ? "+" : ""}${Number(command.eurjpyShadow.strengthSpread || 0).toFixed(2)}σ</small></article>
      </div><p>${command.eurjpyShadow.performance?.safeguard || command.eurjpyShadow.method}</p>
    </div>` : ""}
    <div class="yen-cross-drivers">${(command.drivers || []).map((item) => `<div><span>${item.label}</span><strong class="${Number(item.value) >= 0 ? "up" : "down"}">${item.direction}</strong><small>${Number(item.value) >= 0 ? "+" : ""}${Number(item.value).toFixed(4)}</small></div>`).join("")}</div>
    <div class="yen-cross-subhead"><strong>時間足別USD/JPYモデル</strong><span>確定足だけで方向判定</span></div>
    <div class="yen-cross-timeframes">${(command.timeframes || []).map((item) => `<div class="${item.direction || "flat"}"><span>${item.label}</span><strong>${item.direction === "up" ? "円安" : item.direction === "down" ? "円高" : "中立"} ${price(item.predicted)}</strong><small>${Number(item.deltaPct || 0) >= 0 ? "+" : ""}${Number(item.deltaPct || 0).toFixed(3)}% / 信頼 ${Math.round(Number(item.confidence || 0) * 100)}% ${item.confirmed ? "・確定" : "・参考"}</small></div>`).join("")}</div>
    ${command.timeframeConsensus ? `<div class="yen-cross-consensus ${command.timeframeConsensus.eligible ? "eligible" : "blocked"}">
      <header><div><span>USD/JPY マルチタイムフレーム合議</span><strong>${command.timeframeConsensus.directionLabel}・信頼 ${Math.round(Number(command.timeframeConsensus.confidence || 0) * 100)}%</strong></div><b>${command.timeframeConsensus.decision}</b></header>
      <div><article><span>短期</span><strong>${command.timeframeConsensus.short.direction === "up" ? "円安" : command.timeframeConsensus.short.direction === "down" ? "円高" : "中立"}</strong><small>合意 ${Math.round(Number(command.timeframeConsensus.short.agreement || 0) * 100)}%</small></article><article><span>スイング</span><strong>${command.timeframeConsensus.swing.direction === "up" ? "円安" : command.timeframeConsensus.swing.direction === "down" ? "円高" : "中立"}</strong><small>4時間・日足・週足・月足 / 合意 ${Math.round(Number(command.timeframeConsensus.swing.agreement || 0) * 100)}%</small></article><article><span>前向き標本</span><strong>${command.timeframeConsensus.forwardSamples}件</strong><small>価格照合後だけ採用</small></article></div>
      <p>${command.timeframeConsensus.blockers?.length ? command.timeframeConsensus.blockers.join(" / ") : command.timeframeConsensus.method}</p>
    </div>` : ""}
    ${command.timeframePerformance ? `<div class="yen-cross-ledger"><header><div><span>USD/JPY 時間足別成績台帳</span><strong>${command.timeframePerformance.completed}件照合 / ${command.timeframePerformance.pending}件待ち</strong></div><b>${command.timeframePerformance.overallHitRate == null ? "蓄積中" : `方向一致 ${Math.round(command.timeframePerformance.overallHitRate * 100)}%`}</b></header><div>${(command.timeframePerformance.rows || []).map((row) => `<article><span>${row.label}</span><strong>${row.hitRate == null ? "--" : `${Math.round(row.hitRate * 100)}%`}</strong><small>${row.samples}/30件・平均誤差 ${row.maePct == null ? "--" : `${Number(row.maePct).toFixed(3)}%`}</small><em>${row.eligibleForWeighting ? "重み審査可能" : "固定重み"}</em></article>`).join("") || `<article><span>照合結果</span><strong>蓄積開始</strong><small>期限到来後の実価格で評価します</small><em>未来情報遮断</em></article>`}</div><p>${command.timeframePerformance.weightingRule}</p></div>` : ""}
    ${command.directionChallenger ? `<div class="yen-cross-challenger ${command.directionChallenger.promotable ? "promotable" : "shadow"}">
      <header><div><span>USD/JPY 候補モデル検証</span><strong>${command.directionChallenger.candidateLabel}</strong></div><b>${command.directionChallenger.status}</b></header>
      <div>
        <article><span>学習区間 70%</span><strong>${command.directionChallenger.train.samples}件</strong><small>現行 ${Math.round(Number(command.directionChallenger.train.baseline.hitRate || 0) * 100)}% / 候補 ${Math.round(Number(command.directionChallenger.train.candidate.hitRate || 0) * 100)}%</small></article>
        <article><span>未来側検証 30%</span><strong>${command.directionChallenger.validation.samples}/${command.directionChallenger.validation.minimumSamples}件</strong><small>候補収益 ${Number(command.directionChallenger.validation.candidate.netReturnPct || 0) >= 0 ? "+" : ""}${Number(command.directionChallenger.validation.candidate.netReturnPct || 0).toFixed(3)}%</small></article>
        <article><span>本番昇格</span><strong>${command.directionChallenger.promotable ? "候補条件達成" : "未採用"}</strong><small>改善差 ${Number(command.directionChallenger.validation.improvementPct || 0) >= 0 ? "+" : ""}${Number(command.directionChallenger.validation.improvementPct || 0).toFixed(3)}%</small></article>
      </div><p>${command.directionChallenger.safeguard}</p>
    </div>` : ""}
    ${command.featureChallenger ? `<div class="yen-cross-challenger feature ${command.featureChallenger.promotable ? "promotable" : "shadow"}">
      <header><div><span>USD/JPY ${command.featureChallenger.featureKeys?.length || 16}特徴量AI影モデル</span><strong>${command.featureChallenger.status}</strong></div><b>${command.featureChallenger.promotable ? "昇格候補" : "本番未採用"}</b></header>
      <div>
        <article><span>独立学習</span><strong>${command.featureChallenger.train?.samples ?? command.featureChallenger.trainSamples ?? 0}件</strong><small>重複10分予測を除外</small></article>
        <article><span>ウォークフォワード</span><strong>${command.featureChallenger.validation?.trades ?? 0}/${command.featureChallenger.validation?.minimumTrades ?? 30}取引</strong><small>${command.featureChallenger.validation?.folds ?? 0}回 / 方向一致 ${command.featureChallenger.validation?.hitRate == null ? "--" : `${Math.round(command.featureChallenger.validation.hitRate * 100)}%`}</small></article>
        <article><span>コスト後改善</span><strong>${command.featureChallenger.validation?.improvementPct == null ? "--" : `${Number(command.featureChallenger.validation.improvementPct) >= 0 ? "+" : ""}${Number(command.featureChallenger.validation.improvementPct).toFixed(3)}%`}</strong><small>主特徴 ${command.featureChallenger.importance?.[0]?.key || "蓄積中"}</small></article>
        <article><span>現在の影判断</span><strong>${command.featureChallenger.liveShadow?.officialDirection || "WAIT"}</strong><small>生 ${command.featureChallenger.liveShadow ? `${Math.round(command.featureChallenger.liveShadow.rawProbability * 100)}%` : "--"} / 補正 ${command.featureChallenger.liveShadow ? `${Math.round(command.featureChallenger.liveShadow.calibratedProbability * 100)}%` : "--"}</small></article>
        <article><span>利用可能要因</span><strong>${command.featureChallenger.featureDiagnostics?.usable ?? 0}/${command.featureChallenger.featureDiagnostics?.total ?? command.featureChallenger.featureKeys?.length ?? 0}</strong><small>未稼働 ${command.featureChallenger.featureDiagnostics?.unavailable?.length || 0}要因</small></article>
      </div><p>${command.featureChallenger.safeguard}</p>
    </div>` : ""}
    ${command.executionHorizonGate ? `<div class="yen-cross-challenger ${command.executionHorizonGate.accepted ? "promotable" : "shadow"}">
      <header><div><span>USD/JPY H4マクロ方向 × M15価格確認</span><strong>${command.executionHorizonGate.status}</strong></div><b>${command.executionHorizonGate.accepted ? "公式候補" : "影検証"}</b></header>
      <div>
        <article><span>H4・金利/政策/強弱</span><strong>${command.executionHorizonGate.direction === "up" ? "買い方向" : command.executionHorizonGate.direction === "down" ? "売り方向" : "WAIT"}</strong><small>実績 ${command.executionHorizonGate.directionModel?.performance?.samples || 0}/30件 / 一致 ${command.executionHorizonGate.directionModel?.performance?.hitRate == null ? "--" : `${Math.round(command.executionHorizonGate.directionModel.performance.hitRate * 100)}%`} / 損益 ${Number(command.executionHorizonGate.directionModel?.performance?.netReturnPct || 0).toFixed(3)}%</small></article>
        <article><span>M15・構造/ブレイク/初動</span><strong>${command.executionHorizonGate.timingDirection === "up" ? "買いタイミング" : command.executionHorizonGate.timingDirection === "down" ? "売りタイミング" : "WAIT"}</strong><small>実績 ${command.executionHorizonGate.timingModel?.performance?.samples || 0}/30件 / 一致 ${command.executionHorizonGate.timingModel?.performance?.hitRate == null ? "--" : `${Math.round(command.executionHorizonGate.timingModel.performance.hitRate * 100)}%`} / 損益 ${Number(command.executionHorizonGate.timingModel?.performance?.netReturnPct || 0).toFixed(3)}%</small></article>
        <article><span>停止理由</span><strong>${command.executionHorizonGate.blockers?.[0] || "条件通過"}</strong><small>${command.executionHorizonGate.blockers?.slice(1, 3).join(" / ") || command.executionHorizonGate.method}</small></article>
      </div>
    </div>` : ""}
    ${command.specialistHistoricalBacktest ? `<div class="yen-cross-challenger shadow">
      <header><div><span>USD/JPY 60日・時系列再生実績</span><strong>${command.specialistHistoricalBacktest.status}</strong></div><b>過去検証のみ</b></header>
      <div>
        <article><span>H4 現行 → 完全反転</span><strong>${command.specialistHistoricalBacktest.h4?.validation?.hitRate == null ? "--" : `${Math.round(command.specialistHistoricalBacktest.h4.validation.hitRate * 100)}%`} → ${command.specialistHistoricalBacktest.h4?.invertedValidation?.hitRate == null ? "--" : `${Math.round(command.specialistHistoricalBacktest.h4.invertedValidation.hitRate * 100)}%`}</strong><small>${command.specialistHistoricalBacktest.h4?.validation?.samples || 0}件 / コスト後 ${Number(command.specialistHistoricalBacktest.h4?.validation?.netReturnPct || 0).toFixed(3)}% → ${Number(command.specialistHistoricalBacktest.h4?.invertedValidation?.netReturnPct || 0).toFixed(3)}%</small><em>${command.specialistHistoricalBacktest.h4?.reflection?.decision || "反転検証待ち"}</em></article>
        <article><span>M15 現行 → 完全反転</span><strong>${command.specialistHistoricalBacktest.m15?.validation?.hitRate == null ? "--" : `${Math.round(command.specialistHistoricalBacktest.m15.validation.hitRate * 100)}%`} → ${command.specialistHistoricalBacktest.m15?.invertedValidation?.hitRate == null ? "--" : `${Math.round(command.specialistHistoricalBacktest.m15.invertedValidation.hitRate * 100)}%`}</strong><small>${command.specialistHistoricalBacktest.m15?.validation?.samples || 0}件 / コスト後 ${Number(command.specialistHistoricalBacktest.m15?.validation?.netReturnPct || 0).toFixed(3)}% → ${Number(command.specialistHistoricalBacktest.m15?.invertedValidation?.netReturnPct || 0).toFixed(3)}%</small><em>${command.specialistHistoricalBacktest.m15?.reflection?.decision || "反転検証待ち"}</em></article>
        <article><span>反省と採用判断</span><strong>${command.specialistHistoricalBacktest.accepted ? "候補" : "本番不採用"}</strong><small>反転が良くても、結果を見た後の選択は即採用しません。次の未使用期間で再現した場合だけ昇格します。</small></article>
      </div>
    </div>` : ""}
    <div class="segment-release-board ${usdGuard.blocked ? "blocked" : usdGuard.segmentReleased ? "released" : "learning"}">
      <header><div><span>USD/JPY 根拠別・停止解除検証</span><strong>${usdGuard.label || usdLedger.status || "独立標本を蓄積中"}</strong></div><b>${usdGuard.segmentReleased ? "正式解除" : usdGuard.blocked ? "停止継続" : "監視中"}</b></header>
      <div>${usdReleaseRows.slice(0, 4).map((row) => `<article><span>${row.key}</span><strong>${row.releaseConfirmed ? "解除確認" : row.releaseCandidate ? "前向き再検証" : "停止効果監視"}</strong><small>停止 ${row.blockedSamples}件 / 解除後 ${row.trialSamples}/15件</small><small>解除後一致 ${row.trialHitRate == null ? "--" : `${Math.round(row.trialHitRate * 100)}%`} / 期待値 ${row.trialExpectancyPct == null ? "--" : `${Number(row.trialExpectancyPct) >= 0 ? "+" : ""}${Number(row.trialExpectancyPct).toFixed(4)}%`}</small></article>`).join("") || `<article><span>USD/JPY複合条件</span><strong>標本蓄積中</strong><small>30件到達後に停止効果を検証</small></article>`}</div>
    </div>
    <div class="yen-cross-policy">
      <div><span>当局・介入監視</span><strong>${command.policy?.interventionLabel || "通常監視"}</strong><small>${command.policy?.method || "公開情報を監視中"}</small></div>
      <div><span>最新根拠</span><strong>${command.policy?.evidence?.length || 0}件</strong><small>${command.policy?.evidence?.[0]?.title || "関連発言を収集中"}</small></div>
    </div>
    <div class="yen-cross-paper">
      <div><span>EUR/USD・USD/JPY 共通仮想口座</span><strong>${Number(command.sharedPaperTrading?.equity || 10000000).toLocaleString("ja-JP")}円</strong><small>${command.sharedPaperTrading?.note || "総資金1,000万円・同時保有1件"}</small></div>
      <div><span>USD/JPY 前向き予測検証</span><strong>${command.paperTrading?.trades || 0}件 / ${command.paperTrading?.winRate == null ? "蓄積中" : `方向一致 ${Math.round(command.paperTrading.winRate * 100)}%`}</strong><small>${command.paperTrading?.status || "価格照合待ち"} / これは別口座ではなく予測成績です</small></div>
    </div>
    <div class="yen-cross-pipeline">${(command.pipeline || []).map((item) => `<div class="${["usdjpy", "eurjpy"].includes(item.id) ? "active" : "queued"}"><span>${item.label}</span><strong>${item.status}</strong></div>`).join("")}</div>
    <div class="yen-cross-safeguards">${(command.safeguards || []).map((item) => `<span>${item}</span>`).join("")}</div>
  `;
}

function renderValidationControl(leakage, gate, ledger) {
  if (!validationControlEl || !leakage || !gate || !ledger) return;
  const tone = gate.promotionAllowed ? "passed" : leakage.blockers > 0 ? "blocked" : "learning";
  validationControlPanelEl.className = `validation-control-wrap ${tone}`;
  validationControlStatusEl.textContent = gate.promotionAllowed ? "モデル昇格を許可" : leakage.blockers > 0 ? "モデル昇格を停止" : "検証標本を蓄積中";
  const percent = (value) => value === null || value === undefined ? "--" : `${(Number(value) * 100).toFixed(1)}%`;
  const signed = (value) => value === null || value === undefined ? "--" : `${Number(value) >= 0 ? "+" : ""}${Number(value).toFixed(4)}%`;
  const interval = (value, scale = 100, suffix = "%") => value?.low == null
    ? "95%区間は標本不足"
    : `95%区間 ${(Number(value.low) * scale).toFixed(1)}〜${(Number(value.high) * scale).toFixed(1)}${suffix}`;
  const releaseRows = ledger.segmentGuardValidation?.rows || [];
  validationControlEl.innerHTML = `
    <div class="forward-validation-milestone">
      <div class="forward-validation-title"><span>前向き検証マイルストーン</span><strong>${gate.decisionReadiness || "標本を蓄積中"}</strong><small>総合進捗 ${Math.round(Number(gate.overallProgress || 0) * 100)}% / 条件を満たしても利益や将来成績は保証されません</small></div>
      <div class="forward-validation-progress">${(gate.milestones || []).map((item) => `<div class="${item.passed ? "passed" : "collecting"}">
        <header><span>${item.label}</span><strong>${item.passed ? "判定可能" : `残り ${item.remaining}${item.unit}`}</strong></header>
        <i><b style="width:${Math.round(Number(item.progress || 0) * 100)}%"></b></i>
        <small>${item.current}/${item.target}${item.unit}・${Math.round(Number(item.progress || 0) * 100)}%</small>
      </div>`).join("")}</div>
    </div>
    <div class="validation-audit-summary">
      <div><span>未来情報監査</span><strong>${leakage.label}</strong><small>${leakage.inspectedRecords}予測群 / ${leakage.inspectedPredictions}銘柄予測</small></div>
      <div><span>遮断事項</span><strong class="${leakage.blockers ? "down" : "up"}">${leakage.blockers}件</strong><small>警告 ${leakage.warnings}件 / 時刻証跡 ${percent(leakage.timestampCoverage)}</small></div>
      <div><span>三者比較ゲート</span><strong>${gate.label}</strong><small>${gate.reasons.join(" / ") || "全条件を確認済み"}</small></div>
      <div><span>最大成績差</span><strong>${gate.maxHitRateGap === null ? "--" : `${(Number(gate.maxHitRateGap) * 100).toFixed(1)}pt`}</strong><small>許容上限 ${(Number(gate.thresholds?.maxHitRateGap || 0.18) * 100).toFixed(0)}pt</small></div>
    </div>
    <div class="validation-checks">
      ${(leakage.checks || []).map((check) => `<span class="${check.passed ? "ok" : "ng"}">${check.passed ? "通過" : "停止"} ${check.label}</span>`).join("")}
    </div>
    <div class="three-way-grid">
      ${(gate.rows || []).map((row) => `<div>
        <span>${row.label}</span><strong>${row.hitRate == null ? "--" : percent(row.hitRate)}</strong>
        <small>${row.samples || 0}件 / ${interval(row.hitRateInterval95)}</small>
        <small>期待値 ${row.expectancyPct == null ? "--" : signed(row.expectancyPct)}${row.profitFactor == null ? "" : ` / PF ${Number(row.profitFactor).toFixed(2)}`}</small>
        ${row.expectancyJpyInterval95 ? `<small>1取引損益95%区間 ${row.expectancyJpyInterval95.low == null ? "標本不足" : `${Math.round(row.expectancyJpyInterval95.low).toLocaleString("ja-JP")}〜${Math.round(row.expectancyJpyInterval95.high).toLocaleString("ja-JP")}円`}</small>` : ""}
      </div>`).join("")}
    </div>
    <div class="attribution-head"><span>予測根拠の成績台帳</span><strong>${ledger.status} / ${ledger.samples}標本</strong></div>
    <div class="attribution-grid">
      ${(ledger.factors || []).slice(0, 8).map((row) => `<div class="${Number(row.expectancyPct || 0) >= 0 ? "positive" : "negative"}">
        <span>${row.label}</span><strong>${percent(row.hitRate)}</strong><small>${row.samples}件 / コスト後 ${signed(row.expectancyPct)} / ${row.reliability}</small>
      </div>`).join("") || `<div><span>根拠台帳</span><strong>蓄積待ち</strong><small>期限後照合が増えると表示します</small></div>`}
    </div>
    <div class="attribution-combinations">
      <span>組み合わせ上位</span>
      ${(ledger.combinations || []).slice(0, 4).map((row) => `<b>${row.label} ${row.samples}件・${percent(row.hitRate)}</b>`).join("") || "<b>照合データを蓄積中</b>"}
    </div>
    <div class="segment-release-board ${ledger.segmentGuardValidation?.status || "learning"}">
      <header><div><span>EUR/USD 停止解除の前向き審査</span><strong>${ledger.segmentGuardValidation?.status === "release-confirmed" ? "独立検証で正式解除を確認" : ledger.segmentGuardValidation?.status === "forward-validating" ? "解除候補を前向き再検証中" : "停止効果を反実仮想検証中"}</strong></div><b>${ledger.segmentGuardValidation?.blockedPredictions || 0}件を検証</b></header>
      <div>${releaseRows.slice(0, 6).map((row) => `<article class="${row.releaseConfirmed ? "released" : row.releaseCandidate ? "candidate" : "monitoring"}"><span>${row.key}</span><strong>${row.releaseConfirmed ? "正式解除" : row.releaseCandidate ? "解除候補" : "監視中"}</strong><small>停止 ${row.blockedSamples}件 / 候補後 ${row.trialSamples}/15件</small><small>方向一致 ${row.trialHitRate == null ? "--" : percent(row.trialHitRate)} / コスト後 ${row.trialExpectancyPct == null ? "--" : signed(row.trialExpectancyPct)}</small><small>${interval(row.trialHitRateInterval95)} / 期待値 ${row.trialExpectancyInterval95?.low == null ? "95%区間は標本不足" : `${signed(row.trialExpectancyInterval95.low)}〜${signed(row.trialExpectancyInterval95.high)}`}</small></article>`).join("") || `<article><span>複合条件</span><strong>標本蓄積中</strong><small>30件到達後に停止効果を検証します</small></article>`}</div>
    </div>
    <p class="validation-method">${leakage.method}。${gate.method}。${ledger.method}。</p>
  `;
}

function renderAiImprovement(improvement, factorAllocator) {
  if (!aiImprovementEl || !improvement) return;
  const score = Number(improvement.score || 0);
  const tone = score >= 74 ? "up" : score >= 55 ? "flat" : "down";
  aiImprovementPanelEl.className = `ai-improvement-wrap ${tone}`;
  aiImprovementStatusEl.textContent = `${improvement.status || "自己診断中"} / ${score}点`;
  const hitRate = improvement.hitRate === null || improvement.hitRate === undefined ? "--" : pctText(improvement.hitRate);
  const mae = improvement.maePct === null || improvement.maePct === undefined ? "--" : maeText(improvement.maePct);
  const issues = improvement.issues || [];
  const actions = improvement.actions || [];
  const plan = improvement.learningPlan || [];
  const drivers = improvement.topDrivers || [];
  const technicalRows = improvement.technicalRows || [];
  const activeAdjustment = improvement.activeAdjustment || {};
  const smartMoney = improvement.smartMoney || {};
  const factorRows = Object.values(factorAllocator?.factors || {});
  const factorProgress = factorAllocator
    ? `${Math.min(Number(factorAllocator.independentSamples || 0), Number(factorAllocator.periodSamples || 20) * 2)}/${Number(factorAllocator.periodSamples || 20) * 2}`
    : "0/40";
  aiImprovementEl.innerHTML = `
    <div class="ai-improvement-main">
      <div class="ai-improvement-score">
        <span>自己診断スコア</span>
        <strong>${score}</strong>
        <small>EUR/USD照合 ${improvement.completed || 0}件 / 方向一致 ${hitRate} / 平均誤差 ${mae}</small>
      </div>
      <div class="ai-improvement-verdict">
        <span>次の改善方針</span>
        <strong>${actions[0] || "保存件数を増やして校正を続けます。"}</strong>
        <small>データヘルス ${improvement.dataHealth || "未確認"} / ${activeAdjustment.note || "通常補正です。"}</small>
      </div>
    </div>
    <div class="factor-adaptation-panel">
      <div class="ai-technical-head">
        <span>4時間 要因別適応システム</span>
        <strong>${factorAllocator?.modelVersion || "現行モデル確認中"} / ${factorProgress}独立標本</strong>
      </div>
      <small class="factor-adaptation-policy">継続台帳 ${factorAllocator?.continuity?.storedSamples || 0}標本 / ${factorAllocator?.continuity?.storedModels || 0}モデル / ${factorAllocator?.continuity?.updatedAt ? formatTime(factorAllocator.continuity.updatedAt) : "保存待ち"}</small>
      <div class="factor-adaptation-grid">
        ${factorRows.map((factor) => {
          const multiplier = Number(factor.multiplier || 1);
          const tone = multiplier < 1 ? "reduced" : multiplier > 1 ? "boosted" : "learning";
          const recent = factor.recent || {};
          const previous = factor.previous || {};
          const net = (value) => value == null ? "--" : `${Number(value) >= 0 ? "+" : ""}${Number(value).toFixed(4)}%`;
          const interval = (value) => value?.low == null ? "標本不足" : `${net(value.low)}〜${net(value.high)}`;
          return `<article class="factor-adaptation-card ${tone}">
            <header><span>${factor.label}</span><strong>×${multiplier.toFixed(2)}</strong></header>
            <b>${factor.status || "検証中"}</b>
            <div><span>前期間 ${previous.samples || 0}/${factorAllocator.periodSamples}</span><strong>${net(previous.averageNetPct)}</strong><small>95% ${interval(previous.interval95)}</small></div>
            <div><span>直近 ${recent.samples || 0}/${factorAllocator.periodSamples}</span><strong>${net(recent.averageNetPct)}</strong><small>95% ${interval(recent.interval95)}</small></div>
          </article>`;
        }).join("") || `<article class="factor-adaptation-card learning"><header><span>要因別検証</span><strong>×1.00</strong></header><b>現行モデルの4時間結果を待機中</b><div><span>前期間</span><strong>--</strong><small>20件から判定</small></div><div><span>直近</span><strong>--</strong><small>20件から判定</small></div></article>`}
      </div>
      <small class="factor-adaptation-policy">${factorAllocator?.policy || "前後二期間のコスト控除後実績が一致した場合だけ、予測要因の重みを安全範囲で変更します。"}</small>
    </div>
    <div class="ai-technical-explain">
      <div class="ai-technical-head">
        <span>予測に使ったテクニカル根拠</span>
        <strong>坂田五法・包み足・三尊・フィボナッチ・トレンド</strong>
      </div>
      <div class="ai-technical-grid">
        ${technicalRows.slice(0, 6).map((row) => `
          <div class="ai-technical-card ${row.direction || "flat"}">
            <div>
              <strong>${row.label}</strong>
              <span>${row.summary || "判定中"} / スコア ${row.score || 0}</span>
            </div>
            ${(row.patterns || []).slice(0, 3).map((pattern) => `
              <p><b>${pattern.name}</b><small>${pattern.reason}</small></p>
            `).join("")}
            <em>${row.newsWarning || "ニュース圧力を同時監視しています。"}</em>
          </div>
        `).join("") || `<div class="ai-technical-card flat"><strong>分析待ち</strong><span>ローソク足データ取得後に表示します。</span></div>`}
      </div>
    </div>
    <div class="smart-money-panel">
      <div class="ai-technical-head">
        <span>大口監視・だまし判定</span>
        <strong>${smartMoney.status || "通常監視"} / ${smartMoney.score || 0}点</strong>
      </div>
      <div class="smart-money-grid">
        ${(smartMoney.rows || []).slice(0, 6).map((row) => `
          <div class="smart-money-card ${row.direction || "flat"}">
            <div>
              <strong>${row.label}</strong>
              <span>${row.verdict || "通常監視"}</span>
            </div>
            <p>${(row.labels || ["通常フロー"]).join(" / ")}</p>
            <small>${(row.reasons || ["大口・介入らしさは推定で監視中です。"])[0]}</small>
          </div>
        `).join("") || `<div class="smart-money-card flat"><strong>監視中</strong><span>大口フロー推定を準備しています。</span></div>`}
      </div>
      <div class="smart-money-sources">
        ${(smartMoney.sources || []).slice(0, 5).map((source) => `
          <a href="${source.url}" target="_blank" rel="noreferrer">
            <strong>${source.label}</strong>
            <span>${source.category}</span>
            <small>${source.usage}</small>
          </a>
        `).join("")}
      </div>
    </div>
    <div class="ai-improvement-grid">
      <div class="ai-improvement-column">
        <span>弱点検出</span>
        ${(issues.length ? issues : [{ label: "大きな弱点なし", severity: "low", detail: "現在は通常学習を継続します。" }]).map((item) => `
          <div class="ai-issue ${item.severity || "low"}">
            <strong>${item.label}</strong>
            <small>${item.detail}</small>
          </div>
        `).join("")}
      </div>
      <div class="ai-improvement-column">
        <span>改善アクション</span>
        ${actions.map((item, index) => `
          <div class="ai-action">
            <strong>${index + 1}</strong>
            <small>${item}</small>
          </div>
        `).join("")}
      </div>
    </div>
    <div class="ai-learning-plan">
      ${plan.map((item) => `
        <div>
          <span>${item.label}</span>
          <strong>${item.value}</strong>
          <small>${item.detail}</small>
        </div>
      `).join("")}
    </div>
    <div class="ai-driver-row">
      ${(drivers.length ? drivers : [{ label: "学習補正", direction: "flat" }]).map((driver) => `
        <span class="${driver.direction || "flat"}">${driver.label}</span>
      `).join("")}
    </div>
    <div class="ai-reflection-box">
      <span>直近の反省メモ</span>
      <strong>${improvement.latestReflection?.summary || "まだ大きな外れは検出されていません。"}</strong>
      <small>${improvement.latestReflection?.adjustmentHint || "予測を保存し、期限到達後に実測と照合して自動反省します。"}</small>
    </div>
  `;
}

function nextDailyLearningAt(now = new Date()) {
  const next = new Date(now);
  next.setUTCHours(3, 17, 0, 0);
  if (next <= now) next.setUTCDate(next.getUTCDate() + 1);
  return next;
}

function renderMobileLearningStatus(snapshot) {
  if (!mobileLearningStatusEl) return;
  const generatedAt = new Date(snapshot?.generatedAt || 0);
  const valid = Number.isFinite(generatedAt.getTime());
  const ageMinutes = valid ? Math.max(0, Math.floor((Date.now() - generatedAt.getTime()) / 60_000)) : Infinity;
  const warningMinutes = STATIC_PREVIEW_MODE ? 24 * 60 : 5;
  const criticalMinutes = STATIC_PREVIEW_MODE ? 48 * 60 : 20;
  const tone = ageMinutes >= criticalMinutes ? "critical" : ageMinutes >= warningMinutes ? "warning" : "live";
  mobileLearningStatusEl.className = `mobile-learning-status ${tone}`;
  mobileDataFreshnessEl.textContent = !valid ? "時刻不明"
    : ageMinutes < 1 ? "1分以内"
      : ageMinutes < 60 ? `${ageMinutes}分前`
        : `${Math.floor(ageMinutes / 60)}時間前`;
  mobileAnalysisTimeEl.textContent = valid
    ? generatedAt.toLocaleString("ja-JP", { month: "numeric", day: "numeric", hour: "2-digit", minute: "2-digit" })
    : "--";
  const allocator = snapshot?.context?.fxCausalModel?.fourHourFactorAllocator;
  mobileLedgerStatusEl.textContent = allocator?.continuity?.ledgerVersion
    ? `${allocator.continuity.storedSamples || 0}標本 / ${allocator.continuity.storedModels || 0}モデル`
    : "台帳準備中";
  if (STATIC_PREVIEW_MODE) {
    mobileNextLearningEl.textContent = nextDailyLearningAt().toLocaleString("ja-JP", {
      month: "numeric", day: "numeric", hour: "2-digit", minute: "2-digit"
    });
  } else {
    const intervalMinutes = Number(snapshot?.backgroundLearning?.intervalMinutes || 30);
    const lastAt = Date.parse(snapshot?.backgroundLearning?.lastSuccessAt || snapshot?.generatedAt || 0);
    const nextAt = Number.isFinite(lastAt) ? new Date(lastAt + intervalMinutes * 60_000) : null;
    mobileNextLearningEl.textContent = nextAt
      ? nextAt.toLocaleTimeString("ja-JP", { hour: "2-digit", minute: "2-digit" })
      : `${intervalMinutes}分周期`;
  }
}

function renderOperationalReadiness(snapshot) {
  if (!operationalReadinessBarEl || !operationalReadinessStateEl || !operationalReadinessChecksEl) return;
  const generatedAt = Date.parse(snapshot?.generatedAt || "");
  const ageSeconds = Number.isFinite(generatedAt)
    ? Math.max(0, Math.round((Date.now() - generatedAt) / 1000))
    : Infinity;
  const gate = snapshot?.operationalGate || {};
  const checks = Array.isArray(gate.checks) ? gate.checks : [];
  const escape = (value) => String(value ?? "").replace(/[&<>"']/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[character]);

  if (STATIC_PREVIEW_MODE) {
    operationalReadinessBarEl.className = "operational-readiness-bar preview";
    operationalReadinessStateEl.textContent = "確認版・保存済みデータ（新規発注判断には使用しない）";
  } else {
    const ready = gate.ready === true && ageSeconds <= 6 * 60;
    operationalReadinessBarEl.className = `operational-readiness-bar ${ready ? "ready" : "blocked"}`;
    operationalReadinessStateEl.textContent = ready
      ? "本格稼働条件を通過"
      : ageSeconds > 6 * 60
        ? "停止：画面データが6分以上更新されていません"
        : gate.label || "停止：稼働条件を確認してください";
  }

  if (!checks.length) {
    operationalReadinessChecksEl.innerHTML = `<span class="failed">${STATIC_PREVIEW_MODE ? "公開確認用スナップショット" : "詳細判定を同期中"}</span>`;
    return;
  }
  operationalReadinessChecksEl.innerHTML = checks.map((check) => `
    <span class="${check.passed ? "passed" : "failed"}" title="${escape(check.detail || "")}">
      <i aria-hidden="true"></i>${escape(check.label || check.key)}
    </span>
  `).join("");
}

function renderFearGreed(fearGreed) {
  if (!fearGreed) return;
  const score = Number(fearGreed.score || 0);
  greedLabelEl.textContent = fearGreed.label || "分析中";
  greedScoreEl.textContent = score;
  greedBarEl.style.width = `${score}%`;
  greedBarEl.className = score >= 58 ? "greed" : score <= 42 ? "fear" : "neutral";
  greedComponentsEl.innerHTML = (fearGreed.components || []).map((component) => `
    <div class="greed-component">
      <span>${component.label}</span>
      <strong>${component.value}%</strong>
      <small>${component.detail}</small>
    </div>
  `).join("");
}

function renderCountryRisk(items) {
  const ranking = (items || []).slice(0, 6);
  countryRiskEl.innerHTML = ranking.map((item) => `
    <div class="country-risk-item ${item.level === "高" ? "high" : item.level === "中" ? "mid" : "low"}">
      <div>
        <strong>${item.label}</strong>
        <span>${item.risk}% / ${item.level}</span>
      </div>
      <i><b style="width:${item.risk}%"></b></i>
      <small>${item.reason}</small>
    </div>
  `).join("");
}

function renderMapLiveFx(markets, generatedAt = new Date().toISOString()) {
  if (!mapLiveFxEl || !mapLiveFxQuotesEl) return;
  const selected = ["eurusd", "usdjpy"].map((id) => (markets || []).find((market) => market.id === id)).filter(Boolean);
  if (!selected.length) return;
  let allFresh = true;
  mapLiveFxQuotesEl.innerHTML = selected.map((market) => {
    const value = Number(market.value ?? market.quote?.value ?? market.forecast?.current);
    const previous = previousLiveFxValues.get(market.id);
    const direction = Number.isFinite(previous) && value !== previous ? value > previous ? "up" : "down" : "flat";
    if (Number.isFinite(value)) previousLiveFxValues.set(market.id, value);
    const decimals = Number(market.decimals ?? (market.id === "eurusd" ? 5 : 3));
    const freshness = Number(market.freshnessSeconds ?? market.quote?.freshnessSeconds ?? Infinity);
    const fresh = !market.synthetic && !market.quote?.synthetic && freshness <= 180;
    allFresh &&= fresh;
    const sourceCount = Number(market.sourceCount ?? market.quote?.trustedSourceCount ?? market.quote?.sourceCount ?? 0);
    const detail = fresh
      ? `${Math.round(freshness)}秒前${sourceCount ? ` / ${sourceCount}系統` : ""}`
      : market.at || market.quote?.at ? "最終確認値" : "取得待ち";
    return `<div class="${direction}"><span>${market.label}</span><strong>${Number.isFinite(value) && value > 0 ? value.toFixed(decimals) : "-----"}</strong><small>${detail}</small></div>`;
  }).join("");
  mapLiveFxEl.classList.toggle("stale", !allFresh);
  mapLiveFxTimeEl.textContent = new Date(generatedAt).toLocaleTimeString("ja-JP", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
}

function mergeLiveFxIntoSnapshot(rows = [], generatedAt = new Date().toISOString()) {
  if (!latestSnapshot || !rows.length) return;
  const liveById = new Map(rows.map((row) => [row.id, row]));
  latestSnapshot.markets = (latestSnapshot.markets || []).map((market) => {
    const live = liveById.get(market.id);
    if (!live) return market;
    return {
      ...market,
      quote: {
        ...(market.quote || {}),
        value: Number(live.value),
        change24h: Number(live.changePct || 0),
        provider: live.provider,
        at: live.at,
        freshnessSeconds: Number(live.freshnessSeconds),
        synthetic: live.synthetic === true,
        consensusVerified: live.consensusVerified === true,
        trustedSourceCount: Number(live.sourceCount || 0),
        sourceCount: Number(live.sourceCount || 0),
        sourceDeviationPct: Number(live.sourceDeviationPct || 0)
      }
    };
  });
  latestSnapshot.generatedAt = generatedAt || latestSnapshot.generatedAt;
}

async function refreshMapLiveFx() {
  if (!mapLiveFxEl || document.hidden) return;
  try {
    const response = await fetch("/api/live-fx", {
      cache: "no-cache",
      headers: liveFxEtag ? { "If-None-Match": liveFxEtag } : {}
    });
    if (response.status === 304) return;
    if (!response.ok) throw new Error(`API ${response.status}`);
    liveFxEtag = response.headers.get("etag") || liveFxEtag;
    const payload = await response.json();
    const liveMarkets = payload.markets || [];
    renderMapLiveFx(liveMarkets, payload.generatedAt);
    mergeLiveFxIntoSnapshot(liveMarkets, payload.generatedAt);
    refreshLivePivotCandles(liveMarkets);
    if (latestSnapshot) {
      renderPairDecisionDeck(latestSnapshot);
      renderMarketTape(latestSnapshot.markets);
      renderForecastNewsflash(
        latestSnapshot.eurusdTimeframes || [],
        latestSnapshot.markets.find((market) => market.id === "eurusd")
      );
    }
    if (payload.paperTrading) {
      renderPaperTrading(payload.paperTrading, latestSnapshot?.shadowPaperTrading, latestSnapshot?.paperTradingComparison);
      renderTradeOpportunityMonitor(payload.paperTrading, latestSnapshot?.probabilitySimulation, latestSnapshot?.yenCrossCommand, latestSnapshot?.threeWayGate);
      renderPivotTradeOverlays(payload.paperTrading, latestSnapshot?.markets || liveMarkets);
      if (latestSnapshot) latestSnapshot.paperTrading = payload.paperTrading;
    }
    if (payload.yttDemoTrading) {
      renderYttDemoTrading(payload.yttDemoTrading);
      if (latestSnapshot) latestSnapshot.yttDemoTrading = payload.yttDemoTrading;
    }
  } catch {
    mapLiveFxEl.classList.add("stale");
    mapLiveFxTimeEl.textContent = "再接続中";
  }
}

function renderIntegratedIntelligence(fearGreed, countryRisk, focusRanking) {
  if (!integratedIntelligenceSummaryEl) return;
  const topCountry = (countryRisk || [])[0];
  const topFocus = (focusRanking || [])[0];
  integratedIntelligenceSummaryEl.innerHTML = `
    <div><span>市場心理</span><strong>${fearGreed?.label || "分析中"} ${Number(fearGreed?.score || 0)}</strong><small>モデル特徴量は継続使用</small></div>
    <div><span>最大地域リスク</span><strong>${topCountry ? `${topCountry.label} ${topCountry.risk}%` : "監視中"}</strong><small>${topCountry?.reason || "重大時はアラートへ統合"}</small></div>
    <div><span>最重要テーマ</span><strong>${topFocus?.label || "分析中"}</strong><small>${topFocus ? `注目度 ${Number(topFocus.score || 0).toFixed(2)}` : "ニュースを統合中"}</small></div>
  `;
}

function renderHistory(history) {
  const completed = history.flatMap((record) => {
    return Object.values(record.predictions || {})
      .filter((prediction) => prediction.actual !== null)
      .slice(0, 1)
      .map((prediction) => ({ record, prediction }));
  });

  historyCountEl.textContent = `${completed.length}件照合`;

  if (!history.length) {
    historyEl.innerHTML = `<div class="history-item"><strong>学習待機中</strong><span>最初の10分後に照合が始まります。</span></div>`;
    return;
  }

  historyEl.innerHTML = history.slice(0, 8).map((record) => {
    const checked = Object.values(record.predictions || {}).filter((prediction) => prediction.actual !== null);
    const meanError = checked.length
      ? checked.reduce((sum, prediction) => sum + Math.abs(prediction.errorPct || 0), 0) / checked.length
      : null;
    return `
      <div class="history-item">
        <strong>${new Date(record.createdAt).toLocaleTimeString("ja-JP")}</strong>
        <span>${checked.length ? `平均誤差 ${(meanError * 100).toFixed(3)}%` : `${new Date(record.dueAt).toLocaleTimeString("ja-JP")} に照合`}</span>
      </div>
    `;
  }).join("");
}

function renderRisk(context) {
  const pct = Math.round((context.disasterRisk || 0) * 100);
  riskValueEl.textContent = `${pct}%`;
  riskMeterEl.style.width = `${pct}%`;
}

function renderSignals(signals, context) {
  const policy = Number(context.policyBias || 0);
  const risk = Number(context.newsRiskBias || 0);
  const fear = Number(context.fearIndex || 0);
  const bullish = Number(context.bullishIndex || 0);
  signalScoreEl.textContent = `政策 ${policy.toFixed(2)} / リスク ${risk.toFixed(2)} / 恐怖 ${fear.toFixed(2)} / 強気 ${bullish.toFixed(2)}`;

  const items = (signals.items || []).slice(0, 6);
  signalsEl.innerHTML = items.map((item) => `
    <a class="signal-item" href="${item.url || "#"}" target="_blank" rel="noreferrer">
      <strong>${item.source}${item.domain ? ` / ${item.domain}` : ""}</strong>
      <span>${item.japaneseTitle || item.title}</span>
    </a>
  `).join("");
}

function renderAiBriefing(briefing) {
  if (!briefing) return;
  briefingHeadlineEl.textContent = briefing.headline;
  briefingSummaryEl.textContent = briefing.summary;
  briefingActionEl.textContent = briefing.action;
}

function renderWorldPulse(pulse, briefing) {
  if (!pulse) return;
  pulseRegimeEl.textContent = briefing?.regime || "分析中";
  const rows = [
    ["市場の広がり", `${pulse.marketBreadth}%`, `${pulse.upCount}上昇 / ${pulse.downCount}下落`],
    ["アラート圧力", `${pulse.alertPressure}%`, "急変・予測乖離"],
    ["恐怖度", `${pulse.sentiment.fear}%`, "ニュース/SNS"],
    ["強気度", `${pulse.sentiment.bullish}%`, "ニュース/SNS"],
    ["政策圧力", `${pulse.sentiment.policy}%`, "中銀・金利"],
    ["学習スコア", `${pulse.learningScore}%`, "過去照合"]
  ];
  pulseGridEl.innerHTML = rows.map(([label, value, detail]) => `
    <div class="pulse-tile">
      <span>${label}</span>
      <strong>${value}</strong>
      <small>${detail}</small>
    </div>
  `).join("");
}

function renderScenarioOutlook(scenarios) {
  scenarioGridEl.innerHTML = (scenarios || []).map((scenario) => `
    <div class="scenario-card ${scenario.active ? "active" : ""}">
      <div>
        <strong>${scenario.name}</strong>
        <span>${scenario.probability}%</span>
      </div>
      <i style="width:${scenario.probability}%"></i>
      <small>${scenario.detail}</small>
    </div>
  `).join("");
}

function renderFocusRanking(items) {
  const ranking = (items || []).slice(0, 6);
  focusListEl.innerHTML = ranking.map((item, index) => `
    <div class="focus-item">
      <strong>${index + 1}. ${item.label}</strong>
      <span>注目度 ${item.score.toFixed(2)} / 関連ニュース ${item.mentions} / アラート ${item.alertCount}</span>
      <small>${item.reason}</small>
    </div>
  `).join("");
}

function playAlertTone(severity, { force = false, preview = false } = {}) {
  if (!soundEnabled && !force) return;
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  if (!AudioContext) return;
  const ctx = new AudioContext();
  if (severity === "critical") {
    const duration = preview ? 1.8 : 3.2;
    const oscillator = ctx.createOscillator();
    const gain = ctx.createGain();
    oscillator.type = "sawtooth";
    oscillator.frequency.setValueAtTime(620, ctx.currentTime);
    for (let at = 0; at < duration; at += 0.55) {
      oscillator.frequency.linearRampToValueAtTime(980, ctx.currentTime + Math.min(duration, at + 0.27));
      oscillator.frequency.linearRampToValueAtTime(620, ctx.currentTime + Math.min(duration, at + 0.55));
    }
    gain.gain.setValueAtTime(0.0001, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.11, ctx.currentTime + 0.05);
    gain.gain.setValueAtTime(0.11, ctx.currentTime + Math.max(0.06, duration - 0.08));
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);
    oscillator.connect(gain);
    gain.connect(ctx.destination);
    oscillator.start();
    oscillator.stop(ctx.currentTime + duration);
    oscillator.addEventListener("ended", () => ctx.close().catch(() => undefined));
    return;
  }
  const pulses = [620, 520];
  pulses.forEach((frequency, index) => {
    const oscillator = ctx.createOscillator();
    const gain = ctx.createGain();
    const start = ctx.currentTime + index * 0.22;
    oscillator.type = severity === "critical" ? "sawtooth" : "sine";
    oscillator.frequency.value = frequency;
    gain.gain.setValueAtTime(0.0001, start);
    gain.gain.exponentialRampToValueAtTime(severity === "critical" ? 0.12 : 0.08, start + 0.03);
    gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.18);
    oscillator.connect(gain);
    gain.connect(ctx.destination);
    oscillator.start(start);
    oscillator.stop(start + 0.2);
  });
  setTimeout(() => ctx.close().catch(() => undefined), 700);
}

function stopMarketSoundscape() {
  if (soundscapeTimer) clearInterval(soundscapeTimer);
  soundscapeTimer = null;
  soundscapeNodes.forEach((node) => {
    try { node.stop?.(); } catch {}
    try { node.disconnect?.(); } catch {}
  });
  soundscapeNodes = [];
  if (soundscapeMaster && soundscapeContext) {
    const now = soundscapeContext.currentTime;
    soundscapeMaster.gain.cancelScheduledValues(now);
    soundscapeMaster.gain.setValueAtTime(Math.max(0.0001, soundscapeMaster.gain.value), now);
    soundscapeMaster.gain.exponentialRampToValueAtTime(0.0001, now + 0.18);
  }
  soundscapeMode = "off";
}

function ensureSoundscapeContext() {
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  if (!AudioContext) return null;
  if (!soundscapeContext || soundscapeContext.state === "closed") {
    soundscapeContext = new AudioContext();
    soundscapeMaster = soundscapeContext.createGain();
    soundscapeMaster.gain.value = 0.0001;
    soundscapeMaster.connect(soundscapeContext.destination);
  }
  soundscapeContext.resume?.().catch(() => undefined);
  return soundscapeContext;
}

function playSoundscapeNote(frequency, start, duration, volume, type = "sine") {
  const ctx = soundscapeContext;
  if (!ctx || !soundscapeMaster) return;
  const oscillator = ctx.createOscillator();
  const gain = ctx.createGain();
  oscillator.type = type;
  oscillator.frequency.setValueAtTime(frequency, start);
  gain.gain.setValueAtTime(0.0001, start);
  gain.gain.exponentialRampToValueAtTime(volume, start + Math.min(0.08, duration / 4));
  gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
  oscillator.connect(gain);
  gain.connect(soundscapeMaster);
  oscillator.start(start);
  oscillator.stop(start + duration + 0.02);
}

function startAmbientSoundscape() {
  const ctx = ensureSoundscapeContext();
  if (!ctx || !soundscapeMaster) return;
  const now = ctx.currentTime;
  soundscapeMaster.gain.cancelScheduledValues(now);
  soundscapeMaster.gain.setValueAtTime(0.0001, now);
  soundscapeMaster.gain.exponentialRampToValueAtTime(0.42, now + 0.7);
  [174.61, 261.63].forEach((frequency, index) => {
    const oscillator = ctx.createOscillator();
    const gain = ctx.createGain();
    oscillator.type = "sine";
    oscillator.frequency.value = frequency;
    gain.gain.value = index === 0 ? 0.018 : 0.009;
    oscillator.connect(gain);
    gain.connect(soundscapeMaster);
    oscillator.start();
    soundscapeNodes.push(oscillator, gain);
  });
  const chime = () => {
    const start = ctx.currentTime + 0.03;
    [349.23, 440, 523.25].forEach((frequency, index) => playSoundscapeNote(frequency, start + index * 0.32, 1.8, 0.018));
  };
  chime();
  soundscapeTimer = setInterval(chime, 9000);
  soundscapeMode = "ambient";
}

function startTradeSoundscape(side) {
  const ctx = ensureSoundscapeContext();
  if (!ctx || !soundscapeMaster) return;
  const now = ctx.currentTime;
  soundscapeMaster.gain.cancelScheduledValues(now);
  soundscapeMaster.gain.setValueAtTime(0.0001, now);
  soundscapeMaster.gain.exponentialRampToValueAtTime(0.52, now + 0.25);
  const notes = side === "long"
    ? [261.63, 329.63, 392, 523.25]
    : [293.66, 349.23, 440, 523.25];
  let step = 0;
  const pulse = () => {
    const start = ctx.currentTime + 0.02;
    playSoundscapeNote(notes[step % notes.length], start, 0.28, 0.055, "triangle");
    if (step % 2 === 0) playSoundscapeNote(notes[0] / 2, start, 0.18, 0.045, "sine");
    step += 1;
  };
  pulse();
  soundscapeTimer = setInterval(pulse, 430);
  soundscapeMode = `trade-${side}`;
}

function syncMarketSoundscape(position = null) {
  const requestedMode = !soundEnabled ? "off" : position ? `trade-${position.side}` : "ambient";
  if (soundToggleEl) {
    const modeLabel = requestedMode === "ambient"
      ? "待機音"
      : requestedMode === "trade-long"
        ? "買い"
        : requestedMode === "trade-short"
          ? "売り"
          : "";
    soundToggleEl.textContent = soundEnabled ? `音響 ON${modeLabel ? `・${modeLabel}` : ""}` : "音響 OFF";
    soundToggleEl.title = soundEnabled
      ? `${modeLabel || "音響"}を再生中。押すと停止します`
      : "押すと待機中はリラックス音、仮想取引中はトレード音を再生します";
  }
  if (requestedMode === soundscapeMode) return;
  stopMarketSoundscape();
  if (!soundEnabled) return;
  if (position) startTradeSoundscape(position.side);
  else startAmbientSoundscape();
}

function previewMarketSoundscape() {
  soundPreviewTimers.forEach(clearTimeout);
  soundPreviewTimers = [];
  soundPreviewActive = true;
  soundEnabled = true;
  localStorage.setItem("worldPredictionSound", "on");
  const showStage = (side, label) => {
    stopMarketSoundscape();
    if (paperPositionBarEl) paperPositionBarEl.className = `paper-position-bar active ${side} ${side === "long" ? "profit" : "loss"}`;
    if (paperPositionStateEl) paperPositionStateEl.textContent = `音響デモ：${label}`;
    if (soundToggleEl) soundToggleEl.textContent = `音響 ON・${label}`;
    startTradeSoundscape(side);
  };
  showStage("long", "買い");
  soundPreviewTimers.push(setTimeout(() => showStage("short", "売り"), 3500));
  soundPreviewTimers.push(setTimeout(() => {
    soundPreviewActive = false;
    const official = latestSnapshot?.paperTrading;
    const shadow = latestSnapshot?.shadowPaperTrading;
    if (official) renderPaperPositionBar(official, shadow);
    else syncMarketSoundscape(null);
  }, 7000));
}

function notificationSupported() {
  return "Notification" in window && "serviceWorker" in navigator && window.isSecureContext;
}

function showOpenedNotificationDetail() {
  const params = new URLSearchParams(location.search);
  const notice = params.get("notice");
  if (!notice) return;
  const escape = (value) => String(value ?? "").replace(/[&<>"']/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[character]);
  const title = params.get("noticeTitle") || "通知の詳細";
  const body = params.get("noticeBody") || "該当する監視画面を表示しています。";
  const at = params.get("noticeAt");
  const panel = document.createElement("aside");
  panel.className = `opened-notification ${notice === "paper-close" || notice === "market-alert" ? "important" : ""}`;
  panel.setAttribute("role", "status");
  panel.innerHTML = `
    <div>
      <small>通知から開きました${at ? ` / ${new Date(at).toLocaleString("ja-JP")}` : ""}</small>
      <strong>${escape(title)}</strong>
      <span>${escape(body)}</span>
    </div>
    <button type="button" aria-label="通知詳細を閉じる">×</button>
  `;
  document.body.append(panel);
  panel.querySelector("button")?.addEventListener("click", () => panel.remove());
  if (params.get("siren") === "1") {
    soundEnabled = true;
    localStorage.setItem("worldPredictionSound", "on");
    soundToggleEl.textContent = "音響 ON";
    playAlertTone("critical", { force: true });
  }
  requestAnimationFrame(() => {
    const target = location.hash ? document.querySelector(location.hash) : null;
    target?.scrollIntoView({ behavior: "smooth", block: "start" });
    target?.classList.add("notification-target");
    setTimeout(() => target?.classList.remove("notification-target"), 6000);
  });
}

function updateNotificationUi() {
  if (!notifyToggleEl) return;
  const supported = NATIVE_APP_MODE || notificationSupported();
  notifyToggleEl.disabled = !supported;
  if (!supported) {
    notifyToggleEl.textContent = "通知非対応";
    return;
  }
  const ready = NATIVE_APP_MODE
    ? notificationsEnabled
    : notificationsEnabled && Notification.permission === "granted";
  notifyToggleEl.textContent = ready ? "通知＋サイレン ON" : "通知＋サイレン OFF";
}

function renderPaperAccount(data, panelEl, statusEl, containerEl, { shadow = false } = {}) {
  if (!panelEl || !statusEl || !containerEl || !data) return;
  const tone = data.position ? (data.position.side === "long" ? "up" : "down") : data.riskLocked ? "locked" : "waiting";
  const yen = (value) => `${Number(value || 0).toLocaleString("ja-JP", { maximumFractionDigits: 0 })}円`;
  const signedYen = (value) => `${Number(value || 0) >= 0 ? "+" : ""}${yen(value)}`;
  const validationTierLabel = (tier, riskPct = 0.1) => tier === "fundamental"
    ? `重要材料検証 ${riskPct}%`
    : tier === "counterfactual_release"
      ? `選択解除・1ロット試験 ${riskPct}%`
      : tier === "exploration"
        ? `能力向上・1ロット探索 ${riskPct}%`
      : tier === "trial"
        ? `低リスク試験 ${riskPct}%`
        : "通常検証";
  const holdingMinutes = (trade) => {
    const saved = Number(trade?.holdingMinutes);
    if (Number.isFinite(saved) && saved >= 0) return Math.round(saved);
    const opened = Date.parse(trade?.openedAt || "");
    const closed = Date.parse(trade?.closedAt || "");
    return Number.isFinite(opened) && Number.isFinite(closed) && closed >= opened
      ? Math.round((closed - opened) / 60000)
      : null;
  };
  const durationLabel = (minutes) => {
    if (!Number.isFinite(minutes)) return "--";
    const hours = Math.floor(minutes / 60);
    const rest = minutes % 60;
    return hours ? `${hours}時間${rest ? `${rest}分` : ""}` : `${rest}分`;
  };
  panelEl.className = `paper-trading-wrap ${shadow ? "shadow" : "official"} ${tone}`;
  statusEl.textContent = `${data.action || "監視中"} / 総資産 ${yen(data.equity)}`;
  const position = data.position;
  const pairLabel = position?.pairLabel || data.currentPairLabel || "EUR/USD";
  const priceDigits = pairLabel === "USD/JPY" ? 3 : 5;
  const conditions = data.nextEntryConditions || [];
  const snapshot = position?.entrySnapshot || null;
  const estimatedMaxLossJpy = position && Number.isFinite(Number(position.estimatedMaxLossJpy))
    ? Number(position.estimatedMaxLossJpy)
    : Number(position?.notionalJpy || 0) * (Number(position?.stopPct || 0) + Number(position?.roundTripCostPct || 0)) / 100;
  const emergency = position?.emergencyMonitor || null;
  containerEl.innerHTML = `
    ${shadow && data.automation ? `<div class="paper-automation ${data.automation.enabled && !data.riskLocked ? "active" : "paused"}">
      <div><i></i><span>自動仮想取引</span><strong>${data.automation.label}</strong></div>
      <small>${data.automation.enabled ? `確定${data.automation.cadenceMinutes}分足で判定 / 次回 ${new Date(data.automation.nextDecisionAt).toLocaleTimeString("ja-JP", { hour: "2-digit", minute: "2-digit" })}` : "自動判定を停止中"}</small>
    </div>` : ""}
    <div class="paper-account-grid">
      <div><span>${shadow ? "開始資金（学習用）" : "開始資金（共通口座）"}</span><strong>${yen(data.initialBalance)}</strong><small>${shadow ? "EUR/USDシャドー検証専用" : "EUR/USD・USD/JPYで共有"} / ${new Date(data.startedAt).toLocaleString("ja-JP")}開始</small></div>
      <div><span>${pairLabel} 現在値</span><strong>${data.currentPrice ? Number(data.currentPrice).toFixed(priceDigits) : "--"}</strong><small>${data.quoteFresh ? "価格鮮度 正常" : "価格鮮度 NG"}</small></div>
      <div><span>現在の総資産</span><strong>${yen(data.equity)}</strong><small>収益率 ${Number(data.totalReturnPct || 0) >= 0 ? "+" : ""}${Number(data.totalReturnPct || 0).toFixed(3)}%</small></div>
      <div><span>実現損益</span><strong class="${Number(data.realizedPnl || 0) >= 0 ? "up" : "down"}">${signedYen(data.realizedPnl)}</strong><small>現金残高 ${yen(data.cashBalance)}</small></div>
      <div><span>含み損益</span><strong class="${Number(data.unrealizedPnl || 0) >= 0 ? "up" : "down"}">${signedYen(data.unrealizedPnl)}</strong><small>最大DD ${Number(data.drawdownPct || 0).toFixed(3)}%</small></div>
      <div><span>取引成績</span><strong>${data.stats?.winRate !== null && data.stats?.winRate !== undefined ? `${Math.round(Number(data.stats.winRate) * 100)}%` : "--"}</strong><small>${data.stats?.wins || 0}勝 ${data.stats?.losses || 0}敗 / ${data.stats?.trades || 0}取引</small></div>
    </div>
    <div class="paper-model-version">
      <span>口座区分 <strong>${shadow ? "検証候補・ゲート外" : "採用済み条件・2通貨共通"}</strong></span>
      <span>稼働予測モデル <strong>${data.activeModelLabel || data.activeModelVersion || data.currentSignal?.modelId || "確認中"}</strong></span>
      <span class="auto-upgrade">${shadow ? "品質ゲート外も検証" : `昇格判定 ${data.promotionDecision || "現行維持"}`}</span>
    </div>
    ${shadow && data.directionProbabilityCalibration ? `<div class="paper-exit-strategy">
      <div><span>モデル出力（15分方向）</span><strong>${Math.round(Number(data.directionProbabilityCalibration.rawProbability || 0.5) * 100)}%</strong><small>候補抽出用の元確率</small></div>
      <div><span>実績校正済み方向確率</span><strong>${Math.round(Number(data.directionProbabilityCalibration.adjustedProbability || 0.5) * 100)}%</strong><small>${data.directionProbabilityCalibration.label}</small></div>
      <div><span>実測方向一致率</span><strong>${data.directionProbabilityCalibration.hitRate == null ? "蓄積中" : `${Math.round(Number(data.directionProbabilityCalibration.hitRate) * 100)}%`}</strong><small>${data.directionProbabilityCalibration.samples || 0}件 / ${data.directionProbabilityCalibration.scope}</small></div>
      <div><span>時間軸の区別</span><strong>15分方向 / 最大4時間損益</strong><small>${data.directionProbabilityCalibration.note}</small></div>
    </div>` : ""}
    ${!shadow && data.tradeProbabilityCalibration ? `<div class="paper-exit-strategy">
      <div><span>公式取引確率（4時間）</span><strong>${Math.round(Number(data.tradeProbabilityCalibration.adjustedProbability || 0.5) * 100)}%</strong><small>10分方向の元確率 ${Math.round(Number(data.tradeProbabilityCalibration.rawProbability || 0.5) * 100)}%</small></div>
      <div><span>同局面・同方向の実績</span><strong>${data.tradeProbabilityCalibration.hitRate == null ? "蓄積中" : `${Math.round(Number(data.tradeProbabilityCalibration.hitRate) * 100)}%`}</strong><small>${data.tradeProbabilityCalibration.samples || 0}/${data.tradeProbabilityCalibration.minimumSamples || 30}独立標本</small></div>
      <div><span>根拠充足率</span><strong>${Math.round(Number(data.tradeProbabilityCalibration.evidenceWeight || 0) * 100)}%</strong><small>4時間結果だけで校正</small></div>
      <div><span>校正判断</span><strong>${data.tradeProbabilityCalibration.ready ? "実績校正" : "中立へ収縮"}</strong><small>${data.tradeProbabilityCalibration.label}</small></div>
    </div>` : ""}
    ${!shadow && data.exitAudit ? `<div class="paper-exit-strategy">
      <div><span>実際の取引スタイル</span><strong>${data.exitAudit.style}</strong><small>${data.exitAudit.decisionStructure} / 最大4時間</small></div>
      <div><span>実保有時間</span><strong>${durationLabel(data.exitAudit.averageHoldingMinutes)} 平均</strong><small>中央値 ${durationLabel(data.exitAudit.medianHoldingMinutes)} / 最短 ${durationLabel(data.exitAudit.shortestHoldingMinutes)} / 最長 ${durationLabel(data.exitAudit.longestHoldingMinutes)}</small></div>
      <div><span>固定SL / TP</span><strong>逆行幅 / 1.6〜2.0R</strong><small>${data.exitAudit.policy.stop}。${data.exitAudit.policy.target}</small></div>
      <div><span>出口ルール監査</span><strong>${data.exitAudit.decision}</strong><small>${data.exitAudit.policy.promotion}</small></div>
      ${data.exitPolicyEvidence ? `<div><span>同一取引比較の採用方式</span><strong>${data.exitPolicyEvidence.name}</strong><small>${data.exitPolicyEvidence.status}</small></div>` : ""}
    </div>` : ""}
    ${shadow && data.exitStrategy ? `<div class="paper-exit-strategy">
      <div><span>出口戦略</span><strong>${data.exitStrategy.name}</strong><small>${data.exitStrategy.comparison?.decision || data.exitStrategy.status}</small></div>
      <div><span>利益保護</span><strong>1R建値 / 1.5R半分利確</strong><small>2Rから0.75R幅で追随</small></div>
      <div><span>適応型 / 固定型 期待値</span><strong>${data.exitStrategy.comparison?.adaptive?.expectancyJpy == null ? "--" : signedYen(data.exitStrategy.comparison.adaptive.expectancyJpy)} / ${data.exitStrategy.comparison?.fixed?.expectancyJpy == null ? "--" : signedYen(data.exitStrategy.comparison.fixed.expectancyJpy)}</strong><small>PF ${data.exitStrategy.comparison?.adaptive?.profitFactor == null ? "--" : Number(data.exitStrategy.comparison.adaptive.profitFactor).toFixed(2)} / ${data.exitStrategy.comparison?.fixed?.profitFactor == null ? "--" : Number(data.exitStrategy.comparison.fixed.profitFactor).toFixed(2)}</small></div>
      <div><span>独立出口比較</span><strong>${data.exitStrategy.comparison?.samples || 0} / ${data.exitStrategy.comparison?.minimumSamples || 30}組</strong><small>追跡中 ${data.exitStrategy.pendingComparisons || 0}組 / 旧比較除外 ${data.exitStrategy.comparison?.legacyExcluded || 0}組 / 最大DD ${yen(data.exitStrategy.comparison?.adaptive?.maxDrawdownJpy)} / ${yen(data.exitStrategy.comparison?.fixed?.maxDrawdownJpy)}</small></div>
    </div>` : ""}
    ${shadow && data.entryTimingLab ? `<div class="paper-entry-policies">
      <div class="paper-entry-policy-head"><span>エントリー時刻・前向き比較</span><strong>${data.entryTimingLab.decision}</strong></div>
      <div class="paper-entry-policy-lock"><span>同一シグナル比較</span><small>即時・5分待機・15分待機を約定後15分の実価格とコストで照合 / 待機 ${data.entryTimingLab.pendingSamples || 0}・時刻ずれ無効 ${data.entryTimingLab.invalidSamples || 0}</small></div>
      <div class="paper-entry-policy-grid">${(data.entryTimingLab.policies || []).map((row) => `<div class="${row.key === data.entryTimingLab.activePolicy ? "candidate" : ""}"><span>${row.label}</span><strong>${row.samples}/${data.entryTimingLab.minimumSamples}組</strong><small>勝率 ${row.hitRate == null ? "--" : `${Math.round(row.hitRate * 100)}%`} / 平均 ${row.averageNetMovePct == null ? "--" : `${Number(row.averageNetMovePct) >= 0 ? "+" : ""}${Number(row.averageNetMovePct).toFixed(4)}%`}</small><small class="policy-confidence ${row.statisticallyBetter ? "confirmed" : "locked"}">改善95%CI ${row.improvement95?.low == null ? "--" : `${Number(row.improvement95.low) >= 0 ? "+" : ""}${Number(row.improvement95.low).toFixed(4)}%`} ～ ${row.improvement95?.high == null ? "--" : `${Number(row.improvement95.high) >= 0 ? "+" : ""}${Number(row.improvement95.high).toFixed(4)}%`}</small></div>`).join("")}</div>
    </div>` : ""}
    ${shadow && data.entryQualityGuard ? `<div class="paper-regime-guard ${data.entryQualityGuard.accepted ? "stable" : "waiting"}">
      <div><span>モデル世代別エントリー監査</span><strong>${data.entryQualityGuard.label}</strong></div>
      <small>${data.entryQualityGuard.samples}/${data.entryQualityGuard.minimumSamples}独立標本 / 平均 ${data.entryQualityGuard.averageNetMovePct == null ? "--" : `${Number(data.entryQualityGuard.averageNetMovePct) >= 0 ? "+" : ""}${Number(data.entryQualityGuard.averageNetMovePct).toFixed(4)}%`} / 95%CI ${data.entryQualityGuard.interval95?.low == null ? "--" : Number(data.entryQualityGuard.interval95.low).toFixed(4)}% ～ ${data.entryQualityGuard.interval95?.high == null ? "--" : Number(data.entryQualityGuard.interval95.high).toFixed(4)}%</small>
    </div>` : ""}
    ${shadow && data.factorLedger ? `<div class="paper-entry-policies">
      <div class="paper-entry-policy-head"><span>新モデル・根拠別前向き台帳</span><strong>${data.factorLedger.samples}独立標本</strong></div>
      <div class="paper-entry-policy-grid">${(data.factorLedger.factors || []).map((factor) => `<div><span>${factor.label}</span><strong>一致 ${factor.aligned.samples} / 逆行 ${factor.conflict.samples}</strong><small>一致時 ${factor.aligned.averageNetMovePct == null ? "--" : `${Number(factor.aligned.averageNetMovePct) >= 0 ? "+" : ""}${Number(factor.aligned.averageNetMovePct).toFixed(4)}%`} / 逆行時 ${factor.conflict.averageNetMovePct == null ? "--" : `${Number(factor.conflict.averageNetMovePct) >= 0 ? "+" : ""}${Number(factor.conflict.averageNetMovePct).toFixed(4)}%`}</small></div>`).join("")}</div>
      <small>${data.factorLedger.note}</small>
    </div>` : ""}
    ${shadow && data.factorWalkForwardGate ? `<div class="paper-regime-guard ${data.factorWalkForwardGate.active ? "stable" : "waiting"}">
      <div><span>要因条件・三分割検証</span><strong>${data.factorWalkForwardGate.status}</strong></div>
      <small>${data.factorWalkForwardGate.samples}独立標本 / ${data.factorWalkForwardGate.methodology || "40標本まで採用せず蓄積"}</small>
    </div>` : ""}
    ${shadow && data.entryPolicyComparison ? `<div class="paper-entry-policies">
      <div class="paper-entry-policy-head"><span>エントリー条件対照試験</span><strong>${data.entryPolicyComparison.decision}</strong></div>
      <div class="paper-entry-policy-lock"><span>${data.entryPolicyComparison.promotionLock?.label || "統計ロック"}</span><small>${data.entryPolicyComparison.promotionLock?.rule || ""}</small></div>
      <div class="paper-entry-policy-grid">${(data.entryPolicyComparison.rows || []).map((row) => `<div class="${row.key === data.entryPolicyComparison.candidatePolicy ? "candidate" : ""}"><span>${row.label}</span><strong>${row.trades}/${data.entryPolicyComparison.minimumSamples}件</strong><small>期待値 ${row.expectancyJpy == null ? "--" : signedYen(row.expectancyJpy)} / PF ${row.profitFactor == null ? "--" : Number(row.profitFactor).toFixed(2)}</small><small>最大DD ${yen(row.maxDrawdownJpy)}</small>${row.key === "p60" ? `<small class="policy-confidence confirmed">比較基準</small>` : `<small class="policy-confidence ${row.statisticallyConfirmed ? "confirmed" : "locked"}">改善幅95%CI ${row.improvementInterval?.lowerJpy == null ? "--" : signedYen(row.improvementInterval.lowerJpy)} ～ ${row.improvementInterval?.upperJpy == null ? "--" : signedYen(row.improvementInterval.upperJpy)}</small>`}</div>`).join("")}</div>
      ${data.entryPolicyComparison.regimeComparison ? `<div class="paper-regime-policy-head"><span>市場局面別検証</span><strong>${data.entryPolicyComparison.regimeComparison.readyRegimes}/4局面 検証可能</strong></div><div class="paper-regime-policy-grid">${(data.entryPolicyComparison.regimeComparison.regimes || []).map((regime) => `<div class="${regime.promotable ? "promotable" : "learning"}"><span>${regime.label}</span><strong>${regime.samples}/${data.entryPolicyComparison.minimumSamples}件</strong><small>${regime.decision}</small><small>${regime.promotable ? "95%CI確認済み" : "局面別データを蓄積中"}</small></div>`).join("")}</div>` : ""}
    </div>` : ""}
    ${shadow && data.regimeGuard ? `<div class="paper-regime-guard ${data.regimeGuard.waiting ? "waiting" : "stable"}"><div><span>レジーム転換監視</span><strong>${data.regimeGuard.status}</strong></div><small>${data.regimeGuard.waiting ? `動的待機: ${data.regimeGuard.requirementReason || "局面リスク"} / 確定15分足${data.regimeGuard.requiredConfirmations}本` : "通常2本・高ボラ3本・重要指標または極端変動4本で自動調整"}</small></div>` : ""}
    ${shadow && data.regimeGuardVerification ? `<div class="paper-regime-verification"><div class="paper-regime-policy-head"><span>転換待機の反実仮想検証</span><strong>${data.regimeGuardVerification.recommendation}</strong></div><div class="paper-entry-policy-lock"><span>95%統計ロック</span><small>${data.regimeGuardVerification.statisticalLock}</small></div><div class="paper-regime-policy-grid">${(data.regimeGuardVerification.rows || []).map((row) => `<div class="${row.status === "verified" ? "promotable" : "learning"}"><span>${row.confirmations}本待機</span><strong>${row.samples}/${data.regimeGuardVerification.minimumSamples}件</strong><small>回避 ${yen(row.avoidedLossJpy)} / 逸失 ${yen(row.missedProfitJpy)}</small><small>平均効果 ${row.meanBenefitJpy == null ? "--" : signedYen(row.meanBenefitJpy)}</small><small>95%CI ${row.interval?.lowerJpy == null ? "--" : signedYen(row.interval.lowerJpy)} ～ ${row.interval?.upperJpy == null ? "--" : signedYen(row.interval.upperJpy)}</small><small>${row.decision}</small></div>`).join("")}<div><span>照合待ち</span><strong>${data.regimeGuardVerification.pending}件</strong><small>標準元本 ${yen(data.regimeGuardVerification.referenceNotionalJpy)}</small><small>推定コスト控除後</small></div></div></div>` : ""}
    ${shadow && data.historicalValidation?.performance ? `<div class="paper-historical-validation"><div class="paper-regime-policy-head"><span>実測15分足 過去再生検証</span><strong>${data.historicalValidation.status}</strong></div><div class="paper-entry-policy-lock"><span>未来情報遮断</span><small>${data.historicalValidation.leakageGuard}</small></div><div class="paper-historical-summary"><div><span>検証期間</span><strong>${data.historicalValidation.period?.from ? new Date(data.historicalValidation.period.from).toLocaleDateString("ja-JP") : "--"} ～ ${data.historicalValidation.period?.to ? new Date(data.historicalValidation.period.to).toLocaleDateString("ja-JP") : "--"}</strong><small>${data.historicalValidation.candleCount}本 / ${data.historicalValidation.source}</small></div><div><span>過去照合</span><strong>${data.historicalValidation.performance.samples}件</strong><small>利益取引率 ${data.historicalValidation.performance.winRate == null ? "--" : `${(data.historicalValidation.performance.winRate * 100).toFixed(1)}%`}</small></div><div><span>標準元本損益</span><strong class="${Number(data.historicalValidation.performance.netPnlJpy || 0) >= 0 ? "up" : "down"}">${signedYen(data.historicalValidation.performance.netPnlJpy)}</strong><small>期待値 ${data.historicalValidation.performance.expectancyJpy == null ? "--" : signedYen(data.historicalValidation.performance.expectancyJpy)} / PF ${data.historicalValidation.performance.profitFactor ?? "--"}</small></div><div><span>昇格ゲート</span><strong class="${data.historicalValidation.promotionGate?.eligible ? "up" : "down"}">${data.historicalValidation.promotionGate?.decision || "審査中"}</strong><small>${data.historicalValidation.promotionGate?.rule || "厳格審査"}</small></div></div><div class="paper-regime-policy-grid">${(data.historicalValidation.byRegime || []).map((row) => `<div><span>${row.label}</span><strong>${row.samples}件</strong><small>利益取引率 ${row.winRate == null ? "--" : `${(row.winRate * 100).toFixed(1)}%`} / 期待値 ${row.expectancyJpy == null ? "--" : signedYen(row.expectancyJpy)}</small><small>PF ${row.profitFactor ?? "--"}</small></div>`).join("")}<div><span>転換待機検証</span><strong>${data.historicalValidation.regimeGuardVerification?.samples || 0}件</strong><small>${data.historicalValidation.regimeGuardVerification?.recommendation || "蓄積中"}</small></div></div></div>` : ""}
    ${shadow && data.parallelValidation ? `<div class="paper-parallel-validation"><div class="paper-regime-policy-head"><span>15分足・並列仮想判定</span><strong>${data.parallelValidation.samples}件照合 / ${data.parallelValidation.pending}件待ち / ${data.parallelValidation.invalid || 0}件時刻無効</strong></div><div class="paper-historical-summary"><div><span>全確定候補</span><strong>${data.parallelValidation.hitRate == null ? "蓄積中" : `${Math.round(data.parallelValidation.hitRate * 100)}%`}</strong><small>コスト後平均 ${data.parallelValidation.averageNetMovePct == null ? "--" : `${Number(data.parallelValidation.averageNetMovePct) >= 0 ? "+" : ""}${Number(data.parallelValidation.averageNetMovePct).toFixed(4)}%`}</small></div><div><span>A級候補</span><strong>${data.parallelValidation.aGrade.hitRate == null ? "蓄積中" : `${Math.round(data.parallelValidation.aGrade.hitRate * 100)}%`}</strong><small>${data.parallelValidation.aGrade.samples}件 / 確率70%以上・時間足一致60%以上</small></div></div><small>${data.parallelValidation.note}</small></div>` : ""}
    ${!shadow && data.fundamentalTradePerformance ? `<div class="paper-exit-strategy">
      <div><span>重要材料取引</span><strong>${data.fundamentalTradePerformance.status}</strong><small>${data.fundamentalTradePerformance.samples}/${data.fundamentalTradePerformance.minimumSamples}件</small></div>
      <div><span>勝率</span><strong>${data.fundamentalTradePerformance.winRate == null ? "--" : `${Math.round(data.fundamentalTradePerformance.winRate * 100)}%`}</strong><small>${data.fundamentalTradePerformance.wins}勝 ${data.fundamentalTradePerformance.losses}敗</small></div>
      <div><span>1取引期待値</span><strong>${data.fundamentalTradePerformance.expectancyJpy == null ? "--" : signedYen(data.fundamentalTradePerformance.expectancyJpy)}</strong><small>PF ${data.fundamentalTradePerformance.profitFactor == null ? "--" : data.fundamentalTradePerformance.profitFactor === null ? "--" : Number.isFinite(data.fundamentalTradePerformance.profitFactor) ? Number(data.fundamentalTradePerformance.profitFactor).toFixed(2) : "∞"}</small></div>
      <div><span>継続条件</span><strong>${data.fundamentalTradePerformance.accepted ? "発注可能" : "自動停止"}</strong><small>20件後に勝率・期待値・PFを審査</small></div>
    </div>` : ""}
    ${!shadow && data.emergencyExitValidation ? `<div class="paper-exit-strategy">
      <div><span>急変退避・反実仮想検証</span><strong>${data.emergencyExitValidation.decision}</strong><small>完了 ${data.emergencyExitValidation.samples}/30件 / 追跡中 ${data.emergencyExitValidation.pending}件</small></div>
      <div><span>退避が改善 / 悪化</span><strong>${data.emergencyExitValidation.helped} / ${data.emergencyExitValidation.harmed}件</strong><small>同じ取引の従来出口と比較</small></div>
      <div><span>累計退避効果</span><strong class="${Number(data.emergencyExitValidation.netBenefitJpy || 0) >= 0 ? "up" : "down"}">${signedYen(data.emergencyExitValidation.netBenefitJpy)}</strong><small>平均 ${data.emergencyExitValidation.averageBenefitJpy == null ? "--" : signedYen(data.emergencyExitValidation.averageBenefitJpy)}</small></div>
      <div><span>統計確認</span><strong>${data.emergencyExitValidation.verifiedBeneficial ? "有効性確認" : "自動昇格なし"}</strong><small>95%下限 ${data.emergencyExitValidation.lower95Jpy == null ? "--" : signedYen(data.emergencyExitValidation.lower95Jpy)}</small></div>
    </div>` : ""}
    ${!shadow && data.stopOptimization ? `<div class="paper-exit-strategy">
      <div><span>局面別 MAE/MFE 損切り検証</span><strong>${data.stopOptimization.decision}</strong><small>${data.stopOptimization.scope} / 検証済み全体 ${data.stopOptimization.verifiedTrades}件</small></div>
      <div><span>現在中央値 / 影候補</span><strong>${data.stopOptimization.currentStopMedianPct == null ? "--" : `${Number(data.stopOptimization.currentStopMedianPct).toFixed(3)}%`} / ${data.stopOptimization.candidateStopPct == null ? "--" : `${Number(data.stopOptimization.candidateStopPct).toFixed(3)}%`}</strong><small>自動採用なし</small></div>
      <div><span>勝ち取引 MAE 85%点</span><strong>${data.stopOptimization.winningMaeP85 == null ? "--" : `${Number(data.stopOptimization.winningMaeP85).toFixed(3)}%`}</strong><small>勝ち ${data.stopOptimization.wins}件 / 負け ${data.stopOptimization.losses}件</small></div>
      <div><span>利益方向の伸び</span><strong>${data.stopOptimization.winningMfeMedian == null ? "--" : `${Number(data.stopOptimization.winningMfeMedian).toFixed(3)}%`}</strong><small>負け取引MFE 85%点 ${data.stopOptimization.losingMfeP85 == null ? "--" : `${Number(data.stopOptimization.losingMfeP85).toFixed(3)}%`}</small></div>
    </div>` : ""}
    ${!shadow && data.shadowRecoveryGate ? `<div class="paper-regime-guard ${data.shadowRecoveryGate.accepted ? "stable" : "waiting"}">
      <div><span>公式口座・回復昇格ゲート</span><strong>${data.shadowRecoveryGate.label}</strong></div>
      <small>学習口座の直近 ${data.shadowRecoveryGate.samples}/${data.shadowRecoveryGate.minimumSamples}件 / 期待値 ${data.shadowRecoveryGate.expectancyJpy == null ? "--" : signedYen(data.shadowRecoveryGate.expectancyJpy)} / PF ${data.shadowRecoveryGate.profitFactor == null ? "--" : Number(data.shadowRecoveryGate.profitFactor).toFixed(2)} / 95%下限 ${data.shadowRecoveryGate.expectancy95?.low == null ? "--" : signedYen(data.shadowRecoveryGate.expectancy95.low)}</small>
    </div>` : ""}
    ${!shadow && data.counterfactualReleaseGate ? `<div class="paper-regime-guard ${data.counterfactualReleaseGate.accepted ? "stable" : "waiting"}">
      <div><span>見送り解除・局面方向別</span><strong>${data.counterfactualReleaseGate.label}</strong></div>
      <small>${data.counterfactualReleaseGate.regime || "未分類"} / ${data.counterfactualReleaseGate.direction === "up" ? "買い" : data.counterfactualReleaseGate.direction === "down" ? "売り" : "方向待ち"} / ${data.counterfactualReleaseGate.samples || 0}/${data.counterfactualReleaseGate.minimumTrialSamples || 12}件 / 判定損益 ${signedYen(data.counterfactualReleaseGate.netPnlJpy)} / PF ${data.counterfactualReleaseGate.profitFactor == null ? "--" : Number(data.counterfactualReleaseGate.profitFactor).toFixed(2)} / ${data.counterfactualReleaseGate.accepted ? `最大${data.counterfactualReleaseGate.maxLots || 1}ロット・口座リスク${data.counterfactualReleaseGate.riskPerTradePct || 0.05}%` : data.counterfactualReleaseGate.reason}</small>
    </div>` : ""}
    ${!shadow && data.regimeDecisionValidation ? `<div class="paper-entry-policies">
      <div class="paper-entry-policy-head"><span>4時間売買判断・独立前向き検証</span><strong>${data.regimeDecisionValidation.samples}/${data.regimeDecisionValidation.minimumSamples}標本</strong></div>
      <div class="paper-entry-policy-lock"><span>重複除外 ${data.regimeDecisionValidation.overlappingSamplesExcluded || 0}件</span><small>${data.regimeDecisionValidation.safeguard}</small></div>
      <div class="paper-entry-policy-grid">${(data.regimeDecisionValidation.evidenceLedger || []).map((factor) => `<div><span>${factor.label}</span><strong>一致 ${factor.aligned.samples} / 逆行 ${factor.conflict.samples}</strong><small>一致時 ${factor.aligned.averageNetPct == null ? "--" : `${Number(factor.aligned.averageNetPct) >= 0 ? "+" : ""}${Number(factor.aligned.averageNetPct).toFixed(4)}%`} / 逆行時 ${factor.conflict.averageNetPct == null ? "--" : `${Number(factor.conflict.averageNetPct) >= 0 ? "+" : ""}${Number(factor.conflict.averageNetPct).toFixed(4)}%`}</small></div>`).join("")}</div>
    </div>` : ""}
    <div class="paper-action ${tone}">
      <div><span>現在の判断</span><strong>${data.action || "監視中"}</strong><small>${data.actionDetail || "品質ゲートを監視しています。"}</small></div>
      ${position ? `
        <div><span>保有銘柄・方向</span><strong>${position.pairLabel || "EUR/USD"} ${position.side === "long" ? "買い / LONG" : "売り / SHORT"}</strong><small>${validationTierLabel(position.validationTier, position.riskPerTradePct ?? 0.1)} / 想定元本 ${yen(position.notionalJpy)}</small></div>
        <div><span>約定・現在値</span><strong>${Number(position.entryPrice).toFixed(priceDigits)} → ${Number(position.currentPrice).toFixed(priceDigits)}</strong><small>${new Date(position.openedAt).toLocaleString("ja-JP")}開始 / 現在 ${durationLabel(Math.max(0, Math.floor((Date.now() - Date.parse(position.openedAt)) / 60000)))}</small></div>
        <div><span>損切り・利確</span><strong>${Number(position.stopPrice).toFixed(priceDigits)} / ${Number(position.targetPrice).toFixed(priceDigits)}</strong><small>最大保有 ${position.maxHoldingMinutes}分</small></div>
        <div><span>損失上限（コスト込）</span><strong>${yen(estimatedMaxLossJpy)}</strong><small>予算 ${yen(position.riskBudget)} / ${Number(position.lossAndCostPct || position.stopPct || 0).toFixed(3)}%</small></div>
        ${!shadow ? `<div class="paper-emergency ${emergency?.status || "standby"}"><span>急変退避</span><strong>${emergency?.label || "監視準備"}</strong><small>${emergency?.reason || "照合済み価格を3点確認して発動"}</small></div>` : ""}
        ${shadow ? `<div><span>現在のR・保有時間</span><strong class="${Number(position.currentR || 0) >= 0 ? "up" : "down"}">${position.currentR == null ? "--" : `${Number(position.currentR) >= 0 ? "+" : ""}${Number(position.currentR).toFixed(2)}R`} / ${position.holdingMinutes || 0}分</strong><small>含み損益 ${signedYen(position.unrealizedPnl)}</small></div>
        <div><span>出口までの距離</span><strong>損切 ${Number(position.stopDistancePct || 0).toFixed(3)}% / 利確 ${Number(position.targetDistancePct || 0).toFixed(3)}%</strong><small>${position.quoteConsensusVerified ? "複数価格照合済み" : "価格照合未完了"} / 鮮度 ${Math.round(Number(position.quoteFreshnessSeconds || 0))}秒</small></div>` : ""}
      ` : `<div><span>ポジション</span><strong>保有なし</strong><small>${shadow ? "次の確定15分シグナルを待機" : "品質基準を通過するまで注文しません"}</small></div>`}
    </div>
    ${snapshot ? `<div class="paper-entry-snapshot"><span>固定保存したエントリー情報</span><strong>${snapshot.modelLabel || snapshot.modelId || "--"} / ${snapshot.signalDirection === "up" || snapshot.direction === "up" ? "上" : "下"} / ${Math.round(Number(snapshot.signalProbability ?? snapshot.probability ?? 0) * 100)}%</strong><small>${validationTierLabel(snapshot.validationTier, snapshot.riskPerTradePct ?? 0.1)} ・ 局面 ${snapshot.regime?.label || snapshot.regime?.key || "未分類"} ・ ゲート ${snapshot.validationTier === "fundamental" || snapshot.validationTier === "counterfactual_release" ? snapshot.qualityGateReason : snapshot.qualityGateAccepted ? "通過" : `不合格: ${snapshot.qualityGateReason || "基準未達"}`} ・ ドリフト ${snapshot.conformalDrift?.label || snapshot.conformalDrift?.state || "なし"}</small></div>` : ""}
    ${!shadow && (data.confidenceAudits || [data.confidenceAudit]).filter(Boolean).map((audit) => `<div class="paper-regime-guard ${audit.officialEntryAllowed ? "stable" : "waiting"}"><div><span>${audit.assetId === "usdjpy" ? "USD/JPY" : "EUR/USD"}・確率実績監査</span><strong>${audit.label}</strong></div><small>${audit.samples}/${audit.minimumSamples}件 ・ 表示確率 ${audit.averageConfidence == null ? "--" : `${Math.round(audit.averageConfidence * 100)}%`} ・ 実勝率 ${audit.hitRate == null ? "--" : `${Math.round(audit.hitRate * 100)}%`} ・ Brier ${audit.brierScore == null ? "--" : Number(audit.brierScore).toFixed(3)} ・ 期待値 ${audit.expectancyJpy == null ? "--" : signedYen(audit.expectancyJpy)}</small></div>`).join("")}
    ${!shadow && data.explorationPolicy ? `<div class="paper-regime-guard ${data.explorationPolicy.accepted ? "stable" : "waiting"}"><div><span>能力向上・探索運用</span><strong>${data.explorationPolicy.label}</strong></div><small>最大${data.explorationPolicy.maxLots}ロット / 口座リスク${data.explorationPolicy.riskPerTradePct}% / 確率${Math.round(data.explorationPolicy.probabilityFloor * 100)}%以上 / 負けも確率校正へ保存</small></div>` : ""}
    ${!shadow && data.explorationLearning ? `<div class="paper-regime-guard ${data.explorationLearning.promotedSegments?.length ? "stable" : "waiting"}"><div><span>探索取引・5件単位再学習</span><strong>${data.explorationLearning.status}</strong></div><small>探索 ${data.explorationLearning.samples}/${data.explorationLearning.minimumSamples}件 ・ 勝率 ${data.explorationLearning.hitRate == null ? "--" : `${Math.round(data.explorationLearning.hitRate * 100)}%`} ・ 期待値 ${data.explorationLearning.expectancyJpy == null ? "--" : signedYen(data.explorationLearning.expectancyJpy)} ・ Brier ${data.explorationLearning.brierScore == null ? "--" : Number(data.explorationLearning.brierScore).toFixed(3)}</small></div>` : ""}
    <div class="paper-condition-grid">
      <div><span>次の発注条件</span>${conditions.map((condition) => `<small class="${condition.met ? "met" : "unmet"}">${condition.met ? "✓" : "×"} ${condition.label}</small>`).join("") || "<small>判定待ち</small>"}</div>
      <div><span>発注を妨げている条件</span>${(data.blockers || []).map((item) => `<small class="unmet">${item}</small>`).join("") || "<small class=\"met\">なし</small>"}</div>
    </div>
    <div class="paper-rules">
      ${shadow ? "<span>EUR/USD学習用・公式資金とは別集計</span>" : "<span>総資金1,000万円を2通貨で共有</span>"}<span>同時保有 最大${data.rules?.maxConcurrentPositions || 1}件</span><span>1取引リスク 試験${data.rules?.trialRiskPerTradePct ?? 0.1}% / 通常${data.rules?.riskPerTradePct}%</span><span>最大${data.rules?.maxLeverage}倍</span><span>日次停止 −${data.rules?.dailyLossLimitPct}%</span><span>最大DD停止 −${data.rules?.maxDrawdownPct}%</span><span>決済後${data.rules?.cooldownMinutes}分待機</span>${!shadow && data.rules?.emergencyExit?.enabled ? `<span>急変退避 ${data.rules.emergencyExit.minimumObservations}点確認 / ${Number(data.rules.emergencyExit.minimumThresholdPct).toFixed(2)}〜${Number(data.rules.emergencyExit.maximumThresholdPct).toFixed(2)}%</span>` : ""}
    </div>
    <div class="paper-trade-history">
      <div class="paper-history-head"><span>決済履歴</span><strong>${data.recentTrades?.length || 0}件表示</strong></div>
      ${data.tradeProof ? `<div class="paper-entry-snapshot"><span>損益証明・改ざん検知台帳</span><strong class="${data.tradeProof.verified && data.tradeProof.accountReconciled ? "up" : "down"}">${data.tradeProof.verified ? "SHA-256照合一致" : "照合不一致"} / 口座${data.tradeProof.accountReconciled ? "一致" : "不一致"} / ${signedYen(data.tradeProof.totalNetPnl)}</strong><small>${data.tradeProof.trades}取引（勝ち ${data.tradeProof.wins} / 負け ${data.tradeProof.losses}）・ 最終ハッシュ ${String(data.tradeProof.chainHead || "").slice(0, 20)}…</small></div>` : ""}
      ${(data.recentTrades || []).length ? `
        <div class="paper-table-scroll"><table><thead><tr><th>開始日時</th><th>決済日時</th><th>保有時間</th><th>通貨ペア</th><th>方向</th><th>開始値</th><th>決済値</th><th>損益</th><th>コスト</th><th>出口方式</th><th>理由</th></tr></thead><tbody>
        ${(data.recentTrades || []).map((trade) => { const digits = trade.pairLabel === "USD/JPY" ? 3 : 5; const held = holdingMinutes(trade); return `<tr><td>${new Date(trade.openedAt).toLocaleString("ja-JP")}</td><td>${new Date(trade.closedAt).toLocaleString("ja-JP")}</td><td><strong>${durationLabel(held)}</strong></td><td>${trade.pairLabel || "EUR/USD"}${trade.validationTier === "fundamental" ? "<small>重要材料</small>" : trade.validationTier === "counterfactual_release" ? "<small>選択解除・1ロット</small>" : trade.validationTier === "trial" ? "<small>低リスク試験</small>" : ""}</td><td>${trade.side === "long" ? "買い" : "売り"}</td><td>${Number(trade.entryPrice).toFixed(digits)}</td><td>${Number(trade.exitPrice).toFixed(digits)}</td><td class="${Number(trade.netPnl || 0) >= 0 ? "up" : "down"}">${signedYen(trade.netPnl)}</td><td>${yen(trade.costs)}</td><td>${trade.exitPolicyVersion === "fixed-range-v1" ? "固定レンジ" : "旧固定方式"}${trade.stopPct ? `<small>SL ${Number(trade.stopPct).toFixed(3)}% / TP ${Number(trade.targetPct).toFixed(3)}%</small>` : "<small>当時の証跡不足</small>"}</td><td>${trade.reason}${trade.entrySnapshot?.qualityGateAccepted === false && !["fundamental", "counterfactual_release"].includes(trade.validationTier) ? `<small>ゲート不合格: ${trade.entrySnapshot.qualityGateReason || "基準未達"}</small>` : ["fundamental", "counterfactual_release"].includes(trade.validationTier) ? `<small>${trade.entrySnapshot?.qualityGateReason || "選択条件一致"}</small>` : ""}</td></tr>`; }).join("")}
        </tbody></table></div>
      ` : `<div class="paper-history-empty">まだ決済取引はありません。${shadow ? "条件を満たす次の確定15分シグナルから学習を開始します。" : "予測品質ゲートを通過した時点から前向き検証を開始します。"}</div>`}
    </div>
  `;
}

function renderPaperPositionBar(official, shadow = null) {
  if (!paperPositionBarEl || !paperPositionStateEl || !paperPositionSummaryEl || !official) return;
  if (soundPreviewActive) return;
  const position = official.position || shadow?.position || null;
  const accountLabel = official.position ? "公式仮想口座" : position ? "学習用仮想口座" : "公式仮想口座";
  const liveLabelEl = paperPositionBarEl.querySelector(".paper-position-live");
  if (liveLabelEl) liveLabelEl.innerHTML = `<i></i> ${accountLabel}`;
  syncMarketSoundscape(position);
  const yen = (value, signed = false) => {
    const number = Number(value || 0);
    return `${signed && number > 0 ? "+" : ""}${number.toLocaleString("ja-JP", { maximumFractionDigits: 0 })}円`;
  };

  if (!position) {
    paperPositionBarEl.className = "paper-position-bar waiting";
    paperPositionStateEl.textContent = "現在は待機中";
    paperPositionSummaryEl.innerHTML = `
      <div><span>口座資産</span><strong>${yen(official.equity)}</strong></div>
      <div class="paper-position-wide"><span>現在の判断</span><strong>${official.action || "条件を監視中"}</strong><small>${official.actionDetail || "品質基準を満たす確定シグナルを待っています"}</small></div>
      <div><span>決済済み</span><strong>${official.totalTrades || official.recentTrades?.length || 0}取引</strong></div>`;
    return;
  }

  const digits = position.pairLabel === "USD/JPY" ? 3 : 5;
  const pnl = Number(position.unrealizedPnl || 0);
  const openedAt = new Date(position.openedAt).getTime();
  const holdingMinutes = Number.isFinite(openedAt) ? Math.max(0, Math.floor((Date.now() - openedAt) / 60000)) : Number(position.holdingMinutes || 0);
  const low = Math.min(Number(position.stopPrice), Number(position.targetPrice));
  const high = Math.max(Number(position.stopPrice), Number(position.targetPrice));
  const progress = high > low ? Math.max(0, Math.min(100, (Number(position.currentPrice) - low) / (high - low) * 100)) : 50;
  const sideLabel = position.side === "long" ? "買い / LONG" : "売り / SHORT";
  const estimatedMaxLossJpy = Number.isFinite(Number(position.estimatedMaxLossJpy))
    ? Number(position.estimatedMaxLossJpy)
    : Number(position.notionalJpy || 0) * (Number(position.stopPct || 0) + Number(position.roundTripCostPct || 0)) / 100;
  const emergency = position.emergencyMonitor || {};

  paperPositionBarEl.className = `paper-position-bar active ${position.side === "long" ? "long" : "short"} ${pnl >= 0 ? "profit" : "loss"}`;
  paperPositionStateEl.textContent = `${position.pairLabel || "EUR/USD"} ${sideLabel}を保有中`;
  paperPositionSummaryEl.innerHTML = `
    <div><span>約定 → 現在値</span><strong>${Number(position.entryPrice).toFixed(digits)} → ${Number(position.currentPrice).toFixed(digits)}</strong></div>
    <div class="paper-position-pnl"><span>現在の含み損益</span><strong>${yen(pnl, true)}</strong><small>${position.currentR == null ? "前向き検証中" : `${Number(position.currentR) >= 0 ? "+" : ""}${Number(position.currentR).toFixed(2)}R`}</small></div>
    <div class="paper-position-range"><span>損切り ${Number(position.stopPrice).toFixed(digits)} / 利確 ${Number(position.targetPrice).toFixed(digits)}</span><div><i style="left:${progress.toFixed(1)}%"></i></div><small>損切りから利確までの現在位置</small></div>
    <div><span>最大損失（コスト込）</span><strong>${yen(estimatedMaxLossJpy)}</strong><small>損失予算 ${yen(position.riskBudget)}</small></div>
    <div><span>急変退避 / 保有時間</span><strong>${emergency.label || "監視準備"}</strong><small>${holdingMinutes}分 / ${emergency.reason || "照合価格を確認中"}</small></div>`;
}

function renderTradingAnalytics(official, eurusdFrames = [], yenCrossCommand = null) {
  if (!forecastHeatmapEl || !profitCalendarEl || !official) return;
  const normalize = (item, pair) => ({ pair, key: item.key, label: item.label, direction: item.direction || "flat", probability: Number(item.calibratedProbability ?? item.probability ?? item.confidence ?? 0.5), deltaPct: Number(item.deltaPct || 0) });
  const eur = (eurusdFrames || []).map((item) => normalize(item, "EUR/USD"));
  const usd = (yenCrossCommand?.timeframes || []).map((item) => normalize(item, "USD/JPY"));
  const frameOrder = ["m5", "m15", "h1", "h4", "d1", "w1", "mo1"];
  const labels = Object.fromEntries([...eur, ...usd].map((item) => [item.key, item.label]));
  const cell = (item) => {
    if (!item) return `<div class="heatmap-cell unavailable"><strong>--</strong><small>未生成</small></div>`;
    const confidence = Math.max(0, Math.min(1, item.probability));
    const intensity = Math.max(0.12, Math.min(0.72, Math.abs(confidence - 0.5) * 1.8 + Math.abs(item.deltaPct) * 3));
    const arrow = item.direction === "up" ? "↑" : item.direction === "down" ? "↓" : "→";
    return `<div class="heatmap-cell ${item.direction}" style="--heat:${intensity.toFixed(2)}" title="${item.pair} ${item.label}: ${item.deltaPct >= 0 ? "+" : ""}${item.deltaPct.toFixed(4)}% / 確率 ${Math.round(confidence * 100)}%"><strong>${arrow} ${Math.round(confidence * 100)}%</strong><small>${item.deltaPct >= 0 ? "+" : ""}${item.deltaPct.toFixed(3)}%</small></div>`;
  };
  forecastHeatmapEl.innerHTML = `
    <div class="analytics-subhead"><div><span>マルチ時間足ヒートマップ</span><small>緑＝上方向・赤＝下方向・黄＝中立</small></div><strong>確定足優先</strong></div>
    <div class="heatmap-scroll"><div class="heatmap-matrix" style="--heat-cols:${frameOrder.length}">
      <div class="heatmap-corner">通貨</div>${frameOrder.map((key) => `<div class="heatmap-label">${labels[key] || key.toUpperCase()}</div>`).join("")}
      ${["EUR/USD", "USD/JPY"].map((pair) => { const rows = pair === "EUR/USD" ? eur : usd; return `<div class="heatmap-pair">${pair}</div>${frameOrder.map((key) => cell(rows.find((item) => item.key === key))).join("")}`; }).join("")}
    </div></div>
    <div class="heatmap-legend"><span><i class="up"></i>上方向</span><span><i class="flat"></i>中立</span><span><i class="down"></i>下方向</span><small>色の濃さは50%からの確率差を示します</small></div>`;

  const calendar = official.profitCalendar || { currentMonth: new Date().toISOString().slice(0, 7), months: [], days: [] };
  const monthKeys = [...new Set([...(calendar.months || []).map((row) => row.month), calendar.currentMonth].filter(Boolean))].sort();
  if (!selectedProfitCalendarMonth || !monthKeys.includes(selectedProfitCalendarMonth)) selectedProfitCalendarMonth = monthKeys.at(-1);
  const monthIndex = Math.max(0, monthKeys.indexOf(selectedProfitCalendarMonth));
  const [year, month] = selectedProfitCalendarMonth.split("-").map(Number);
  const monthDays = new Date(Date.UTC(year, month, 0)).getUTCDate();
  const firstWeekday = new Date(`${selectedProfitCalendarMonth}-01T00:00:00+09:00`).getDay();
  const byDate = Object.fromEntries((calendar.days || []).filter((row) => row.date.startsWith(selectedProfitCalendarMonth)).map((row) => [row.date, row]));
  const monthSummary = (calendar.months || []).find((row) => row.month === selectedProfitCalendarMonth) || { pnl: 0, trades: 0, wins: 0, losses: 0, tradingDays: 0 };
  const yen = (value) => `${Number(value || 0) >= 0 ? "+" : ""}${Math.round(Number(value || 0)).toLocaleString("ja-JP")}円`;
  const shortYen = (value) => {
    const number = Number(value || 0);
    if (Math.abs(number) >= 10_000) return `${number >= 0 ? "+" : "-"}${(Math.abs(number) / 10_000).toFixed(1)}万`;
    return `${number >= 0 ? "+" : ""}${Math.round(number).toLocaleString("ja-JP")}`;
  };
  const blanks = Array.from({ length: firstWeekday }, () => `<div class="calendar-day blank"></div>`).join("");
  const days = Array.from({ length: monthDays }, (_, index) => {
    const day = index + 1;
    const key = `${selectedProfitCalendarMonth}-${String(day).padStart(2, "0")}`;
    const row = byDate[key];
    const tone = !row ? "empty" : row.pnl > 0 ? "profit" : row.pnl < 0 ? "loss" : "even";
    return `<div class="calendar-day ${tone}" title="${row ? `${row.trades}取引 / ${row.wins}勝 ${row.losses}敗 / ${yen(row.pnl)}` : "取引なし"}"><span>${day}</span>${row ? `<strong>${shortYen(row.pnl)}</strong><small>${row.trades}取引 ${row.wins}勝${row.losses}敗</small>` : `<small>—</small>`}</div>`;
  }).join("");
  profitCalendarEl.innerHTML = `
    <div class="analytics-subhead calendar-head"><button type="button" data-calendar-move="-1" aria-label="前月" ${monthIndex <= 0 ? "disabled" : ""}>‹</button><div><span>${year}年${month}月 損益</span><small>公式仮想口座・日本時間・確定損益</small></div><button type="button" data-calendar-move="1" aria-label="翌月" ${monthIndex >= monthKeys.length - 1 ? "disabled" : ""}>›</button></div>
    <div class="calendar-summary"><div><span>月間損益</span><strong class="${monthSummary.pnl >= 0 ? "up" : "down"}">${yen(monthSummary.pnl)}</strong></div><div><span>取引数</span><strong>${monthSummary.trades}件</strong></div><div><span>勝敗</span><strong>${monthSummary.wins}勝 ${monthSummary.losses}敗</strong></div><div><span>取引日</span><strong>${monthSummary.tradingDays}日</strong></div></div>
    <div class="calendar-weekdays">${["日", "月", "火", "水", "木", "金", "土"].map((day) => `<span>${day}</span>`).join("")}</div>
    <div class="calendar-grid">${blanks}${days}</div>`;
  tradingAnalyticsStatusEl.textContent = `${selectedProfitCalendarMonth.replace("-", "年")}月 / ${monthSummary.trades}取引 / ${yen(monthSummary.pnl)}`;
}

function renderPaperTrading(official, shadow, comparison) {
  renderPaperPositionBar(official, shadow);
  renderPaperAccount(official, paperTradingPanelEl, paperTradingStatusEl, paperTradingEl);
  if (detailMode === "full") renderPaperAccount(shadow, shadowPaperTradingPanelEl, shadowPaperTradingStatusEl, shadowPaperTradingEl, { shadow: true });
  if (!paperTradingComparisonEl || !comparison) return;
  const gate = comparison.gateVerification || {};
  const directionCalibration = comparison.directionProbabilityCalibration || {};
  const factorWalkForward = comparison.factorWalkForwardGate || {};
  const yen = (value) => `${Number(value || 0).toLocaleString("ja-JP", { maximumFractionDigits: 0 })}円`;
  const sideLabel = (row) => (row.side === "long" || row.direction === "up") ? "買い" : (row.side === "short" || row.direction === "down") ? "売り" : "--";
  const pairLabel = (row) => row.pairLabel || (row.assetId === "usdjpy" ? "USD/JPY" : "EUR/USD");
  const lotLabel = (row) => Number(row.lots || 0) > 0 ? `${row.lotSizingMode === "historical_estimate" ? "約" : ""}${Number(row.lots).toFixed(0)}ロット` : "--";
  const unitsLabel = (row) => Number(row.baseUnits || 0) > 0 ? `${Number(row.baseUnits).toLocaleString("ja-JP")}通貨` : "--";
  const regimeLabel = (key) => ({ trend: "トレンド", range: "レンジ", highVolatility: "高変動", eventPolicy: "重要指標・政策" }[key] || key || "未分類");
  const directionLabel = (direction) => direction === "up" ? "買い" : direction === "down" ? "売り" : "--";
  const releaseStatus = (row) => row.verified ? "統計確認・選択解除" : row.trialEligible ? "1ロット解除試験" : "見送り維持";
  paperTradingComparisonEl.innerHTML = `
    <div class="gate-summary-grid">
      <div><span>採用済み条件</span><strong>${yen(comparison.official?.equity)}</strong><small>${comparison.official?.trades || 0}取引 / 勝率 ${comparison.official?.winRate == null ? "--" : `${Math.round(comparison.official.winRate * 100)}%`}</small></div>
      <div><span>検証候補</span><strong>${yen(comparison.shadow?.equity)}</strong><small>${comparison.shadow?.trades || 0}取引 / 勝率 ${comparison.shadow?.winRate == null ? "--" : `${Math.round(comparison.shadow.winRate * 100)}%`}</small></div>
      <div><span>品質ゲートで見送って正解</span><strong>${gate.skippedCorrectly || 0}件</strong><small>回避損失 ${yen(gate.avoidedLossJpy)}</small></div>
      <div><span>見送りによる機会損失</span><strong>${gate.missedOpportunities || 0}件</strong><small>逸失利益 ${yen(gate.missedProfitJpy)}</small></div>
    </div>
    ${directionCalibration.adjustedProbability != null ? `<div class="gate-net-opportunity ${directionCalibration.overconfident ? "missed" : "protected"}"><span>15分方向確率の実績校正</span><strong>モデル ${Math.round(Number(directionCalibration.rawProbability || 0.5) * 100)}% → 実績校正 ${Math.round(Number(directionCalibration.adjustedProbability || 0.5) * 100)}%</strong><small>方向一致 ${directionCalibration.hitRate == null ? "蓄積中" : `${Math.round(Number(directionCalibration.hitRate) * 100)}%`} / ${directionCalibration.samples || 0}件。4時間仮想取引の勝率・期待損益とは別指標です。</small></div>` : ""}
    ${factorWalkForward.status ? `<div class="gate-net-opportunity ${factorWalkForward.active ? "protected" : "missed"}"><span>要因条件・三分割検証</span><strong>${factorWalkForward.status}</strong><small>${factorWalkForward.samples || 0}独立標本 / ${factorWalkForward.methodology || "学習・検証・最終未使用を分離して審査"}</small>${factorWalkForward.benchmarks?.currentModel ? `<small>最終未使用: 現行 ${Math.round(Number(factorWalkForward.benchmarks.currentModel.directionHitRate || 0) * 100)}% / 常時買い ${Math.round(Number(factorWalkForward.benchmarks.alwaysUp?.directionHitRate || 0) * 100)}% / 常時売り ${Math.round(Number(factorWalkForward.benchmarks.alwaysDown?.directionHitRate || 0) * 100)}%</small>` : ""}${factorWalkForward.expertArena?.status ? `<small>専門モデル競争: ${factorWalkForward.expertArena.status}${factorWalkForward.expertArena.samples ? ` / 全世代${factorWalkForward.expertArena.samples}標本` : ""}${factorWalkForward.expertArena.selected?.test ? ` / 最終 ${Math.round(Number(factorWalkForward.expertArena.selected.test.directionHitRate || 0) * 100)}%・平均${Number(factorWalkForward.expertArena.selected.test.averageNetMovePct || 0).toFixed(4)}%` : ""}</small>` : ""}</div>` : ""}
    <div class="gate-net-opportunity ${Number(gate.netOpportunityJpy || 0) > 0 ? "missed" : "protected"}"><span>見送りの純効果</span><strong>${Number(gate.netOpportunityJpy || 0) > 0 ? `利益逸失超過 ${yen(gate.netOpportunityJpy)}` : `損失回避超過 ${yen(Math.abs(Number(gate.netOpportunityJpy || 0)))}`}</strong><small>全解除せず、局面と売買方向ごとに再検証します</small></div>
    <div class="gate-instrument-summary">
      ${(gate.pairBreakdown || []).map((row) => `<article><div><span>検証対象</span><strong>${pairLabel(row)}</strong></div><div><span>買い</span><strong>${row.buyTrades || 0}件 / ${Number(row.buyLots || 0).toFixed(0)}ロット</strong></div><div><span>売り</span><strong>${row.sellTrades || 0}件 / ${Number(row.sellLots || 0).toFixed(0)}ロット</strong></div><div><span>判定損益</span><strong class="${Number(row.netPnlJpy || 0) >= 0 ? "up" : "down"}">${yen(row.netPnlJpy)}</strong></div></article>`).join("") || `<article><div><span>検証対象</span><strong>EUR/USD</strong></div><div><span>売買履歴</span><strong>蓄積中</strong></div></article>`}
    </div>
    <div class="gate-release-policy">
      <div class="paper-history-head"><span>選択的見送り解除</span><strong>12件で最大1ロット試験 / 30件・95%下限プラスで正式確認</strong></div>
      <div class="gate-release-grid">${(gate.releaseSegments || []).map((row) => `<article class="${row.verified ? "verified" : row.trialEligible ? "trial" : "hold"}"><div><span>${regimeLabel(row.regime)}・${directionLabel(row.direction)}</span><strong>${releaseStatus(row)}</strong></div><b class="${Number(row.netPnlJpy || 0) >= 0 ? "up" : "down"}">${Number(row.netPnlJpy || 0) >= 0 ? "+" : ""}${yen(row.netPnlJpy)}</b><small>${row.samples}件 / ${row.wins}勝${row.losses}敗 / PF ${row.profitFactor == null ? "--" : Number.isFinite(row.profitFactor) ? Number(row.profitFactor).toFixed(2) : "∞"} / 95%下限 ${row.expectancy95?.low == null ? "--" : yen(row.expectancy95.low)}</small></article>`).join("") || `<article class="hold"><div><span>局面別検証</span><strong>標本蓄積中</strong></div><small>見送り取引の結果を方向別に保存しています</small></article>`}</div>
    </div>
    <div class="paper-trade-history">
      <div class="paper-history-head"><span>ゲート判断検証</span><strong>${gate.samples || 0}標本 / 買い ${gate.buyTrades || 0}件・約${Number(gate.buyLots || 0).toFixed(0)}ロット / 売り ${gate.sellTrades || 0}件・約${Number(gate.sellLots || 0).toFixed(0)}ロット（過去換算含む）</strong></div>
      ${(gate.recent || []).length ? `<div class="paper-table-scroll"><table class="gate-lot-table"><thead><tr><th>決済日時</th><th>通貨ペア</th><th>売買</th><th>ロット</th><th>取引数量</th><th>必要証拠金</th><th>判定</th><th>損益</th><th>確率</th><th>局面</th><th>不合格理由</th><th>ドリフト</th></tr></thead><tbody>${gate.recent.map((row) => `<tr><td>${new Date(row.closedAt).toLocaleString("ja-JP")}</td><td><strong>${pairLabel(row)}</strong></td><td class="${sideLabel(row) === "買い" ? "up" : "down"}">${sideLabel(row)}</td><td><strong>${lotLabel(row)}</strong>${row.lotSizingMode === "historical_estimate" ? "<small>過去元本から換算</small>" : ""}</td><td>${unitsLabel(row)}</td><td>${row.requiredMarginJpy ? yen(row.requiredMarginJpy) : "--"}</td><td>${row.classification}</td><td class="${Number(row.netPnl || 0) >= 0 ? "up" : "down"}">${yen(row.netPnl)}</td><td>${Math.round(Number(row.probability || 0) * 100)}%</td><td>${row.regime?.label || row.regime?.key || "--"}</td><td>${row.qualityGateReason || "--"}</td><td>${row.conformalDrift?.label || row.conformalDrift?.state || "--"}</td></tr>`).join("")}</tbody></table></div>` : `<div class="paper-history-empty">品質ゲート不合格のシャドー取引が決済されると、判断検証をここへ蓄積します。</div>`}
    </div>`;
}

function renderYttDemoTrading(account) {
  if (!yttDemoPanelEl || !account) return;
  const yen = (value) => `${Math.round(Number(value || 0)).toLocaleString("ja-JP")}円`;
  const price = (value, assetId) => Number(value || 0).toFixed(assetId === "usdjpy" ? 3 : 5);
  const sideLabel = (side) => side === "long" ? "買い" : "売り";
  const position = account.position;
  const pnl = Number(position?.unrealizedPnl || 0);
  yttDemoPanelEl.classList.toggle("active", Boolean(position));
  yttDemoPanelEl.classList.toggle("positive", pnl > 0);
  yttDemoPanelEl.classList.toggle("negative", pnl < 0);
  yttDemoStatusEl.textContent = position
    ? `${position.pairLabel} ${sideLabel(position.side)} ${position.lots}ロット保有中`
    : account.pendingOrders?.length ? `${account.pendingOrders.length}件の発動価格を監視中` : "注文シナリオを待機中";
  yttDemoAccountEl.innerHTML = `
    <div><span>開始資金</span><strong>${yen(account.initialBalance)}</strong><small>独立練習口座</small></div>
    <div><span>現金残高</span><strong>${yen(account.cashBalance)}</strong><small>売買コスト控除済み</small></div>
    <div><span>評価資産</span><strong>${yen(account.equity)}</strong><small>含み損益を反映</small></div>
    <div><span>保有損益</span><strong>${pnl >= 0 ? "+" : ""}${yen(pnl)}</strong><small>${position ? `現在 ${price(position.currentPrice, position.assetId)}` : "ポジションなし"}</small></div>`;
  const orders = [];
  if (position) orders.push(`<div class="ytt-demo-row ${position.side}"><strong>${position.pairLabel} ${sideLabel(position.side)} ${position.lots}ロット</strong><span>約定 ${price(position.entryPrice, position.assetId)} / 現在 ${price(position.currentPrice, position.assetId)} / SL ${price(position.stopPrice, position.assetId)} / TP ${price(position.targetPrice, position.assetId)}</span><small>${pnl >= 0 ? "+" : ""}${yen(pnl)}</small></div>`);
  for (const order of account.pendingOrders || []) orders.push(`<div class="ytt-demo-row ${order.side}"><strong>${order.pairLabel} ${sideLabel(order.side)} ${order.lots}ロット</strong><span>${order.triggerMode === "breakout" ? "ブレイク" : "押し戻り"} ${price(order.triggerPrice, order.assetId)} / SL ${price(order.stopPrice, order.assetId)} / TP ${price(order.targetPrice, order.assetId)} / 証拠金 ${yen(order.requiredMarginJpy)}</span><button type="button" data-ytt-cancel="${order.id}">取消</button></div>`);
  yttDemoOrdersEl.innerHTML = orders.join("") || `<div class="ytt-demo-empty">登録済み注文・保有ポジションはありません。</div>`;
  yttDemoTradesEl.innerHTML = (account.recentTrades || []).slice(0, 8).map((trade) => `<div class="ytt-demo-row ${trade.side}"><strong>${trade.pairLabel} ${sideLabel(trade.side)} ${trade.lots}ロット</strong><span>${trade.reason} / ${price(trade.entryPrice, trade.assetId)} → ${price(trade.exitPrice, trade.assetId)} / コスト ${yen(trade.costs)}</span><small>${Number(trade.netPnl) >= 0 ? "+" : ""}${yen(trade.netPnl)}</small></div>`).join("") || `<div class="ytt-demo-empty">決済履歴はまだありません。</div>`;
}

function prefillYttScenario() {
  if (!latestSnapshot || !yttDemoPairEl) return;
  const assetId = yttDemoPairEl.value;
  const market = (latestSnapshot.markets || []).find((row) => row.id === assetId);
  const current = Number(market?.quote?.value || market?.value || 0);
  if (!(current > 0)) return;
  const long = yttDemoSideEl.value === "long";
  const decimals = assetId === "usdjpy" ? 3 : 5;
  yttDemoTriggerEl.step = assetId === "usdjpy" ? "0.001" : "0.00001";
  yttDemoStopEl.step = yttDemoTriggerEl.step;
  yttDemoTargetEl.step = yttDemoTriggerEl.step;
  yttDemoTriggerEl.value = (current * (long ? 1.001 : 0.999)).toFixed(decimals);
  yttDemoStopEl.value = (current * (long ? 0.997 : 1.003)).toFixed(decimals);
  yttDemoTargetEl.value = (current * (long ? 1.006 : 0.994)).toFixed(decimals);
}

async function submitYttScenario() {
  yttDemoSubmitEl.disabled = true;
  yttDemoStatusEl.textContent = "シナリオを検証中";
  try {
    const response = await fetch("/api/ytt-demo/order", {
      method: "POST", headers: { "content-type": "application/json" },
      body: JSON.stringify({ assetId: yttDemoPairEl.value, side: yttDemoSideEl.value,
        triggerPrice: Number(yttDemoTriggerEl.value), stopPrice: Number(yttDemoStopEl.value),
        targetPrice: Number(yttDemoTargetEl.value), riskPct: Number(yttDemoRiskEl.value) })
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.error || "登録できませんでした。");
    renderYttDemoTrading(result.account);
  } catch (error) {
    yttDemoStatusEl.textContent = error.message;
  } finally {
    yttDemoSubmitEl.disabled = false;
  }
}

async function cancelYttScenario(orderId) {
  const response = await fetch("/api/ytt-demo/order", { method: "DELETE", headers: { "content-type": "application/json" }, body: JSON.stringify({ orderId }) });
  const result = await response.json();
  if (response.ok) renderYttDemoTrading(result.account);
}

function renderTradeOpportunityMonitor(paperTrading, probabilitySimulation, yenCrossCommand, threeWayGate) {
  if (!tradeOpportunityPanelEl || !tradeOpportunityStatusEl || !tradeOpportunityEl || !paperTrading) return;
  const candidates = paperTrading.candidateRanking || [];
  const eur = candidates.find((item) => item.assetId === "eurusd") || {};
  const usd = candidates.find((item) => item.assetId === "usdjpy") || {};
  const forward = (threeWayGate?.rows || []).find((row) => row.label === "リアルタイム前向き予測") || {};
  const paper = (threeWayGate?.rows || []).find((row) => row.label === "コスト込み仮想取引") || {};
  const eurEmbargo = probabilitySimulation?.qualityGate?.eventEmbargo;
  const usdBlockers = yenCrossCommand?.timeframeConsensus?.blockers || [];
  const conditions = paperTrading.nextEntryConditions || [];
  const metCount = conditions.filter((item) => item.met).length;
  const readiness = conditions.length ? Math.round(metCount / conditions.length * 100) : 0;
  const active = Boolean(paperTrading.position);
  const plans = deriveTradeScenarioPlans(paperTrading);
  const evidenceBlocker = (candidate, fallback) => candidate.pairPerformanceGate?.officialEntryAllowed === false
    ? candidate.pairPerformanceGate.label
    : fallback;
  tradeOpportunityPanelEl.className = `trade-opportunity-wrap ${active ? "active" : readiness >= 75 ? "near" : "waiting"}`;
  tradeOpportunityStatusEl.textContent = active ? `${paperTrading.position.pairLabel || "通貨ペア"}を保有中` : `発注準備度 ${readiness}%`;
  const row = (label, candidate, blocker) => `<article class="${candidate.eligible ? "eligible" : "blocked"}"><div><span>${label}</span><strong>${candidate.eligible ? (candidate.trialMode ? "低リスク試験候補" : "通常発注候補") : "見送り"}</strong></div><b>${Math.round(Number(candidate.confidence || 0) * 100)}%</b><small>${blocker || (candidate.eligible ? "全条件を通過" : "品質条件を確認中")}</small></article>`;
  tradeOpportunityEl.innerHTML = `
    <div class="trade-opportunity-summary"><div><span>公式共通口座</span><strong>${Number(paperTrading.equity || 0).toLocaleString("ja-JP")}円</strong><small>同時保有1件</small></div><div><span>前向き方向標本</span><strong>${forward.directionSamples || 0}/60件</strong><small>方向一致 ${forward.hitRate == null ? "--" : `${Math.round(forward.hitRate * 100)}%`}</small></div><div><span>コスト込み取引</span><strong>${paper.samples || 0}/30件</strong><small>PF ${paper.profitFactor == null ? "--" : Number(paper.profitFactor).toFixed(2)}</small></div><div><span>現在の発注準備度</span><strong>${readiness}%</strong><small>${metCount}/${conditions.length}条件通過</small></div></div>
    <div class="trade-opportunity-candidates">${row("EUR/USD", eur, evidenceBlocker(eur, eurEmbargo?.active ? eurEmbargo.reason : (paperTrading.blockers || [])[0]))}${row("USD/JPY", usd, evidenceBlocker(usd, usdBlockers[0]))}</div>
    <div class="trade-opportunity-candidates">${plans.map((plan) => `<article class="${plan.active ? "eligible" : "blocked"}"><div><span>${plan.pairLabel || plan.assetId}</span><strong>${plan.active ? "仮想予約シナリオ" : "シナリオ待機"}</strong></div><b>${Math.round(Number(plan.probability || 0) * 100)}%</b><small>${plan.active ? `${plan.triggerRule} / 発動 ${Number(plan.triggerPrice).toFixed(plan.assetId === "usdjpy" ? 3 : 5)} / SL ${Number(plan.stopPrice).toFixed(plan.assetId === "usdjpy" ? 3 : 5)} / TP ${Number(plan.targetPrice).toFixed(plan.assetId === "usdjpy" ? 3 : 5)} / ${plan.lots}ロット` : plan.status}</small></article>`).join("")}</div>
    <p>${active ? "保有中のため新規候補は待機します。" : "通常ゲート通過時は0.5%リスク、標本蓄積中は重要指標回避・65%以上・価格照合済みの場合だけ0.1%リスクで試験します。"}</p>`;
}

function signedNumber(value, digits = 2, suffix = "") {
  const number = Number(value || 0);
  return `${number > 0 ? "+" : ""}${number.toFixed(digits)}${suffix}`;
}

function renderCurrencyStrengthChart(data) {
  if (!currencyStrengthChartEl) return;
  const points = data?.history || [];
  if (points.length < 2) {
    currencyStrengthChartEl.innerHTML = `<div class="currency-chart-empty">5分足の推移を蓄積中です。</div>`;
    return;
  }
  const colors = { USD: "#f4d35e", EUR: "#39d6ff", JPY: "#ff6b7a", GBP: "#b58cff", AUD: "#38d996", NZD: "#ff9f43", CAD: "#f06fc5", CHF: "#d9e2e8" };
  const codes = Object.keys(colors);
  const allValues = points.flatMap((point) => codes.map((code) => Number(point.values?.[code] || 0)));
  const limit = Math.max(0.05, ...allValues.map((value) => Math.abs(value))) * 1.16;
  const width = 900;
  const height = 310;
  const left = 48;
  const right = 18;
  const top = 18;
  const bottom = 38;
  const plotWidth = width - left - right;
  const plotHeight = height - top - bottom;
  const x = (index) => left + index / (points.length - 1) * plotWidth;
  const y = (value) => top + (limit - value) / (limit * 2) * plotHeight;
  const grid = [-1, -0.5, 0, 0.5, 1].map((ratio) => {
    const value = limit * ratio;
    return `<line x1="${left}" y1="${y(value)}" x2="${width - right}" y2="${y(value)}" class="currency-chart-grid ${ratio === 0 ? "zero" : ""}"/><text x="${left - 7}" y="${y(value) + 4}" text-anchor="end">${value.toFixed(2)}%</text>`;
  }).join("");
  const lines = codes.map((code) => {
    const path = points.map((point, index) => `${index ? "L" : "M"}${x(index).toFixed(1)},${y(Number(point.values?.[code] || 0)).toFixed(1)}`).join(" ");
    return `<path d="${path}" fill="none" stroke="${colors[code]}" stroke-width="2.3" vector-effect="non-scaling-stroke"/>`;
  }).join("");
  const timeLabels = [0, Math.floor((points.length - 1) / 2), points.length - 1].map((index) => {
    const label = new Date(points[index].at).toLocaleTimeString("ja-JP", { hour: "2-digit", minute: "2-digit" });
    return `<text x="${x(index)}" y="${height - 12}" text-anchor="middle">${label}</text>`;
  }).join("");
  currencyStrengthChartEl.innerHTML = `
    <div class="currency-chart-legend">${codes.map((code) => `<span><i style="background:${colors[code]}"></i>${code}</span>`).join("")}</div>
    <svg viewBox="0 0 ${width} ${height}" role="img" aria-label="主要8通貨の直近1時間5分足強弱推移">${grid}${lines}${timeLabels}</svg>
    <small>各通貨の1時間前からの合成騰落率。0%より上は強化、下は弱化を示します。</small>
  `;
}

function renderCentralBankTone(data) {
  if (!centralBankToneEl || !data) return;
  const tone = Number(data.eurusdBias || 0) > 0.18 ? "up" : Number(data.eurusdBias || 0) < -0.18 ? "down" : "flat";
  centralBankTonePanelEl.className = `central-bank-tone-wrap ${tone}`;
  centralBankToneStatusEl.textContent = data.verdict || "公式発表を比較中";
  centralBankToneEl.innerHTML = `
    <div class="central-bank-grid">
      ${[data.ecb, data.fed].filter(Boolean).map((bank) => `<article class="central-bank-card ${bank.stance === "タカ派" ? "hawk" : bank.stance === "ハト派" ? "dove" : "neutral"}">
        <div><span>${bank.label}</span><strong>${bank.stance}</strong></div>
        <b>${signedNumber(bank.zScore, 2, "σ")}</b>
        <p>${bank.comparison} / ${bank.distributionStatus || `標本 ${bank.sampleCount}件`} / ${bank.analysisDepth || "RSS要約"}</p>
        ${(bank.factorChanges || []).length ? `<div class="central-bank-factors">${bank.factorChanges.map((item) => `<span>${item.label} ${item.change > 0 ? "+" : ""}${item.change}</span>`).join("")}</div>` : ""}
        ${bank.latest ? `<a href="${bank.latest.url || "#"}" target="_blank" rel="noreferrer">${bank.latest.title}</a>` : `<small>公式発表を取得中</small>`}
      </article>`).join("")}
      <div class="central-bank-spread">
        <span>ECB − FRB トーン差</span>
        <strong>${signedNumber(data.eurusdBias, 2)}</strong>
        <small>${data.verdict}</small>
      </div>
    </div>
    <p class="central-bank-method">${data.method}</p>
  `;
}

function renderFundamentalNews(data) {
  if (!fundamentalNewsEl || !data) return;
  const bias = Number(data.eurusdBias || 0);
  const tone = bias > 0.08 ? "up" : bias < -0.08 ? "down" : "flat";
  fundamentalNewsPanelEl.className = `fundamental-news-wrap ${tone}`;
  fundamentalNewsStatusEl.textContent = `${data.clusters24h || 0}出来事 / 独立伝播 ${data.propagationAlerts || 0}件 / 15分照合 ${data.evaluated15m || 0}件`;
  const biasLabel = bias > 0.08 ? "EUR優位" : bias < -0.08 ? "USD優位" : "中立・判定待ち";
  const confluence = data.confluenceValidation || {};
  const liveConfluenceGate = data.confluenceGate || {};
  const multi = confluence.bands?.multi || {};
  const thresholdValidation = confluence.confirmationThresholdValidation || {};
  const counterfactualSlice = data.confluenceCounterfactual?.currentSlice || {};
  const counterfactual = counterfactualSlice.recentWindow || counterfactualSlice || data.confluenceCounterfactual?.overall || {};
  fundamentalNewsEl.innerHTML = `
    <div class="fundamental-news-summary">
      <div><span>24時間の出来事</span><strong>${data.clusters24h || 0}件</strong><small>記事 ${data.recent24h || 0}件 / 重複統合 ${data.duplicateArticles24h || 0}件</small></div>
      <div><span>EUR/USD速報方向</span><strong class="${tone}">${biasLabel}</strong><small>方向スコア ${signedNumber(bias, 3)}</small></div>
      <div><span>伝播・相反監視</span><strong>${data.propagationAlerts || 0} / ${data.conflictingClusters || 0}</strong><small>急速伝播 / 相反イベント</small></div>
      <div><span>15分・60分照合</span><strong>${data.hitRate15m == null ? "蓄積中" : `${(data.hitRate15m * 100).toFixed(1)}%`}</strong><small>15分 ${data.evaluated15m || 0}件 / 60分 ${data.evaluated60m || 0}件</small></div>
      <div><span>材料×市場要因</span><strong class="${liveConfluenceGate.counterfactualReleased ? "down" : confluence.promotionEligible ? "up" : confluence.autoReverted ? "down" : ""}">${liveConfluenceGate.counterfactualReleased ? "利益逸失確認で停止" : confluence.promotionEligible ? "昇格適用中" : confluence.autoReverted ? "自動復帰" : "影検証中"}</strong><small>${liveConfluenceGate.counterfactualReleased ? liveConfluenceGate.label : `${liveConfluenceGate.segmentLabel || "速報一般"}・${liveConfluenceGate.directionLabel || "方向判定中"} / 採用 ${thresholdValidation.recommendedConfirmations || 2}要因 / 連続2区間安定性${thresholdValidation.adoptionEligible ? "合格" : "検証中"}`}</small></div>
      <div><span>直近30件の見送り効果</span><strong class="${counterfactual.beneficialConfirmed ? "up" : counterfactual.harmfulConfirmed ? "down" : ""}">${counterfactual.verdict || "効果検証中 0/20件"}</strong><small>防げた損失 ${counterfactual.avoidedLosses || 0}件 / 逃した利益 ${counterfactual.missedProfits || 0}件 / 純効果 ${signedYen(counterfactual.netGuardBenefitJpy || 0)}${counterfactualSlice.relationshipShift !== "stable-or-unconfirmed" ? ` / ${counterfactualSlice.relationshipShiftLabel}` : ""}</small></div>
    </div>
    <div class="persistent-theme-grid">${(data.persistentThemes || []).slice(0, 4).map((theme) => `<article class="${Number(theme.bias || 0) > 0 ? "up" : Number(theme.bias || 0) < 0 ? "down" : "flat"}">
      <div><span>継続テーマ</span><time>${formatTime(theme.lastSeenAt)}</time></div>
      <strong>${theme.label}</strong>
      <small>${theme.marketConfirmation || "市場反応待ち"} / 独立${theme.independentSources || 0}源 / 方向 ${signedNumber(theme.bias, 3)}</small>
    </article>`).join("") || `<div class="fundamental-news-empty">有効な継続政策テーマはありません。</div>`}</div>
    <div class="news-propagation-grid">${(data.topClusters || []).slice(0, 6).map((cluster) => `<a href="${cluster.url}" target="_blank" rel="noreferrer" class="${cluster.urgency || "watch"}">
      <div><span>${cluster.institution} / ${cluster.category}</span><time>${formatTime(cluster.firstSeenAt)}</time></div>
      <strong>${cluster.title}</strong>
      <small>独立${cluster.independentSources}源・${cluster.articleCount}記事 / 初動1時間 ${cluster.firstHourSources}源 / ${cluster.propagationMinutes}分で伝播</small>
      <em class="${cluster.conflict ? "conflict" : Number(cluster.bias || 0) > 0 ? "up" : Number(cluster.bias || 0) < 0 ? "down" : "flat"}">${cluster.conflict ? "相反報道あり・影響減点" : Number(cluster.bias || 0) > 0 ? "EUR/USD上方向" : Number(cluster.bias || 0) < 0 ? "EUR/USD下方向" : "方向中立"} / 影響 ${signedNumber(cluster.impact, 3)}</em>
    </a>`).join("") || `<div class="fundamental-news-empty">出来事単位の伝播を分析しています。</div>`}</div>
    <div class="fundamental-news-list">${(data.latest || []).slice(0, 6).map((item) => `<a href="${item.url}" target="_blank" rel="noreferrer" class="${item.analysis?.urgency || "watch"}"><div><span>${item.sourceClass} / ${item.analysis?.institution || item.source}</span><time>${formatTime(item.capturedAt)}</time></div><strong>${item.japaneseTitle || item.title}</strong><small>${item.analysis?.category || "マクロ"} / ${item.dissemination?.independentSources || 1}情報源の出来事 / 初回確認を固定保存</small></a>`).join("") || `<div class="fundamental-news-empty">公式フィードの新着を監視しています。</div>`}</div>
    <p class="central-bank-method">${data.method || "初回確認時刻を固定して事後照合"}</p>
  `;
}

function renderGeopoliticalRisk(data) {
  if (!geopoliticalRiskEl || !geopoliticalRiskPanelEl || !geopoliticalRiskStatusEl) return;
  const risk = data?.geopoliticalRisk || {};
  const score = Number(risk.score || 0);
  const tone = score >= 70 ? "critical" : score >= 40 ? "warning" : score >= 15 ? "watch" : "calm";
  geopoliticalRiskPanelEl.className = `geopolitical-risk-wrap ${tone}`;
  geopoliticalRiskStatusEl.textContent = `${risk.level || "平常"} / リスク ${score}`;
  const counts = risk.counts || {};
  const validation = risk.validation || {};
  const reactionText = (reaction) => reaction ? `${reaction.label} ${signedNumber(reaction.movePct, 4, "%")}` : "市場反応を照合中";
  geopoliticalRiskEl.innerHTML = `
    <div class="geopolitical-risk-summary">
      <div><span>総合リスク</span><strong>${score}/100</strong><small>${risk.level || "平常"}</small></div>
      <div><span>紛争・戦闘</span><strong>${counts.conflict || 0}件</strong><small>軍事衝突・停戦</small></div>
      <div><span>デモ・騒乱</span><strong>${counts.protest || 0}件</strong><small>抗議・政情不安</small></div>
      <div><span>選挙・投票</span><strong>${counts.election || 0}件</strong><small>政策転換リスク</small></div>
    </div>
    <div class="geopolitical-validation-grid">
      <div><span>15分後の実変動</span><strong>${validation.m15?.samples || 0}件</strong><small>平均絶対変動 ${validation.m15?.averageAbsoluteMovePct == null ? "蓄積中" : `${Number(validation.m15.averageAbsoluteMovePct).toFixed(4)}%`}</small></div>
      <div><span>60分後の実変動</span><strong>${validation.m60?.samples || 0}件</strong><small>平均絶対変動 ${validation.m60?.averageAbsoluteMovePct == null ? "蓄積中" : `${Number(validation.m60.averageAbsoluteMovePct).toFixed(4)}%`}</small></div>
      <div><span>予測採用状態</span><strong>${validation.status || "影検証中"}</strong><small>地政学だけで方向を決めません</small></div>
    </div>
    <div class="geopolitical-event-list">${(risk.latest || []).map((item) => `<a href="${item.url || "#"}" target="_blank" rel="noreferrer" class="${item.severity >= 70 ? "critical" : item.severity >= 45 ? "warning" : "watch"}">
      <div><span>${item.typeLabel || "地政学"} / ${item.regionLabel || "地域確認中"}</span><time>${formatTime(item.capturedAt || item.publishedAt)}</time></div>
      <strong>${item.title || "情勢を確認中"}</strong>
      <small>深刻度 ${item.severity || 0} / 現在リスク ${Number(item.riskScore || 0).toFixed(1)} / ${item.marketChannel || "市場初動を確認中"}<br>15分: ${reactionText(item.reaction15m)} / 60分: ${reactionText(item.reaction60m)}</small>
    </a>`).join("") || `<div class="geopolitical-risk-empty">直近48時間に高信頼の地政学イベントは確認されていません。</div>`}</div>
    <p class="geopolitical-risk-method">${risk.method || "地政学ニュースを監視しています。"}</p>
  `;
}

function renderCurrencyStrength(data, executionCost) {
  if (!currencyStrengthEl || !currencyStrengthPanelEl) return;
  if (!data?.available || !data.currencies?.length) {
    currencyStrengthPanelEl.className = "currency-strength-wrap flat";
    currencyStrengthStatusEl.textContent = data?.status || "実測データ待ち";
    currencyStrengthEl.innerHTML = `<div class="currency-strength-empty">主要通貨の確定5分足を取得しています。</div>`;
    renderCurrencyStrengthChart(data);
    return;
  }
  const tone = data.eurusd?.direction || "flat";
  currencyStrengthPanelEl.className = `currency-strength-wrap ${tone}`;
  currencyStrengthStatusEl.textContent = data.eurusd?.label || "EUR/USD判定中";
  renderCurrencyStrengthChart(data);
  const time = data.candleAt ? new Date(data.candleAt).toLocaleTimeString("ja-JP", { hour: "2-digit", minute: "2-digit" }) : "--:--";
  currencyStrengthEl.innerHTML = `
    <div class="currency-strength-summary">
      <div><span>EUR − USD 強度差</span><strong>${signedNumber(data.eurusd?.spread, 2, "σ")}</strong><small>${data.eurusd?.label || "判定中"}</small></div>
      <div><span>最強 / 最弱</span><strong>${data.strongest?.code || "-"} / ${data.weakest?.code || "-"}</strong><small>${data.strongest?.name || ""} と ${data.weakest?.name || ""}</small></div>
      <div><span>データ品質</span><strong>${data.pairCount}/${data.expectedPairCount} ペア</strong><small>${time} 確定足 / 1分ごと更新</small></div>
      <div><span>通貨強弱モデル成績</span><strong>${data.performance?.hitRate === null || data.performance?.hitRate === undefined ? "--" : `${Math.round(data.performance.hitRate * 100)}%`}</strong><small>${data.performance?.status || "照合データ蓄積中"} / ${data.performance?.samples || 0}件</small></div>
    </div>
    <div class="currency-horizon-grid">
      ${[
        ["5分", data.eurusd?.spread, "TREND"],
        ["1時間", data.eurusd?.oneHourSpread, "TREND"],
        ["4時間", data.eurusd?.fourHourSpread, "CYCLE"],
        ["日足", data.eurusd?.dailySpread, "CYCLE"]
      ].map(([label, value, mode]) => {
        const direction = Number(value || 0) > 0.35 ? "up" : Number(value || 0) < -0.35 ? "down" : "flat";
        return `<div class="currency-horizon ${direction}"><span>${label} / ${mode}</span><strong>${signedNumber(value, 2, "σ")}</strong><small>${direction === "up" ? "EUR優位" : direction === "down" ? "USD優位" : "拮抗"}</small></div>`;
      }).join("")}
    </div>
    ${executionCost ? `<div class="execution-cost-strip"><span>検証用取引コスト</span><strong>往復 ${Number(executionCost.roundTripPct || 0).toFixed(4)}%</strong><small>推定スプレッド ${Number(executionCost.spreadPips || 0).toFixed(2)}pips + スリッページ / ${executionCost.mode}</small></div>` : ""}
    <div class="currency-strength-table">
      <div class="currency-strength-labels"><span>順位・通貨</span><span>5分強度</span><span>5分変化</span><span>1時間</span><span>状態</span></div>
      ${data.currencies.map((item) => {
        const width = Math.min(50, Math.abs(Number(item.zScore || 0)) / 3 * 50);
        const left = Number(item.zScore || 0) < 0 ? 50 - width : 50;
        return `<div class="currency-strength-row ${item.direction}">
          <div class="currency-name"><b>${item.rank}</b><strong>${item.code}</strong><small>${item.name}</small></div>
          <div class="currency-meter" title="8通貨内Zスコア ${signedNumber(item.zScore)}σ"><i></i><b style="left:${left}%;width:${width}%"></b></div>
          <strong class="currency-change">${signedNumber(item.fiveMinutePct, 4, "%")}</strong>
          <span class="currency-hour">${signedNumber(item.oneHourZ, 2, "σ")}</span>
          <span class="currency-state">${item.level}${item.reversalWarning ? " / 反転警戒" : item.extreme ? " / 極端" : ""}</span>
        </div>`;
      }).join("")}
    </div>
    <p class="currency-strength-note">${data.method}。未確定足は除外し、±2σ到達後に勢いが逆転した通貨は「伸び切り・反転警戒」と表示します。EUR/USD予測はTREND 60%・CYCLE 40%を合成します。</p>
  `;
}

function renderEurusdOptions(options) {
  if (!optionsPanelEl || !optionsStatusEl || !optionsAnalysisEl) return;
  const tone = options?.direction || "flat";
  optionsPanelEl.className = `options-wrap ${tone}`;
  if (!options) {
    optionsStatusEl.textContent = "取得待ち";
    optionsAnalysisEl.innerHTML = `<div class="options-empty">Cboeのユーロ連動ETFオプション建玉を取得中です。</div>`;
    return;
  }
  const updated = Number.isFinite(Date.parse(options.at)) ? new Date(options.at).toLocaleString("ja-JP") : "時刻不明";
  optionsStatusEl.textContent = `${options.verdict} / ${updated}`;
  const fmt = (value) => Number(value || 0).toLocaleString("ja-JP");
  const typeLabel = (type) => type === "call" ? "コール（上側）" : "プット（下側）";
  optionsAnalysisEl.innerHTML = `
    <div class="options-summary">
      <div class="options-verdict ${tone}">
        <span>${options.proxyLabel}</span>
        <strong>${options.verdict}</strong>
        <small>Put/Call建玉比 ${Number(options.putCallRatio || 0).toFixed(2)} / FXE ${Number(options.fxePrice || 0).toFixed(2)}</small>
        <em class="options-quality ${options.usableForPrediction ? "fresh" : "stale"}">${options.usableForPrediction ? "予測に使用" : "古いため予測から除外"} / ${Number(options.dataAgeHours || 0).toFixed(1)}時間前</em>
      </div>
      <div><span>コール建玉</span><strong class="up">${fmt(options.callOi)}枚</strong><small>当日出来高 ${fmt(options.callVolume)}</small></div>
      <div><span>プット建玉</span><strong class="down">${fmt(options.putOi)}枚</strong><small>当日出来高 ${fmt(options.putVolume)}</small></div>
      <div><span>最大コール壁</span><strong>${options.topCall ? Number(options.topCall.eurusdEquivalent).toFixed(5) : "--"}</strong><small>${options.topCall ? `${options.topCall.expiration} / ${fmt(options.topCall.openInterest)}枚` : "取得待ち"}</small></div>
      <div><span>最大プット壁</span><strong>${options.topPut ? Number(options.topPut.eurusdEquivalent).toFixed(5) : "--"}</strong><small>${options.topPut ? `${options.topPut.expiration} / ${fmt(options.topPut.openInterest)}枚` : "取得待ち"}</small></div>
    </div>
    <div class="options-expiries">
      ${(options.expirySummary || []).map((row) => `
        <div><strong>${row.expiration}</strong><span>Call ${fmt(row.callOi)} / Put ${fmt(row.putOi)}</span><small>P/C ${Number(row.putCallRatio || 0).toFixed(2)}</small></div>
      `).join("")}
    </div>
    <div class="options-table-wrap">
      <table class="options-table">
        <thead><tr><th>満期日</th><th>種類</th><th>EUR/USD換算目安</th><th>FXE権利行使</th><th>建玉</th><th>出来高</th><th>想定元本</th></tr></thead>
        <tbody>
          ${(options.rows || []).map((row) => `
            <tr class="${row.type}"><td>${row.expiration}</td><td>${typeLabel(row.type)}</td><td>${Number(row.eurusdEquivalent).toFixed(5)}</td><td>$${Number(row.strike).toFixed(2)}</td><td>${fmt(row.openInterest)}</td><td>${fmt(row.volume)}</td><td>$${fmt(row.notionalUsd)}</td></tr>
          `).join("")}
        </tbody>
      </table>
    </div>
    <div class="options-note">
      <span>${options.method || "建玉・出来高・価格近接度を合成"} / 合成圧力 ${Number(options.rawPressure || 0) >= 0 ? "+" : ""}${Number(options.rawPressure || 0).toFixed(3)}</span>
      <span>${options.disclaimer}</span>
      <a href="${options.sourceUrl}" target="_blank" rel="noreferrer">Cboe元データ</a>
      <a href="${options.cmeReferenceUrl}" target="_blank" rel="noreferrer">CMEユーロFXオプション</a>
    </div>
  `;
}

function renderCandleQuality(quality) {
  if (!quality) return "";
  const tone = quality.status === "verified" ? "verified" : quality.status === "filtered" ? "filtered" : "fallback";
  return `
    <div class="candle-quality ${tone}" title="${quality.reason || "ローソク足品質を検査"}">
      <strong>${quality.label || "データ検査済み"}</strong>
      <span>${quality.reason || "OHLCを検査済み"}</span>
    </div>
  `;
}

function urlBase64ToUint8Array(value) {
  const padding = "=".repeat((4 - value.length % 4) % 4);
  const base64 = (value + padding).replace(/-/g, "+").replace(/_/g, "/");
  return Uint8Array.from(atob(base64), (character) => character.charCodeAt(0));
}

async function enableBackgroundPush() {
  const registration = serviceWorkerRegistration || await Promise.race([
    navigator.serviceWorker.ready,
    new Promise((_, reject) => setTimeout(() => reject(new Error("サービスワーカーの準備がタイムアウトしました")), 12000))
  ]);
  if (!registration?.pushManager) throw new Error("このブラウザはバックグラウンド通知に対応していません");
  const keyResponse = await fetch("/api/push/public-key", { cache: "no-store" });
  if (!keyResponse.ok) throw new Error("Push key unavailable");
  const config = await keyResponse.json();
  if (!config.enabled || !config.publicKey) throw new Error("Push is disabled");
  let subscription = await registration.pushManager.getSubscription();
  if (subscription?.options?.applicationServerKey) {
    const existingKey = new Uint8Array(subscription.options.applicationServerKey);
    const expectedKey = urlBase64ToUint8Array(config.publicKey);
    const sameKey = existingKey.length === expectedKey.length && existingKey.every((value, index) => value === expectedKey[index]);
    if (!sameKey) {
      await subscription.unsubscribe();
      subscription = null;
    }
  }
  if (!subscription) {
    subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(config.publicKey)
    });
  }
  const response = await fetch("/api/push/subscribe", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      subscription: subscription.toJSON(),
      device: {
        isMobile: /Android|Mobile/i.test(navigator.userAgent),
        userAgent: navigator.userAgent
      },
      preferences: {
        eurusd15mHighConfidence: false,
        criticalAlerts: false,
        paperTradeEvents: true,
        threshold: 0.8,
        cooldownMinutes: 15
      }
    })
  });
  if (!response.ok) throw new Error("Push subscription failed");
  const result = await response.json().catch(() => ({}));
  notificationStatusMessage = result.testSent
    ? "登録完了。テスト通知を送信しました。今後は公式仮想取引の開始・終了時だけ通知します。"
    : `登録は完了しましたが、テスト通知は送信できませんでした。${result.testResult || "Androidの通知設定を確認してください。"}`;
  return true;
}

async function disableBackgroundPush() {
  const registration = serviceWorkerRegistration || await navigator.serviceWorker.ready;
  const subscription = await registration.pushManager.getSubscription();
  if (!subscription) return;
  await fetch("/api/push/subscribe", {
    method: "DELETE",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ endpoint: subscription.endpoint })
  }).catch(() => undefined);
  await subscription.unsubscribe();
}

async function requestNotificationAccess() {
  if (NATIVE_APP_MODE) {
    try {
      nativePushStatus = await globalThis.WpsNative.enableTradeNotifications();
      notificationsEnabled = ["local-monitor-ready", "instant-ready", "server-waiting-firebase"].includes(nativePushStatus?.state);
      notificationStatusMessage = notificationsEnabled
        ? "Android通知を登録しました。端末が15分ごとに確認し、公式仮想取引の開始・終了だけを通知します。"
        : "Android設定で通知を許可してください。";
    } catch (error) {
      notificationsEnabled = false;
      notificationStatusMessage = `Android通知登録に失敗しました: ${error.message || "通信エラー"}`;
    }
    localStorage.setItem("worldPredictionNotifications", notificationsEnabled ? "on" : "off");
    updateNotificationUi();
    return notificationsEnabled;
  }
  if (!notificationSupported()) {
    notificationStatusMessage = "このブラウザでは通知を利用できません。Android版ChromeでHTTPS公開URLを直接開いてください。";
    return false;
  }
  if (STATIC_PREVIEW_MODE) {
    notificationsEnabled = false;
    notificationStatusMessage = "GitHub Pages確認版はバックグラウンド通知を送信できません。Androidアプリ最新版で登録してください。";
    localStorage.setItem("worldPredictionNotifications", "off");
    updateNotificationUi();
    return false;
  }
  if (Notification.permission === "denied") {
    notificationsEnabled = false;
    notificationStatusMessage = "通知が拒否済みです。Chromeのサイト設定から通知を許可してください。";
    localStorage.setItem("worldPredictionNotifications", "off");
    updateNotificationUi();
    return false;
  }
  try {
    const permission = Notification.permission === "granted"
      ? "granted"
      : await Notification.requestPermission();
    notificationsEnabled = permission === "granted";
    if (!notificationsEnabled) {
      notificationStatusMessage = "通知は許可されませんでした。Chromeのサイト設定を確認してください。";
    } else {
      await enableBackgroundPush();
    }
  } catch (error) {
    notificationsEnabled = false;
    notificationStatusMessage = `通知登録に失敗しました: ${error.message || "通信エラー"}`;
    console.warn("background push registration failed", error);
  }
  localStorage.setItem("worldPredictionNotifications", notificationsEnabled ? "on" : "off");
  updateNotificationUi();
  return notificationsEnabled;
}

function alertNotificationBody(alert) {
  const direction = alert.direction === "up" ? "上方向" : alert.direction === "down" ? "下方向" : "方向確認";
  return `${alert.location || "Global"} / ${direction} / ${alert.message || "急変を検知しました。"}`;
}

async function sendAlertNotification(alert, severity, { force = false } = {}) {
  if (!notificationsEnabled || !notificationSupported() || Notification.permission !== "granted") return;
  if (!force && Date.now() - lastNotificationAt < 45 * 1000) return;
  lastNotificationAt = Date.now();
  const title = severity === "critical" ? "世界予測システム: 重大アラート" : "世界予測システム: 注意アラート";
  const options = {
    body: alertNotificationBody(alert),
    tag: `wps-${alert.id || severity}`,
    renotify: severity === "critical",
    requireInteraction: severity === "critical",
    vibrate: severity === "critical" ? [400, 180, 400, 180, 700] : [220, 120, 220],
    icon: "/icon.svg",
    badge: "/icon.svg",
    silent: false,
    data: { url: `${location.origin}/?notice=market-alert&siren=1&noticeTitle=${encodeURIComponent(title)}&noticeBody=${encodeURIComponent(alertNotificationBody(alert))}#alert-panel` }
  };
  try {
    if (serviceWorkerRegistration?.showNotification) {
      await serviceWorkerRegistration.showNotification(title, options);
    } else {
      new Notification(title, options);
    }
  } catch {
    new Notification(title, options);
  }
}

function renderAlerts(alerts) {
  const currentIds = new Set((alerts || []).map((alert) => alert.id));
  const newAlerts = (alerts || []).filter((alert) => !lastAlertIds.has(alert.id));
  lastAlertIds = currentIds;

  if (!alerts || alerts.length === 0) {
    alertPanelEl.className = "alert-panel calm";
    alertTitleEl.textContent = "アラートなし";
    alertDetailEl.textContent = "異常変動と予測乖離を1分ごとに監視しています。";
    return;
  }

  const top = alerts[0];
  alertPanelEl.className = `alert-panel ${top.severity}`;
  alertTitleEl.textContent = top.severity === "critical" ? "重大アラート" : "注意アラート";
  alertDetailEl.textContent = `${top.location}: ${top.message}`;

  if (newAlerts.length) {
    const severity = newAlerts.some((alert) => alert.severity === "critical") ? "critical" : "warning";
    const notifyTarget = newAlerts.find((alert) => alert.severity === "critical")
      || newAlerts.find((alert) => alert.type === "important_eurusd_info")
      || newAlerts[0];
    playAlertTone(severity);
    // 市場アラートは画面とサイレンだけに留め、Push通知は取引開始・終了に限定します。
  }
}

function renderLearning(accuracy, markets, backgroundLearning, walkForwardValidation = {}) {
  const mae = Number.isFinite(accuracy.totalMaePct) ? `${accuracy.totalMaePct.toFixed(3)}%` : "照合待ち";
  learningScoreEl.textContent = `${accuracy.completed || 0}件 / 平均誤差 ${mae}`;

  const trained = markets
    .filter((market) => market.forecast.calibration.samples > 0)
    .sort((a, b) => b.forecast.calibration.samples - a.forecast.calibration.samples)
    .slice(0, 6);

  const items = trained.length ? trained : markets.slice(0, 6);
  const background = backgroundLearning || {};
  const watchdog = background.watchdog || {};
  const lastRun = background.lastSuccessAt
    ? new Date(background.lastSuccessAt).toLocaleTimeString("ja-JP")
    : "起動直後";
  const nextRun = background.nextRunAt
    ? new Date(background.nextRunAt).toLocaleTimeString("ja-JP")
    : "計算中";
  const backgroundItem = `
    <div class="learning-item learning-item-auto">
      <strong>サーバー自動学習 ${background.enabled ? "ON" : "OFF"}</strong>
      <span>状態 ${background.status || "待機中"}</span>
      <span class="watchdog-${watchdog.severity || "normal"}">監視 ${watchdog.label || "確認中"}</span>
      <span>連続失敗 ${watchdog.consecutiveFailures || 0}回 / 未実行周期 ${watchdog.missedCycles || 0}</span>
      <span>最終実行 ${lastRun}</span>
      <span>次回 ${nextRun}</span>
      <span>時系列検証 ${walkForwardValidation.status || "準備中"}</span>
      <span>${walkForwardValidation.method || `有効データ ${walkForwardValidation.samples || 0}件`}</span>
    </div>
    <div class="learning-item learning-item-audit">
      <strong>学習データ品質監査</strong>
      <span>採用 ${accuracy.audit?.usable || 0}件 / 監査 ${accuracy.audit?.total || 0}件</span>
      <span>除外 ${accuracy.audit?.excluded || 0}件 / 採用率 ${pctText(accuracy.audit?.usableRate)}</span>
      <span>EUR/USD 採用 ${accuracy.audit?.eurusd?.usable || 0}件 / ${accuracy.audit?.eurusd?.total || 0}件</span>
      <span>旧形式 ${accuracy.audit?.counts?.legacy || 0} / 重複 ${accuracy.audit?.counts?.overlap || 0}</span>
      <span>価格遅延 ${accuracy.audit?.counts?.stale || 0} / 無効 ${accuracy.audit?.counts?.invalid || 0} / 待機 ${accuracy.audit?.counts?.pending || 0}</span>
    </div>
  `;

  learningGridEl.innerHTML = backgroundItem + items.map((market) => {
    const stat = accuracy.byAsset?.[market.id];
    const hitRate = stat?.hitRate !== null && stat?.hitRate !== undefined ? `${(stat.hitRate * 100).toFixed(0)}%` : "--";
    const maeText = stat?.maePct !== null && stat?.maePct !== undefined ? `${stat.maePct.toFixed(3)}%` : "--";
    return `
      <div class="learning-item">
        <strong>${market.label}</strong>
        <span>有効判定 ${stat?.directionalSamples || 0}件</span>
        <span>方向一致 ${hitRate}</span>
        <span>中立 ${stat?.neutralSamples || 0}件 / 無効 ${stat?.invalidSamples || 0}件</span>
        <span>平均誤差 ${maeText}</span>
      </div>
    `;
  }).join("");
}

function pctText(value) {
  return Number.isFinite(Number(value)) ? `${(Number(value) * 100).toFixed(0)}%` : "--";
}

function maeText(value) {
  return Number.isFinite(Number(value)) ? `${Number(value).toFixed(3)}%` : "--";
}

function renderBacktest(backtest) {
  if (!backtest) return;
  backtestScoreEl.textContent = `${backtest.completed || 0}件照合`;
  const assets = (backtest.byAsset || []).filter((item) => item.samples > 0).slice(0, 4);
  const conditions = (backtest.conditions || []).slice(0, 4);
  const models = (backtest.models || []).slice(0, 4);
  const hours = (backtest.byHour || []).filter((item) => item.samples > 0).slice(0, 3);
  const features = (backtest.byFeature || []).filter((item) => item.samples > 0).slice(0, 3);
  const rows = [
    ...assets.map((item) => ({ type: "銘柄", label: item.label, samples: item.samples, hitRate: item.hitRate, maePct: item.maePct })),
    ...conditions.map((item) => ({ type: "条件", label: item.label, samples: item.samples, hitRate: item.hitRate, maePct: item.maePct })),
    ...models.map((item) => ({ type: "モデル", label: item.label, samples: item.samples, hitRate: item.hitRate, maePct: item.maePct })),
    ...hours.map((item) => ({ type: "時間帯", label: item.label, samples: item.samples, hitRate: item.hitRate, maePct: item.maePct })),
    ...features.map((item) => ({ type: "特徴量", label: item.label, samples: item.samples, hitRate: item.hitRate, maePct: item.maePct }))
  ].slice(0, 12);

  if (!rows.length) {
    backtestGridEl.innerHTML = `<div class="backtest-empty">10分後照合が増えると、条件別の得意・不得意が表示されます。</div>`;
  } else {
    backtestGridEl.innerHTML = rows.map((item) => `
      <div class="backtest-item">
        <span>${item.type}</span>
        <strong>${item.label}</strong>
        <small>照合 ${item.samples}件 / 方向一致 ${pctText(item.hitRate)} / 平均誤差 ${maeText(item.maePct)}</small>
      </div>
    `).join("");
  }

  backtestRecommendationsEl.innerHTML = (backtest.recommendations || []).map((item) => `
    <div>${item}</div>
  `).join("");
}

function renderAiQuestionAnswer(result) {
  if (!aiQuestionAnswerEl) return;
  aiQuestionAnswerEl.replaceChildren();
  const heading = document.createElement("strong");
  heading.textContent = result.headline;
  const summary = document.createElement("p");
  summary.textContent = result.answer;
  const list = document.createElement("ul");
  for (const fact of result.facts || []) {
    const item = document.createElement("li");
    item.textContent = fact;
    list.appendChild(item);
  }
  const note = document.createElement("small");
  const time = result.snapshotAt ? new Date(result.snapshotAt).toLocaleTimeString("ja-JP") : "--";
  note.textContent = `${result.caution} / 参照データ ${time}`;
  aiQuestionAnswerEl.append(heading, summary, list, note);
}

async function askCurrentStatus(question) {
  const value = String(question || "").trim();
  if (!value || !aiQuestionAnswerEl) return;
  aiQuestionSubmitEl.disabled = true;
  aiQuestionStatusEl.textContent = "最新状態を確認中";
  aiQuestionAnswerEl.textContent = "価格、ニュース、予測、仮想取引を照合しています。";
  try {
    let result;
    if (STATIC_PREVIEW_MODE) {
      const assistant = await import("./current-status-assistant.js?v=158");
      result = assistant.answerCurrentStatus(value, latestSnapshot);
    } else {
      const response = await fetch("/api/ask-current-status", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ question: value })
      });
      result = await response.json();
      if (!response.ok) throw new Error(result.error || `API ${response.status}`);
    }
    renderAiQuestionAnswer(result);
    aiQuestionStatusEl.textContent = STATIC_PREVIEW_MODE ? "保存済み確認データで回答" : "最新データで回答";
    localStorage.setItem("worldPredictionLastQuestion", value);
  } catch (error) {
    aiQuestionAnswerEl.textContent = `回答エラー: ${error.message}`;
    aiQuestionStatusEl.textContent = "再試行してください";
  } finally {
    aiQuestionSubmitEl.disabled = false;
  }
}

async function loadSnapshot(forceFull = false) {
  refreshButton.disabled = true;
  try {
    const fullRefresh = Boolean(forceFull) || !latestSnapshot || Date.now() - lastFullSnapshotAt >= deliveryCadence().full;
    const endpoint = STATIC_PREVIEW_MODE
      ? NATIVE_APP_MODE
        ? globalThis.WpsNative.snapshotUrl
        : new URL("./preview-snapshot.json", document.baseURI).toString()
      : fullRefresh
      ? `/api/snapshot${detailMode === "compact" ? "?view=compact" : ""}`
      : "/api/snapshot/pulse";
    const currentEtag = STATIC_PREVIEW_MODE ? "" : fullRefresh ? snapshotEtag : coreSnapshotEtag;
    let payload;
    let usingNativeCache = false;
    try {
      const response = await fetch(endpoint, {
        cache: "no-cache",
        headers: currentEtag ? { "If-None-Match": currentEtag } : {}
      });
      if (response.status === 304) return;
      if (!response.ok) throw new Error(`API ${response.status}`);
      const responseEtag = response.headers.get("etag") || currentEtag;
      if (fullRefresh) snapshotEtag = responseEtag;
      else coreSnapshotEtag = responseEtag;
      payload = await response.json();
      if (NATIVE_APP_MODE) await globalThis.WpsNative.saveSnapshot(payload);
    } catch (networkError) {
      const cached = NATIVE_APP_MODE ? await globalThis.WpsNative.loadSnapshot() : null;
      if (!cached?.snapshot) throw networkError;
      payload = cached.snapshot;
      usingNativeCache = true;
    }
    if (fullRefresh || STATIC_PREVIEW_MODE) {
      latestSnapshot = payload;
      lastFullSnapshotAt = Date.now();
    } else {
      const mergedMarkets = (payload.markets || []).map((market) => {
        const previous = (latestSnapshot.markets || []).find((item) => item.id === market.id) || {};
        return {
          ...previous,
          ...market,
          quote: { ...(previous.quote || {}), ...(market.quote || {}) },
          forecast: { ...(previous.forecast || {}), ...(market.forecast || {}) }
        };
      });
      latestSnapshot = {
        ...latestSnapshot,
        ...payload,
        context: { ...(latestSnapshot.context || {}), ...(payload.context || {}) },
        paperTrading: { ...(latestSnapshot.paperTrading || {}), ...(payload.paperTrading || {}) },
        markets: mergedMarkets.length ? mergedMarkets : latestSnapshot.markets
      };
    }
    const snapshot = latestSnapshot;
    if (NATIVE_APP_MODE) nativePushStatus = await globalThis.WpsNative.getPushStatus().catch(() => nativePushStatus);
    if (NATIVE_APP_MODE) globalThis.WpsNative.syncTradeNotifications(snapshot).catch(() => undefined);
    renderPairDecisionDeck(snapshot);
    renderMobileLearningStatus(snapshot);
    renderOperationalReadiness(snapshot);
    renderMarketTape(snapshot.markets);
    renderMapLiveFx(snapshot.markets, snapshot.generatedAt);
    renderMarkets(snapshot.markets);
    renderGlobe(snapshot);
    renderFinanceMonitorOverview(snapshot.financeMonitor);
    latestSignals = snapshot.signals || latestSignals;
    renderSignals(snapshot.signals, snapshot.context);
    renderAlerts(snapshot.alerts || []);
    renderAndroidAccess(snapshot.access, snapshot.highConfidenceNotification);
    renderDesktopOperations(snapshot.desktopOperations, snapshot.access);
    renderShockLog(snapshot.shockAnalyses || [], snapshot.postShockShadowReplay);
    renderExternalSignalShadow(snapshot.externalSignalShadow);
    renderTimeMachine(snapshot.timeMachine);
    renderDataHealth(snapshot.dataHealth);
    renderAiBriefing(snapshot.aiBriefing);
    renderNewsTicker(snapshot.newsTicker || []);
    renderFxNews(snapshot.fxNews || []);
    renderImportantInfo(snapshot.importantEurusdItems || []);
    renderEconomicCalendar(snapshot.economicCalendar);
    renderCotAnalysis(snapshot.cotAnalysis);
    if (detailMode === "full") renderEurusdOptions(snapshot.eurusdOptions);
    renderMarketCommandCenter(snapshot.marketCommandCenter);
    renderCentralBankTone(snapshot.centralBankTone);
    renderFundamentalNews(snapshot.fundamentalNews);
    renderGeopoliticalRisk(snapshot.fundamentalNews);
    renderCurrencyStrength(snapshot.currencyStrength, snapshot.executionCost);
    renderFxAnalysisPartner(snapshot.fxTradeAnalysisPartner);
    renderEurusdCommand(snapshot.eurusdCommand, (snapshot.markets || []).find((market) => market.id === "eurusd"), snapshot.probabilitySimulation);
    renderYenCrossCommand(snapshot.yenCrossCommand);
    renderEuroSovereignSpread(snapshot.euroSovereignSpread);
    renderEurusdPivotChart(snapshot.eurusdPivotChart, selectedPivotTimeframe);
    renderUsdjpyPivotChart(snapshot.usdjpyPivotChart, selectedUsdjpyPivotTimeframe);
    renderPivotTradeOverlays(snapshot.paperTrading, snapshot.markets);
    renderSwingCompass(snapshot.swingTradeCompass);
    if (detailMode === "full") renderConformalCalibration(snapshot.eurusdConformal);
    if (detailMode === "full") renderChampionChallenger(snapshot.championChallenger);
    renderValidationControl(snapshot.leakageAudit, snapshot.threeWayGate, snapshot.attributionLedger);
    renderPaperTrading(snapshot.paperTrading, snapshot.shadowPaperTrading, snapshot.paperTradingComparison);
    renderTradingAnalytics(snapshot.paperTrading, snapshot.eurusdTimeframes, snapshot.yenCrossCommand);
    if (detailMode === "full") renderYttDemoTrading(snapshot.yttDemoTrading);
    if (!yttDemoTriggerEl?.value) prefillYttScenario();
    renderTradeOpportunityMonitor(snapshot.paperTrading, snapshot.probabilitySimulation, snapshot.yenCrossCommand, snapshot.threeWayGate);
    renderAiImprovement(snapshot.aiImprovement, snapshot.context?.fxCausalModel?.fourHourFactorAllocator);
    renderEurusdTimeframes(snapshot.eurusdTimeframes || [], snapshot.eurusdTimeframeLearning, snapshot.dailyForecastReference);
    renderForecastNewsflash(snapshot.eurusdTimeframes || [], (snapshot.markets || []).find((market) => market.id === "eurusd"));
    renderIntegratedIntelligence(snapshot.fearGreed, snapshot.context?.countryRisk || [], snapshot.focusRanking || []);
    renderShockRadar(snapshot.shockRadar || [], snapshot.watchPoints || []);
    renderWorldPulse(snapshot.worldPulse, snapshot.aiBriefing);
    renderScenarioOutlook(snapshot.scenarioOutlook);
    renderLearning(snapshot.accuracy, snapshot.markets, snapshot.backgroundLearning, snapshot.walkForwardValidation);
    renderBacktest(snapshot.backtest);
    renderHistory(snapshot.history);
    renderRisk(snapshot.context);
    requestAnimationFrame(rebalanceIntelligenceRail);
    latestVoiceBriefing = buildVoiceBriefing(snapshot);
    voiceLineEl.textContent = latestVoiceBriefing.headline;
    voiceDetailEl.textContent = latestVoiceBriefing.detail;
    speakVoiceBriefing(latestVoiceBriefing);
    const delivery = snapshot.delivery || {};
    const generatedTime = new Date(snapshot.generatedAt).toLocaleTimeString("ja-JP");
    updatedAtEl.textContent = STATIC_PREVIEW_MODE
      ? `${NATIVE_APP_MODE ? usingNativeCache ? "端末保存データ" : "Android同期" : "読み取り専用"} / ${generatedTime}時点`
      : delivery.mode === "stale-cache"
      ? `最終正常値 ${delivery.ageSeconds}秒前 / 更新中`
      : `${generatedTime}${delivery.refreshing ? " / 裏側で更新中" : ""}`;
    updatedAtEl.title = delivery.message || "最新データ";
    feedStatusEl.classList.toggle("live", delivery.mode !== "stale-cache");
  } catch (error) {
    updatedAtEl.textContent = `オフライン: ${error.message}`;
    feedStatusEl.classList.remove("live");
  } finally {
    refreshButton.disabled = false;
  }
}

function deliveryCadence() {
  const mode = latestSnapshot?.deliveryBandwidth?.mode || "normal";
  const hostname = globalThis.location?.hostname || "";
  const localRealtime = NATIVE_APP_MODE || ["localhost", "127.0.0.1"].includes(hostname)
    || /^10\./.test(hostname) || /^192\.168\./.test(hostname) || /^172\.(1[6-9]|2\d|3[01])\./.test(hostname);
  if (mode === "critical") return { snapshot: 15 * 60 * 1000, liveFx: localRealtime ? 10 * 1000 : 60 * 1000, full: 2 * 60 * 60 * 1000 };
  if (mode === "saving") return { snapshot: 10 * 60 * 1000, liveFx: localRealtime ? 10 * 1000 : 30 * 1000, full: 60 * 60 * 1000 };
  return { snapshot: 5 * 60 * 1000, liveFx: localRealtime ? 10 * 1000 : 15 * 1000, full: 30 * 60 * 1000 };
}

function scheduleSnapshotRefresh() {
  clearTimeout(snapshotTimer);
  if (document.hidden) return;
  snapshotTimer = setTimeout(async () => {
    await loadSnapshot();
    scheduleSnapshotRefresh();
  }, STATIC_PREVIEW_MODE ? 30 * 60 * 1000 : deliveryCadence().snapshot);
}

function scheduleLiveFxRefresh() {
  clearTimeout(liveFxTimer);
  if (document.hidden || STATIC_PREVIEW_MODE) return;
  liveFxTimer = setTimeout(async () => {
    await refreshMapLiveFx();
    scheduleLiveFxRefresh();
  }, deliveryCadence().liveFx);
}

initFullWidthCharts();
initFullWidthGateVerification();
initResponsiveIntelligenceRail();
showOpenedNotificationDetail();
initMobileSectionTabs();
aiQuestionFormEl?.addEventListener("submit", (event) => {
  event.preventDefault();
  askCurrentStatus(aiQuestionInputEl.value);
});
aiQuestionSuggestionEls.forEach((button) => button.addEventListener("click", () => {
  aiQuestionInputEl.value = button.dataset.aiQuestion || "";
  askCurrentStatus(aiQuestionInputEl.value);
}));
yttDemoFormEl?.addEventListener("submit", (event) => {
  event.preventDefault();
  submitYttScenario();
});
yttDemoPairEl?.addEventListener("change", prefillYttScenario);
yttDemoSideEl?.addEventListener("change", prefillYttScenario);
yttDemoOrdersEl?.addEventListener("click", (event) => {
  const button = event.target.closest("[data-ytt-cancel]");
  if (button) cancelYttScenario(button.dataset.yttCancel);
});
if (FEATURE_FLAGS.globe3d && typeof Globe === "function") initGlobe();
eurusdPivotButtons.forEach((button) => button.addEventListener("click", () => {
  selectedEurusdChartMode = "price";
  localStorage.setItem("eurusdChartMode", selectedEurusdChartMode);
  selectedPivotTimeframe = button.dataset.pivotTimeframe;
  localStorage.setItem("eurusdPivotTimeframe", selectedPivotTimeframe);
  renderEurusdPivotChart(latestEurusdPivotChart, selectedPivotTimeframe);
}));
euroSovereignSpreadToggleEl?.addEventListener("click", () => {
  selectedEurusdChartMode = selectedEurusdChartMode === "spread" ? "price" : "spread";
  localStorage.setItem("eurusdChartMode", selectedEurusdChartMode);
  if (selectedEurusdChartMode === "spread") renderEurusdSovereignSpreadChart();
  else renderEurusdPivotChart(latestEurusdPivotChart, selectedPivotTimeframe);
});
usdjpyPivotButtons.forEach((button) => button.addEventListener("click", () => {
  selectedUsdjpyPivotTimeframe = button.dataset.usdjpyPivotTimeframe;
  localStorage.setItem("usdjpyPivotTimeframe", selectedUsdjpyPivotTimeframe);
  renderUsdjpyPivotChart(latestUsdjpyPivotChart, selectedUsdjpyPivotTimeframe);
}));
pivotAutoLineButtons.forEach((button) => {
  const assetId = button.dataset.autoLine;
  button.classList.toggle("active", autoLineEnabled[assetId]);
  button.setAttribute("aria-pressed", String(autoLineEnabled[assetId]));
  button.addEventListener("click", () => {
    autoLineEnabled[assetId] = !autoLineEnabled[assetId];
    localStorage.setItem(`${assetId}AutoLine`, autoLineEnabled[assetId] ? "on" : "off");
    button.classList.toggle("active", autoLineEnabled[assetId]);
    button.setAttribute("aria-pressed", String(autoLineEnabled[assetId]));
    if (assetId === "eurusd") renderEurusdPivotChart(latestEurusdPivotChart, selectedPivotTimeframe);
    if (assetId === "usdjpy") renderUsdjpyPivotChart(latestUsdjpyPivotChart, selectedUsdjpyPivotTimeframe);
  });
});
profitCalendarEl?.addEventListener("click", (event) => {
  const button = event.target.closest("[data-calendar-move]");
  if (!button || !latestSnapshot?.paperTrading?.profitCalendar) return;
  const calendar = latestSnapshot.paperTrading.profitCalendar;
  const months = [...new Set([...(calendar.months || []).map((row) => row.month), calendar.currentMonth].filter(Boolean))].sort();
  const currentIndex = months.indexOf(selectedProfitCalendarMonth);
  const nextIndex = Math.max(0, Math.min(months.length - 1, currentIndex + Number(button.dataset.calendarMove || 0)));
  selectedProfitCalendarMonth = months[nextIndex];
  renderTradingAnalytics(latestSnapshot.paperTrading, latestSnapshot.eurusdTimeframes, latestSnapshot.yenCrossCommand);
});
updateVoiceUi();
updateNotificationUi();
soundToggleEl.textContent = soundEnabled ? "音響 ON" : "音響 OFF";
loadSnapshot().finally(scheduleSnapshotRefresh);
window.speechSynthesis?.addEventListener?.("voiceschanged", updateVoiceUi);
window.addEventListener("beforeinstallprompt", (event) => {
  event.preventDefault();
  deferredInstallPrompt = event;
  if (latestSnapshot?.access) {
    renderAndroidAccess(latestSnapshot.access, latestSnapshot.highConfidenceNotification);
  }
});
window.addEventListener("appinstalled", () => {
  deferredInstallPrompt = null;
  if (latestSnapshot?.access) {
    renderAndroidAccess(latestSnapshot.access, latestSnapshot.highConfidenceNotification);
  }
});
if (!NATIVE_APP_MODE && "serviceWorker" in navigator && window.isSecureContext) {
  navigator.serviceWorker.register("./service-worker.js", { scope: "./" })
    .then((registration) => {
      serviceWorkerRegistration = registration;
      updateNotificationUi();
      if (!STATIC_PREVIEW_MODE && notificationsEnabled && Notification.permission === "granted") {
        enableBackgroundPush().catch(() => undefined);
      }
    })
    .catch(() => undefined);
}
refreshMapLiveFx().finally(scheduleLiveFxRefresh);
document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    clearTimeout(snapshotTimer);
    clearTimeout(liveFxTimer);
    return;
  }
  loadSnapshot().finally(scheduleSnapshotRefresh);
  refreshMapLiveFx().finally(scheduleLiveFxRefresh);
});
refreshButton.addEventListener("click", loadSnapshot);
shockSearchInputEl?.addEventListener("input", () => renderShockLog(latestShockLogs));
shockDirectionFilterEl?.addEventListener("change", () => renderShockLog(latestShockLogs));
timeMachineEventEl?.addEventListener("change", () => {
  loadTimeMachineEpisode(timeMachineEventEl.value).catch((error) => {
    timeMachineEl.innerHTML = `<p class="time-machine-empty">再生記録を取得できませんでした: ${error.message}</p>`;
  });
});
timeMachineSliderEl?.addEventListener("input", () => {
  stopTimeMachine();
  timeMachineFrameIndex = Number(timeMachineSliderEl.value || 0);
  renderTimeMachineFrame();
});
timeMachinePlayEl?.addEventListener("click", () => {
  if (timeMachineTimer) {
    stopTimeMachine();
    return;
  }
  if (!latestTimeMachine?.frames?.length) return;
  if (timeMachineFrameIndex >= latestTimeMachine.frames.length - 1) timeMachineFrameIndex = 0;
  unlockVoiceEngine();
  playTimeMachineTick(0);
  timeMachineFrameSpeech(latestTimeMachine.frames[timeMachineFrameIndex], latestTimeMachine.episode, true);
  timeMachinePlayEl.textContent = "Ⅱ 一時停止";
  timeMachineTimer = setInterval(() => {
    timeMachineFrameIndex += 1;
    if (timeMachineFrameIndex >= latestTimeMachine.frames.length) {
      timeMachineFrameIndex = latestTimeMachine.frames.length - 1;
      stopTimeMachine();
    }
    renderTimeMachineFrame();
    playTimeMachineTick(timeMachineFrameIndex);
    timeMachineFrameSpeech(latestTimeMachine.frames[timeMachineFrameIndex], latestTimeMachine.episode);
  }, 850);
});
globeLayerButtons.forEach((button) => button.addEventListener("click", () => {
  const layer = button.dataset.globeLayer;
  globeLayers[layer] = !globeLayers[layer];
  button.classList.toggle("active", globeLayers[layer]);
  button.setAttribute("aria-pressed", String(globeLayers[layer]));
  if (latestSnapshot) renderGlobe(latestSnapshot);
}));
globeModeButtons.forEach((button) => button.addEventListener("click", () => {
  globeMode = button.dataset.globeMode === "2d" ? "2d" : "3d";
  localStorage.setItem("worldPredictionMapMode", globeMode);
  applyGlobeMode();
}));
designModeButtons.forEach((button) => button.addEventListener("click", () => {
  designMode = button.dataset.designMode === "classic" ? "classic" : "command";
  localStorage.setItem("worldPredictionDesignMode", designMode);
  applyDesignMode();
}));
detailModeToggleEl?.addEventListener("click", async () => {
  detailMode = detailMode === "full" ? "compact" : "full";
  localStorage.setItem("worldPredictionDetailMode", detailMode);
  applyDetailMode();
  await loadSnapshot(true);
});
applyGlobeMode();
applyDesignMode();
applyDetailMode({ rerender: false });
mapAlertMarkersEl?.addEventListener("click", (event) => openMapEventDetail(event.target.closest(".map-marker-pole")));
mapAlertMarkersEl?.addEventListener("mouseover", (event) => openMapEventDetail(event.target.closest(".map-marker-pole")));
mapAlertMarkersEl?.addEventListener("focusin", (event) => openMapEventDetail(event.target.closest(".map-marker-pole")));
mapEventDetailCloseEl?.addEventListener("click", () => { mapEventDetailEl.hidden = true; });
soundToggleEl.addEventListener("click", () => {
  soundPreviewActive = false;
  soundPreviewTimers.forEach(clearTimeout);
  soundPreviewTimers = [];
  soundEnabled = !soundEnabled;
  localStorage.setItem("worldPredictionSound", soundEnabled ? "on" : "off");
  soundToggleEl.textContent = soundEnabled ? "音響 ON" : "音響 OFF";
  const position = latestSnapshot?.paperTrading?.position || latestSnapshot?.shadowPaperTrading?.position || null;
  syncMarketSoundscape(position);
});
soundPreviewEl?.addEventListener("click", previewMarketSoundscape);
notifyToggleEl?.addEventListener("click", async () => {
  if (!NATIVE_APP_MODE && notificationsEnabled && Notification.permission === "granted") {
    notificationsEnabled = false;
    localStorage.setItem("worldPredictionNotifications", "off");
    await disableBackgroundPush().catch(() => undefined);
    updateNotificationUi();
    return;
  }
  soundEnabled = true;
  localStorage.setItem("worldPredictionSound", "on");
  soundToggleEl.textContent = "音響 ON";
  playAlertTone("critical", { force: true, preview: true });
  const ok = await requestNotificationAccess();
  if (ok) notificationStatusMessage = "公式仮想取引の開始・終了時だけ通知します。";
});
voiceToggleEl?.addEventListener("click", () => {
  voiceEnabled = !voiceEnabled;
  localStorage.setItem("worldPredictionVoice", voiceEnabled ? "on" : "off");
  if (voiceEnabled) unlockVoiceEngine();
  updateVoiceUi();
  if (voiceEnabled && latestVoiceBriefing) {
    speakVoiceBriefing(latestVoiceBriefing, true);
  } else if (!voiceEnabled && "speechSynthesis" in window) {
    voiceRunId += 1;
    window.speechSynthesis.cancel();
    voiceUnlocked = false;
  }
});
voiceModeEl?.addEventListener("change", () => {
  voiceMode = voiceModeEl.value;
  localStorage.setItem("worldPredictionVoiceMode", voiceMode);
  updateVoiceUi();
  if (voiceEnabled && latestVoiceBriefing) {
    unlockVoiceEngine();
    speakVoiceBriefing(latestVoiceBriefing, true);
  }
});
voiceTestEl?.addEventListener("click", () => {
  if (!latestVoiceBriefing) return;
  if (!voiceEnabled) {
    voiceEnabled = true;
    localStorage.setItem("worldPredictionVoice", "on");
    updateVoiceUi();
  }
  unlockVoiceEngine();
  speakVoiceBriefing(latestVoiceBriefing, true);
});
