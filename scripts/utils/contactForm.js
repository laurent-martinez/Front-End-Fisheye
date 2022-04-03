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
function displayModal() {
    modal.setAttribute("aria-hidden", "false")
    main.setAttribute("aria-hidden", "true")
    main.style.display = "none"
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
    openModalBtn.focus()
}
document.addEventListener("keyup", (e) => {
    if (e.key === "Escape") {
        closeModal()
    }
})
