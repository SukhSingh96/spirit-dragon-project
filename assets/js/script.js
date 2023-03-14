var homeLink = document.querySelector(".home-header");
var charactersLink = document.querySelector(".characters-header");
var compareLink = document.querySelector(".compare-header");
var searchForm = document.querySelector(".container-header-search");
var searchInput = document.querySelector(".container-header-search input");
var searchList = document.getElementById("search-list");

// Gets the home text element
var homeText = document.querySelector(".home-text"); 

// Hides certain elements by default
homeLink.style.display = "none";
searchForm.style.display = "none";

// Adds event listener to the characters link
charactersLink.addEventListener("click", () => {
  homeLink.style.display = "inline";
  charactersLink.style.display = "none";
  searchForm.style.display = "block";
});

// Adds event listener to the compare link
compareLink.addEventListener("click", () => {
  alert("Sorry, comparison feature is not available yet. Stay tuned!");
});

// Adds event listener to the home link
homeLink.addEventListener("click", () => {
  location.replace(location.href);
  homeLink.style.display = "none";
  charactersLink.style.display = "inline";
});

function searchCharacter(searchText) {
  if (!searchText.trim()) { // check if searchText is empty or only whitespace
    searchList.innerHTML = "";
    homeText.style.display = "block"; // show the home text element
    return;
  }
  const url = `https://www.superheroapi.com/api.php/2333600500149305/search/${searchText}`
  fetch(url)
    .then(response => response.json())
    .then((jsonData) => {
      const results = jsonData.results.map(element => {
        return {
          name: element.name,
          image: element.image.url
        }
      });
      renderResults(results);
      console.log(results);
    });
}

function renderResults(results) {
  if (results.length === 0) { // check if results is empty
    searchList.innerHTML = "";
    homeText.style.display = "block"; // show the home text element
    return;
  }
  homeText.style.display = "none"; // hide the home text element
  searchList.innerHTML = ""; // clear previous results
  results.slice(0, 3).forEach(result => {
    const searchElement = document.createElement("span");
    searchElement.innerText = result.name;

    const imageElement = document.createElement("img");
    imageElement.src = result.image;
    imageElement.style.width = "80px"; // set image width

    const buttonElement = document.createElement("button");
    buttonElement.appendChild(imageElement);
    buttonElement.appendChild(searchElement);

    buttonElement.addEventListener("click", () => {
      homeText.style.display = "none";
    });

    searchList.appendChild(buttonElement);
  });
}
searchInput.addEventListener("keyup", () => {
  searchCharacter(searchInput.value);
});

window.onload = () => {
  renderResults([]);
}; 

mapboxgl.accessToken = 'pk.eyJ1IjoiZ29kZGFyZGNvbGUiLCJhIjoiY2xmNXB3MWg4MDVlZjNwcW1ncXF5b3dncCJ9.0Ft4_LAHrAwshgLHvm4r0Q';

navigator.geolocation.getCurrentPosition(successLocation, errorLocation, {
    enableHighAccuracy: true
})

function successLocation(position) {
    console.log(position)
    setupMap([position.coords.longitude, position.coords.latitude])
}

function errorLocation() {
    setupMap([-2.24, 53.48])
}

function setupMap(center) {
const map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/streets-v11'
        })

        const nav = new mapboxgl.NavigationControl()
        map.addControl(nav)

        var directions = new MapboxDirections({
            accessToken: mapboxgl.accessToken
          });
          
          map.addControl(directions, 'top-left');
    }