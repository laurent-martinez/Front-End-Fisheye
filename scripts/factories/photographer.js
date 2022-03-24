/*export default function photographerFactory(data) {
    const { name, city, country, portrait, tagline, price } = data

    const picture = `${location.href}assets/photographers/${portrait}`

    function getUserCardDOM() {
        const a = document.createElement("a")
        a.setAttribute("href", `${location.href}photographer.html`)
        const img = document.createElement("img")
        img.setAttribute("src", picture)
        img.setAttribute("alt", `${name} photo`)
        const h2 = document.createElement("h2")
        const h3 = document.createElement("h3")
        const h4 = document.createElement("h4")
        const h5 = document.createElement("h5")
        h3.textContent = `${city}, ${country}`
        h2.textContent = name
        h4.textContent = tagline
        h5.textContent = `${price}€/jour`
        a.appendChild(img)
        a.appendChild(h2)
        a.appendChild(h3)
        a.appendChild(h4)
        a.appendChild(h5)
        return a
    }
    return { name, picture, city, country, tagline, price, getUserCardDOM }
}
*/
export default class Photographer {
    constructor(data) {
        this.name = data.name
        this.id = data.id
        this.city = data.city
        this.country = data.country
        this.tagline = data.tagline
        this.price = data.price
        this.portrait = data.portrait
    }

    getUserCardDOM() {
        // Création d'un nouvel élément a dans la page
        const a = document.createElement("a")
        const link = document.createElement("div")
        link.setAttribute("tabindex", "0")
        link.setAttribute("aria-label", `${this.name}`)
        link.classList.add("photographer-link")
        // J'écoute l'évènement click de l'élément a créé pour rediriger vers sa page individuelle
        link.addEventListener("click", () => {
            window.location.href = `photographer.html?id=${this.id}`
        })
        link.addEventListener("keyup", (e) => {
            if (e.key === "Enter") {
                window.location.href = `photographer.html?id=${this.id}`
            }
        })
        // Création de chaque élément qui récupère les données de  chaque photographe

        const picture = `../assets/photographers/${this.portrait}`
        const img = document.createElement("img")
        img.setAttribute("src", picture)
        const h2 = document.createElement("h2")
        h2.textContent = this.name
        const h3 = document.createElement("h3")
        h3.textContent = this.city + ", " + this.country
        const h4 = document.createElement("h4")
        h4.textContent = this.tagline
        const h5 = document.createElement("h5")
        h5.textContent = this.price + "€/jour"
        link.appendChild(img)
        link.appendChild(h2)
        a.appendChild(link)
        a.appendChild(h3)
        a.appendChild(h4)
        a.appendChild(h5)
        return a
    }
    /*
    getPhotographerDom() {
        const photographerHeader = document.querySelector(".photograph-header")
        const photographerName = document.createElement("h1")
        photographerName.textContent = this.name

        const photographerLocation = document.createElement("h2")
        photographerLocation.textContent = this.city + ", " + this.country

        const photographerTagline = document.createElement("h3")
        photographerTagline.textContent = this.tagline

        const picture = `assets/photographers/${this.portrait}`
        const photographerPic = document.createElement("img")
        photographerPic.setAttribute("src", picture)

        photographerHeader.insertBefore(photographerName, button)
        photographerHeader.insertBefore(photographerLocation, button)
        photographerHeader.insertBefore(photographerTagline, button)
        photographerHeader.appendChild(photographerPic)
        return photographerHeader
    }
    */
}
