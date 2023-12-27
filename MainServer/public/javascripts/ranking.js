function init(){
    getAllTeams();
}

function getAllTeams(){
    axios.get("/ranking/get-teams")
        .then(response => {
            const teamContainer = document.getElementById('result');
            teamContainer.innerHTML = "";
            response.data.forEach(team => {
                const teamCard = createTeamCard(team);
                teamContainer.appendChild(teamCard);
            });
        })
        .catch(response=>{
            alert(JSON.stringify(response));
        })
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

    cardBodyDiv.appendChild(teamName);
    cardBodyDiv.appendChild(teamCity);
    cardBodyDiv.appendChild(teamNationality);
    cardBodyDiv.appendChild(teamId);

    teamCard.appendChild(imgElement);
    teamCard.appendChild(cardBodyDiv);

    teamCard.addEventListener('click', function() {
        handleClick(team.team.id);
    });

    return teamCard;

    function handleClick(id) {
        window.location.href = '/single_team.html?id=' + id;
    }
}
