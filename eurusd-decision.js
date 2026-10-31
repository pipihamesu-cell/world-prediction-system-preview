// Presentation contract only: this does not authorize or place an order.
export function buildEurusdDecision(simulation) {
  const direction = ["up", "down"].includes(simulation?.direction) ? simulation.direction : "flat";
  const directionLabel = direction === "up" ? "上方向" : direction === "down" ? "下方向" : "方向不明";
  const accepted = simulation?.qualityGate?.currentAccepted;
  const qualityDecision = accepted === true && direction !== "flat" ? "品質条件を通過"
    : accepted === false || (accepted === true && direction === "flat") ? "見送り" : "品質判定待ち";
  const value = simulation?.probabilities?.calibratedMain;
  const probability = value != null && Number.isFinite(Number(value)) && Number(value) >= 0 && Number(value) <= 1
    ? Number(value) : null;
  return {
    version: "eurusd-display-decision-v1", direction, directionLabel, qualityDecision,
    reason: simulation?.qualityGate?.reason || "判定条件を確認中", probability,
    note: "予測品質の表示です。公式・探索の仮想取引は別の条件で動きます。"
  };
}
