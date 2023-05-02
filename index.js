const findBreweryForm = document.getElementById("find-brewery");
const locationButton = document.getElementById("location-button");
locationButton.addEventListener("click", getLocation);
findBreweryForm.addEventListener("submit", (e) => {
    e.preventDefault();
    findBrewery(e.target["find-brewery-input"].value)
});

function getLocation() {
    navigator.geolocation.getCurrentPosition(position => console.log(position.coords.latitude + " " + position.coords.longitude))
}

function findBrewery(input) {
    fetch("https://api.openbrewerydb.org/breweries")
        .then(response => response.json())
        .then(breweries => breweries.filter(brewery => showBrewery(brewery)));
}

function showBrewery(brewery) {
    const card = document.createElement("span");
    card.className = "card";
    const breweryName = document.createElement("h4");
    breweryName.textContent = brewery.name;
    const city = document.createElement("h5");
    city.textContent = brewery.city;
    const state = document.createElement("h6");
    state.textContent = brewery.state;
    const address = document.createElement("p");
    address.textContent = brewery.address;

    card.append(breweryName, city, state, address);
    document.append(card);
    
}