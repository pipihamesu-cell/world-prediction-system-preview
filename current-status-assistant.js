import { ECONOMIC_KNOWLEDGE_VERSION, economicKnowledgeEvidence, lookupEconomicKnowledge } from "./economic-knowledge.js?v=4";
import { buildEurusdDecision } from "./eurusd-decision.js?v=1";

const percent = (value, digits = 1) => Number.isFinite(Number(value)) ? `${Number(value).toFixed(digits)}%` : "--";
const price = (market) => Number.isFinite(Number(market?.quote?.value)) ? Number(market.quote.value).toFixed(market.decimals ?? 5) : "--";

function detectTopic(question = "") {
  const q = String(question).toLowerCase();
  if (/仮想|デモ|取引|ポジション|損切|利確|口座|含み|買いたい|売りたい|エントリー/.test(q)) return "trading";
  if (/ニュース|材料|指標|発言|理由|なぜ|ファンダ/.test(q)) return "news";
  if (/精度|成績|的中|確率|学習|評価/.test(q)) return "accuracy";
  if (/データ|鮮度|取得|ソース|正常|稼働|保存/.test(q)) return "health";
  if (/ドル円|usd.?jpy|円安|円高/.test(q)) return "usdjpy";
  if (/ユーロドル|eur.?usd|方向|予測|上が|下が/.test(q)) return "eurusd";
  return "overview";
}

function marketFacts(market) {
  if (!market) return ["対象レートを取得できていません。"]; 
  const forecast = market.forecast || {};
  const direction = Number(forecast.deltaPct) > 0 ? "上方向" : Number(forecast.deltaPct) < 0 ? "下方向" : "横ばい";
  return [
    `${market.label} 現在値 ${price(market)}（${Math.round(market.quote?.freshnessSeconds ?? 0)}秒前）`,
    `参考: 個別モデル ${direction} ${percent(Math.abs(forecast.deltaPct || 0), 3)}（最終判断・実測勝率ではありません）`,
    `価格照合 ${market.quote?.consensusVerified ? "成立" : "未成立"} / ${market.quote?.sourceCount || 0}系統`
  ];
}

