export function generateEnergyAdvice(data, report = {}) {
  const advice = [];

  // Monthly usage
  if (data.monthlyUnits > 500) {
    advice.push({
      priority: "High",
      category: "Consumption",
      recommendation:
        "Your monthly energy consumption is high. Consider conducting an energy audit."
    });
  }

  // Bill
  if (data.billAmount > 5000) {
    advice.push({
      priority: "High",
      category: "Cost",
      recommendation:
        "Your electricity bill is high. Shifting heavy loads to off-peak hours may reduce costs."
    });
  }

  // Peak usage
  if (
    data.peakUsageTime &&
    data.peakUsageTime.toLowerCase() === "evening"
  ) {
    advice.push({
      priority: "Medium",
      category: "Peak Load",
      recommendation:
        "High evening demand detected. Reschedule non-critical equipment where possible."
    });
  }

  // AC usage
  if (
    data.appliances &&
    data.appliances.some(
      (a) => a.toLowerCase() === "ac"
    )
  ) {
    advice.push({
      priority: "Medium",
      category: "Cooling",
      recommendation:
        "Maintain AC temperature between 24°C and 26°C for improved efficiency."
    });
  }

  // Solar
  if (
    report.solar &&
    report.solar.recommendation === "Highly Recommended"
  ) {
    advice.push({
      priority: "High",
      category: "Renewable Energy",
      recommendation:
        "Installing solar panels can significantly reduce your annual electricity cost."
    });
  }

  // Battery
  if (
    report.battery &&
    report.battery.recommendation === "Industrial Battery Storage"
  ) {
    advice.push({
      priority: "Medium",
      category: "Backup",
      recommendation:
        "Industrial battery storage can improve reliability during power interruptions."
    });
  }

  if (advice.length === 0) {
    advice.push({
      priority: "Low",
      category: "General",
      recommendation:
        "Your energy usage appears efficient. Continue monitoring regularly."
    });
  }

  return advice;
}