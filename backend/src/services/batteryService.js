export function recommendBattery(data) {

    const monthlyUnits = Number(data.monthlyUnits);

    const estimatedDailyUnits = monthlyUnits / 30;

    const backupHours = 6;

    const requiredKWh = Number(
        ((estimatedDailyUnits / 24) * backupHours).toFixed(1)
    );

    const recommendedBattery = Math.ceil(requiredKWh);

    const estimatedCost = recommendedBattery * 18000;

    let recommendation = "";

    if (recommendedBattery <= 5) {

        recommendation = "Small Home Battery";

    }

    else if (recommendedBattery <= 15) {

        recommendation = "Medium Commercial Battery";

    }

    else {

        recommendation = "Industrial Battery Storage";

    }

    return {

        recommendedBatteryKWh: recommendedBattery,

        expectedBackupHours: backupHours,

        estimatedCost,

        recommendation

    };

}