// Glable Variables 
const numbers = document.querySelectorAll("#nums li");
const massage = document.querySelector("#massage");
const thanking = document.querySelector("#thanking");
const submit = document.querySelector("#submit");
const error = document.querySelector("#error");

// select active rate number
numbers.forEach((li) => {
    li.addEventListener("click", () => {
        numbers.forEach((li) => {
            li.classList.remove("active");
        });
        li.classList.add("active");
    });

});

// add click event to submit button to show thanking page
submit.addEventListener("click", () => {
        numbers.forEach((li) => {
            if (li.classList.contains("active")) {
                submit.classList.toggle("submited");
                let rating = li.textContent;
                massage.textContent = `You selected ${rating} out of ${numbers.length}`;
                thanking.classList.toggle("show");
            }
            
            // if clicked on submit button without select rating
            // massage error
            else {
                error.classList.toggle("error");
                setTimeout(() => {
                    error.classList.toggle("error");
                }, 1200);
            }
        }); 
});





