// Curated reference material: explanatory hypotheses, not live facts or trade rules.
export const ECONOMIC_KNOWLEDGE_VERSION = "2026-10-29.1";

const ECB_TRANSMISSION = { title: "ECB: 金融政策の波及経路", url: "https://www.ecb.europa.eu/mopo/intro/transmission/html/index.en.html" };
const FED_POLICY = { title: "FRB: 金融政策の基本原則", url: "https://www.federalreserve.gov/monetarypolicy/principles-for-the-conduct-of-monetary-policy.htm" };
const BIS_SPREAD = { title: "BIS: 国債利回り差の解釈", url: "https://www.bis.org/publications/interpreting-sovereign-spreads" };
const SEC_BONDS = { title: "米SEC: 債券価格と利回り", url: "https://www.investor.gov/introduction-investing/general-resources/news-alerts/alerts-bulletins/investor-bulletins-86" };
const FED_SURPRISE = { title: "FRB: 金融政策発表とサプライズ", url: "https://www.federalreserve.gov/econres/feds/files/2021010r1pap.pdf" };
const IMF_ENERGY = { title: "IMF: エネルギー価格と対外経済", url: "https://www.imf.org/en/publications/esr/issues/2024/07/12/external-sector-report-2024" };
const ECB_ENERGY = { title: "ECB: エネルギー供給ショックと金融政策", url: "https://www.ecb.europa.eu/press/key/date/2026/html/ecb.sp261005~1d8d998ef4.en.html" };

export const ECONOMIC_KNOWLEDGE = [
  {
    id: "oil-and-currencies", title: "原油価格と為替",
    matches: /(?:原油|石油|wti|ブレント|brent)/i,
    summary: "原油高はエネルギー輸入の負担とインフレ圧力を高める場合があり、成長や金融政策への期待を通じて為替に影響し得ます。",
    caveat: "原油高の原因が供給減か需要増か、各国の輸出入構造や金利・リスク心理で反応は異なります。原油高だけでEUR/USDやUSD/JPYの方向は決まりません。",
    checks: "原油の実測価格と取得時刻、変動の原因、輸入負担、米欧日の金利期待と価格反応を確認。情報不足なら方向を決めません。",
    factor: "oilEnergy", sources: [IMF_ENERGY, ECB_ENERGY]
  },
  {
    id: "sovereign-spread", title: "仏独国債金利差とユーロ",
    matches: /(?:フランス|仏独|ドイツ).*(?:国債|金利差|利回り)|(?:国債|金利差).*(?:フランス|仏独|ドイツ)/i,
    summary: "国債価格が下がると利回りは上がります。仏独10年差の拡大はフランス固有の財政・政治リスクへの警戒を示す可能性があります。",
    caveat: "差の水準と変化は別です。金利差の拡大が必ずユーロ安を起こすとは限らず、米金利や既に織り込まれた材料も確認します。",
    checks: "仏独それぞれの利回り・取得時刻、差の水準と変化、ニュースの発表時刻、ユーロドルの反応を分けて確認。",
    factor: "euroSovereignStress", sources: [BIS_SPREAD, SEC_BONDS, ECB_TRANSMISSION]
  },
  {
    id: "expectations-surprise", title: "据え置きでも相場が動く理由",
    matches: /(?:据え置き|織り込|サプライズ|予想との差)/i,
    summary: "市場は決定前から政策金利の見通しを価格に織り込みます。据え置きでも、声明や会見による今後の金利経路の見方が予想と違えば、金利や為替が動くことがあります。",
    caveat: "予想値を確認できなければサプライズは判定できません。選挙日程だけから政策決定や軍事行動を断定することもできません。",
    checks: "決定前に利用可能だった市場予想、結果、声明と会見、それぞれの公表時刻、発表後の金利・為替を別々に記録。",
    factor: "centralBanks", sources: [ECB_TRANSMISSION, FED_SURPRISE]
  },
  {
    id: "rates-and-expectations", title: "政策金利と市場の期待",
    matches: /(?:金利|利上げ|利下げ|fomc|frb|ecb|日銀)/i,
    summary: "為替は政策金利の現状だけでなく、将来の金利経路に対する期待の変化や通貨間の差にも反応します。",
    caveat: "利上げでも事前予想より弱い内容なら通貨高とは限りません。声明・会見と相手国の材料も比較します。",
    checks: "発表前の市場予想、決定値、声明・会見、発表後の金利と為替反応を時刻付きで比較。",
    factor: "centralBanks", sources: [ECB_TRANSMISSION, FED_POLICY]
  },
  {
    id: "data-surprise", title: "経済指標と市場予想との差",
    matches: /(?:経済指標|cpi|pce|雇用統計|失業率|pmi|gdp)/i,
    summary: "経済指標は水準だけでなく、事前予想との差や改定値を通じて、成長・インフレや政策金利への期待を変えることがあります。",
    caveat: "良い数字が常に通貨高とは限らず、インフレ・金融政策・リスク心理によって反応は変わります。",
    checks: "発表元、対象期間、予定時刻、予想、結果、改定値と発表後の価格を別々に記録。発表前の結果は不明です。",
    factor: "news", sources: [FED_POLICY, ECB_TRANSMISSION]
  },
  {
    id: "geopolitical", title: "政治・地政学リスクと為替",
    matches: /(?:地政学|戦争|紛争|デモ|選挙|政治リスク|要人発言)/i,
    summary: "政治や地政学の出来事は、成長・財政・インフレ・リスク選好への期待を変え、為替を動かす可能性があります。",
    caveat: "見出しと値動きの同時発生だけでは原因と証明できません。選挙日程から政策や軍事行動を断定することもできません。",
    checks: "発生・公表時刻と情報源、他の同時材料、金利と為替の初動、その後の継続・反転を分けて確認。",
    factor: "news", sources: [ECB_TRANSMISSION, FED_POLICY]
  }
];

