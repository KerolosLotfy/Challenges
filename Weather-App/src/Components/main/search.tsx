import { useEffect, useState, type ChangeEvent } from "react"
import { FaSearch } from "react-icons/fa"
import loadingIcon from "../../assets/images/icon-loading.svg"
import { flagUrl, fetchData } from "../fetch"
import type { DataTypes } from "../fetch/types"
import { useNavigate, useSearchParams } from "react-router-dom"


export const SearchComponent = () => {
    let [places, setPlaces] = useState<DataTypes["geocoding"] | never[] | null>(null)
    let [allowSearch, setAllowSearch] = useState(false)

    const [params] = useSearchParams();
    const nav = useNavigate()


    const OnChange = async (e: ChangeEvent<HTMLInputElement>) => {

        // Reset Places Array To Loading
        setPlaces([])
        if (e.currentTarget.value !== '') {
            //Hide Input Label
            e.currentTarget.nextElementSibling?.classList.add("hidden");
            // Display Places List
            document.querySelector("#placesList")?.classList.remove("hidden")

            // Get Places List
            const data: DataTypes["geocoding"] | never[] = await fetchData.byName(e.currentTarget.value)
            data.length ? setPlaces(data) : setPlaces(null)

            // Allow to CLick on search button
            setAllowSearch(true)


        } else {
            // Display Input Label
            e.currentTarget.nextElementSibling?.classList.remove("hidden")
            // Hide Places List
            document.querySelector("#placesList")?.classList.add("hidden")
            setPlaces(null)

            // Not Allow to CLick on search button
            setAllowSearch(false)

        }
        // console.log(e.currentTarget.value)
    }

    const searching = async () => {
        const el: HTMLInputElement | null = document.querySelector("input#search")

        if (el?.value == "") {
            setAllowSearch(false)
            return
        }

        const data: DataTypes["geocoding"] | never[] | null = el ? await fetchData.byName(el.value) : null


        if (data && data.length == 1) {
            params.set("lat", data[0].latitude.toString())
            params.set("lng", data[0].longitude.toString())
            nav(`?${params.toString()}`)
        } else {
            params.delete("lat");
            params.delete("lng");
            nav(`?${params.toString()}`)
        }

        // el && params    
        el && (el.value = "")

        // Display Input Label
        document.querySelector("input#search ~ label")?.classList.remove("hidden")
        // Hide Places List
        document.querySelector("#placesList")?.classList.add("hidden")

        setPlaces(null)
    }

    useEffect(() => {

    })

    return (
        <section className="w-full mt-8 flex flex-col gap-4  justify-center items-center sm:flex-row" >
            {/* Input Data */}
            <div className=" relative flex justify-start items-center gap-2 bg-Neutral-800 rounded-md w-full sm:w-[25rem]">
                <input type="text" id="search" className="w-full p-2 rounded-md" onChange={OnChange} />
                <label htmlFor="search" className=" absolute w-full h-full top-0 left-0 flex items-center text-Neutral-300 gap-2 p-2 rounded-md">
                    <FaSearch className="ml-2 " />
                    <span>Search for a place</span>
                </label>


                {/* places List */}
                <div className="hidden absolute w-full min-h-full bg-inherit rounded-md left-0 top-[110%] z-10  p-4" id="placesList">
                    {places ? (
                        places.length ? places.map((obj) => (
                            <div key={obj.id} className="flex items-center gap-4 p-2 hover:text-Blue-500">
                                <img src={`${flagUrl}${obj.country_code.toLowerCase()}.svg`} alt="flag" width={20} />
                                {/* <Link to={`?lat=${obj.latitude}&lng=${obj.longitude}`} onClick={searching}>{obj.name}, {obj.country}</Link> */}
                                <p className="cursor-pointer" onClick={(e) => {
                                    const inputEl: HTMLInputElement | null = document.querySelector("input#search")
                                    if (inputEl) {
                                        inputEl.value = e.currentTarget.textContent as string
                                    }
                                    document.querySelector("#placesList")?.classList.add("hidden")
                                    // setPlaces([])
                                }}>
                                    {obj.name}, {obj.country}
                                </p>
                            </div>
                        )) : (
                            <p className="flex gap-2">
                                <img src={loadingIcon} alt="Loading Icon" width={15} />
                                <span>Search in progress</span>
                            </p>
                        )
                    ) : (<p className="flex gap-2">No Result found!</p>)}
                </div>

            </div>

            <button type="button" id="searchBtn" className={`${allowSearch ? 'cursor-pointer' : 'cursor-not-allowed'}  p-2 bg-Blue-500 rounded-md w-full sm:w-max hover:bg-Blue-700`} onClick={searching}>Search</button>


        </section >
    )
}