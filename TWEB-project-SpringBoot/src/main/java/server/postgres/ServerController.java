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
    public List<Players> getAllPlayers(@RequestParam(name = "filter") String filter) {
        List<Players> playersList = playersService.getAllPlayers(filter);
        if(playersList.isEmpty()){
        }else{
            System.out.println("LA LISTA HA " + playersList.size()+ " giocatori");
        }
        return playersList;
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
    public List<Clubs> getTeamsCountry(@RequestParam(name = "filterCountry") String filterCountry,
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

    @PostMapping("/save-user")
    public void  saveUserDB(@RequestParam(name = "filterSeason") Users newUser) {
        System.out.println("Stampo il filtro della season: " + newUser.getFirstName());
        usersService.saveUserDB(newUser);
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

   /* @GetMapping("/get-teams-by-competition")
    public List<Clubs> getTeamsByCompetitions(@RequestParam(name = "filterCompetition") String filter) {
        System.out.println("Stampo il filtro: " + filter);

        List<Clubs> clubsList = clubsService.getAllTeams(filter);
        if(clubsList.isEmpty()){
            System.out.println("LISTA VUOTA");
        }else{
            System.out.println("LA LISTA HA " + clubsList.size()+ " squadre");
        }
        return clubsList;
    }*/
    record Query (
            int year,
            String playerName
    ){}

}