export function answerCurrentStatus(question, snapshot, now = new Date()) {
  const cleanQuestion = String(question || "").trim().slice(0, 300);
  if (!cleanQuestion) throw new Error("質問を入力してください。");
  const knowledge = lookupEconomicKnowledge(cleanQuestion);
  if (knowledge) {
    const evidence = economicKnowledgeEvidence(knowledge, snapshot, cleanQuestion);
    return {
      question: cleanQuestion, topic: "economic-knowledge", headline: knowledge.title,
      answer: knowledge.summary,
      facts: [knowledge.caveat, knowledge.checks, evidence || "この要因の個別照合成績は取得できていません。"],
      sources: knowledge.sources, knowledgeVersion: ECONOMIC_KNOWLEDGE_VERSION,
      caution: "一般的な仕組みの説明です。現在のニュース・指標の結果や売買の推奨ではありません。",
      generatedAt: now.toISOString(), snapshotAt: snapshot?.generatedAt || null
    };
  }
  if (!snapshot) throw new Error("最新データを準備中です。少し待ってから再度お試しください。");
  const topic = detectTopic(cleanQuestion);
  const markets = Array.isArray(snapshot.markets) ? snapshot.markets : Object.values(snapshot.markets || {});
  const eurusd = markets.find((item) => item.id === "eurusd");
  const usdjpy = markets.find((item) => item.id === "usdjpy");
  const paper = snapshot.paperTrading || {};
  const command = snapshot.eurusdCommand || {};
  const health = snapshot.dataHealth || {};
  const topNews = command.topNews || (snapshot.importantEurusdItems || [])[0];
  const analysisPairs = snapshot.fxTradeAnalysisPartner?.pairs || [];
  const eurusdPlan = analysisPairs.find((item) => item.pairId === "eurusd");
  const usdjpyPlan = analysisPairs.find((item) => item.pairId === "usdjpy");
  let headline = "現在の運用状況をまとめます";
  let answer = snapshot.aiBriefing?.summary || "市場データ、予測、学習、仮想取引を横断して確認しました。";
  let facts = [...marketFacts(eurusd), ...marketFacts(usdjpy)];

  if (topic === "eurusd") {
    const decision = snapshot.probabilitySimulation?.finalDecision || buildEurusdDecision(snapshot.probabilitySimulation);
    headline = `EUR/USD 予測品質: ${decision.qualityDecision}`;
    answer = `予測方向: ${decision.directionLabel}。${decision.reason}。${decision.note}`;
    facts = eurusdPlan ? [
      ...marketFacts(eurusd),
      `時間足 ${(eurusdPlan.multiTimeframe || []).map((row) => `${row.label}:${row.directionLabel}`).join(" / ")}`,
      `支持 ${eurusdPlan.importantPrices?.support ?? "--"} / 分岐 ${eurusdPlan.importantPrices?.decisionPoint ?? "--"} / 抵抗 ${eurusdPlan.importantPrices?.resistance ?? "--"}`,
      `買い材料 ${(eurusdPlan.fundamentals?.buyFactors || []).join("、") || "なし"}`,
      `売り材料 ${(eurusdPlan.fundamentals?.sellFactors || []).join("、") || "なし"}`,
      `予測品質の理由 ${decision.reason}`
    ] : [...marketFacts(eurusd), `予測レンジ ${command.range?.low ?? "--"} ～ ${command.range?.high ?? "--"} / 総合信頼 ${command.confidence?.score ?? "--"}点`, `主な根拠 ${(command.drivers || []).join("、") || "集計中"}`];
  } else if (topic === "usdjpy") {
    const yen = snapshot.yenCrossCommand || {};
    headline = usdjpyPlan ? `USD/JPYは${usdjpyPlan.conclusion.action}` : `USD/JPYは${yen.primary?.directionLabel || yen.directionLabel || "分析中"}`;
    answer = usdjpyPlan?.conclusion.text || yen.summary || yen.action || "日米金利差、通貨強度、当局発言、介入警戒を分離して判定しています。";
    facts = usdjpyPlan ? [
      ...marketFacts(usdjpy),
      `時間足 ${(usdjpyPlan.multiTimeframe || []).map((row) => `${row.label}:${row.directionLabel}`).join(" / ")}`,
      `支持 ${usdjpyPlan.importantPrices?.support ?? "--"} / 分岐 ${usdjpyPlan.importantPrices?.decisionPoint ?? "--"} / 抵抗 ${usdjpyPlan.importantPrices?.resistance ?? "--"}`,
      `見送り理由 ${(usdjpyPlan.conclusion?.blockers || []).join("、") || "なし"}`
    ] : [...marketFacts(usdjpy), `介入監視 ${yen.intervention?.label || yen.interventionRisk?.label || "確認中"}`];
  } else if (topic === "trading") {
    const position = paper.position;
    const positionDigits = position?.pairLabel === "USD/JPY" ? 3 : 5;
    const positionPrice = (value) => Number.isFinite(Number(value)) ? Number(value).toFixed(positionDigits) : "--";
    const requestedPlan = /ドル円|usd.?jpy/.test(cleanQuestion.toLowerCase()) ? usdjpyPlan : eurusdPlan;
    headline = position ? `${position.pairLabel}の${position.side === "long" ? "買い" : "売り"}を仮想保有中` : requestedPlan ? `${requestedPlan.pairLabel}は${requestedPlan.conclusion.action}` : "公式仮想口座は次の機会を監視中";
    answer = position ? `この取引は${position.tradeStyleLabel || (position.tradeStyle === "swing" ? "スイング" : "スキャルピング")}です。入口条件を固定保存し、損切り・利確・反対シグナルを最新価格で自動判定しています。` : requestedPlan?.conclusion.text || paper.actionDetail || "品質ゲート通過まで待機します。";
    const candidate = requestedPlan?.primaryScenario?.candidate || requestedPlan?.primaryScenario;
    facts = [
      `総資産 ${Math.round(paper.equity || paper.cashBalance || 0).toLocaleString("ja-JP")}円 / 収益率 ${percent(paper.totalReturnPct, 3)}`,
      position ? `約定 ${positionPrice(position.entryPrice)} → 現在 ${positionPrice(position.currentPrice)} / 含み損益 ${Math.round(position.unrealizedPnl || 0).toLocaleString("ja-JP")}円` : "未決済ポジションなし",
      position ? `損切り ${positionPrice(position.stopPrice)} / 利確 ${positionPrice(position.targetPrice)} / ${position.intendedHorizon || "固定時間決済なし"}` : `条件案 ${candidate?.side || "WAIT"} / ENTRY ${candidate?.entry ?? "--"} / SL ${candidate?.stop ?? "--"} / TP ${candidate?.target ?? "--"} / RR ${candidate?.riskReward ?? "--"}`,
      position ? "" : `SL根拠 ${candidate?.stopReason || "構造未確定"}`,
      position ? "" : `注文取消 ${(candidate?.cancellationConditions || []).join("、") || "条件未設定"}`
    ];
  } else if (topic === "news") {
    headline = topNews ? `最重要材料: ${topNews.title}` : "重要材料を収集中";
    answer = topNews ? `${topNews.source || "ニュース"}を重要度${topNews.importance ?? "--"}%で監視し、価格反応を照合します。` : "FRB、ECB、経済指標、要人発言の一次情報を優先監視しています。";
    facts = (snapshot.watchPoints || []).slice(0, 4);
  } else if (topic === "accuracy") {
    const assessment = snapshot.desktopOperations?.assessment || {};
    headline = `現状の総合評価は${assessment.score ?? "--"}/100`;
    answer = "前向き照合だけを精度評価に使い、未来情報混入監査と仮想取引成績を通過するまでモデルを自動昇格しません。";
    facts = [`評価 ${assessment.grade || "--"} / ${assessment.status || "判定中"}`, `厳格評価 ${assessment.evaluationSamples || 0}/${assessment.minimumPromotionSamples || 120}件`, `最新の反省 ${command.latestReflection?.summary || "大きな外れの反省を蓄積中"}`];
  } else if (topic === "health") {
    headline = `データ取得は${health.status || "確認中"}`;
    answer = "価格鮮度、複数ソース照合、自動学習、永続保存の状態を確認しました。";
    facts = [...marketFacts(eurusd).slice(0, 1), ...marketFacts(usdjpy).slice(0, 1), `取得元 ${health.checkedSources || 0}系統 / 自動学習 ${snapshot.backgroundLearning?.watchdog?.label || snapshot.backgroundLearning?.status || "確認中"}`, `保存先 ${snapshot.desktopOperations?.storage?.backend || "確認中"} / 整合性 ${snapshot.desktopOperations?.storage?.verificationMatch ? "確認済み" : "確認中"}`];
  } else {
    headline = `${command.stance || "市場監視中"} / 仮想口座${paper.position ? "ポジションあり" : "待機中"}`;
    facts.push(`総合評価 ${snapshot.desktopOperations?.assessment?.score ?? "--"}/100`);
  }
  return { question: cleanQuestion, topic, headline, answer, facts: facts.filter(Boolean).slice(0, 7), caution: "予測は不確実です。このシステムは学習・仮想検証専用です。", generatedAt: now.toISOString(), snapshotAt: snapshot.generatedAt || null };
}
