// Dom
const selector = document.querySelector(".custom-selector")

// add listener, the custom select only display on mouse event
selector.addEventListener("mousedown", (e) => {
    e.preventDefault()
    // target the select
    const select = selector.children[0]
    console.log(select)
    // create a ul
    const dropdown = document.createElement("ul")
    // add the class
    dropdown.className = "selector-options"
    // copy the select in an array to use forEach
    ;[...select.children].forEach((option) => {
        // for each option create a li
        const dropdownOption = document.createElement("li")
        // copy the text of option into the li
        dropdownOption.textContent = option.textContent
        // inject in the Dom
        dropdown.appendChild(dropdownOption)
        // add class
        dropdownOption.className = "selector-option"
        // listener on the option who change commonly value between custom & regular select tag
        dropdownOption.addEventListener("mousedown", (e) => {
            e.stopPropagation()
            select.value = option.value
            selector.value = option.value
            select.dispatchEvent(new Event("change"))
            selector.dispatchEvent(new Event("change"))
            // remove the option from the Dom when one is selected
            dropdown.remove()
        })
    })

    selector.appendChild(dropdown)
    //handle click out
    document.addEventListener("click", (e) => {
        if (!selector.contains(e.target)) {
            dropdown.remove()
        }
    })
})

function mediaFilter(medias) {
    const select = document.querySelector("#filterMedias")
    select.addEventListener("change", (e) => {
        select.focus()
        switch (e.target.value) {
            case "popularity":
                medias.sort((a, b) => b.likes - a.likes)
                break
            case "date":
                medias.sort((a, b) => new Date(a.date) - new Date(b.date))

                break
            case "title":
                medias.sort((a, b) =>
                    a.title > b.title ? 1 : b.title > a.title ? -1 : 0
                )

                break
            default:
                console.log("error")
                break
        }
        const photographMedias = document.querySelector(".photograph-medias")
        photographMedias.innerHTML = ""
        displayData(medias)
        likeInc(medias)
    })
}
