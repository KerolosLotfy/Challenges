import { useState } from "react";
import type { DevToApiResponse } from "../fetch/types";
import { getArticles } from "../fetch";
import { Card } from "./card";

interface messages {
    status: boolean,
    errMsg?: string
}

export const Main = () => {
    let [articles, setArticles] = useState<undefined | DevToApiResponse>()
    let [message, setMessage] = useState<undefined | messages>()

    const submit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();


        // Reset 
        setMessage(undefined)

        // Get Input Value
        const inputEl = document.querySelector("input") as HTMLInputElement


        // Display Active Message
        setMessage({ status: true })

        try {
            // Get Articles
            const data = await getArticles(inputEl.value || "")

            if (data) {

                if (data.length) {
                    setTimeout(async () => {
                        setMessage(undefined)
                        setArticles(data)
                    }, 2000)
                } else {
                    setMessage({ status: false, errMsg: "No articles found. Try another category." })
                }

            } else {
                console.log(data)
                setMessage({ status: false, errMsg: "Failed to load articles. Please try again." })

            }
        } catch (error) {
            console.log(error)
            setMessage({ status: false, errMsg: (error instanceof Error ? error.message : "An unknown error occurred.") })
        }

        // Reset Message
        setTimeout(() => setMessage(undefined), 5000)
    }


    return (
        <>
            <header>
                <form onSubmit={(e) => submit(e)}>

                    <input type="text" name="tag" id="tag" placeholder="Please Enter Blog Category" />

                    <button type="submit" id="btn">Get Random Blog</button>
                </form>

                {message != undefined && (<div className="message">
                    {message.status ?
                        (<p className="loading">
                            Loading
                            <strong >...</strong>
                        </p>)
                        : (<p className="error">{message.errMsg}</p>)
                    }
                </div>)}
            </header>

            <Card articles={articles} />
        </>


    )
}   