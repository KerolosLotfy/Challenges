import { fetchData } from "./fetch.js";

const adviceId = document.querySelector("#advice-id")
const adviceText = document.querySelector("#advice-text")
const randomBtn = document.querySelector(".btn")


window.addEventListener(("load"), async () => {
    const obj = await fetchData.getAdvice(71)
    adviceId.textContent = 117
    adviceText.textContent = `"${obj.slip.advice}"`
})


randomBtn.addEventListener(("click"), async () => {

    // Fetch Random Advice
    const obj = await fetchData.random()
    adviceId.textContent = obj.slip.id

    // Text Effect
    textEffect(adviceText, obj.slip.advice,)


})


const textEffect = (element, text, speed = 50) => {
    let str = `"${text}"`
    let i = 1
    let intervalId = setInterval(() => {
        if (i > str.length) {
            clearInterval(intervalId)
        } else {
            element.textContent = str.slice(0, i)
            i++
        }
    }, speed)
}


