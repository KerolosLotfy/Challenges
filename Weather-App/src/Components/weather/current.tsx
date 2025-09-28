import type { DataTypes } from "../fetch/types"
import { useSearchParams } from "react-router-dom"
import { FaCircle } from "react-icons/fa"
import { weatherIcons } from "../fetch/weatherIcons"

export const CurrentForecast = ({ weatherData }: { weatherData: DataTypes["weatherData"] | undefined }) => {
    const [params] = useSearchParams()




    return (
        <section className="w-full  flex flex-col" >
            <div className="w-full h-[15rem] bg-Neutral-800 rounded-2xl">
                {weatherData ? (
                    <div id="mainPanel" className="w-full h-full flex flex-col flex-wrap justify-around sm:flex-row sm:justify-between items-center p-4 rounded-2xl text-center">
                        <div className="text-start">
                            <h2 className="text-2xl font-bold">{weatherData.geonames?.[0]?.name || ""}, {weatherData.geonames?.[0]?.countryName || ""} </h2>
                            <p>
                                {
                                    !params.has('day')
                                        ? weatherData.current.time.toLocaleDateString(undefined, { "dateStyle": "full" })
                                        : weatherData.daily.time.filter((d) => (d.getDay().toString() == params.get("day")))[0].toLocaleDateString(undefined, { "dateStyle": "full" })
                                }
                            </p>
                        </div>

                        <div className="flex gap-10 justify-center items-center">
                                <img
                                src={
                                    !params.has('day') && weatherData.daily.weather_code
                                        ? weatherIcons[weatherData.current.weather_code as keyof typeof weatherIcons].d
                                        : (() => {
                                            const dayIndex = weatherData.daily.time.findIndex(
                                                (d) => d.getDay().toString() === params.get('day')
                                            );
                                            return (dayIndex !== -1 && weatherData.daily.weather_code)
                                                ? weatherIcons[weatherData.daily.weather_code[dayIndex] as keyof typeof weatherIcons].d
                                                : "_";
                                        })()
                                }
                                alt="Weather Icon"
                                width={70}
                            />
                            <p className="text-7xl">
                                {
                                    !params.has('day')
                                        ? Math.round(weatherData.current.temperature_2m)
                                        : (() => {
                                            const dayIndex = weatherData.daily.time.findIndex(
                                                (d) => d.getDay().toString() === params.get('day')
                                            );
                                            return (dayIndex !== -1 && weatherData.daily.temperature_2m_mean)
                                                ? Math.round(weatherData.daily.temperature_2m_mean[dayIndex])
                                                : "_";
                                        })()
                                }°
                            </p>
                        </div>
                    </div>
                ) : <CurrentLoading />}
            </div>

            {/* Other Current Details */}
            <div className="flex flex-wrap w-full mt-4 gap-4 justify-between ">
                <div className=" bg-Neutral-800 p-3 pt-2 rounded-lg max-sm:basis-[11rem] flex-1 ">
                    <p className="text-[.8rem] text-Neutral-300 ">Feels Like</p>
                    <p className="mt-2 text-xl">
                        {
                            weatherData ?
                                !params.has("day") ?
                                    (Math.round(weatherData.current.apparent_temperature) + (params.has("temp") ? " °F" : " °C"))
                                    : (() => {
                                        const dayIndex = weatherData.daily.time.findIndex(
                                            (d) => d.getDay().toString() === params.get('day')
                                        );
                                        return (dayIndex !== -1 && weatherData.daily.apparent_temperature_mean)
                                            ? Math.round(weatherData.daily.apparent_temperature_mean[dayIndex]) + (params.has("temp") ? " °F" : " °C")
                                            : "_";
                                    })()
                                : '_'
                        }
                    </p>
                </div>

                <div className=" bg-Neutral-800 p-3 pt-2 rounded-lg max-sm:basis-[11rem] flex-1 ">
                    <p className="text-[.8rem] text-Neutral-300 ">Humidity</p>
                    <p className="mt-2 text-xl">
                        {
                            weatherData ?
                                !params.has("day") ?
                                    (Math.round(weatherData.current.relative_humidity_2m) + " %")
                                    : (() => {
                                        const dayIndex = weatherData.daily.time.findIndex(
                                            (d) => d.getDay().toString() === params.get('day')
                                        );
                                        return (dayIndex !== -1 && weatherData.daily.relative_humidity_2m_mean)
                                            ? (Math.round(weatherData.daily.relative_humidity_2m_mean[dayIndex]) + " %")
                                            : "_";
                                    })()
                                : '_'
                        }
                    </p>
                </div>

                <div className=" bg-Neutral-800 p-3 pt-2 rounded-lg max-sm:basis-[11rem] flex-1 ">
                    <p className="text-[.8rem] text-Neutral-300 ">Wind</p>
                    <p className="mt-2 text-xl">
                        {
                            weatherData ?
                                !params.has("day") ?
                                    (Math.round(weatherData.current.wind_speed_10m) + (params.has("wind") ? " mph" : " km/h"))
                                    : (() => {
                                        const dayIndex = weatherData.daily.time.findIndex(
                                            (d) => d.getDay().toString() === params.get('day')
                                        );
                                        return (dayIndex !== -1 && weatherData.daily.wind_speed_10m_mean)
                                            ? (Math.round(weatherData.daily.wind_speed_10m_mean[dayIndex]) + (params.has("wind") ? " mph" : " km/h"))
                                            : "_";
                                    })()
                                : '_'
                        }
                    </p>
                </div>

                <div className=" bg-Neutral-800 p-3 pt-2 rounded-lg max-sm:basis-[11rem] flex-1 ">
                    <p className="text-[.8rem] text-Neutral-300 ">Precipitation</p>
                    <p className="mt-2 text-xl">
                        {
                            weatherData ?
                                !params.has("day") ?
                                    (Math.round(weatherData.current.precipitation) + (params.has("prec") ? " inch" : " mm"))
                                    : (() => {
                                        const dayIndex = weatherData.daily.time.findIndex(
                                            (d) => d.getDay().toString() === params.get('day')
                                        );
                                        return (dayIndex !== -1 && weatherData.daily.precipitation_probability_mean)
                                            ? (Math.round(weatherData.daily.precipitation_probability_mean[dayIndex]) + (params.has("prec") ? " inch" : " mm"))
                                            : "_";
                                    })()
                                : '_'
                        }
                    </p>
                </div>
            </div>
        </section >
    )
}


const CurrentLoading = () => {
    return (
        <div className=" flex flex-col justify-center items-center w-full h-full rounded-2xl opacity-70 animate-pulse">
            <div className="relative border-0 w-max h-max pt-4 text-Neutral-300">
                <FaCircle className=" text-Neutral-200 absolute text-[.6rem] left-[20%] top-0" />
                <FaCircle className=" text-Neutral-200 absolute text-[.6rem] left-1/2 -top-1 translate-x-[-50%]" />
                <FaCircle className=" text-Neutral-200 absolute text-[.6rem] right-[20%] top-0" />
                <p>Loading...</p>
            </div>
        </div>
    )
}