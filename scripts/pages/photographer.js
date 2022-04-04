let photographer
let mediasArray = []
let likesArray = []
//Mettre le code JavaScript lié à la page photographer.html
async function getPhotographer(id) {
    // Penser à remplacer par les données récupérées dans le json

    await fetch(`data/photographers.json`)
        .then((response) => response.json())
        .then((data) => {
            photographer = data.photographers.find((e) => e.id == id)
            if (photographer) {
                const photographerHeader =
                    document.querySelector(".photograph-header")

                const photographerHeaderHtml = `<div><h1 id="photographer--name">${photographer.name}</h1>
                <div class="photographer--info">
                      <h2>${photographer.city}, ${photographer.country}</h2>
                      <h3>${photographer.tagline}</h3>
                </div>
                </div>
                <div>
                <button class="contact_button" aria-label="bouton de contact du photographe" onclick="displayModal()" id="contact_form-btn">
                    Contactez-moi
                    </button>
                    </div>
                    <div>
                    <img id="photographer--pic"src="assets/photographers/${photographer.portrait}" alt=""></div>
                    <footer tabindex="-1" aria-label="ce photographe travaille pour ${photographer.price}euros par jour">
                 <div>
                        <span id="likeCount">0</span>
                        <i class="fas fa-heart"></i>
                        </div>
                        <span class="total_prices">${photographer.price} € / jour</span>
                 
                </footer>
                `
                photographerHeader.innerHTML = photographerHeaderHtml
                const photographerName = document.querySelector(
                    "#contact_modal > div > form > header > h2"
                )
                photographerName.innerHTML += photographer.name
            } else {
                window.location.href = `index.html`
            }
        })

    return {
        photographer,
    }
}

let url = new URL(window.location.href).searchParams
let id = url.get("id")

getPhotographer(id)

const photographerId = id

async function getMedias(photographerId) {
    await fetch(`data/photographers.json`)
        .then((response) => response.json())
        .then((data) => {
            let medias = data.media
                .filter((e) => e.photographerId == photographerId)
                .map((m) => MediaFactory(m))
            displayData(medias)
            mediaFilter(medias)
            likeInc(medias)
            likeSum(medias)
        })
}

getMedias(photographerId)

function displayData(medias) {
    const photographMedias = document.querySelector(".photograph-medias")
    medias.forEach((media) => {
        const mediaModel = MediaFactory(media)
        const mediaCardDOM = mediaModel.getMediaCardDom()
        photographMedias.appendChild(mediaCardDOM)
    })
    let lightbox = new Lightbox(medias)
    let links = document.querySelectorAll(".mediaLink")
    links.forEach((link) => {
        link.addEventListener("click", (e) => {
            lightbox.show(e.currentTarget.dataset.id)
            lightbox.focus()
        })
        link.addEventListener("keyup", (e) => {
            if (e.key === "Enter") {
                lightbox.show(e.currentTarget.dataset.id)
                lightbox.focus()
            }
        })
    })
}

const selector = document.querySelector(".custom-selector")
selector.addEventListener("change", (e) => {
    console.log("changed", e.target.value)
})
selector.addEventListener("mousedown", (e) => {
    e.preventDefault()

    const select = selector.children[0]
    const dropdown = document.createElement("ul")
    dropdown.className = "selector-options"
    ;[...select.children].forEach((option) => {
        const dropdownOption = document.createElement("li")
        dropdownOption.textContent = option.textContent
        dropdown.appendChild(dropdownOption)
        dropdownOption.className = "selector-option"

        dropdownOption.addEventListener("mousedown", (e) => {
            e.stopPropagation()
            select.value = option.value
            selector.value = option.value
            select.dispatchEvent(new Event("change"))
            selector.dispatchEvent(new Event("change"))
            dropdown.remove()
        })
    })

    selector.appendChild(dropdown)
    //handle click out
    document.addEventListener("click", (e) => {
        if (!selector.contains(e.target)) {
            dropdown.remove()
        }
    })
})

function mediaFilter(medias) {
    const select = document.querySelector("#filterMedias")
    select.addEventListener("change", (e) => {
        select.focus()
        switch (e.target.value) {
            case "popularity":
                medias.sort((a, b) => b.likes - a.likes)
                break
            case "date":
                medias.sort((a, b) => new Date(a.date) - new Date(b.date))

                break
            case "title":
                medias.sort((a, b) =>
                    a.title > b.title ? 1 : b.title > a.title ? -1 : 0
                )

                break
            default:
                console.log("error")
                break
        }
        const photographMedias = document.querySelector(".photograph-medias")
        photographMedias.innerHTML = ""
        displayData(medias)
        likeInc(medias)
    })
}

function likeInc(medias) {
    const likeIcon = document.querySelectorAll(".heart")

    likeIcon.forEach((heart) => {
        heart.addEventListener("click", (e) => {
            const media = medias.find(
                (media) => media.id == e.target.dataset.id
            )
            if (media) {
                media.likes++
                heart.previousElementSibling.textContent = media.likes
            }

            likeSum(medias)
        })
    })
}

function likeSum(medias) {
    const likeCount = document.querySelector("#likeCount")
    let totalLikes = 0
    medias.forEach((media) => {
        totalLikes += media.likes
    })
    likeCount.textContent = totalLikes
}
