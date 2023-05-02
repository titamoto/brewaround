const findBrewery = document.getElementById("find-brewery");
const locationButton = document.getElementById("location-button")
locationButton.addEventListener("click", getLocation)

function getLocation() {
    navigator.geolocation.getCurrentPosition(position => console.log(position.coords.latitude + " " + position.coords.longitude))
}