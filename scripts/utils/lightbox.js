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
        if (index == this.listMedias.length - 1) {
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
        const prevImg = document.querySelector(".lightbox__prev")
        prevImg.addEventListener("click", () => {
            this.prev()
        })
        const closeBtn = document.querySelector(".lightbox__close")
        closeBtn.addEventListener("click", () => {
            this.close()
        })
    }

    getId(id) {
        return this.mediasArray.find((media) => media.id == id)
    }

    display() {
        /*
        const container = document.querySelector(".lightbox_container")
        const containerModel = MediaFactory(this.media)
        const containerDom = containerModel.getLightboxDom()
        container.appendChild(containerDom)*/
        document.querySelector(".lightbox").classList.add("show")
    }

    close() {
        document.querySelector(".lightbox").classList.remove("show")
    }
}
