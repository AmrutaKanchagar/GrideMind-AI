export function calculateWeatherImpact(weather) {

    let increase = 0;

    if (weather.temperature > 35)
        increase += 15;

    else if (weather.temperature > 30)
        increase += 10;

    else if (weather.temperature > 25)
        increase += 5;

    if (weather.humidity > 80)
        increase += 5;

    return {
        impactPercentage: increase,
        message:
            increase === 0
                ? "Weather has minimal impact."
                : `Weather may increase energy usage by ${increase}%`
    };
}