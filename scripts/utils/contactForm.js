// Dom
const body = document.querySelector("body")
const main = document.getElementById("main")
const modal = document.getElementById("contact_modal")
const modalContent = document.querySelector(".modal")
const modalCloseBtn = document.querySelector(
    "#contact_modal > div > form > header > img"
)
const firstInput = document.querySelector("#first-name")
const openModalBtn = document.querySelector("#contact_form-btn")
const send = document.querySelector("#contact_modal > div > form")
const inputs = document.querySelectorAll(".inputs")
// create variable
let firstName, lastName, email, message

function displayModal() {
    send.reset()
    modal.setAttribute("aria-hidden", "false")
    main.setAttribute("aria-hidden", "true")
    main.setAttribute("tabindex", "-1")
    // change opacity of the background & chnage the display of the modal
    main.style.opacity = "0.5"
    body.classList.add(".no-scroll")
    modal.style.display = "flex"
    // focus on the first input field
    firstInput.focus()
}

function closeModal() {
    modal.setAttribute("aria-hidden", "true")
    main.setAttribute("aria-hidden", "false")
    main.style.opacity = "1"
    main.style.dislay = "flex"
    modal.style.display = "none"
}
// close the modal with Escape key
document.addEventListener("keyup", (e) => {
    if (e.key === "Escape") {
        closeModal()
    }
})
// transfer the value of input field into variable
const getValue = () => {
    inputs.forEach((input) => {
        input.addEventListener("input", (e) => {
            switch (e.target.id) {
                case "first-name":
                    firstName = e.target.value
                    break
                case "last-name":
                    lastName = e.target.value
                    break
                case "email":
                    email = e.target.value
                    break
                case "message":
                    message = e.target.value
                    break
                default:
                    null
            }
        })
    })
}
// call the function
getValue()

// test the input field value with regex or method
function validate() {
    const regexEmail =
        /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/
    const firstNameChecker = () =>
        document.querySelector("input[name = first-name]").value.trim()
            .length >= 2

    const lastNameChecker = () =>
        document.querySelector("input[name = last-name]").value.trim().length >=
        2

    const emailChecker = () => regexEmail.test(email)
    // boolean on false by default
    let hasError = false
    // verify the checkers
    if (!firstNameChecker()) {
        hasError = true
    }
    if (!lastNameChecker()) {
        hasError = true
    }
    if (!emailChecker()) {
        hasError = true
    }
    if (!hasError) {
        //print the data on the console if the checker is ok
        console.log(firstName, lastName, email, message)
    }
}

send.addEventListener("submit", (e) => {
    // prevent the automatic sending
    e.preventDefault()
    // call the validate function
    validate()
    // close the modal & restore the display of main
    modal.style.display = "none"
    main.style.opacity = "1"
})
