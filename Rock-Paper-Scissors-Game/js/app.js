// Game Functions
import { randomIcon, ainmationEffect, gameLogic, getPlayerData, setPlayerData, updatePlayerData } from "./gameFunc.js"

// Variables
const rulesBtn = document.querySelector(".rules-btn")
const rulesImg = document.querySelector(".rules")
const closeBtn = document.querySelector(".rules .close")
const icons = document.querySelectorAll(".ingame .circle")
const startBtn = document.querySelector(".start")
const input = document.querySelector("#player-name")
let playerData = {
    name: "",
    currentScore: 0,
    highScore: 0
}

startBtn.addEventListener("click", (e) => {
    e.preventDefault()
    document.querySelector("form").style.display = "none"

    if (typeof localStorage["playersData"] != "undefined") {
        // Get Player Data From Local Storage
        playerData = getPlayerData(input.value.toLowerCase())

        if (typeof playerData != "undefined") {
            document.querySelector("#playerName").textContent = playerData.name
            document.querySelector(".score .num").textContent = playerData.currentScore
            document.querySelector("#highScore").textContent = playerData.highScore
        } else {
            document.querySelector("#playerName").textContent = input.value
            document.querySelector(".score .num").textContent = 0
            document.querySelector("#highScore").textContent = 0
        }


    } else {
        // Set Player Data in Local Storage
        setPlayerData(input.value.toLowerCase(), 0, 0)
        document.querySelector("#playerName").textContent = input.value
        document.querySelector(".score .num").textContent = 0
        document.querySelector("#highScore").textContent = 0
    }

})



// Show Rules Image
rulesBtn.addEventListener("click", () => {
    rulesImg.classList.add("active");
});

// Close Rules Image
closeBtn.addEventListener("click", () => {
    rulesImg.classList.remove("active")
})


icons.forEach((icon => {
    icon.addEventListener("click", async (e) => {
        // Show Start Game 
        document.querySelector(".ingame").classList.remove("active")
        document.querySelector(".startGame").classList.add("active")

        // Display You Picked Icon
        document.querySelector(".you .image").innerHTML = icon.innerHTML
        document.querySelector(".you .image").id = icon.id


        ainmationEffect(icons)


        setTimeout(async () => {
            // Pot Icon
            let potIcon = await randomIcon(icons)
            document.querySelector(".pot .image").classList.add("circle")
            document.querySelector(".pot .image").id = potIcon.id
            document.querySelector(".pot .image").innerHTML = potIcon.innerHTML

            // result
            let { result, score } = gameLogic(icon.id, potIcon.id)
            document.querySelector(".result .btn").classList.add("active")
            document.querySelector(".result .title").textContent = result
            document.querySelector(".score .num").textContent = score


            // Update Player Data
            updatePlayerData(playerData.name, score, playerData.highScore < score ? score : playerData.highScore);
            playerData.highScore < score ? playerData.highScore = score : ""
            document.querySelector("#highScore").textContent = playerData.highScore;
        }, 1500)





    })
}))


// Play Again
document.querySelector("#playAgain").addEventListener("click", () => {



    document.querySelector(".ingame").classList.add("active")
    document.querySelector(".startGame").classList.remove("active")

    // Reset
    document.querySelector(".result .title").textContent = ""
    document.querySelector(".you .image").classList.remove("win")
    document.querySelector(".pot .image").classList.remove("win")
    document.querySelector(".result .btn").classList.remove("active")
})

