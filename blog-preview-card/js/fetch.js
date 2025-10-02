
const apiKey = "79ada5d333b34580a162d9992316ce7b"
const url = "https://newsapi.org/v2/everything?"


export const GetBlogs = async (category) => {
    try {
        const data = await fetch(`${url}q=${category}&apiKey=${apiKey}`, { mode: "cors" }).then(async (res) => await res.json())
        return data
    } catch (error) {
        console.log(error)
        throw new Error(`Api Error Massage: ${error.message ? error.message : "..."}`)
    }
}