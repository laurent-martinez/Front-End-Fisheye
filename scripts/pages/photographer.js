let photographer
let mediasArray = []
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
                <button class="contact_button"id="center" >
                    Contactez-moi
                    </button >
                    <img id="photographer--pic"src="assets/photographers/${photographer.portrait}" alt="">
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
    })
}

function mediaFilter(medias) {
    const select = document.querySelector("#filterMedias")
    select.addEventListener("change", (e) => {
        switch (e.target.value) {
            case "popularity":
                medias.sort((a, b) => b.likes - a.likes)
                break
            case "date":
                medias.sort((a, b) => new Date(a.likes) - new Date(b.likes))

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
console.log(mediasArray)
