// Dom

const body = document.querySelector("body")
const main = document.getElementById("main")
const modal = document.getElementById("contact_modal")
const modalContent = document.querySelector(".modal")
const modalCloseBtn = document.querySelector(
    "#contact_modal > div > header > img"
)
const firstInput = document.querySelector("#first-name")
const openModalBtn = document.querySelector("#contact_form-btn")
const send = document.querySelector("#contact_modal > div > form")
console.log(send)
const inputs = document.querySelectorAll(".inputs")
console.log(inputs)
let firstName, lastName, email, message
function displayModal() {
    send.reset()
    modal.setAttribute("aria-hidden", "false")
    main.setAttribute("aria-hidden", "true")
    main.setAttribute("tabindex", "-1")
    console.log(modal.getAttribute("aria-hidden"))
    main.style.opacity = "0.5"
    body.classList.add(".no-scroll")
    modal.style.display = "flex"
    firstInput.focus()
    console.log("kikou")
}

function closeModal() {
    modal.setAttribute("aria-hidden", "true")
    main.setAttribute("aria-hidden", "false")
    main.style.opacity = "1"
    main.style.dislay = "flex"
    modal.style.display = "none"
}
document.addEventListener("keyup", (e) => {
    if (e.key === "Escape") {
        closeModal()
    }
})

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
getValue()
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
        console.log(firstName, lastName, email, message)
    }
}

console.log(firstName)
send.addEventListener("submit", (e) => {
    e.preventDefault()
    validate()
    modal.style.display = "none"
    main.style.opacity = "1"
})
