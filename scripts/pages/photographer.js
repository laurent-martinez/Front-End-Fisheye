let photographer
let mediasArray = []
let likesArray = []

// function who get the photographer's data by fetching & display photographer-header
async function getPhotographer(id) {
    await fetch(`data/photographers.json`)
        // fetching json files
        .then((response) => response.json())
        .then((data) => {
            // get the photographer id
            photographer = data.photographers.find((e) => e.id == id)

            if (photographer) {
                // target the dom
                const photographerHeader =
                    document.querySelector(".photograph-header")
                // create the html for photograph-header
                const photographerHeaderHtml = `<div><h1 id="photographer--name">${photographer.name}</h1>
                <div class="photographer--info">
                      <h2>${photographer.city}, ${photographer.country}</h2>
                      <h3>${photographer.tagline}</h3>
                </div>
                </div>
                <div>
                <button class="contact_button" aria-label="contact me" onclick="displayModal()" id="contact_form-btn">
                    Contactez-moi
                    </button>
                    </div>
                    <div>
                    <img id="photographer--pic"src="assets/photographers/${photographer.portrait}" alt="${photographer.name}"></div>
                    <footer tabindex="0">
                 <div>
                        <span id="likeCount">0</span>
                        <i class="fas fa-heart" alt="likes"></i>
                        </div>
                        <span class="total_prices">${photographer.price} € / jour</span>
                 
                </footer>
                `
                // inject in the Dom
                photographerHeader.innerHTML = photographerHeaderHtml
                const photographerName = document.querySelector(
                    "#contact_modal > div > form > header > h2"
                )
                photographerName.innerHTML += photographer.name
                // if the photographer is not found send back to homepage
            } else {
                window.location.href = `index.html`
            }
        })

    return {
        photographer,
    }
}
// create the url for the link between the first & second page
let url = new URL(window.location.href).searchParams
let id = url.get("id")
const photographerId = id
// call the function
getPhotographer(id)

// function to fetch all the medias of the photographer
async function getMedias(photographerId) {
    await fetch(`data/photographers.json`)
        .then((response) => response.json())
        .then((data) => {
            // target the medias of the photographer by his id
            let medias = data.media
                .filter((e) => e.photographerId == photographerId)
                .map((m) => MediaFactory(m))
            // call the others functions
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
        // new instance of MediaFactory class
        const mediaModel = MediaFactory(media)
        // use the getter for create the gallery
        const mediaCardDOM = mediaModel.getMediaCardDom()
        // injecting in the Dom
        photographMedias.appendChild(mediaCardDOM)
    })
    let lightbox = new Lightbox(medias)
    let links = document.querySelectorAll(".mediaLink")
    links.forEach((link) => {
        // for each media use the dataset.id to show the media selected on lightbox
        link.addEventListener("click", (e) => {
            lightbox.show(e.currentTarget.dataset.id)
        })
        link.addEventListener("keyup", (e) => {
            if (e.key === "Enter") {
                lightbox.show(e.currentTarget.dataset.id)
            }
        })
    })
}
