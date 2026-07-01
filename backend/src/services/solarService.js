export function calculateSolarROI(data) {

    const monthlyBill = Number(data.billAmount);

    // Approximate solar system sizing
    const recommendedKW = Math.max(1, Math.ceil(data.monthlyUnits / 120));

    const installationCost = recommendedKW * 55000;

    const yearlySavings = monthlyBill * 12 * 0.85;

    const paybackYears = Number(
        (installationCost / yearlySavings).toFixed(1)
    );

    const lifetimeSavings =
        Math.round(yearlySavings * 25);

    let recommendation = "";

    if (paybackYears <= 5) {

        recommendation =
            "Highly Recommended";

    } else if (paybackYears <= 8) {

        recommendation =
            "Recommended";

    } else {

        recommendation =
            "Consider after reducing energy consumption";

    }

    return {

        recommendedKW,

        installationCost,

        yearlySavings,

        paybackYears,

        lifetimeSavings,

        recommendation

    };

}