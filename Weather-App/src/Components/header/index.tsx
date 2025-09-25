import { Link, useSearchParams, useNavigate } from "react-router-dom";
import Logo from "../../assets/images/logo.svg";
import SettingsIcon from "../../assets/images/icon-units.svg"
import ArrowDown from "../../assets/images/icon-dropdown.svg"
import checkMark from "../../assets/images/icon-checkmark.svg"



export const Header = () => {
    const [params] = useSearchParams()
    const nav = useNavigate()


    // Display or Hide Units Menu 
    const displayMenu = () => {
        const unitsMenu = document.querySelector("#unitsMenu")
        unitsMenu?.classList.toggle("hidden")
    }



    return (
        <header className="w-full flex justify-center items-center pt-8 pb-8">
            {/* Header Container */}
            <div className=" basis-[90%] md:basis-[80%] flex justify-between items-center">

                {/* Logo */}
                <Link to={"/"} className="block w-32 border-b-2 border-transparent hover:border-Neutral-800">
                    <img src={Logo} alt="Logo" className="w-full" />
                </Link>

                {/* Units */}
                <button type="button" className=" relative p-1.5  flex gap-2 bg-Neutral-800 rounded-md justify-center items-center text-start cursor-pointer text-Neutral-0 z-10 " onClick={displayMenu}>
                    <img src={SettingsIcon} alt="Gear Icon" className="w-[.8rem] m-1" />
                    <span className="text-[.8rem]">Units</span>
                    <img src={ArrowDown} alt="dropdown" className="w-2.5 mt-1 mr-1" />

                    {/* Units Setting Menu */}
                    <div id="unitsMenu" className=" hidden  absolute right-0 top-[100%] p-2 min-w-max w-[200%] text-[.8rem] bg-inherit mt-2 rounded-md group [&>p]:hover:bg-Neutral-700 [&>p]:rounded-md">
                        <p className="w-full text-start p-2" onClick={() => {
                            if (params.has("temp") && params.has("wind") && params.has("prec")) {
                                params.delete("temp")
                                params.delete("wind")
                                params.delete("prec")
                                nav(`?${params.toString()}`)
                            } else {
                                params.append("temp", "fahrenheit")
                                params.append("wind", "mph")
                                params.append("prec", "inch")
                                nav(`?${params.toString()}`)
                            }
                        }}>
                            {params.has("temp") && params.has("wind") && params.has("prec") ? "Switch to Metric" : "Switch to Imperial"}
                        </p>

                        {/* Temperature */}
                        <div className="border-b-1 border-Neutral-300 p-0! pb-2! pt-2! [&>p]:hover:bg-Neutral-700 [&>p]:rounded-md [&>*]:mb-1">
                            <span className="text-Neutral-300 font-bold">Temperature</span>
                            <p className={`${params.has("temp") ? "" : "active"} [&.active]:bg-Neutral-700 flex justify-between items-center [&.active>img]:inline-block p-2`} onClick={() => (params.delete("temp"), nav(`?${params.toString()}`))}>
                                <span>Celsius (°C)</span>
                                <img src={checkMark} alt="checkMark" className="hidden " />
                            </p>
                            <p className={`${params.has("temp") ? "active" : ""} [&.active]:bg-Neutral-700 flex justify-between [&.active>img]:inline-block p-2`} onClick={() => !params.has("temp") && nav(`?${params.toString()}&temp=fahrenheit`)}>
                                <span>Fahrenheit (°F)</span>
                                <img src={checkMark} alt="checkMark" className="hidden " />
                            </p>
                        </div>

                        {/* Wind Speed */}
                        <div className=" border-b-1 border-Neutral-300 p-0! pb-2! pt-2! [&>p]:hover:bg-Neutral-700 [&>p]:rounded-md">
                            <span className="text-Neutral-300 font-bold">Wind Speed</span>
                            <p className={`${params.has("wind") ? "" : "active"} [&.active]:bg-Neutral-700 flex justify-between items-center [&.active>img]:inline-block p-2`} onClick={() => (params.delete("wind"), nav(`?${params.toString()}`))}>
                                <span>km/h</span>
                                <img src={checkMark} alt="checkMark" className="hidden " />
                            </p>
                            <p className={`${params.has("wind") ? "active" : ""} [&.active]:bg-Neutral-700 flex justify-between [&.active>img]:inline-block p-2`} onClick={() => !params.has("wind") && nav(`?${params.toString()}&wind=mph`)}>
                                <span>mph</span>
                                <img src={checkMark} alt="checkMark" className="hidden " />
                            </p>
                        </div>

                        {/* Percipitation */}
                        <div className="p-0! pt-2! [&>p]:hover:bg-Neutral-700 [&>p]:rounded-md">
                            <span className="text-Neutral-300 font-bold">Temperature</span>
                            <p className={`${params.has("prec") ? "" : "active"} [&.active]:bg-Neutral-700 flex justify-between items-center [&.active>img]:inline-block p-2`} onClick={() => (params.delete("prec"), nav(`?${params.toString()}`))}>
                                <span>Millimeters (mm)</span>
                                <img src={checkMark} alt="checkMark" className="hidden " />
                            </p>
                            <p className={`${params.has("prec") ? "active" : ""} [&.active]:bg-Neutral-700 flex justify-between [&.active>img]:inline-block p-2`} onClick={() => !params.has("prec") && nav(`?${params.toString()}&prec=inch`)}>
                                <span>Inches (in) </span>
                                <img src={checkMark} alt="checkMark" className="hidden " />
                            </p>
                        </div>
                    </div>
                </button>



            </div>
        </header>
    )
}   