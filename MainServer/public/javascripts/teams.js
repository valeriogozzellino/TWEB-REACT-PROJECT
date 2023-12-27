function init() {
    getAllTeams();
}

function handleClick(id) {
    window.location.href = '/single_team.html?id=' + id;
}

function getAllTeams() {
    axios.get("/teams/get-teams")
        .then(response => {
            for (const item of response.data) {
                createCard(item)
            }
        })
        .catch(response => {
            alert(JSON.stringify(response));
        })
}