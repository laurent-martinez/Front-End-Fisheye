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
        const container = document.querySelector(".lightbox__container")
        /*
        

        const containerModel = MediaFactory(this.currentMedia)

        const containerDom = containerModel.getLightboxDom()
        container.appendChild(containerDom)

        console.log(this.currentMedia)
        */
        if (this.currentMedia.video) {
            container.innerHTML = ` <video controls id="imgBox" src="assets/photographers/${this.currentMedia.video}" 
           aria-label="${this.currentMedia.title}"/>
           <p class="titleCurrentImg" tabindex="0" aria-label="titre du média">${this.currentMedia.title}</p>`
        } else {
            container.innerHTML = `
            <img id="imgBox" src="assets/photographers/${this.currentMedia.image}" 
            aria-label="${this.currentMedia.title}"/>
            <p class="titleCurrentImg" tabindex="0" aria-label="titre du média">${this.currentMedia.title}</p>`
        }
        document.querySelector(".lightbox").classList.add("show")
    }

    close() {
        document.querySelector(".lightbox").classList.remove("show")
    }
}
