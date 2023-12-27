function createCard(team) {
    var cardDiv = document.createElement("div");
    cardDiv.classList.add("card");
    cardDiv.id = "cardDiv";
    cardDiv.style.width = "12rem";

    var imgElement = document.createElement("img");
    var imagePath = team.team.logo;
    imgElement.src = imagePath;
    imgElement.classList.add("card-img-top");
    imgElement.alt = team.team.name;


    var cardBodyDiv = document.createElement("div");
    cardBodyDiv.classList.add("card-body");


    var cardText = document.createElement("p");
    cardText.classList.add("card-text");
    cardText.innerText = "Team Name: " + team.team.name + "\nCity: " + team.venue.city;

    cardBodyDiv.appendChild(cardText);
    cardDiv.appendChild(imgElement);
    cardDiv.appendChild(cardBodyDiv);

    const containerCard = document.getElementById("containerCard");
    containerCard.appendChild(cardDiv);

    cardDiv.addEventListener('click', function() {
        handleClick(team.team.id);
    });
}