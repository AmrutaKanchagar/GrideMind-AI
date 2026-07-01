export function calculateCarbonFootprint(data) {

    const monthlyUnits = Number(data.monthlyUnits);

    // Average emission factor (kg CO₂ per kWh)
    const emissionFactor = 0.82;

    const monthlyCO2 = Number(
        (monthlyUnits * emissionFactor).toFixed(2)
    );

    const yearlyCO2 = Number(
        (monthlyCO2 * 12).toFixed(2)
    );

    // One mature tree absorbs about 21kg CO₂/year
    const treesNeeded = Math.ceil(yearlyCO2 / 21);

    let greenScore = 100;

    if (monthlyUnits > 1000)
        greenScore = 45;
    else if (monthlyUnits > 700)
        greenScore = 60;
    else if (monthlyUnits > 500)
        greenScore = 75;
    else if (monthlyUnits > 300)
        greenScore = 85;

    let status = "";

    if (greenScore >= 90)
        status = "Excellent";

    else if (greenScore >= 75)
        status = "Good";

    else if (greenScore >= 60)
        status = "Average";

    else
        status = "Needs Improvement";

    return {

        monthlyCO2,

        yearlyCO2,

        treesNeeded,

        greenScore,

        status

    };

}