const findBreweryForm = document.getElementById("find-brewery");
const locationButton = document.getElementById("location-button");
locationButton.addEventListener("click", showClosestBrewery);
findBreweryForm.addEventListener("submit", (e) => {
    e.preventDefault();
    if (document.getElementsByClassName("card") !== undefined) {
        Array.from(document.getElementsByClassName("card")).forEach(card => card.remove())
    }
    const searchResult = findBrewery(e.target["find-brewery-input"].value);
    searchResult
        .then(foundBreweries => { return foundBreweries.forEach(brewery => showBrewery(brewery)) });

});

function showClosestBrewery() {
    if (document.getElementsByClassName("card")) {
        Array.from(document.getElementsByClassName("card")).forEach(card => card.remove());
        if (document.querySelector("h4")) {
            document.querySelector("h4").remove();
        }
    }
    navigator.geolocation.getCurrentPosition(position => {
        const userPosition = {
            userLat: position.coords.latitude,
            userLon: position.coords.longitude
        }
        fetch("https://api.openbrewerydb.org/breweries")
            .then(response => response.json())
            .then(breweries => {
                const distArray = [];
                breweries.forEach(brewery => {
                    const radLat1 = Math.PI * userPosition.userLat / 180;
                    const radLat2 = Math.PI * brewery.latitude / 180;
                    const theta = brewery.longitude - userPosition.userLon;
                    const radTheta = Math.PI * theta / 180;
                    let dist = Math.sin(radLat1) * Math.sin(radLat2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.cos(radTheta);
                    if (dist > 1) { dist = 1; }
                    dist = Math.acos(dist);
                    dist = dist * 180 / Math.PI;
                    dist = dist * 60 * 1.1515;
                    return distArray.push(dist);
                })
                const closestBrewery = breweries[distArray.indexOf(Math.min(...distArray))];
                showBrewery(closestBrewery);
            })
            .catch(error => errorMessage() + error);
    },
        error => errorMessage() + error);

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
        .catch(error => errorMessage() + error);
}

function showBrewery(brewery) {

    const card = document.createElement("div");
    card.classList.add("card", "loaded");
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
        } else {
            card.append(address, website);
        }
    })
}

function errorMessage() {
    const errorMsg = document.createElement("h4");
    errorMsg.textContent = "Sorry, no beer for ya :(";
    document.querySelector("main").append(errorMsg);
}