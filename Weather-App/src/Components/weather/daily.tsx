import { useNavigate, useSearchParams } from "react-router-dom"
import type { DataTypes } from "../fetch/types"
import { weatherIcons } from "../fetch/weatherIcons"



export const DailyForecast = ({ weatherData }: { weatherData: DataTypes["weatherData"] | undefined }) => {
    const [params] = useSearchParams()
    const nav = useNavigate()



    return (
        <div className=" h-auto w-full max-md:mt-4 max-md:mb-4">
            <p className="mb-4">Daily forecast</p>

            <div className="flex gap-4 flex-wrap items-center justify-between">
                {weatherData ? (weatherData.daily.time.map((d, id) => (
                    <div key={id} className={`w-20 bg-Neutral-800 p-2 flex flex-col justify-center items-center  rounded-lg gap-2 cursor-pointer hover:bg-Neutral-600 [&.active]:bg-Blue-700 ${!params.has("day") ? weatherData.current.time.getDay() == d.getDay() && 'active' : (params.get("day") == d.getDay().toString() && 'active')} `} onClick={() => {
                        if (weatherData.current.time.getDay() == d.getDay()) {
                            params.delete("day");
                            nav(`?${params.toString()}`)
                        } else {
                            params.set("day", d.getDay().toString());
                            nav(`?${params.toString()}`)

                        }
                    }}>
                        <p>{d.toLocaleDateString(undefined, { weekday: 'short' })}</p>
                        <img src={weatherData.daily.weather_code ? weatherIcons[weatherData.daily.weather_code[id] as keyof typeof weatherIcons].d: ""} alt="weather icon" width={40} className="block  " />
                        <div className="flex justify-between items-center text-sm w-full">
                            <p>{weatherData.daily.temperature_2m_max && Math.round(weatherData.daily.temperature_2m_max[id])}°</p>
                            <p>{weatherData.daily.temperature_2m_min && Math.round(weatherData.daily.temperature_2m_min[id])}°</p>
                        </div>
                    </div>
                ))) : (
                    Array.from({ length: 7 }, (_, i) => (
                        <div key={i} className="bg-Neutral-800 p-2 flex flex-col justify-center items-center  rounded-lg gap-2 opacity-70 animate-pulse ">
                            <p className="w-18 h-30"></p>
                        </div>
                    ))
                )}

            </div>
        </div>
    )
}