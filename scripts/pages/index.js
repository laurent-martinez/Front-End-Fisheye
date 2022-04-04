import Photographer from "../factories/photographer.js"

/* function to fetch the data of the json file */

async function getPhotographers() {
    let photographers = []
    await fetch(`data/photographers.json`)
        .then((response) => response.json())
        .then((data) => {
            photographers = data.photographers
        })

    return {
        photographers,
    }
}
/* function to show the photographers on the page */

function displayData(photographers) {
    // Dom
    const photographersSection = document.querySelector(".photographer_section")
    // forEach to work on each photographer
    photographers.forEach((photographer) => {
        // create an instance of the photographer class
        const photographerModel = new Photographer(photographer)
        // on this new class select the getter to show the dom
        const userCardDOM = photographerModel.getUserCardDOM()
        // use appenchild method to inject the photographers in the photographer_section
        photographersSection.appendChild(userCardDOM)
    })
}

async function init() {
    // get all the photographers
    const { photographers } = await getPhotographers()
    displayData(photographers)
}

init()
