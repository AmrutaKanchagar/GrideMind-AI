export function detectAnomalies(data) {
  const anomalies = [];

  const units = data.monthlyUnits || 0;
  const bill = data.billAmount || 0;

  // Rule 1: High usage
  if (units > 400) {
    anomalies.push("High electricity consumption detected");
  }

  // Rule 2: High bill
  if (bill > 3000) {
    anomalies.push("Unusually high electricity bill");
  }

  // Rule 3: Factory + low usage mismatch
  if (data.locationType === "factory" && units < 200) {
    anomalies.push("Possible under-reporting or data mismatch");
  }

  // Rule 4: AC-heavy usage warning
  if (data.appliances?.includes("AC") && units > 350) {
    anomalies.push("AC-heavy usage causing high load");
  }

  return anomalies;
}