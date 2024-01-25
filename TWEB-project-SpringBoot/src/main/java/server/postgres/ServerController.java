package server.postgres;

import org.springframework.web.bind.annotation.*;
import server.postgres.clubs.Clubs;
import server.postgres.clubs.ClubsService;
import server.postgres.competitions.Competitions;
import server.postgres.competitions.CompetitionsService;
import server.postgres.players.Players;
import server.postgres.players.PlayersService;
import server.postgres.users.Users;
import server.postgres.users.UsersService;

import java.util.List;

@RestController
public class ServerController {
    private final PlayersService playersService;
    private final CompetitionsService competitionsService;
    private final ClubsService clubsService;
    private final UsersService usersService;

    public ServerController(PlayersService playersService, CompetitionsService competitionsService, ClubsService clubsService, UsersService usersService) {
        this.playersService = playersService;
        this.competitionsService = competitionsService;
        this.clubsService = clubsService;
        this.usersService = usersService;
    }

    @GetMapping("/get-player-by-team")
    public List<Players> getPlayersByTeam(@RequestParam(name = "filter") int filter) {
        System.out.println("------FILTRO PLAYERs"+ filter);
        List<Players> playersList = playersService.getPlayersByTeam(filter);
        if(playersList.isEmpty()){
            System.out.println("-----LISTA PLAYERS VUOTA");
        }else{
            System.out.println("LA LISTA HA " + playersList.size()+ " giocatori");
        }
        return playersList;
    }
    @GetMapping("/get-player-by-playerId")
    public Players getPlayerByID(@RequestParam(name = "filter") int filter) {
        System.out.println("------FILTRO PLAYERs"+ filter);
        Players player = playersService.getPlayerByID(filter);

        return player;
    }
    @GetMapping("/get-all-players")
    public List<Players> getAllPlayers() {
        List<Players> players = playersService.getAllPlayers();
        return players;
    }

    @GetMapping("/get-competitions-country")
    public List<String> getCompetitionsCountry() {
        List<String> countryList = competitionsService.getCountry();
        if(countryList.isEmpty()){
        }else{
            System.out.println("LA LISTA HA " + countryList.size()+ " country");
        }
        return countryList;
    }
    @GetMapping("/get-club-season")
    public List<Integer> getClubSeason() {
        System.out.println("REQUEST--> get club season");
        List<Integer> clubsSeason = clubsService.getClubsSeason();
        if(clubsSeason.isEmpty()){
        }else{
            System.out.println("LA LISTA HA " + clubsSeason.size()+ " id");
        }
        return clubsSeason;
    }
    @GetMapping("/get-teams-by-season-and-country")
    public List<Clubs> getTeamsBySeasonAndCountry(@RequestParam(name = "filterCountry") String filterCountry,
                                        @RequestParam(name = "filterSeason") int filterSeason) {
        System.out.println("REQUEST--> get teams country and season");
        List<Clubs> clubsList = clubsService.getAllTeams(filterSeason,filterCountry);

        if(clubsList.isEmpty()){
            System.out.println("LA LISTA vuota ");

        }else{
            System.out.println("LA LISTA HA " + clubsList.size()+ " country");
        }
        return clubsList;
    }

    @GetMapping("/get-teams-country")
    public List<String> getTeamsCountry() {
        System.out.println("REQUEST--> get teams country");
        List<String> countryList = clubsService.getCountry();
        if(countryList.isEmpty()){
        }else{
            System.out.println("LA LISTA HA " + countryList.size()+ " country");
        }
        return countryList;
    }

    @PostMapping("/sign-up")
    public void  saveUserDB(@RequestBody Users newUser) {
        System.out.println("Stampo il filtro della season: " + newUser.getFirstName());
        usersService.saveUserDB(newUser);
    }

    @GetMapping("/check-credentials")
    public Users  checkCredentials(@RequestParam(name = "email") String email,
                                  @RequestParam(name = "password") String password) {
        System.out.println("Stampo password: " + password);
        System.out.println("Stampo email: " + email);
        return usersService.checkCredentials(email, password);
    }
    @GetMapping("/all-competitions")
    public List<Competitions> getCompetitionsByCountry(@RequestParam(name = "filter") String filter) {
        System.out.println("Stampo il filtro: " + filter);
        List<Competitions> competitionsList= null;
        if(filter.equals("All")){
            competitionsList = competitionsService.getAllCompetition();
        }else{
            competitionsList = competitionsService.getCompetitionsByCountry(filter);
        }
        if( competitionsList.isEmpty()){
        }else{
            System.out.println("LA LISTA HA " +  competitionsList.size()+ " giocatori");
        }
        return  competitionsList;
    }

    @GetMapping("/get-team-by-id/{clubId}")
    public Clubs getTeamById(@PathVariable int clubId) {
        System.out.println("++++++++ Fetching team with ID: " + clubId);
        return clubsService.getTeamById(clubId);
    }



    @GetMapping("/get-competitions-by-id")
    public Competitions getCompetitionById(@RequestParam(name = "competitionId") String competitionId) {
        System.out.println("Stampo il filtro singola competizione: " + competitionId);
        Competitions competition = null;
        competition = competitionsService.getCompetitionById(competitionId);

        return  competition;
    }

    @GetMapping("/get-teams-by-competition")
    public List<Clubs> getTeamsByCompetitions(@RequestParam(name = "filterCompetition") String filterCompetition) {
        System.out.println("Stampo il filtro COMPETIZIONE : " + filterCompetition);

        List<Clubs> clubsList = clubsService.getAllTeamsByCompetition(filterCompetition);
        if(clubsList.isEmpty()){
            System.out.println("LISTA VUOTA dei CLUB dalla competitionID");
        }else{
            System.out.println("LA LISTA HA " + clubsList.size()+ " squadre");
        }
        return clubsList;
    }

    record Query (
            int year,
            String playerName
    ){}

}
