class Media {
    constructor(data) {
        this.id = data.id
        this.photographerId = data.photographerId
        this.title = data.title
        this.likes = data.likes
        this.price = data.price
        this.date = data.date
        this.media = data.media
    }
    getMediaCardDom() {}
    getLightboxDom() {}
}

class Videos extends Media {
    constructor(data) {
        super({ ...data })
        this.video = data.video
    }

    getMediaCardDom() {
        // Création d'un nouvel élément a dans la page
        const a = document.createElement("a")
        const videos = `./assets/photographers/${this.video}`
        const video = document.createElement("video")
        const source = document.createElement("source")
        video.classList.add("mediaLink")
        video.setAttribute("data-id", this.id)
        source.setAttribute("src", videos)
        source.setAttribute("type", "video/mp4")
        const info = document.createElement("div")
        info.setAttribute("class", "photograph-info")
        const h2 = document.createElement("h2")
        h2.textContent = this.title
        const likes = document.createElement("div")
        likes.setAttribute("class", "photograph-likes")
        const likesNumber = document.createElement("p")
        likesNumber.textContent = this.likes
        likesNumber.setAttribute("class", "likesNumberin")
        const heart = document.createElement("button")
        heart.setAttribute("class", "heart")
        heart.setAttribute("data-id", this.id)
        a.appendChild(video)
        video.appendChild(source)
        a.appendChild(info)
        info.appendChild(h2)
        info.appendChild(likes)
        likes.appendChild(likesNumber)
        likes.appendChild(heart)

        return a
    }

    getLightboxDom() {
        return ` <video controls id="imgBox" src="./assets/photographers/${this.video}" 
        aria-label="${this.title}"/>
        <p class="titleCurrentImg" tabindex="0" aria-label="titre du média">${this.title}</p>`
    }
}

class Images extends Media {
    constructor(data) {
        super({ ...data })
        this.image = data.image
    }

    getMediaCardDom() {
        // Création d'un nouvel élément a dans la page
        const a = document.createElement("a")
        const images = `./assets/photographers/${this.image}`
        const image = document.createElement("img")
        image.setAttribute("src", images)
        image.classList.add("mediaLink")
        image.setAttribute("data-id", this.id)
        const info = document.createElement("div")
        info.classList.add("photograph-info")
        const h2 = document.createElement("h2")
        h2.textContent = this.title
        const likes = document.createElement("div")
        likes.classList.add("photograph-likes")
        const likesNumber = document.createElement("p")
        likesNumber.textContent = this.likes
        likesNumber.setAttribute("class", "likesNumberin")
        const heart = document.createElement("button")
        heart.setAttribute("class", "heart")
        heart.setAttribute("data-id", this.id)

        a.appendChild(image)
        a.appendChild(info)
        info.appendChild(h2)
        info.appendChild(likes)
        likes.appendChild(likesNumber)
        likes.appendChild(heart)

        return a
    }
    getLightboxDom() {
        return `
        <img id="imgBox" src="./assets/photographers/${this.image}" 
        aria-label="${this.title}"/>
        <p class="titleCurrentImg" tabindex="0" aria-label="titre du média">${this.title}</p>`
    }
}

function MediaFactory(media) {
    if ("video" in media) {
        return new Videos(media)
    } else {
        return new Images(media)
    }
}
