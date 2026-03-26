// document.addEventListener('DOMContentLoaded', main)

document.getElementById("donde-estoy")?.addEventListener("click", updateLocation)

function updateLocation() {
    console.log("udpate loaction")
    navigator.geolocation.getCurrentPosition((pos) => console.log(pos))
}

// todo: 
// check geolocation access enabled, high accuracy enabled, etc.
// watch, get a map behind and draw radius
// add a travel mode where mouse pointer moves geolocation