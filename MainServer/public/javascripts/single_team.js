function init() {
    const urlParams = new URLSearchParams(window.location.search);
    const teamCode = urlParams.get('id');
    getTeamById(teamCode)
    getPlayers(teamCode)

    const back_to_previous = document.getElementById("back");
    back_to_previous.addEventListener("click", function () {
        redirectToTeams()
    })


}

function redirectToTeams() {
    window.location.href = '/ranking';
}

function redirectToPlayer(player_id) {
    console.log("ID: ", player_id)
    window.location.href = '/player.html?id=' + player_id;
}

function getTeamById(teamCode) {
    axios.get(`/singe_team/get-team-by-id/${teamCode}`)
        .then(response => {
            const teamContainer = document.getElementById('result');
            teamContainer.innerHTML = "";
            response.data.forEach(team => {
                const teamCard = createTeamCard(team);
                teamContainer.appendChild(teamCard);
            });
        })
        .catch(response => {
            alert(JSON.stringify(response));
        });
}

// todo: retireve players by teamID from mongo
function getPlayers(teamCode) {
    console.log("CHIAMO GET PLAYERS" , teamCode)

    axios.get(`/singe_team/get-players-by-team-id/${teamCode}`)
        .then(response => {
            const teamContainer = document.getElementById('players-result');
            teamContainer.innerHTML = "";
            response.data.forEach(player => {
                const playerCard = createPlayerCard(player);
                teamContainer.appendChild(playerCard);
            });
        })
        .catch(response => {
            alert(JSON.stringify(response));
        });
}

// function getPlayers(teamCode) {
//     // const ale_apiKey = 'edf5a09582641a00884414d41875bbfc';
//     const vale_apiKey = '460d4ae0eaf7e0c341271f457f18f1df';
//
//
//     axios.get(`https://v3.football.api-sports.io/players/squads?team=${teamCode}`, {
//         headers: {
//             'x-apisports-key': vale_apiKey
//         }
//     })
//         .then(response => {
//             const teamContainer = document.getElementById('players-result');
//             teamContainer.innerHTML = "";
//             // setJson(response.data.response[0])
//             response.data.response[0].players.forEach(player => {
//                 const playerCard = createPlayerCard(player);
//                 teamContainer.appendChild(playerCard);
//             });
//         })
//         .catch(error => {
//             console.error("ERRORE NELLA CHIAMATA API: ", error);
//             alert("Errore nella chiamata API. Controlla la console per i dettagli.");
//         });
// }

// function setJson(data){
//     console.log("Data:", data)
//     console.log("team:",  data.team)
//     console.log("team ID:",  data.team.id)
//     const team_id = data.team.id
//     // data.players.forEach(player => {
//     //     console.log("player: ", player)
//     // })
//     const playersWithTeamId = data.players.map(player => {
//         return { ...player, team_id: team_id };
//     });
//
//     // playersWithTeamId.forEach(player => {
//     //     console.log("player: ", player);
//     // });
//
//     const playersWithTeamIdJSON = JSON.stringify(playersWithTeamId, null, 2);
//     console.log(playersWithTeamIdJSON);
//
//     // console.log(playersWithTeamId)
//
// }

/*function sendPlayersToServer(players) {
    const url = 'http://localhost:3000/set-team';

    axios.post(url, { players })
        .then(response => {
            console.log('Dati inviati con successo al server:', response.data);
        })
        .catch(error => {
            console.error('Errore nell\'invio dei dati al server:', error);
        });
}*/

// function createPlayerCard(player) {
//     const playerCard = document.createElement('div');
//     playerCard.className = 'player-card';
//
//     const imgElement = document.createElement('img');
//     imgElement.alt = player.name;
//     imgElement.classList.add('card-img');
//     imgElement.src = player.photo;
//     // imgElement.style.width = '60px';
//     // imgElement.style.height = '60px';
//
//     const cardBodyDiv = document.createElement('div');
//     cardBodyDiv.classList.add('card-body');
//
//     const playerName = document.createElement('h2');
//     playerName.innerText = player.name;
//
//     const playerPosition = document.createElement('p');
//     playerPosition.innerText = 'Position: ' + player.position;
//
//     const playerAge = document.createElement('p');
//     playerAge.innerText = 'Age: ' + player.age;
//
//     playerCard.appendChild(cardBodyDiv);
//     playerCard.appendChild(imgElement);
//     playerCard.appendChild(playerName);
//     playerCard.appendChild(playerPosition);
//     playerCard.appendChild(playerAge);
//
//     return playerCard;
// }
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


// todo: mettere in un service
function createTeamCard(team) {
    const teamCard = document.createElement('div');
    teamCard.className = 'team-card';

    const imgElement = document.createElement('img');
    imgElement.src = team.team.logo;
    imgElement.alt = team.team.name;
    imgElement.classList.add('card-img-top');

    const cardBodyDiv = document.createElement('div');
    cardBodyDiv.classList.add('card-body');

    const teamName = document.createElement('h2');
    teamName.innerText = team.team.name;

    const teamCity = document.createElement('p');
    teamCity.innerText = 'City: ' + team.venue.city;

    const teamNationality = document.createElement('p');
    teamNationality.innerText = 'Nationality: ' + team.team.country;

    const teamId = document.createElement('p');
    teamId.innerText = 'Team ID: ' + team.team.id;

    const venueName = document.createElement('p');
    venueName.innerText = 'Venue: ' + team.venue.name;

    const venueAddress = document.createElement('p');
    venueAddress.innerText = 'Address: ' + team.venue.address;

    const venueCity = document.createElement('p');
    venueCity.innerText = 'Venue City: ' + team.venue.city;

    const venueCapacity = document.createElement('p');
    venueCapacity.innerText = 'Capacity: ' + team.venue.capacity;

    // Puoi aggiungere altri campi della venue a tuo piacimento

    cardBodyDiv.appendChild(teamName);
    cardBodyDiv.appendChild(teamCity);
    cardBodyDiv.appendChild(teamNationality);
    cardBodyDiv.appendChild(teamId);
    cardBodyDiv.appendChild(venueName);
    cardBodyDiv.appendChild(venueAddress);
    cardBodyDiv.appendChild(venueCity);
    cardBodyDiv.appendChild(venueCapacity);

    teamCard.appendChild(imgElement);
    teamCard.appendChild(cardBodyDiv);

    teamCard.addEventListener('click', function () {
        handleClick(team.team.id);
    });

    return teamCard;
}