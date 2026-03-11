// document.addEventListener('DOMContentLoaded', main)

document.getElementById("donde-estoy")?.addEventListener("click", updateLocation)

function updateLocation() {
    console.log("location")
    document.getElementById("estoy-eres").innerText = 'Your Location'
}