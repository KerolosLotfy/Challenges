import { fetchData } from "./fetch.js";


const randomBtn = document.querySelector("#randomBtn")


randomBtn.addEventListener(("click"), async () => {
    try {
        const data = await fetchData.random()
        const obj = data.recipes[0]

        // Image
        document.querySelector(".image img").src = obj.image

        // Main Title 
        document.querySelector(".content .main-title").id = obj.id
        document.querySelector(".content .main-title").textContent = obj.title

        // Description
        document.querySelector("#desc").innerHTML = obj.summary

        // Times
        document.querySelector("#prepareTime").innerHTML = `<span>Preparation: </span> ${obj.preparationMinutes ? `${obj.preparationMinutes} minutes` : "...."}`
        document.querySelector("#cookingTime").innerHTML = `<span>Cooking: </span> ${obj.cookingMinutes ? `${obj.cookingMinutes} minutes` : "...."}`
        document.querySelector("#readyTime").innerHTML = `<span>Total:</span > ${obj.readyInMinutes ? `${obj.readyInMinutes} minutes` : "...."}`

        // Ingredients
        const ingredients = obj.extendedIngredients // array of Object
        const ingredientsList = document.querySelector(".content .ingredient ul ");
        ingredientsList.innerHTML = "";
        ingredients.forEach((obj) => {
            let li = document.createElement("li");
            li.id = obj.id
            li.innerHTML = `<p> ${obj.original} </p >`
            ingredientsList.appendChild(li)
        })


        // Instructions
        const instructions = obj.analyzedInstructions[0].steps
        const InstructionsList = document.querySelector(".content .instructions ol ");
        InstructionsList.innerHTML = ""
        instructions.forEach((obj) => {
            let li = document.createElement("li");
            li.innerHTML = `<p> ${obj.step} </p >`
            InstructionsList.appendChild(li)
        })


        // Nutrition
        const nutrition = await fetchData.nutrition(obj.id)
        const nutrientsArray = nutrition && Array.isArray(nutrition.nutrients) ? nutrition.nutrients : []
        let nutrientsList = document.querySelector(".Nutrition .table");
        nutrientsList.innerHTML = "";
        nutrientsArray.forEach((obj) => {
            // name / amount / unit
            let row = document.createElement("div");
            row.classList.add("row")
            row.innerHTML = `<p> ${obj.name}</p> <p class="value">${obj.amount}${obj.unit}</p>`
            nutrientsList.appendChild(row)
        })

        window.scrollTo({
            top: 1,
            behavior: "smooth",
        });

    } catch (error) {
        alert(error && error.message ? error.message : String(error))
    }


})