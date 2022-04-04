class Lightbox {
    constructor(mediasArray) {
        this.currentMedia
        this.mediasArray = mediasArray
        this.manageEvent()
    }

    show(id) {
        // get the id & show the media
        this.currentMedia = this.getId(id)
        this.display()
    }

    next() {
        // get the index & use it for going to next media
        const index = this.mediasArray.findIndex(
            (element) => element.id == this.currentMedia.id
        )
        if (index == this.mediasArray.length - 1) {
            // when it's the last media going back to the first one
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
        // add addEvent Listener to browse the lightbox through click or keys
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
        // Dom
        const gallery = document.querySelector("#main > div.photograph-medias")
        const logo = document.querySelector("body > header > a")
        const contactButton = document.querySelector("#contact_form-btn")
        const sort = document.querySelector("select")
        const footer = document.querySelector("footer")
        const container = document.querySelector(".lightbox__container")
        // display none to focus on the lightbox
        gallery.style.display = "none"
        logo.style.display = "none"
        contactButton.style.display = "none"
        sort.style.display = "none"
        footer.style.display = "none"
        container.setAttribute("aria-hidden", "false")
        // instance the MediaFactory class with a specific media
        const containerModel = MediaFactory(this.currentMedia)
        // use the getter including the Dom
        const containerDom = containerModel.getLightboxDom()
        // inject it in the Dom
        container.innerHTML = containerDom
        // add the class show to display the lightbox
        document.querySelector(".lightbox").classList.add("show")
    }

    close() {
        // Dom
        const gallery = document.querySelector("#main > div.photograph-medias")
        const logo = document.querySelector("body > header > a")
        const contactButton = document.querySelector("#contact_form-btn")
        const sort = document.querySelector("select")
        const footer = document.querySelector("footer")
        const container = document.querySelector(".lightbox__container")
        // display again all the element
        gallery.style.display = "flex"
        logo.style.display = "unset"
        contactButton.style.display = "unset"
        sort.style.display = "inline-block"
        footer.style.display = "flex"
        container.setAttribute("aria-hidden", "true")
        // remove the class show to hide the lightbox
        document.querySelector(".lightbox").classList.remove("show")
    }
}
