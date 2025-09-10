// varibles
const theme = document.getElementById("theme");
const container = document.querySelector(".container");
const card = document.querySelector(".card");


// add click event to change theme
theme.addEventListener("click", () => {
    container.classList.toggle("dark");
    card.classList.toggle("bg");

    if (theme.children[0].classList.contains("moon")) {

        theme.children[0].classList.replace("fa-moon", "fa-sun");
        theme.children[0].classList.replace("moon", "sun");
        theme.children[1].textContent = "Light";

    } else if (theme.children[0].classList.contains("sun")) {

        theme.children[0].classList.replace("fa-sun", "fa-moon");
        theme.children[0].classList.replace("sun", "moon");
        theme.children[1].textContent = "Dark";
    }
});