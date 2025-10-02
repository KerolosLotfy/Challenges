import { GetBlogs } from "./fetch.js"

const Btn = document.querySelector("#btn")
const inputCategory = document.querySelector("input#category")


Btn.addEventListener(("click"), async () => {
    if (inputCategory.value == "" || inputCategory.value == " ") return

    document.querySelector(".loading").classList.add("active")


    const data = await GetBlogs(inputCategory.value.trim())

    if (data) {
        // Category
        document.querySelector(".content .category").textContent = inputCategory.value

        setTimeout(() => {
            document.querySelector(".loading").classList.remove("active")
            displayData(data)
        }, 1500)

    }
})


/*
     data = {
         articles: Array(100)  (Array of Objects) =>
         [articles Object] = {
             author: "Jess Weatherbed"
             content:string
             description: string
             publishedAt: string
             title: string
             url: string
             urlToImage: string
         }

     }
 */

const displayData = (data) => {
    let articles = data?.articles
    let randomIndex = Math.round(Math.random() * articles.length)

    // Image
    document.querySelector(".image img").src = articles[randomIndex].urlToImage

    // Publish Date
    document.querySelector(".publish-date span").textContent = new Date(articles[randomIndex].publishedAt).toLocaleDateString(undefined, { dateStyle: "medium" })

    // Title
    document.querySelector(".content .title a").textContent = articles[randomIndex].title 

    // Link
    document.querySelector(".content .title a").href = articles[randomIndex].url

    // Description
    document.querySelector(".desc").textContent = articles[randomIndex].description

    // Author
    document.querySelector(".author .name").textContent = articles[randomIndex].author || "_____"
}