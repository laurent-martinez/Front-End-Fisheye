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
}

class Videos extends Media {
    constructor(data) {
        super({ ...data, media: data.video })
    }

    getMediaCardDom() {
        // Création d'un nouvel élément a dans la page
        const a = document.createElement("a")
        a.addEventListener("click", () => {
            window.location.href = ""
        })
        const videos = `assets/photographers/${this.media}`
        const video = document.createElement("video")
        const source = document.createElement("source")

        source.setAttribute("src", videos)
        source.setAttribute("type", "video/mp4")
        const info = document.createElement("div")
        info.setAttribute("class", "photograph-info")
        const h2 = document.createElement("h2")
        h2.textContent = this.title
        const likes = document.createElement("div")
        likes.setAttribute("class", "photograph-likes")
        const p = document.createElement("p")
        p.textContent = this.price
        const i = document.createElement("i")

        a.appendChild(video)
        video.appendChild(source)
        a.appendChild(info)
        info.appendChild(h2)
        info.appendChild(likes)
        likes.appendChild(p)
        likes.appendChild(i)
        i.setAttribute("class", "fa-solid fa-heart")
        return a
    }
}

class Images extends Media {
    constructor(data) {
        super({ ...data, media: data.image })
    }

    getMediaCardDom() {
        // Création d'un nouvel élément a dans la page
        const a = document.createElement("a")
        a.addEventListener("click", () => {
            window.location.href = ""
        })
        const images = `assets/photographers/${this.media}`
        const image = document.createElement("img")
        image.setAttribute("src", images)
        const info = document.createElement("div")
        info.classList.add("photograph-info")
        const h2 = document.createElement("h2")
        h2.textContent = this.title
        const likes = document.createElement("div")
        likes.classList.add("photograph-likes")
        const p = document.createElement("p")
        p.textContent = this.price
        const i = document.createElement("i")
        i.classList.add("fa-heart")
        a.appendChild(image)
        a.appendChild(info)
        info.appendChild(h2)
        info.appendChild(likes)
        likes.appendChild(p)
        likes.appendChild(i)

        return a
    }
}

function MediaFactory(media) {
    if ("video" in media) {
        return new Videos(media)
    } else {
        return new Images(media)
    }
}
