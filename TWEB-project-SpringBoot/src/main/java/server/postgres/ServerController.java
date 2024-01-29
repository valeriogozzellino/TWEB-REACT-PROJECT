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
        return playersService.getPlayersByTeam(filter);
    }
    @GetMapping("/get-player-by-playerId")
    public Players getPlayerByID(@RequestParam(name = "filter") int filter) {
        return playersService.getPlayerByID(filter);
    }
    @GetMapping("/get-all-players")
    public List<Players> getAllPlayers() {
        return playersService.getAllPlayers();
    }

    @GetMapping("/get-competitions-country")
    public List<String> getCompetitionsCountry() {

        return competitionsService.getCountry();
    }
    @GetMapping("/get-club-season")
    public List<Integer> getClubSeason() {

        return clubsService.getClubsSeason();
    }
    @GetMapping("/get-teams-by-season-and-country")
    public List<Clubs> getTeamsBySeasonAndCountry(@RequestParam(name = "filterCountry") String filterCountry,
                                        @RequestParam(name = "filterSeason") int filterSeason) {


        return clubsService.getAllTeams(filterSeason,filterCountry);
    }

    @GetMapping("/get-teams-country")
    public List<String> getTeamsCountry() {

        return clubsService.getCountry();
    }

    @PostMapping("/sign-up")
    public void  saveUserDB(@RequestBody Users newUser) {
        usersService.saveUserDB(newUser);
    }

    @GetMapping("/check-credentials")
    public Users  checkCredentials(@RequestParam(name = "email") String email,
                                  @RequestParam(name = "password") String password) {
        return usersService.checkCredentials(email, password);
    }
    @GetMapping("/all-competitions")
    public List<Competitions> getCompetitionsByCountry(@RequestParam(name = "filter") String filter) {
        List<Competitions> competitionsList = null;
        if(filter.equals("All")){
            competitionsList = competitionsService.getAllCompetition();
        }else{
            competitionsList = competitionsService.getCompetitionsByCountry(filter);
        }

        return  competitionsList;
    }

    @GetMapping("/get-team-by-id/{clubId}")
    public Clubs getTeamById(@PathVariable int clubId) {
        return clubsService.getTeamById(clubId);
    }


    @GetMapping("/get-competitions-by-id")
    public Competitions getCompetitionById(@RequestParam(name = "competitionId") String competitionId) {
        return  competitionsService.getCompetitionById(competitionId);
    }

    @GetMapping("/get-teams-by-competition")
    public List<Clubs> getTeamsByCompetitions(@RequestParam(name = "filterCompetition") String filterCompetition) {

        return clubsService.getAllTeamsByCompetition(filterCompetition);
    }


}
