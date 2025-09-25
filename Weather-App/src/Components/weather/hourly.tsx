import { Link, useNavigate, useSearchParams } from "react-router-dom"
import type { DataTypes } from "../fetch/types"
import ArrowDown from "../../assets/images/icon-dropdown.svg"
import { weatherIcons } from "../fetch/weatherIcons"


export const HourlyForecast = ({ weatherData }: { weatherData: DataTypes["weatherData"] | undefined }) => {
    const [params] = useSearchParams()
    const nav = useNavigate()


    // Display or Hide Units Menu
    const displayMenu = () => {
        const daysMenu = document.querySelector("#daysMenu")
        daysMenu?.classList.toggle("hidden")
    }

    return (
        <section className="bg-Neutral-800 md:col-[2/4] md:row-[1/3] md:max-h-[33rem] w-full md:w-[20rem] p-4 pb-20 md:overflow-hidden rounded-xl mb-4 mx-auto  ">
            <div className="w-full flex justify-between items-center flex-wrap ">
                <p>Hourly forecast</p>
                {/* Filter By Day */}
                <div className=" relative p-2 pl-4 flex gap-4 bg-Neutral-700 rounded-md justify-center items-center cursor-pointer text-Neutral-0 " onClick={displayMenu}>
                    <span className="text-[.8rem]">
                        {weatherData ?
                            (!params.has("day") ? weatherData.current.time.toLocaleDateString(undefined, { weekday: 'long' }) : weatherData.daily.time.map((d) => d.getDay().toString() == params.get("day") && d.toLocaleDateString(undefined, { "weekday": "long" })))
                            : "_"
                        }
                    </span>
                    <img src={ArrowDown} alt="dropdown" className="w-2.5 mt-1 mr-1" />

                    {/* Days Menu */}
                    <ul id="daysMenu" className="hidden absolute right-0 top-[100%] p-1 min-w-max w-[200%] text-[.8rem] bg-inherit mt-2 rounded-md group [&>p]:hover:bg-Neutral-700 [&>p]:rounded-md **:p-2">
                        {weatherData && weatherData.daily.time.map((d, i) => (
                            <li key={i} className={` mb-2 rounded-lg hover:bg-Neutral-600 [&.active]:bg-Blue-500 ${!params.has("day") ? weatherData.current.time.getDay() == d.getDay() && 'active' : (params.get("day") == d.getDay().toString() && 'active')} `} onClick={() => {
                                if (weatherData.current.time.getDay() == d.getDay()) {
                                    params.delete("day");
                                    nav(`?${params.toString()}`)
                                } else {
                                    params.set("day", d.getDay().toString());
                                    nav(`?${params.toString()}`)

                                }
                            }}>
                                <Link to={"#"}>{d.toLocaleDateString(undefined, { weekday: 'long' })}</Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Temp Per Hour */}
            <div className="flex flex-col gap-2 mt-4 overflow-y-auto max-h-[50vh] md:max-h-full pr-2" id="hourly">
                {weatherData ? (weatherData?.hourly?.time.map((d: Date, idx: number) => (
                    (!params.has('day') ?
                        d.getDay() == weatherData.current.time.getDay() && (
                            <div key={idx} className="bg-Neutral-700 p-1 pl-4 pr-4 text-[.8rem] rounded-lg flex justify-between items-center shadow shadow-Neutral-600" >
                                <div className="flex gap-2 justify-center items-center">
                                    <img src={
                                        weatherData.hourly.is_day && weatherData.hourly.weather_code
                                            ? (weatherData.hourly.is_day[idx] ? weatherIcons[weatherData.hourly.weather_code[idx] as keyof typeof weatherIcons].d
                                                : weatherIcons[weatherData.hourly.weather_code[idx] as keyof typeof weatherIcons].n)
                                            : "_"
                                    } alt="weather icon" width={35} />
                                    <p>{d.toLocaleTimeString(undefined, { hour12: true, hourCycle: "h12", hour: 'numeric' })}</p>
                                </div>

                                <p>{weatherData.hourly.temperature_2m && Math.round(weatherData.hourly.temperature_2m[idx])}°</p>
                            </div>
                        ) : (d.getDay().toString() == params.get('day')) &&
                        (
                            <div key={idx} className="bg-Neutral-700 p-1 pl-4 pr-4 text-[.8rem] rounded-lg flex justify-between items-center shadow shadow-Neutral-600" >
                                <div className="flex gap-2 justify-center items-center">
                                    <img src={
                                        weatherData.hourly.is_day && weatherData.hourly.weather_code
                                            ? (weatherData.hourly.is_day[idx] ? weatherIcons[weatherData.hourly.weather_code[idx] as keyof typeof weatherIcons].d
                                                : weatherIcons[weatherData.hourly.weather_code[idx] as keyof typeof weatherIcons].n)
                                            : "_"
                                    } alt="weather icon" width={35} />
                                    <p>{d.toLocaleTimeString(undefined, { hour12: true, hourCycle: "h12", hour: 'numeric' })}</p>
                                </div>

                                <p>{weatherData.hourly.temperature_2m && Math.round(weatherData.hourly.temperature_2m[idx])}°</p>
                            </div>
                        )
                    )

                ))) : (
                    Array.from({ length: 24 }, (_, i) => (
                        <div key={i} className="bg-Neutral-700 p-2 rounded-lg w-full opacity-70 animate-pulse" >
                            <p className="h-6"></p>
                        </div>
                    ))
                )}
            </div>
        </section>
    )
}