export function lookupEconomicKnowledge(question) {
  const text = String(question || "");
  if (!/(なぜ|何|とは|どう|教え|関係|影響|仕組み|知識|教材|因果|見方|理由)/i.test(text)) return null;
  return ECONOMIC_KNOWLEDGE.find((item) => item.matches.test(text)) || null;
}

export function economicLearningProgress(entries = ECONOMIC_KNOWLEDGE) {
  const required = ["sovereign-spread", "expectations-surprise", "rates-and-expectations", "data-surprise", "geopolitical", "oil-and-currencies"];
  const rows = Array.isArray(entries) ? entries : [];
  const complete = required.filter((id) => rows.some((item) => item?.id === id
    && item.summary && item.caveat && item.checks
    && Array.isArray(item.sources) && item.sources.some((source) => /^https:\/\//.test(source?.url || ""))));
  return {
    covered: complete.length, total: required.length,
    current: "基礎資料の整備段階", ability: "理解力・予測能力は未判定",
    goal: "世界水準の教授級（目標・資格ではありません）",
    next: "基礎知識の理解テストと、ニュース・金利の予測への効果を時系列で検証"
  };
}

export function economicKnowledgeEvidence(item, snapshot, question = "") {
  const pair = /(?:ドル円|usd.?jpy)/i.test(question) ? "usdjpy" : "eurusd";
  const profile = snapshot?.context?.causalKnowledge?.[pair]?.factors?.[item.factor]
    || snapshot?.context?.fxCausalModel?.causalKnowledge?.[pair]?.factors?.[item.factor];
  if (!profile || !Number.isInteger(profile.samples) || profile.samples < 0) return null;
  const hits = Number.isInteger(profile.hits) && profile.hits >= 0 && profile.hits <= profile.samples ? profile.hits : null;
  return `${pair === "eurusd" ? "EUR/USD" : "USD/JPY"}の既存10分方向照合: ${profile.samples}件${hits === null ? "" : `・方向一致${hits}件`}。統計的な因果関係や将来の利益の証明ではありません。`;
}
