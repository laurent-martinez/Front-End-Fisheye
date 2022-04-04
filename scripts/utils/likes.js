// function who increment one likes
function likeInc(medias) {
    // Dom
    const likeIcon = document.querySelectorAll(".heart")
    // forEach to target a heart
    likeIcon.forEach((heart) => {
        // addEventListener to increment the likes on click or keys
        heart.addEventListener("click", (e) => {
            // target the specific heart
            const media = medias.find(
                (media) => media.id == e.target.dataset.id
            )
            // if the heart is found increment the likes one time & inject in the p tag
            if (media) {
                media.likes++
                heart.previousElementSibling.textContent = media.likes
            }
            // call the function to increment as well in totalLikes
            likeSum(medias)
        })
    })
}

function likeSum(medias) {
    // Dom
    const likeCount = document.querySelector("#likeCount")
    // set totalLikes
    let totalLikes = 0
    // target the media & increment
    medias.forEach((media) => {
        totalLikes += media.likes
    })
    // inject in the Dom
    likeCount.textContent = totalLikes
    // add the aria-label for totalLikes info display
    const footer = document.querySelector("footer")
    footer.setAttribute(
        "aria-label",
        `this photographer have a total of ${totalLikes} likes`
    )
}
