const toggleSwitch = document.querySelector('input[type="checkbox"]');
const toggleIcon = document.getElementById("toggle-icon");
const nav = document.querySelector("nav");
const burger = document.querySelector(".burger");

function navToggler() {
  nav.classList.toggle("nav-active");
}

burger.addEventListener("click", () => {
  navToggler();
});

// Dark Mode Styles
function darkMode() {
  toggleIcon.children[0].classList.replace("fa-sun", "fa-moon");
}

// Light Mode Styles
function lightMode() {
  toggleIcon.children[0].classList.replace("fa-moon", "fa-sun");
}

// Switch Theme Dynamically
function switchTheme(event) {
  if (event.target.checked) {
    document.documentElement.setAttribute("data-theme", "dark");
    localStorage.setItem("theme", "dark");
    darkMode();
  } else {
    document.documentElement.setAttribute("data-theme", "light");
    localStorage.setItem("theme", "light");
    lightMode();
  }
}

// Event Listener
toggleSwitch.addEventListener("change", switchTheme);

// Check Local Storage For Theme
const currentTheme = localStorage.getItem("theme");
if (currentTheme) {
  document.documentElement.setAttribute("data-theme", currentTheme);

  if (currentTheme === "dark") {
    toggleSwitch.checked = true;
    darkMode();
  }
}
fetch("./team/team.json")
  .then((response) => response.json())
  .then((data) => {
    const container = document.getElementById("team-container");
    data.forEach((item) => {
      // Create a card element
      const card = document.createElement("div");
      card.classList.add("team-card");

      // Create a name element
      const name = document.createElement("h2");
      name.classList.add("team-card-name");
      name.textContent = item.name + ", " + item.role;

      // Create a title element
      // const role = document.createElement("h3");
      // role.classList.add("team-card-role");
      // role.textContent = item.role;

      // Create a image element
      const image = document.createElement("img");
      image.classList.add("team-card-img");
      image.src = item.image;
      image.setAttribute("draggable", "false");
      // Create a description element
      // const description = document.createElement("p");
      // description.classList.add("team-card-description");
      // description.textContent = item.description;

      // Append title and description to the card
      card.appendChild(name);
      // card.appendChild(role);
      card.appendChild(image);
      // card.appendChild(description);

      // Append the card to the container
      container.appendChild(card);
    });
  })
  .catch((error) => console.error("Error fetching the JSON data:", error));

const flagImagesContainer = document.getElementById("flag-container");
flagImagesContainer.setAttribute("draggable", "false");
const flagImages = flagImagesContainer.querySelectorAll("img");
flagImages.forEach((img, index) => {
  img.setAttribute("draggable", "false");
  img.setAttribute("id", `flag${index}`);
});
