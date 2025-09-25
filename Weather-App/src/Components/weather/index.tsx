import { useSearchParams } from "react-router-dom"
import type { DataTypes } from "../fetch/types"
import { CurrentForecast } from "./current"
import { DailyForecast } from "./daily"
import { HourlyForecast } from "./hourly"



export const WeatherSection = ({ weatherData }: { weatherData: DataTypes["weatherData"] | undefined }) => {
    const [params] = useSearchParams()
    return (
        <section id="weatherContainer" className="flex-1 mt-8 w-full md:grid md:grid-rows-[auto_auto_1fr] gap-8 ">
            {params.has("lat") && params.has("lng") ?
                (<>
                    {/* Current Forecast */}
                    < CurrentForecast weatherData={weatherData} />

                    {/* Daily Forecast */}
                    <DailyForecast weatherData={weatherData} />

                    {/* Hourly forecast */}
                    <HourlyForecast weatherData={weatherData} />
                </>
                )
                : <div className="w-full flex flex-col justify-center items-center text-center gap-2">
                    <p className="mt-4 text-3xl text-center w-full ">No Search Result Found!</p>
                    <p className="text-[1rem] text-center w-[40%] ">Please Search Again and select from Places List</p>
                </div>
            }
        </section>
    )
}