var homeLink = document.querySelector(".home-header");
var charactersLink = document.querySelector(".characters-header");
var compareLink = document.querySelector(".compare-header");
var searchForm = document.querySelector(".container-header-search");
var searchInput = document.querySelector(".container-header-search input");
var searchList = document.getElementById("search-list");

const allTabsBody = document.querySelectorAll('.tab-body-single');
const allTabsHead = document.querySelectorAll('.tab-head-single');
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

  // search form submission
searchForm.addEventListener('submit', getInputValue);
}; 


//end of westjs
let activeTab = 1, allData;

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

// even listeners
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
searchList.addEventListener('click', (event) => {
    let searchId = event.target.dataset.id;
    let singleData = allData.results.filter(singleData => {
        return searchId === singleData.id;
    })
    showSuperheroDetails(singleData);
    searchList.innerHTML = "";
});
const showSuperheroDetails = (data) => {
    console.log(data);
    document.querySelector('.app-body-content-thumbnail').innerHTML = 
        <img src = "${data[0].image.url}"></img>
    ;

    document.querySelector('.name').textContent = data[0].name;
    document.querySelector('.powerstats').innerHTML = `
    <li>
        <div>
            <i class = "fa-solid fa-shield-halved"></i>
            <span>intelligence</span>
        </div>
        <span>${data[0].powerstats.intelligence}</span>
    </li>
    <li>
        <div>
            <i class = "fa-solid fa-shield-halved"></i>
            <span>strength</span>
        </div>
        <span>${data[0].powerstats.strength}</span>
    </li>
    <li>
        <div>
            <i class = "fa-solid fa-shield-halved"></i>
            <span>speed</span>
        </div>
        <span>${data[0].powerstats.speed}</span>
    </li>
    <li>
        <div>
            <i class = "fa-solid fa-shield-halved"></i>
            <span>durability</span>
        </div>
        <span>${data[0].powerstats.durability}</span>
    </li>
    <li>
        <div>
            <i class = "fa-solid fa-shield-halved"></i>
            <span>power</span>
        </div>
        <span>${data[0].powerstats.power}</span>
    </li>
    <li>
        <div>
            <i class = "fa-solid fa-shield-halved"></i>
            <span>combat</span>
        </div>
        <span>${data[0].powerstats.combat}</span>
    </li>
    `;

    document.querySelector('.biography').innerHTML = `
    <li>
        <span>full name</span>
        <span>${data[0].biography['full-name']}</span>
    </li>
    <li>
        <span>alert-egos</span>
        <span>${data[0].biography['alter-egos']}</span>
    </li>
    <li>
        <span>aliases</span>
        <span>${data[0].biography['aliases']}</span>
    </li>
    <li>
        <span>place-of-birth</span>
        <span>${data[0].biography['place-of-birth']}</span>
    </li>
    <li>
        <span>first-apperance</span>
        <span>${data[0].biography['first-appearance']}</span>
    </li>
    <li>
        <span>publisher</span>
        <span>${data[0].biography['publisher']}</span>
    </li>
    ;

    document.querySelector('.appearance').innerHTML = 
    <li>
        <span>
            <i class = "fas fa-star"></i> gender
        </span>
        <span>${data[0].appearance['gender']}</span>
    </li>
    <li>
        <span>
            <i class = "fas fa-star"></i> race
        </span>
        <span>${data[0].appearance['race']}</span>
    </li>
    <li>
        <span>
            <i class = "fas fa-star"></i> height
        </span>
        <span>${data[0].appearance['height'][0]}</span>
    </li>
    <li>
        <span>
            <i class = "fas fa-star"></i> weight
        </span>
        <span>${data[0].appearance['weight'][0]}</span>
    </li>
    <li>
        <span>
            <i class = "fas fa-star"></i> eye-color
        </span>
        <span>${data[0].appearance['eye-color']}</span>
    </li>
    <li>
        <span>
            <i class = "fas fa-star"></i> hair-color
        </span>
        <span>${data[0].appearance['hair-color']}</span>
    </li>
    `;

    document.querySelector('.connections').innerHTML = `
    <li>
        <span>group--affiliation</span>
        <span>${data[0].connections['group-affiliation']}</span>
    </li>
    <li>
        <span>relatives</span>
        <span>${data[0].connections['relatives']}</span>
    </li>
    ;
}