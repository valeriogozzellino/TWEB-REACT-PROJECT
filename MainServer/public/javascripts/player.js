function init() {
//     todo: cerca su mongo il giocatore
//     todo: cerca stats su API con player_id
    const urlParams = new URLSearchParams(window.location.search);
    const playerId = urlParams.get('id');
    getPlayerById(playerId)
}

function getPlayerById(playerId) {
    // CHIAMA MONGO

    console.log("CHIAMO GET PLAYER", playerId)

    axios.get(`/player/get-player-by-id/${playerId}`)
        .then(response => {
            const playerContainer = document.getElementById('player-result');
            playerContainer.innerHTML = "";
            response.data.forEach(player => {
                const playerCard = createPlayerCard(player);
                playerContainer.appendChild(playerCard);
            });
        })
        .catch(response => {
            alert(JSON.stringify(response));
        });


}


function createPlayerCard(player) {
    // Creazione del div principale della card
    const playerCard = document.createElement('div');
    playerCard.className = 'player-card';
    playerCard.style.border = '1px solid black'; // Bordo nero

    // Creazione del div per la colonna sinistra (contenente la foto)
    const leftColumn = document.createElement('div');
    leftColumn.style.float = 'left'; // Allineamento a sinistra
    leftColumn.style.width = '40%'; // Larghezza della colonna sinistra

    // Creazione dell'elemento immagine
    const imgElement = document.createElement('img');
    imgElement.alt = player.name;
    imgElement.classList.add('card-img');
    imgElement.src = player.photo;
    imgElement.style.width = '100%'; // Immagine riempie completamente la colonna sinistra

    leftColumn.appendChild(imgElement);

    const rightColumn = document.createElement('div');
    rightColumn.style.float = 'right';
    rightColumn.style.width = '60%';

    const cardBodyDiv = document.createElement('div');
    cardBodyDiv.classList.add('card-body');

    const playerName = document.createElement('h2');
    playerName.innerText = player.name;

    const playerPosition = document.createElement('p');
    playerPosition.innerText = 'Position: ' + player.position;

    const playerNumber = document.createElement('p');
    playerNumber.innerText = 'Number: ' + player.number;

    const playerAge = document.createElement('p');
    playerAge.innerText = 'Age: ' + player.age;

    cardBodyDiv.appendChild(playerName);
    cardBodyDiv.appendChild(playerPosition);
    cardBodyDiv.appendChild(playerNumber);
    cardBodyDiv.appendChild(playerAge);

    playerCard.appendChild(leftColumn);
    playerCard.appendChild(rightColumn);
    rightColumn.appendChild(cardBodyDiv);

    playerCard.addEventListener('click', function () {
        redirectToPlayer(player.id)
    });

    return playerCard;
}
