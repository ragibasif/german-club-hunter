fetch("team.json")
  .then((response) => response.json())
  .then((data) => {
    const container = document.getElementById("image-track");
    data.forEach((item) => {
      // Create a card element
      const card = document.createElement("div");
      card.classList.add("team-card");
      card.classList.add("image");
      card.setAttribute("draggable", "false");

      // Create a name element
      const name = document.createElement("h2");
      name.classList.add("team-card-name");
      name.textContent = item.name + ", " + item.role;
      //   name.setAttribute("draggable", "false");

      // Create a title element
      //   const role = document.createElement("h3");
      //   role.classList.add("team-card-role");
      //   role.textContent = item.role;
      //   role.setAttribute("draggable", "false");

      // Create a image element
      // const image = document.createElement("img");
      // image.classList.add("team-card-img");
      // image.src = item.image;
      // image.setAttribute("draggable", "false");

      // Create a description element
      const description = document.createElement("p");
      description.classList.add("team-card-description");
      description.textContent = item.description;
      //   description.setAttribute("draggable", "false");

      const contact = document.createElement("a");
      //   contact.setAttribute("src", item.contact);
      contact.classList.add("team-card-description");
      contact.textContent = "Connect";
      contact.href = item.contact;
      contact.setAttribute("target", "_blank");
      // Append title and description to the card
      card.appendChild(name);
      //   card.appendChild(role);
      // card.appendChild(image);
      card.appendChild(description);
      card.appendChild(contact);

      // Append the card to the container
      container.appendChild(card);
    });
  })
  .catch((error) => console.error("Error fetching the JSON data:", error));

const track = document.getElementById("image-track");
const handleOnDown = (e) => (track.dataset.mouseDownAt = e.clientX);

const handleOnUp = () => {
  track.dataset.mouseDownAt = "0";
  track.dataset.prevPercentage = track.dataset.percentage;
};

const handleOnMove = (e) => {
  if (track.dataset.mouseDownAt === "0") return;

  const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX,
    maxDelta = window.innerWidth / 2;

  const percentage = (mouseDelta / maxDelta) * -100,
    nextPercentageUnconstrained =
      parseFloat(track.dataset.prevPercentage) + percentage,
    nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);

  track.dataset.percentage = nextPercentage;

  track.animate(
    {
      transform: `translate(${nextPercentage}%, -50%)`,
    },
    { duration: 1200, fill: "forwards" }
  );

  for (const image of track.getElementsByClassName("image")) {
    image.animate(
      {
        objectPosition: `${100 + nextPercentage}% center`,
      },
      { duration: 1200, fill: "forwards" }
    );
  }
};

/* -- Had to add extra lines for touch events -- */

window.onmousedown = (e) => handleOnDown(e);

window.ontouchstart = (e) => handleOnDown(e.touches[0]);

window.onmouseup = (e) => handleOnUp(e);

window.ontouchend = (e) => handleOnUp(e.touches[0]);

window.onmousemove = (e) => handleOnMove(e);

window.ontouchmove = (e) => handleOnMove(e.touches[0]);
