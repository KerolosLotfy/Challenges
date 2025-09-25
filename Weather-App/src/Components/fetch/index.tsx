import { fetchWeatherApi } from 'openmeteo';
import type { DataTypes } from "./types";
const apiUrl = "https://api.open-meteo.com/v1/forecast"; // ?latitude={location.latitude}&longitude=${location.longitude}
const geoCodingUrl = "https://geocoding-api.open-meteo.com/v1/search" // ?name={location Name} return {id | name | country_code | latitude | longitude}
const geonamesUrl = "http://api.geonames.org/findNearbyJSON?username=kode&"  // lat=47.3&lng=9"

// Country Flag
export const flagUrl = "https://hatscripts.github.io/circle-flags/flags/" // + {countryCode}.svg

export const fetchData = {

    getName: async (location: DataTypes["location"]) => {
        const data: DataTypes["geonames"] = await fetch(`${geonamesUrl}lat=${location.latitude}&lng=${location.longitude}`, { mode: 'cors' }).then(async (res) => {
            if (!res.ok) throw new Error("(Api Error")
            return await res.json()
        })
        return [
            { countryName: data.geonames[0].countryName, name: data.geonames[0].name }
        ] as DataTypes["geonames"]["geonames"];
    },

    WeatherData: async (location: DataTypes["location"], { temp, wind, prec }: { temp: boolean, wind: boolean, prec: boolean }) => {

        // Get Country Name
        const geonames = await fetchData.getName(location);

        const params = {
            "latitude": location.latitude,
            "longitude": location.longitude,
            "daily": ["weather_code", "temperature_2m_max", "temperature_2m_min", "temperature_2m_mean", "apparent_temperature_mean", "wind_speed_10m_mean", "relative_humidity_2m_mean", "precipitation_probability_mean"],
            "hourly": ["temperature_2m", "weather_code", "is_day"],
            "current": ["temperature_2m", "relative_humidity_2m", "apparent_temperature", "precipitation", "wind_speed_10m", "weather_code", "is_day"],
            ...(wind ? { "wind_speed_unit": "mph", } : {}), // "km/h" | "mph"
            ...(temp ? { "temperature_unit": "fahrenheit", } : {}), // "°C" | "°F"
            ...(prec ? { "precipitation_unit": "inch", } : {}),  // "mm" | "inch"
            // Imperial => Temp: "°F" | WindSpeed: "mph"  | Prec: "inch"
            //  Metric  => Temp: "°C" | WindSpeed: "km/h" | Prec: "mm"
        };
        const responses = await fetchWeatherApi(apiUrl, params);


        // Process first location. Add a for-loop for multiple locations or weather models
        const response = responses[0];
        const utcOffsetSeconds = response.utcOffsetSeconds();
        const current = response.current()!;
        const hourly = response.hourly()!;
        const daily = response.daily()!;
        // const CurrentUnits =


        return {
            current: {
                time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
                temperature_2m: current.variables(0)!.value(),
                relative_humidity_2m: current.variables(1)!.value(),
                apparent_temperature: current.variables(2)!.value(),
                precipitation: current.variables(3)!.value(),
                wind_speed_10m: current.variables(4)!.value(),
                weather_code: current.variables(5)!.value(),
                is_day: current.variables(6)?.value()
            },
            hourly: {
                time: [...Array((Number(hourly.timeEnd()) - Number(hourly.time())) / hourly.interval())].map(
                    (_, i) => new Date((Number(hourly.time()) + i * hourly.interval() + utcOffsetSeconds) * 1000)
                ),
                temperature_2m: hourly.variables(0)!.valuesArray(),
                weather_code: hourly.variables(1)!.valuesArray(),
                is_day: hourly.variables(2)!.valuesArray(),
            },
            daily: {
                time: [...Array((Number(daily.timeEnd()) - Number(daily.time())) / daily.interval())].map(
                    (_, i) => new Date((Number(daily.time()) + i * daily.interval() + utcOffsetSeconds) * 1000)
                ),
                weather_code: daily.variables(0)!.valuesArray(),
                temperature_2m_max: daily.variables(1)!.valuesArray(),
                temperature_2m_min: daily.variables(2)!.valuesArray(),
                temperature_2m_mean: daily.variables(3)!.valuesArray(),
                apparent_temperature_mean: daily.variables(4)!.valuesArray(),
                wind_speed_10m_mean: daily.variables(5)!.valuesArray(),
                relative_humidity_2m_mean: daily.variables(6)!.valuesArray(),
                precipitation_probability_mean: daily.variables(7)!.valuesArray(),
            },

            geonames,
        } as DataTypes["weatherData"];
    },


    byName: async (countryName: string) => {
        try {
            const data = await fetch(`${geoCodingUrl}?name=${countryName}`, { mode: "cors" }).then(async (res) => {
                if (!res.ok) throw new Error(String(res.status));
                return await res.json();
            })

            const results = Array.isArray((data as any)?.results) ? (data as any).results.map((r: any) => ({
                id: r.id,
                country: r.country,
                country_code: r.country_code,
                name: r.name,
                latitude: r.latitude,
                longitude: r.longitude,
            })) as DataTypes["geocoding"] : []

            return results

        } catch (err) {
            console.log(err);
            throw new Error("FetchData Error: " + err);
        }
    }
}