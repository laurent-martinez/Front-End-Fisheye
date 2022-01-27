export default function photographerFactory(data) {
    const { name, city, country, portrait, tagline, price } = data

    const picture = `../../assets/photographers/${portrait}`

    function getUserCardDOM() {
        const article = document.createElement("article")
        const img = document.createElement("img")
        img.setAttribute("src", picture)
        img.setAttribute("alt", `${name} photo`)
        const h2 = document.createElement("h2")
        const h3 = document.createElement("h3")
        const h4 = document.createElement("h4")
        const p = document.createElement("p")
        h3.textContent = `${city}, ${country}`
        h2.textContent = name
        h4.textContent = tagline
        p.textContent = `${price}€/jour`
        article.appendChild(img)
        article.appendChild(h2)
        article.appendChild(h3)
        article.appendChild(h4)
        article.appendChild(p)
        return article
    }
    return { name, picture, city, country, tagline, price, getUserCardDOM }
}
