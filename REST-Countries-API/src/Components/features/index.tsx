import { FaDotCircle, FaSearch } from "react-icons/fa"
import { getData } from "../fetch"
import { Link, useNavigate, useSearchParams } from "react-router-dom"
import { FaArrowLeftLong, FaArrowTurnDown } from "react-icons/fa6"
import { useEffect, useState } from "react"


export const Features = ({ home = true }: { home: boolean }) => {
    return (
        <section className="w-full flex flex-col gap-2.5 justify-between md:flex-row">
            {home ? (
                <>
                    <Search />
                    <Filter />
                </>
            ) : (
                <BackToHome />
            )}
        </section>
    )
}

const Search = () => {
    const navigate = useNavigate()


    const searching = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        if (!value) {
            navigate(`/`)
            return
        }
        navigate(`/filter?country=${encodeURIComponent(value)}`)
    }



    return (
        <div className=" w-full bg-white text-Grey-400 flex items-center text-Homepage md:w-1/3 dark:bg-Blue-900 dark:text-white shadow-lg rounded-md ">
            <>
                <FaSearch className=" cursor-pointer text-[1.2rem] ml-4 mr-4  " />

                <input
                    type="search"
                    id="search"
                    name="countryName"
                    placeholder="Search for a country..."
                    aria-label="Search for a country"
                    className=" w-full h-full p-3"
                    onChange={searching}
                    autoComplete="on"
                />
            </>
        </div>
    )
}


const Filter = () => {
    const regions = getData.regions
    const [params] = useSearchParams()
    let [listValue, SetListValue] = useState("")
    const regionLi = document.querySelectorAll("#regionList li")

    // Show & Hide Regions Menu
    const displayMenu = () => {
        const menu = document.querySelector("#regionList")
        menu?.classList.toggle("hidden")
    }



    useEffect(() => {
        // Auto Select active Element
        if (params.has("region")) {
            // Reset active element
            regionLi.forEach((li) => {
                li.classList.remove("active")
            })

            // Set Active Element
            regionLi.forEach((li) => {
                if (li.ariaLabel?.toLowerCase() == params.get("region")?.toLowerCase()) {
                    li.classList.add("active")
                    SetListValue(params.get("region") as string)
                }
            })
        } else {

            // Reset active element
            regionLi.forEach((li) => {
                li.classList.remove("active")
            })

            regionLi[0]?.classList.add("active")
            SetListValue("Filter by Region")

        }
    }, [params])



    return (
        // <div className=" cursor-pointer flex justify-between items-center gap-5 max-w-fit bg-white text-Grey-950 p-1  text-Homepage dark:bg-Blue-900 dark:text-white shadow-lg rounded-md">
        //     <select className=" cursor-pointer border-none appearance-none w-full bg-inherit text-inherit p-4" aria-label="region-select" onChange={filtering}>
        //         <button type="button" className="text">
        //             <FaArrowTurnDown />
        //         </button>

        //         <option value="">   Filter by Region</option>
        //         {regions.map((r, i) =>
        //             <option value={r} key={i} className="" >{r}</option>
        //         )}
        //     </select>
        // </div>

        <div className=" max-w-[200px] flex-1 relative cursor-pointer flex justify-between items-center gap-5  bg-white text-Grey-950 p-3 text-Homepage dark:bg-Blue-900 dark:text-white shadow-lg rounded-md" onClick={displayMenu}>
            <span id="listValue">{listValue}</span>

            <FaArrowTurnDown />

            {/* List */}
            <ul className=" hidden z-10 absolute bg-inherit text-inherit rounded-md p-4 w-full left-0 top-full mt-1 shadow-lg" id="regionList">
                <li className="border-l-4 flex items-center gap-2 p-1 mb-1.5  pl-3 active">
                    <FaDotCircle className="dot text-[.5rem] hidden" />
                    <Link to={`/`} className=" block w-full ">All</Link>
                </li>
                {regions.map((r, i) =>
                    <li aria-label={r} key={i} className="border-l-4  flex items-center gap-2  mb-1.5 pl-3">
                        <FaDotCircle className="dot text-[.5rem]  hidden" />
                        <Link to={`/filter?region=${r}`} className=" block w-full ">{r}</Link>
                    </li>
                )}
            </ul>
        </div>
    )
}




const BackToHome = () => {

    return (
        <Link to={'/'} className="pl-5 pr-5 flex items-center gap-3 bg-white text-Grey-950 dark:text-white dark:bg-Blue-900 p-2 rounded-md shadow-lg text-sm max-w-fit">
            <FaArrowLeftLong />
            <span>Back</span>
        </Link>
    )
}