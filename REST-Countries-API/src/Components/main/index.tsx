import { getData } from "../fetch"
import { useEffect, useState } from "react"
import { type objData } from "../fetch/types"
import { Link, useSearchParams } from "react-router-dom"
import { Features } from "../features"
import { Details } from "../details"



export const Main = ({ filtered, details }: { filtered: boolean, details: boolean }) => {
    const [params] = useSearchParams()
    const region = params.get('region') || ""
    const countryName = params.get('country') || ""

    const [countries, setCountries] = useState<objData[]>();

    useEffect(() => {
        if (filtered && (region || countryName)) {
            // Filtered Data by Resgion
            const data = region ? getData.byResgion(region) : getData.byCountry(countryName)
            setCountries(data)

        } else {
            // All Data Without Filter
            const data = getData.all();
            setCountries(data);
        }
    }, [region, countryName]);

    return (
        <main className=" overflow-hidden w-full  pt-10 bg-Grey-50 text-Grey-950 dark:bg-Blue-950 dark:text-white  p-5 flex-1 flex flex-col items-center gap-10 md:pl-16 md:pr-16">

            {/* Search & Filter */}
            {details ? <Features home={false} /> : <Features home={true} />}

            {/* Display All Countries || Details Page  */}
            {details ? <Details /> : < Countries data={countries as objData[]} />}

        </main>
    )
}



export const Countries = ({ data }: { data: objData[] }) => {

    return (
        <section className="flex flex-wrap  justify-center md:justify-between  gap-8  w-full overflow-y-scroll shadow-lg z-10" id="countries">
            {data?.map((c, id) => (
                <div key={id} className=" max-w-[300px] basis-64  bg-white text-Blue-950 dark:bg-Blue-900 dark:text-white shadow-lg ">
                    {/* Flag */}
                    <div className="w-full h-1/2 flex ">
                        <img src={c.flag} alt={c.name + "Flag"} className="w-full h-full object-cover" />
                    </div>

                    {/* Details */}
                    <div className="p-4" >
                        {/* Name */}
                        <Link className="cursor-pointer font-bold" to={`/details/${c.name}`} aria-label="countryName" >{c.name}   </Link>

                        {/* Other Properties */}
                        <div className="mt-3">
                            <p>
                                <span>Population:</span>
                                <span className="text-gray-400"> {c.population}</span>
                            </p>
                            <p>
                                <span>Region:</span>
                                <span className="text-gray-400" aria-label="region"> {c.region}</span>
                            </p>
                            <p>
                                <span>Capital:</span>
                                <span className="text-gray-400"> {c.capital}</span>
                            </p>
                        </div>

                    </div>
                </div>
            ))}
        </section>
    )
}