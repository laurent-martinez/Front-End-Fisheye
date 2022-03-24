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
                <button class="contact_button" onclick="displayModal()">
                    Contactez-moi
                    </button >
                    </div>
                    <div>
                    <img id="photographer--pic"src="assets/photographers/${photographer.portrait}" alt=""></div>
                    <footer>
                 <div>
                        <span id="likeCount">0</span>
                        <i class="fas fa-heart"></i>
                        </div>
                        <span class="total_prices">${photographer.price} € / jour</span>
                 
                </footer>
                `

                photographerHeader.innerHTML = photographerHeaderHtml
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
            likeSum()
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
        })
        link.addEventListener("keyup", (e) => {
            if (e.key === "Enter") {
                lightbox.show(e.currentTarget.dataset.id)
            }
        })
    })
    likeInc(medias)
}

function mediaFilter(medias) {
    const select = document.querySelector("#filterMedias")
    select.addEventListener("change", (e) => {
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
    })
}

function likeInc(medias) {
    const likeIcon = document.querySelectorAll(".heart")

    likeIcon.forEach((heart) => {
        heart.addEventListener("click", (e) => {
            let likesNumber = parseInt(heart.previousElementSibling.textContent)
            likesNumber++
            heart.previousElementSibling.textContent = likesNumber
            likeSum()
            const media = medias.find(
                (media) => media.id == e.target.dataset.id
            )
            if (media) {
                media.likes = likesNumber
                console.log(media.likes)
            }
        })
    })
}

function likeSum() {
    const likeIcon = document.querySelectorAll(".heart")
    const likeCount = document.querySelector("#likeCount")
    console.log(likeCount)
    let totalLikes = 0

    likeIcon.forEach((heart) => {
        const i = parseInt(heart.previousElementSibling.textContent)
        totalLikes += i
    })
    if (likeCount) {
        likeCount.textContent = totalLikes
    }
}
