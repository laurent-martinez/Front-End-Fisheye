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
        h3.setAttribute(
            "aria-label",
            `from${this.city} ${this.country}, work for ${this.price} euros a day`
        )
        h3.setAttribute("tabindex", "0")
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
}
