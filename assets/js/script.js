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
    searchList.innerHTML = ""; // clear previous results
    results.forEach(result => {
      const searchElement = document.createElement("li");
      searchElement.innerText = result.name;
      
      const imageElement = document.createElement("img");
      imageElement.src = result.image;
      imageElement.style.width = "50px"; // set image width
      
      const listItemElement = document.createElement("div");
      listItemElement.appendChild(imageElement);
      listItemElement.appendChild(searchElement);
      
      listItemElement.addEventListener("click", () => {
          // do something when list item is clicked
          console.log(`You clicked on ${result.name}`);
      });
      
      searchList.appendChild(listItemElement);
    });
  }
searchInput.addEventListener("keyup", () => {
    searchCharacter(searchInput.value);
});

window.onload = () => {
    renderResults([]);
};