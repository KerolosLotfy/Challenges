const icons = [
    { name: "paper", win: ["rock", "spock"] },
    { name: "rock", win: ["scissors", "lizard"] },
    { name: "scissors", win: ["paper", "lizard"] },
    { name: "lizard", win: ["paper", "spock"] },
    { name: "spock", win: ["scissors", "rock"] },
]


let winSound = new Audio('./sounds/success-1-6297.mp3')
let loseSound = new Audio("./sounds/mixkit-player-losing-or-failing-2042.wav")
let moveSound = new Audio("./sounds/H2REUSJ-orchestral-suspense.mp3")




// Pot Select Random Icon
export const randomIcon = async (icons) => {
    let selectPot = Math.trunc(icons.length * Math.random())
    return icons[selectPot]
}

export const ainmationEffect = (icons, time = 100, timeEnd = 1000) => {
    moveSound.play();
    let intervalID = setInterval(async () => {
        let icon = await randomIcon(icons)
        document.querySelector(".pot .image").innerHTML = icon.innerHTML
        document.querySelector(".pot .image").id = icon.id
        document.querySelector(".pot .image").classList.add("circle")
    }, time); // This will run every 100 milliseconds

    // After 1 seconds, clear the interval
    setTimeout(() => {
        clearInterval(intervalID);
        console.log("Interval stopped.");
    }, timeEnd);
}

export const gameLogic = (yourIcon, potIcon) => {
    let score = +document.querySelector(".score .num").textContent
    let result = "";

    // Draw State
    if (yourIcon == potIcon) {
        result = "Draw"
        return { result, score }
    }

    // Win or Lose
    icons.forEach((i) => {
        if (i.name == yourIcon) {
            if (i.win.includes(potIcon)) {
                document.querySelector(".you .image").classList.add("win")
                document.querySelector(".pot .image").classList.remove("win")

                // play  Win Sound
                winSound.play()

                result = "You Win";
                score++
            } else {
                document.querySelector(".you .image").classList.remove("win")
                document.querySelector(".pot .image").classList.add("win")

                // play  Lose Sound
                loseSound.play()

                result = "You Lose";
                score > 0 ? score-- : ""
            }
        }
    })

    return { result, score }
}


export const getPlayerData = (playerName) => {
    let data = JSON.parse(localStorage.getItem("playersData"))
    for (const d of data) {
        if (d.name == playerName) {
            return d // {name:"keroos",currentScore:5, highScore: 8}
        }
    }

    // Add New Player
    setPlayerData(playerName)
}

export const setPlayerData = (playerName, currentScore = 0, highScore = 0) => {
    let allData = localStorage["playersData"] ? JSON.parse(localStorage.getItem("playersData")) : []
    let playerData = {
        name: playerName,
        currentScore: currentScore,
        highScore: highScore
    }

    allData.push(playerData)
    localStorage.setItem("playersData", JSON.stringify(allData))
}


export const updatePlayerData = (playerName, currentScore, highScore) => {
    let data = JSON.parse(localStorage.getItem("playersData"))
    for (const d of data) {
        if (d.name == playerName) {
            d.currentScore = currentScore
            d.highScore = highScore
            
        }
    }

    localStorage.setItem("playersData", JSON.stringify(data))
    
}