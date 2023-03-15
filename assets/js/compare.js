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

// Function to fetch heroes from API
async function fetchHeroes(query) {
    const response = await fetch(`https://www.superheroapi.com/api.php/${apiKey}/search/${query}`);
    const data = await response.json();
    return data.results;
}

function renderHeroesList(heroes, listContainer) {
    listContainer.innerHTML = "";
    heroes.slice(0, 3).forEach(hero => {
        const heroButton = document.createElement("button");
        heroButton.classList.add("search-button");
        const heroImg = document.createElement("img");
        heroImg.src = hero.image.url;
        heroImg.alt = hero.name;
        heroImg.classList.add("hero-img-small");
        heroImg.style.width = "50px";
        heroButton.appendChild(heroImg);
        const heroName = document.createElement("span");
        heroName.innerText = hero.name;
        heroButton.appendChild(heroName);
        heroButton.addEventListener("click", async () => {
            const heroImg = document.createElement("img");
            heroImg.src = hero.image.url;
            heroImg.alt = hero.name;
            heroImg.classList.add("hero-img");
            const heroStats = document.createElement("div");
            heroStats.classList.add("hero-stats");
            heroStats.innerHTML = `
        <h2>${hero.name}</h2>
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
        });
        listContainer.appendChild(heroButton);
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

// Event Listener for comparison button
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
