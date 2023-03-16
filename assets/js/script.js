const homeLink = document.querySelector(".home-header");
const allTabsBody = document.querySelectorAll('.tab-body-single');
const allTabsHead = document.querySelectorAll('.tab-head-single');
const searchForm = document.querySelector('.app-header-search');
let searchList = document.getElementById('search-list');
const mapContainer = document.querySelector('.map-container')
let activeTab = 1, allData;

// Gets the home text element
var homeText = document.querySelector(".home-text");

homeLink.style.display = "none";
homeLink.addEventListener("click", () => {
    location.replace(location.href);
    homeLink.style.display = "none";
});

const init = () => {
    showActiveTabBody();
    showActiveTabHead();
}

const showActiveTabHead = () => allTabsHead[activeTab - 1].classList.add('active-tab');

const showActiveTabBody = () => {
    hideAllTabBody();
    allTabsBody[activeTab - 1].classList.add('show-tab');
}

const hideAllTabBody = () => allTabsBody.forEach(singleTabBody => singleTabBody.classList.remove('show-tab'));
const hideAllTabHead = () => allTabsHead.forEach(singleTabHead => singleTabHead.classList.remove('active-tab'));

// event listeners
window.addEventListener('DOMContentLoaded', () => init());
// button event listeners
allTabsHead.forEach(singleTabHead => {
    singleTabHead.addEventListener('click', () => {
        hideAllTabHead();
        activeTab = singleTabHead.dataset.id;
        showActiveTabHead();
        showActiveTabBody();
    });
});

const getInputValue = (event) => {
    event.preventDefault();
    let searchText = searchForm.search.value;
    fetchAllSuperHero(searchText);
}

// search form submission
searchForm.addEventListener('submit', getInputValue);

const fetchAllSuperHero = async (searchText) => {
    let url = `https://www.superheroapi.com/api.php/2333600500149305/search/${searchText}`;
    try {
        const response = await fetch(url);
        allData = await response.json();
        if (allData.response === 'success') {
            showSearchList(allData.results);
        }
    } catch (error) {
        console.log(error);
    }
}

const showSearchList = (data) => {
    searchList.innerHTML = "";
    data.forEach(dataItem => {
        const divElem = document.createElement('div');
        divElem.classList.add('search-list-item');
        divElem.innerHTML = `
            <img src = "${dataItem.image.url ? dataItem.image.url : ""}" alt = "">
            <p data-id = "${dataItem.id}">${dataItem.name}</p>
        `;
        searchList.appendChild(divElem);
    });
}

searchForm.search.addEventListener('keyup', () => {
    if (searchForm.search.value.length > 1) {
        fetchAllSuperHero(searchForm.search.value);
    } else {
        searchList.innerHTML = "";
    }
});

searchList.addEventListener('click', (event) => {
    let searchId = event.target.dataset.id;
    let singleData = allData.results.filter(singleData => {
        return searchId === singleData.id;
    })
    showSuperheroDetails(singleData);
    searchList.innerHTML = "";
    homeText.style.display = "none";
    homeLink.style.display = "inline";
    mapContainer.style.display = "none";
    document.querySelector('.app-body').style.display = "";
});

const showSuperheroDetails = (data) => {
    console.log(data);
    document.querySelector('.app-body-content-img').innerHTML = `
        <img src = "${data[0].image.url}">
    `;

    document.querySelector('.name').textContent = data[0].name;

    document.querySelector('.biography').innerHTML = `
    <li>
        <span>full name: </span>
        <span>${data[0].biography['full-name']}</span>
    </li>
    <li>
        <span>alert-egos: </span>
        <span>${data[0].biography['alter-egos']}</span>
    </li>
    <li>
        <span>aliases: </span>
        <span>${data[0].biography['aliases']}</span>
    </li>
    <li>
        <span>place-of-birth: </span>
        <span>${data[0].biography['place-of-birth']}</span>
    </li>
    <li>
        <span>first-apperance: </span>
        <span>${data[0].biography['first-appearance']}</span>
    </li>
    <li>
        <span>publisher: </span>
        <span>${data[0].biography['publisher']}</span>
    </li>
    `;

    document.querySelector('.appearance').innerHTML = `
    <li>
        <span>
        gender
        </span>
        <span>${data[0].appearance['gender']}</span>
    </li>
    <li>
        <span>
        race
        </span>
        <span>${data[0].appearance['race']}</span>
    </li>
    <li>
        <span>
        height
        </span>
        <span>${data[0].appearance['height'][0]}</span>
    </li>
    <li>
        <span>
        weight
        </span>
        <span>${data[0].appearance['weight'][0]}</span>
    </li>
    <li>
        <span>
        eye-color
        </span>
        <span>${data[0].appearance['eye-color']}</span>
    </li>
    <li>
        <span>
        hair-color
        </span>
        <span>${data[0].appearance['hair-color']}</span>
    </li>
    `;

    document.querySelector('.relationships').innerHTML = `
    <li>
    <span>relatives</span>
    <span>${data[0].connections['relatives']}</span>
   </li>
   <li>
    <span>group-affiliation</span>
    <span>${data[0].connections['group-affiliation']}</span>
   </li>
`;

    document.querySelector('.work').innerHTML = `
    <li>
        <span>Morals: </span>
        <span>${data[0].biography['alignment']}
      </li>
    <li>
        <span>occupation: </span>
        <span>${data[0].work['occupation']}</span>
      </li>
    <li>
        <span>base of operation: </span>
        <span>${data[0].work['base']}</span>
      </li>
    `;
}

mapboxgl.accessToken =
  "pk.eyJ1IjoiZ29kZGFyZGNvbGUiLCJhIjoiY2xmNXB3MWg4MDVlZjNwcW1ncXF5b3dncCJ9.0Ft4_LAHrAwshgLHvm4r0Q"

navigator.geolocation.getCurrentPosition(successLocation, errorLocation, {
  enableHighAccuracy: true
})

function successLocation(position) {
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
  })

  map.addControl(directions);
}
