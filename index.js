const findBreweryForm = document.getElementById("find-brewery");
const locationButton = document.getElementById("location-button");
locationButton.addEventListener("click", getLocation);
findBreweryForm.addEventListener("submit", (e) => {
    e.preventDefault();
    findBrewery(e.target["find-brewery-input"].value)});

function getLocation() {
    navigator.geolocation.getCurrentPosition(position => console.log(position.coords.latitude + " " + position.coords.longitude))
} 

function findBrewery(input) {
  console.log(input);
}
