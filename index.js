const findBreweryForm = document.getElementById("find-brewery");
const locationButton = document.getElementById("location-button");
locationButton.addEventListener("click", getLocation);
findBreweryForm.addEventListener("submit", (e) => {
    e.preventDefault();
    if (document.getElementsByClassName("card") != undefined) {
        Array.from(document.getElementsByClassName("card")).forEach(card => card.remove())
    }
    console.log((document.getElementsByClassName("card")))
    const searchResult = findBrewery(e.target["find-brewery-input"].value);
    searchResult.then(foundBreweries => {
        return foundBreweries.forEach(brewery => showBrewery(brewery))
    });

});

function getLocation() {
    navigator.geolocation.getCurrentPosition(position => console.log(position.coords.latitude + " " + position.coords.longitude))
}

function findBrewery(input) {
    return fetch("https://api.openbrewerydb.org/breweries")
        .then(response => response.json())
        .then(breweries => {
            return breweries.filter(brewery => brewery.name.toLowerCase().includes(input.toLowerCase()));
        })
        .catch(error => console.log(error));
}

function showBrewery(brewery) {

    const card = document.createElement("div");
    card.className = "card";
    const breweryName = document.createElement("h4");
    breweryName.textContent = brewery.name;
    const city = document.createElement("h5");
    city.textContent = brewery.city;
    const state = document.createElement("h5");
    state.textContent = brewery.state;
    const address = document.createElement("p");
    address.textContent = brewery.address;

    document.querySelector("main").append(card);
    card.append(breweryName, city, state, address);
}