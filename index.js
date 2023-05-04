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
    navigator.geolocation.getCurrentPosition(position => {
        const userPosition = {
            userLat : position.coords.latitude,
            userLon : position.coords.longitude }})
            fetch("https://api.openbrewerydb.org/breweries")
            .then(response => response.json())
            .then(breweries => {
                breweries.forEach(brewery => {
                    //brewery.latitude
                    //brewery.latitude
                    const distArray = [];
                    const radLat1 = Math.PI * userPosition.userLat/180;
                    const radLat2 = Math.PI * userPosition.userLon/180;
                    const theta = brewery.longitude - userPosition.userLon;
                    const radTheta = Math.PI * theta/180;
                    const dist = Math.sin(radLat1) * Math.sin(radLat2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.cos(radTheta);
                    if (dist > 1) { dist = 1;}
                    dist = Math.acos(dist);
                    dist = dist * 180/Math.PI;
                    dist = dist * 60 * 1.1515; 
                    distArray.push(dist);
                })
    
    })
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
        } else {
            card.append(address, website);
        }
    })
}