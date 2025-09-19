import { useEffect, useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa"
import { Link } from "react-router-dom";



export const Header = () => {
    // In The Beginning, Theme Based on Operating System Theme
    const colorScheme = window.matchMedia("(prefers-color-scheme: dark)")
    let [isDark, SetIsDark] = useState(colorScheme.matches)

    // Change Root Element Theme accourding to className
    const root = document.documentElement;
    isDark ? root.classList.add("dark") : root.classList.remove("dark")

    // Change Theme when Toggle on The Button
    const changeTheme = () => {
        if (root.classList.contains("dark")) {
            SetIsDark(false)
            localStorage.setItem("theme", "light")

        } else {
            SetIsDark(true)
            localStorage.setItem("theme", "dark")
        }
    }

    useEffect(() => {
        // Set isDark based on storedTheme
        if (localStorage.getItem("theme")) {
            const storedTheme = localStorage.getItem("theme");
            storedTheme == 'dark' ? SetIsDark(true) : SetIsDark(false)
        }
    }, [isDark])

    return (
        <header className="p-5 w-full flex justify-center items-center bg-white dark:bg-Blue-900  md:pl-16 md:pr-16 shadow-lg z-10">
            <div className="w-full text-Blue-950 dark:text-white  flex justify-between items-center  text-Homepage">
                <Link to={"/"} className="block font-black">Where in the world?</Link>

                <div className=" text-[1rem] cursor-pointer" id="themeBtn" onClick={changeTheme}>
                    <div className="flex justify-center items-center gap-2  ">
                        {isDark ?
                            (
                                <>
                                    <FaSun />
                                    <span> Light Mode </span>
                                </>
                            )
                            :
                            (
                                <>
                                    <FaMoon className="-rotate-[10deg]" />
                                    <span> Dark Mode</span>
                                </>
                            )
                        }

                    </div>
                </div>
            </div>
        </header>
    )
}   