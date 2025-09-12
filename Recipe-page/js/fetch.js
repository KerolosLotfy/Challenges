const apiKey = "1f95c61e215f4d79a7c6561625ff884a"

export const fetchData = {
    random: async () => {
        try {
            const response = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${apiKey}`, { mode: "cors" })
            if (!response.ok) {
                if (response.status === 402) {
                    try {
                        const errorData = await response.json()
                        if (errorData && errorData.message) {
                            console.error(errorData.message, errorData.code)
                            throw new Error(`Sorry, API Not Available Currently, Please Try Tomorrow`)
                        }
                    } catch (err) {
                        throw err
                    }
                }
                throw new Error(`Request failed with status ${response.status}`)
            }
            const data = await response.json()
            return data
        } catch (error) {
            throw error
        }
    },


    nutrition: async (id) => {
        try {
            const response = await fetch(`https://api.spoonacular.com/recipes/${id}/nutritionWidget.json?apiKey=${apiKey}`, { mode: "cors" })
            if (!response.ok) {
                if (response.status === 402) {
                    try {
                        const errorData = await response.json()
                        if (errorData && errorData.message) {
                            console.error(errorData.message)
                            throw new Error(errorData.message)
                        }
                    } catch (err) {
                        throw err
                    }
                }
                throw new Error(`Request failed with status ${response.status}`)
            }
            const data = await response.json()
            return data
        } catch (error) {
            throw error
        }
    },




}