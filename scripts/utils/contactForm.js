// Dom

const body = document.querySelector("body")
const main = document.getElementById("main")
const modal = document.getElementById("contact_modal")
const modalContent = document.querySelector(".modal")
const modalCloseBtn = document.querySelector(".filter-white")

function displayModal() {
    console.log(body)

    console.log(modalCloseBtn)
    modalContent.innerHTML = ` 
    <header>
        <h2>Contactez-moi<br/>${photographer.name}</h2>
        <img
        src="assets/icons/close.svg"
        onclick="closeModal()"
        alt="icone croix"
        class="filter-white"
        />
    </header>
    <form>
        <div>
            <label>Prénom</label>
            <input
            type="text"
            tabindex="0"
            required
            id="first-name"
            name="first-name"
            pattern="^[A-Za-z-]+$"
            maxlength="15"
            />
        </div>
        <div>
            <label>Nom</label>
            <input
            type="text"
            tabindex="0"
            id="last-name"
            name="last-name"
            pattern="^[A-Za-z-]+$"
            maxlength="15"
            />
        </div>
        <div>
            <label>Email</label>
            <input type="email" id="email" name="email" />
        </div>
        <div>
            <label>Votre message</label>
            <textarea
            type="text"
            tabindex="0"
            id="message"
            name="message"
            pattern="^[A-Za-z0-9 ]+$"
            maxlength="30"
            ></textarea>
        </div>
        <button type="submit" class="contact_button" tabindex="0">
        Envoyer
        </button>
    </form>`
    modal.getAttribute("aria-hidden", "false")
    main.getAttribute("aria-hidden", "true")
    console.log(main.attributes)
    main.style.opacity = "0.5"
    body.classList.add(".no-scroll")
    modal.style.display = "flex"
    modalCloseBtn.focus()
    console.log("kikou")
}

function closeModal() {
    modal.getAttribute("aria-hidden", "true")
    main.getAttribute("aria-hidden", "false")
    main.style.opacity = "1"
    modal.style.display = "none"
    openModalBtn.focus()
}
document.addEventListener("keyup", (e) => {
    if (e.key === "Escape") {
        closeModal()
    }
})
