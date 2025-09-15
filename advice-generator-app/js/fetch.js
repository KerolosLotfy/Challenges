const apiUrl = "https://api.adviceslip.com/advice"


export const fetchData = {
    random: async () => {
        try {
            const res = await fetch(`${apiUrl}`, {
                mode: "cors",
                cache: "no-store"
            })
            if (!res.ok) {
                throw new Error(`Request failed with status ${res.status}`)
            }

            const obj = await res.json()
            return obj
        } catch (error) {
            throw (error instanceof Error ? error : new Error(String(error)))
        }
    },


    getAdvice: async (id) => {
        try {
            const res = await fetch(`${apiUrl}/${id}`, {
                mode: "cors",
                cache: "no-store"
            })
            if (!res.ok) {
                throw new Error(`Request failed with status ${res.status}`)
            }

            const obj = await res.json()
            return obj

        } catch (error) {
            throw (error instanceof Error ? error : new Error(String(error)))
        }
    }
}