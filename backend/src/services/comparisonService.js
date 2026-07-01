export function compareWithSimilarFactories(currentData, similarCases) {

    if (!similarCases || similarCases.length === 0) {
        return {
            averageUnits: currentData.monthlyUnits,
            difference: 0,
            efficiency: 100,
            ranking: "No historical data",
            insight: "Not enough similar records available."
        };
    }

    let totalUnits = 0;

    similarCases.forEach((item) => {
        const units =
            item.payload?.monthlyUnits ??
            item.payload?.monthly_units ??
            currentData.monthlyUnits;

        totalUnits += Number(units);
    });

    const averageUnits = Math.round(totalUnits / similarCases.length);

    const difference = currentData.monthlyUnits - averageUnits;

    const efficiency = Math.max(
        0,
        Math.min(
            100,
            Math.round((averageUnits / currentData.monthlyUnits) * 100)
        )
    );

    let ranking = "";

    if (efficiency >= 95)
        ranking = "Top 10% Efficient";

    else if (efficiency >= 85)
        ranking = "Top 25% Efficient";

    else if (efficiency >= 70)
        ranking = "Average";

    else
        ranking = "Needs Improvement";

    let insight = "";

    if (difference > 0) {

        insight =
            `You consume ${difference} more units than similar ${currentData.locationType}s.`;

    } else if (difference < 0) {

        insight =
            `You consume ${Math.abs(difference)} fewer units than similar ${currentData.locationType}s.`;

    } else {

        insight =
            "Your consumption matches similar facilities.";

    }

    return {

        averageUnits,

        difference,

        efficiency,

        ranking,

        insight

    };

}