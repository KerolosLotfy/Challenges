const qBtn = document.querySelectorAll(".q .btn")
const q = document.querySelectorAll(".q h2 span")


const func = (q) => {
    const question = q.parentElement.parentElement

    question.classList.toggle("active")

    // Active | disactive Icon Button
    if (q.className == "btn") {
        for (const icon of q.children) {
            icon.classList.toggle("active")
        }
    } else {
        for (const icon of q.parentElement.children[1].children) {
            icon.classList.toggle("active")
        }
    }
}

qBtn.forEach((q) => {
    q.addEventListener(("click"), () => func(q))
})

q.forEach((q) => {
    q.addEventListener(("click"), () => func(q))
})