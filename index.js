const findBreweryForm = document.getElementById("find-brewery");
const locationButton = document.getElementById("location-button");
locationButton.addEventListener("click", getLocation);
findBreweryForm.addEventListener("submit", (e) => {
    e.preventDefault();
    if (document.getElementsByClassName("card") !== undefined) {
        Array.from(document.getElementsByClassName("card")).forEach(card => card.remove())
    }
    const searchResult = findBrewery(e.target["find-brewery-input"].value);
    searchResult
        .then(foundBreweries => { return foundBreweries.forEach(brewery => showBrewery(brewery)) });

});

function getLocation() {
    navigator.geolocation.getCurrentPosition(position => console.log(position.coords.latitude + " " + position.coords.longitude))
}

function findBrewery(input) {
    return fetch("https://api.openbrewerydb.org/breweries")
        .then(response => response.json())
        .then(breweries => {
            return breweries.filter(brewery => {
                if (document.getElementById("by-name").checked) {
                    return brewery.name.toLowerCase().includes(input.toLowerCase())
                }
                else if (document.getElementById("by-city").checked) {
                    return brewery.city.toLowerCase().includes(input.toLowerCase())
                }
                else if (document.getElementById("by-state").checked) {
                    return brewery.state.toLowerCase().includes(input.toLowerCase())
                }
            });

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
    
    document.querySelector("main").append(card);
    card.append(breweryName, city, state);

    const address = document.createElement("p");
    address.textContent = brewery.address_1;
    const website = document.createElement("a");
    website.textContent = brewery.website_url;
    website.href = brewery.website_url;
    website.target = "_blank";

    card.addEventListener('click', () => {
        if (card.querySelector('a') != undefined || card.querySelector('p') != undefined) {
            card.querySelector('a').remove();
            card.querySelector('p').remove();
            console.log("there are a and p")   
        } else {
        card.append(address, website); }
    })
}