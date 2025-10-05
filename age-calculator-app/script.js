const inputs = document.querySelectorAll("form input")
const years = document.querySelector(".years span")
const months = document.querySelector(".months span")
const days = document.querySelector(".days span")
const save = document.querySelector(".save")
const bookmarksEl = document.querySelector(".bookmarks")
let birthDate = {
    day: 0,
    month: 0,
    year: 0

}

// Before Submission
inputs.forEach((el) => {

    // Set current date is default
    el.id == 'day' && (el.value = new Date().getDate())
    el.id == 'month' && (el.value = new Date().getMonth() + 1)
    el.id == 'year' && (el.value = new Date().getFullYear())

    el.addEventListener("input", () => {
        // Reset
        el.parentElement.classList.remove("error") // Remove class "error"
        el.nextElementSibling.textContent = "" // Remove Error 
        years.textContent = '--'
        months.textContent = '--'
        days.textContent = '--'
        // Remove Save icon
        document.querySelector(".save").classList.remove("active")

        // Prevent Enter Any Text
        if (isNaN(parseInt(el.value))) {
            el.value = ""
        }
    })
})

// When Sumbit
document.forms[0].addEventListener("submit", (e) => {
    e.preventDefault()

    let i = 0

    for (const input of inputs) {
        const validObj = validation(input)
        // return {status:bool, reason?:  string, inputEl?: HTMLInputElement }
        if (validObj?.status) {
            i++
        } else {
            i = 0
            notVaild(validObj?.reason, validObj?.inputEL)
        }

        if (i == inputs.length) {
            const ageObj = calcAge(validObj?.birthDate) // { day, month, year }
            displayAge(ageObj)
        }
    }



})

// Validation
const validation = (el) => {


    // Check Inputs is Empty
    if (el.value == "") {
        return { status: false, reason: "empty", inputEL: el }
    }



    // Check Limits Numbers
    switch (el.id) {
        case 'day':
            if (+el.value <= 0 || +el.value > 31) {
                return { status: false, reason: "invalid-day", inputEL: el }
            }
            birthDate.day = +el.value
            break;
        case 'month':
            if (+el.value <= 0 || +el.value > 12) {
                return { status: false, reason: "invalid-month", inputEL: el }
            }
            birthDate.month = +el.value
            break;
        case 'year':
            let currentYear = new Date(Date.now()).getFullYear();
            if (+el.value <= 0 || +el.value > currentYear) {
                return { status: false, reason: "invalid-year", inputEL: el }
            }
            birthDate.year = +el.value
            break;

        default:
            break;
    }

    // Check day is valid at the month 
    if (birthDate.month && birthDate.year) {
        let validDays = new Date(birthDate.year, birthDate.month, 0).getDate()
        if (birthDate.day > validDays) {
            return { status: false, reason: "invalid-date", inputEL: document.querySelector("input#day") }
        }
    }

    // Check Date in the past
    if (birthDate.month && birthDate.year && birthDate.day) {
        let inputDate = new Date(birthDate.year, birthDate.month - 1, birthDate.day).getTime();
        let currentDate = new Date().getTime()
        if (inputDate > currentDate) {
            return { status: false, reason: "future-date", inputEL: document.querySelector("input#day") }
        }
    }


    if (birthDate.day && birthDate.month && birthDate.year) {
        // is Vaild
        return { status: true, birthDate }
    } else {
        return { status: true }

    }

}


// Calc Your Age 
const calcAge = (birthDate) => {

    let inputDate = new Date(birthDate.year, birthDate.month - 1, birthDate.day)
    let currentDate = new Date()


    // Calculate the difference
    let years = currentDate.getFullYear() - inputDate.getFullYear()
    let months = currentDate.getMonth() - inputDate.getMonth()
    let days = currentDate.getDate() - inputDate.getDate()

    // Adjust for negative days
    if (days < 0) {
        months--
        // Get the last day of the previous month
        let lastMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0)
        days += lastMonth.getDate()
    }

    // Adjust for negative months
    if (months < 0) {
        years--
        months += 12
    }

    let age = {
        years: years,
        months: months,
        days: days,
    }

    return age
}


