export function simulateScenario(current, changes) {

    const updated = {
        ...current,
        ...changes
    };

    const unitRate =
        current.billAmount / current.monthlyUnits;

    updated.predictedBill = Math.round(
        updated.monthlyUnits * unitRate
    );

    updated.savings =
        current.billAmount - updated.predictedBill;

    let risk = 20;

    if (updated.monthlyUnits > 800)
        risk = 90;

    else if (updated.monthlyUnits > 600)
        risk = 75;

    else if (updated.monthlyUnits > 400)
        risk = 55;

    else
        risk = 30;

    updated.riskScore = risk;

    updated.energyGrade =
        risk < 40
            ? "A"
            : risk < 60
            ? "B"
            : risk < 80
            ? "C"
            : "D";

    return updated;

}