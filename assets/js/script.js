var homeLink = document.querySelector(".home-header");
var charactersLink = document.querySelector(".characters-header");
var compareLink = document.querySelector(".compare-header");
var characterInput = document.querySelector(".form");

// Gets the home text element
var homeText = document.querySelector(".home-text");

// Hides certian elements by default
homeLink.style.display = "none";
characterInput.style.display = "none";

// Adds event listener to the characters link
charactersLink.addEventListener("click", () => {
    homeLink.style.display = "inline";
    charactersLink.style.display = "none";
    characterInput.style.display = "block";
});

// Adds event listener to the compare link
compareLink.addEventListener("click", () => {
    alert("Sorry, comparison feature is not available yet. Stay tuned!");
});

// Adds event listener to the home link
homeLink.addEventListener("click", () => {
    location.replace(location.href);
    homeLink.style.display = "none";
    characterInput.style.display = "none";
    charactersLink.style.display = "inline"
});
