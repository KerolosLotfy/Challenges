const addToCart = document.querySelector(".add");

addToCart.addEventListener("click", () => {
    if (addToCart.innerText === "Add to Cart") {
        addToCart.innerHTML = "<span></span> Remove";
        addToCart.style.backgroundColor = "#ad1457";
    } else {
        addToCart.innerHTML = "<span></span> Add to Cart";
        addToCart.style.backgroundColor = "var(--Dark-cyan)";
    }
});