// Display Your Age
const displayAge = (ageObj) => {
    years.textContent = '00'
    months.textContent = '00'
    days.textContent = '00'

    // Calculate the maximum value to determine animation duration
    const maxValue = Math.max(ageObj.years, ageObj.months, ageObj.days)
    // Set total animation duration (e.g., 2000ms) and calculate interval time
    const totalDuration = 2000
    const intervalTime = Math.max(50, Math.min(100, totalDuration / maxValue))

    let i = 0
    let intervalId = setInterval(() => {
        if (i >= maxValue) {
            clearInterval(intervalId)
            // Ensure final values are set correctly
            years.textContent = ageObj.years < 10 ? '0' + ageObj.years : ageObj.years
            months.textContent = ageObj.months < 10 ? '0' + ageObj.months : ageObj.months
            days.textContent = ageObj.days < 10 ? '0' + ageObj.days : ageObj.days

            // Display Save icon
            document.querySelector(".save").classList.add("active")

            return
        }

        // Calculate current values based on progress
        const progress = i / maxValue
        const currentYears = Math.floor(progress * ageObj.years)
        const currentMonths = Math.floor(progress * ageObj.months)
        const currentDays = Math.floor(progress * ageObj.days)

        // Update display with current values
        years.textContent = currentYears < 10 ? '0' + currentYears : currentYears
        months.textContent = currentMonths < 10 ? '0' + currentMonths : currentMonths
        days.textContent = currentDays < 10 ? '0' + currentDays : currentDays

        i++;
    }, intervalTime)


}


// Display Not Vaild Massages
const notVaild = (reason, el) => {
    el.parentElement.classList.add("error")
    const errMessageEl = el.nextElementSibling



    switch (reason) {
        case 'empty':
            errMessageEl.textContent = 'This Filed is Required.'
            break;
        case 'invalid-day':
            errMessageEl.textContent = 'Must be a valid day.'
            break;
        case 'invalid-month':
            errMessageEl.textContent = 'Must be a valid month.'
            break;
        case 'invalid-year':
            errMessageEl.textContent = 'Must be a valid year.'
            break;
        case 'invalid-date':
            errMessageEl.textContent = 'Must be a valid date.'
            break;
        case 'future-date':
            errMessageEl.textContent = 'Must be in the past.'
            break;
        default:
            break;
    }
}


save.querySelector(".save-btn").addEventListener("click", () => {
    let name = document.querySelector(".save input")
    // Remove Error Empty Message
    save.querySelector(".err").style.display = "none"

    if (name.value !== '') {
        // Display Saved Message
        document.querySelector(".saved-msg").classList.add("active")
        setTimeout(() => {
            // Remove Saved Message
            document.querySelector(".saved-msg").classList.remove("active")
            SetBookmarks(name.value)
            getBookmarks()
        }, 2000)
    } else {
        // Remove Error Empty Message
        save.querySelector(".err").style.display = "block"
    }
})


// Get Bookmarks From LocalStorage
const getBookmarks = () => {
    // Reset Bookmarks List
    bookmarksEl.querySelector(".list").innerHTML = ""

    if (localStorage["bookmarks"]) {
        let data = JSON.parse(localStorage.getItem('bookmarks'))
        // Display Bookmarks
        bookmarksEl.classList.add("active")
        data.forEach((obj, i) => {
            let li = document.createElement("li")
            li.textContent = obj.name
            li.id = i
            bookmarksEl.querySelector(".list").appendChild(li)
        })

        return data
    } else {
        bookmarksEl.classList.remove("active")
    }

}
getBookmarks()



// Set Bookmarks On LocalStorage
const SetBookmarks = (name) => {
    if (!localStorage['bookmarks']) {
        localStorage.setItem("bookmarks", JSON.stringify([{ name, birthDate }]))
    } else {
        let bookmarks = getBookmarks()
        // Update birthDate at the name
        let isUpdate = false
        for (const obj of bookmarks) {
            if (obj.name.toLowerCase() == name.toLowerCase()) {
                obj.birthDate = birthDate
                localStorage.setItem("bookmarks", JSON.stringify(bookmarks))
                isUpdate = true
                break;
            }
        }
        !isUpdate &&
            (bookmarks.push({ name, birthDate })),
            (localStorage.setItem("bookmarks", JSON.stringify(bookmarks)))
    }
}

// Display and Hide Bookmark List
bookmarksEl.querySelector('.title').addEventListener("click", () => {
    bookmarksEl.querySelector(".list").classList.toggle("active")
})

// Get Birth Date from bookmarks at a specific name
bookmarksEl.querySelectorAll(".list li").forEach((el) => {
    el.addEventListener('click', () => {
        // Get BirthDate at the name
        let bookmarks = JSON.parse(localStorage.getItem("bookmarks"))
        let objData = bookmarks.filter((obj) => obj.name == el.textContent)[0]
        inputs.forEach((input) => {
            input.id == "day" && (input.value = objData.birthDate.day)
            input.id == "month" && (input.value = objData.birthDate.month)
            input.id == "year" && (input.value = objData.birthDate.year)
        })

        displayAge(calcAge(objData.birthDate))
    })
})