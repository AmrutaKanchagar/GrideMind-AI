/**
 * AI Prediction Engine
 * Predicts future energy consumption, bill, risk and savings
 */

export function predictFutureConsumption(data) {
  const {
    monthlyUnits,
    billAmount,
    locationType
  } = data;

  // Growth rate based on user type
  let growthRate = 0.02;

  switch (locationType.toLowerCase()) {
    case "home":
      growthRate = 0.02;
      break;

    case "shop":
      growthRate = 0.03;
      break;

    case "office":
      growthRate = 0.035;
      break;

    case "factory":
      growthRate = 0.05;
      break;

    case "industry":
      growthRate = 0.06;
      break;

    default:
      growthRate = 0.03;
  }

  const months = [1, 3, 6, 12];

  const forecast = months.map((month) => {
    const predictedUnits = Math.round(
      monthlyUnits * Math.pow(1 + growthRate, month)
    );

    const predictedBill = Math.round(
      billAmount * Math.pow(1 + growthRate, month)
    );

    return {
      month,
      predictedUnits,
      predictedBill
    };
  });

  return forecast;
}