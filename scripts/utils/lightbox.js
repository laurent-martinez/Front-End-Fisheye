class Lightbox {
    constructor(mediasArray) {
        this.currentMedia
        this.mediasArray = mediasArray
        this.manageEvent()
    }

    show(id) {
        this.currentMedia = this.getId(id)
        this.display()
    }

    next() {
        const index = this.mediasArray.findIndex(
            (element) => element.id == this.currentMedia.id
        )
        if (index == this.mediasArray.length - 1) {
            this.currentMedia = this.mediasArray[0]
        } else {
            this.currentMedia = this.mediasArray[index + 1]
        }
        this.display()
    }

    prev() {
        const index = this.mediasArray.findIndex(
            (element) => element.id == this.currentMedia.id
        )
        if (index == 0) {
            this.currentMedia = this.mediasArray[this.mediasArray.length - 1]
        } else {
            this.currentMedia = this.mediasArray[index - 1]
        }
        this.display()
    }

    manageEvent() {
        const nextImg = document.querySelector(".lightbox__next")
        nextImg.addEventListener("click", () => {
            this.next()
        })
        document.addEventListener("keyup", (e) => {
            if (e.key === "ArrowRight") {
                this.next(e)
            }
        })
        const prevImg = document.querySelector(".lightbox__prev")
        prevImg.addEventListener("click", () => {
            this.prev()
        })
        document.addEventListener("keyup", (e) => {
            if (e.key === "ArrowLeft") {
                this.prev(e)
            }
        })
        const closeBtn = document.querySelector(".lightbox__close")
        closeBtn.addEventListener("click", () => {
            this.close()
        })
        document.addEventListener("keyup", (e) => {
            if (e.key === "Escape") {
                this.close(e)
            }
        })
    }

    getId(id) {
        return this.mediasArray.find((media) => media.id == id)
    }

    display() {
        const gallery = document.querySelector("#main > div.photograph-medias")
        gallery.style.display = "none"
        const logo = document.querySelector("body > header > a")
        logo.style.display = "none"
        const contactButton = document.querySelector("#contact_form-btn")
        contactButton.style.display = "none"
        /*
        const sort = document.querySelector("#filterMedias > h3")
        sort.style.display = "none"*/
        const container = document.querySelector(".lightbox__container")
        container.setAttribute("aria-hidden", "false")
        const containerModel = MediaFactory(this.currentMedia)
        const containerDom = containerModel.getLightboxDom()
        container.innerHTML = containerDom
        document.querySelector(".lightbox").classList.add("show")
    }

    close() {
        const gallery = document.querySelector("#main > div.photograph-medias")
        gallery.style.display = "flex"
        const logo = document.querySelector("body > header > a")
        logo.style.display = "unset"
        const contactButton = document.querySelector("#contact_form-btn")
        contactButton.style.display = "unset"
        /*
        const sort = document.querySelector("#filterMedias > h3")
        sort.style.display = "flex"*/
        const container = document.querySelector(".lightbox__container")
        container.setAttribute("aria-hidden", "true")
        document.querySelector(".lightbox").classList.remove("show")
    }
}
