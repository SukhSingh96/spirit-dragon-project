// API Key
const apiKey = "2333600500149305";

// DOM Elements
const hero1Form = document.getElementById("hero-1-form");
const hero2Form = document.getElementById("hero-2-form");
const hero1Input = hero1Form.querySelector(".hero-input");
const hero2Input = hero2Form.querySelector(".hero-input");
const hero1List = hero1Form.querySelector(".search-list");
const hero2List = hero2Form.querySelector(".search-list");
const comparisonContainer = document.getElementById("hero-comparison");
const refreshButton = document.querySelector(".refresh-button");

refreshButton.addEventListener("click", function() {
    window.location.reload();
  });

// Function to fetch heroes from API
async function fetchHeroes(query) {
    const response = await fetch(`https://www.superheroapi.com/api.php/${apiKey}/search/${query}`);
    const data = await response.json();
    return data.results;
}

function renderHeroesList(heroes, listContainer) {
    listContainer.innerHTML = "";
    const searchInput = document.createElement("input");
    searchInput.setAttribute("type", "text");
    searchInput.setAttribute("placeholder", "Search for a hero...");
    searchInput.classList.add("search-input");
    listContainer.appendChild(searchInput);
  
    const heroList = document.createElement("ul");
    heroList.classList.add("hero-list");
    listContainer.appendChild(heroList);
  
    heroes.slice(0, 6).forEach(hero => {
      const heroItem = document.createElement("li");
      heroItem.classList.add("hero-item");
      heroItem.setAttribute("data-name", hero.name);
  
      const heroImg = document.createElement("img");
      heroImg.src = hero.image.url;
      heroImg.alt = hero.name;
      heroImg.classList.add("hero-img-small");
      heroImg.style.width = "50px";
      heroItem.appendChild(heroImg);
  
      const heroName = document.createElement("span");
      heroName.innerText = hero.name;
      heroName.style.fontSize = "15px"
      heroItem.appendChild(heroName);
  
      heroList.appendChild(heroItem);
    });
  
    const heroItems = listContainer.querySelectorAll(".hero-item");
  
    searchInput.addEventListener("input", () => {
      const searchTerm = searchInput.value.toLowerCase();
      heroItems.forEach(item => {
        const name = item.getAttribute("data-name").toLowerCase();
        if (name.includes(searchTerm)) {
          item.style.display = "block";
        } else {
          item.style.display = "none";
        }
      });
    });
  
    heroItems.forEach(item => {
      item.addEventListener("click", async () => {
        const heroName = item.getAttribute("data-name");
        const hero = heroes.find(h => h.name === heroName);
        const heroImg = document.createElement("img");
        heroImg.src = hero.image.url;
        heroImg.alt = hero.name;
        heroImg.classList.add("hero-img");
        heroImg.style.width = "400px"
        heroImg.style.marginLeft = "57px";
        const heroStats = document.createElement("div");
        heroStats.classList.add("hero-stats");
        heroStats.innerHTML = `
          <h1>${hero.name}</h1>
          <p>Intelligence: ${hero.powerstats.intelligence}</p>
          <p>Strength: ${hero.powerstats.strength}</p>
          <p>Speed: ${hero.powerstats.speed}</p>
          <p>Durability: ${hero.powerstats.durability}</p>
          <p>Power: ${hero.powerstats.power}</p>
          <p>Combat: ${hero.powerstats.combat}</p>
        `;
        const heroElement = document.createElement("div");
        heroElement.classList.add("hero");
        heroElement.appendChild(heroImg);
        heroElement.appendChild(heroStats);
        comparisonContainer.appendChild(heroElement);
        listContainer.style.display = "none";
        heroStats.style.paddingTop = "20px";
        heroStats.style.marginLeft = "70px"
        heroStats.style.textAlign = "center";
      });
    });
  }

hero1Input.addEventListener("keyup", async () => {
    const query = hero1Input.value.trim();
    if (query) {
        const heroes = await fetchHeroes(query);
        renderHeroesList(heroes, hero1List);
    } else {
        hero1List.innerHTML = "";
    }
});

hero2Input.addEventListener("keyup", async () => {
    const query = hero2Input.value.trim();
    if (query) {
        const heroes = await fetchHeroes(query);
        renderHeroesList(heroes, hero2List);
    } else {
        hero2List.innerHTML = "";
    }
});

// Function to compare heroes powerstats
function comparePowerstats(hero1, hero2) {
    const hero1Stats = hero1.powerstats;
    const hero2Stats = hero2.powerstats;
    let hero1Wins = 0;
    let hero2Wins = 0;
    for (const stat in hero1Stats) {
        if (hero1Stats[stat] > hero2Stats[stat]) {
            hero1Wins++;
        } else if (hero1Stats[stat] < hero2Stats[stat]) {
            hero2Wins++;
        }
    }
    let result;
    if (hero1Wins > hero2Wins) {
        result = `${hero1.name} wins!`;
    } else if (hero1Wins < hero2Wins) {
        result = `${hero2.name} wins!`;
    } else {
        result = "It's a tie!";
    }
    const resultElement = document.createElement("div");
    resultElement.classList.add("comparison-result");
    resultElement.innerText = result;
    comparisonContainer.appendChild(resultElement);
}

// Event Listeners
hero1Form.addEventListener("submit", async e => {
    e.preventDefault();
    const query = hero1Input.value.trim();
    if (query) {
        const heroes = await fetchHeroes(query);
        renderHeroesList(heroes, hero1List);
    }
});

hero2Form.addEventListener("submit", async e => {
    e.preventDefault();
    const query = hero2Input.value.trim();
    if (query) {
        const heroes = await fetchHeroes(query);
        renderHeroesList(heroes, hero2List);
    }
});

// Logic Event Listener for comparison container
comparisonContainer.addEventListener("click", e => {
    if (e.target.classList.contains("hero-img")) {
        const heroElements = comparisonContainer.querySelectorAll(".hero");
        if (heroElements.length === 2) {
            const hero1 = heroElements[0].querySelector(".hero-stats").parentNode.querySelector(".hero-img").alt;
            const hero2 = heroElements[1].querySelector(".hero-stats").parentNode.querySelector(".hero-img").alt;
            const heroes = JSON.parse(localStorage.getItem("heroes"));
            const hero1Obj = heroes.find(hero => hero.name === hero1);
            const hero2Obj = heroes.find(hero => hero.name === hero2);
            comparePowerstats(hero1Obj, hero2Obj);
        }
    }
});
