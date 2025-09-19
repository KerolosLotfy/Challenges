import { useState, useEffect } from "react"
import { getData } from "../fetch"
import { type objData } from "../fetch/types"
import { Link, useParams } from "react-router-dom"


export const Details = () => {
    let { name } = useParams()


    let [country, SetCountry] = useState<objData>()

    const data = getData.byCountry(name as string)

    const bordersCountries = data.map((obj) => obj.borders)[0]?.map((code) => getData.byCode3(code)).map((obj => obj.name))

    useEffect(() => {
        SetCountry(data[0])
    }, [name])



    return (
        <section className="  overflow-y-scroll flex justify-between  items-center w-full gap-30 flex-wrap font-Detail">
            {country && (
                <>
                    {/*  Flag  Section */}
                    <div className=" flex-1 basis-[300px] shadow-lg rounded-md flex justify-center items-center max-lg:h-[300px]">
                        <img src={country.flag} alt={country.name + "flag"} className="max-w-full max-h-full rounded-md" />
                    </div>

                    {/* Info Section */}

                    <div className="flex-2 basis-[400px] shrink-1 ">
                        <h1 className="mb-6 text-[2rem] font-black ">{country.name}</h1>

                        <div className="flex flex-wrap justify-between gap-8">
                            <div className="flex flex-col gap-2 font-bold mb-2">
                                <p>Native Name: <span className="text-Grey-400 ml-2 font-light">{country.nativeName}</span> </p>
                                <p>Population: <span className="text-Grey-400 ml-2 font-light">{country.population}</span></p>
                                <p>Region: <span className="text-Grey-400 ml-2 font-light">{country.region}</span> </p>
                                <p>Sub Region: <span className="text-Grey-400 ml-2 font-light">{country.subregion}</span> </p>
                                <p>Capital: <span className="text-Grey-400 ml-2 font-light"> {country.capital}</span> </p>
                            </div>

                            <div className="flex flex-col gap-3 font-bold">
                                <p>Top Level Domain: <span className="text-Grey-400 ml-2 font-light">{country.topLevelDomain}</span> </p>
                                <p>Currencies: <span className="text-Grey-400 ml-2 font-light">{country.currencies[0].name}</span> </p>
                                <div className="flex gap-2">
                                    <span>Languages:</span>
                                    <div className="flex gap-2">
                                        {country.languages.map((obj, id, arr) => (
                                            <span key={id} className="text-Grey-400 font-light"> {obj.name} {id < arr.length - 1 ? "," : ""} </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>


                        {/* Borders */}
                        {bordersCountries && (<div className="mt-10 flex gap-2 items-center flex-wrap ">
                            <span className="font-bold mr-2">Border Countries:</span>
                            <div className="flex gap-2 text-center text-Grey-400 flex-wrap  ">
                                {bordersCountries?.map((c, id) => (
                                    <Link key={id} to={`/details/${c}`} className="bg-white dark:bg-Blue-900 shadow-lg text-Detail cursor-pointer rounded-md pl-5 pr-5 hover:scale-105 hover:font-black">{c}</Link>
                                ))}
                            </div>
                        </div>)}

                    </div>
                </>
            )}
        </section>
    )
}