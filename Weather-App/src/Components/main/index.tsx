// import { useEffect, useState, } from "react"
import type { DataTypes } from "../fetch/types"
import { fetchData } from "../fetch"
import { SearchComponent } from "./search"
import { WeatherSection } from "../weather"
import { Link, useSearchParams } from "react-router-dom"
import errIcon from "../../assets/images/icon-error.svg"
import retryIcon from "../../assets/images/icon-retry.svg"
import { useEffect, useState } from "react"


export const Main = () => {
    const [params, setParams] = useSearchParams();

    let [weatherData, setWeatherData] = useState<DataTypes["weatherData"] | undefined>(undefined)
    const [error, setError] = useState<string | null>(null)

    const units = {
        temp: params.has("temp"),
        wind: params.has("wind"),
        prec: params.has("prec")
    }


    useEffect(() => {
        
        if (!params.has('lat') && !params.has('ln')) {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        setParams(`?lat=${position.coords.latitude}&lng=${position.coords.longitude}`);
                    },
                    (error) => {
                        // If user denies or there's an error, fallback to Berlin
                        console.log("Error: ", error.message)
                        setParams(`?lat=52.5244&lng=13.4105`); // Berlin, Germany
                    }
                );
            }
        } else {
            (async () => {
                setError(null)
                setWeatherData(undefined)
                try {
                    const location: DataTypes["location"] = {
                        latitude: Number(params.get('lat')),
                        longitude: Number(params.get("lng"))
                    }
                    const data: DataTypes["weatherData"] = await fetchData.WeatherData(location, units)
                    setWeatherData(data)
                } catch (err: unknown) {
                    const message = err instanceof Error ? err.message : "Unexpected error"
                    setError(message)
                }
            })();
        }

    }, [params])



    return (
        <main className="max-md:w-[90%] flex-1 flex flex-col items-center">

            {error ? (
                <div className="mt-10 flex flex-col x-full gap-4 items-center text-center">
                    <img src={errIcon} alt="Error Icon" width={40} />
                    <h1 className="text-4xl font-bold">Something Went Wrong</h1>
                    <p className="text-[.8rem] max-w-md">We couldn't connect to the server (API error). please try again in a few momments</p>
                    <Link to={"/"} className="flex justify-center items-center gap-2 bg-Neutral-800 p-2 rounded-md cursor-pointer hover:bg-Blue-500">
                        <img src={retryIcon} alt="retry Icon" />
                        <span>Retry</span>
                    </Link>
                </div>
            ) : (
                <>
                    <h1 className="text-[2.5rem] font-bold text-center">How's the sky looking today?</h1>

                    {/* Search Section */}
                    <SearchComponent />

                    {/* Weather Section */}
                    <WeatherSection weatherData={weatherData} />
                </>
            )}

        </main >
    )
}



