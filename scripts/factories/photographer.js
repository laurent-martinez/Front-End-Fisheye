export default function photographerFactory(data) {
    const { name, city, country, portrait, tagline, price } = data

    const picture = `../../assets/photographers/${portrait}`

    function getUserCardDOM() {
        const article = document.createElement("article")
        const img = document.createElement("img")
        img.setAttribute("src", picture)
        const h2 = document.createElement("h2")
        const h4 = document.createElement("h4")
        const p = document.createElement("p")
        const span = document.createElement("span")
        h4.textContent = `${city}, ${country}`
        h2.textContent = name
        p.textContent = tagline
        span.textContent = `${price}€/jour`
        article.appendChild(img)
        article.appendChild(h2)
        article.appendChild(h4)
        article.appendChild(p)
        article.appendChild(span)
        return article
    }
    return { name, picture, city, country, tagline, price, getUserCardDOM }
}
