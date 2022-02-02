export default function photographerFactory(data) {
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
