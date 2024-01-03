package server.postgres;

import org.springframework.web.bind.annotation.*;
import server.postgres.clubs.Clubs;
import server.postgres.clubs.ClubsService;
import server.postgres.competitions.Competitions;
import server.postgres.competitions.CompetitionsService;
import server.postgres.players.Players;
import server.postgres.players.PlayersService;

import java.util.List;

@RestController
public class ServerController {
    private final PlayersService playersService;
    private final CompetitionsService competitionsService;
    private final ClubsService clubsService;

    public ServerController(PlayersService playersService, CompetitionsService competitionsService, ClubsService clubsService) {
        this.playersService = playersService;
        this.competitionsService = competitionsService;
        this.clubsService = clubsService;
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
    @GetMapping("/get-competitions-id")
    public List<String> getCompetitionsId() {
        List<String> competitionsIdList = competitionsService.getCompetitionsId();
        if(competitionsIdList.isEmpty()){
        }else{
            System.out.println("LA LISTA HA " + competitionsIdList.size()+ " id");
        }
        return competitionsIdList;
    }
    @GetMapping("/get-teams-country")
    public List<String> getTeamsCountry() {
        List<String> countryList = clubsService.getCountry();
        if(countryList.isEmpty()){
        }else{
            System.out.println("LA LISTA HA " + countryList.size()+ " country");
        }
        return countryList;
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

    @GetMapping("/get-teams-by-competition")
    public List<Clubs> getAllTeams(@RequestParam(name = "filterCompetition") String filter) {
        System.out.println("Stampo il filtro: " + filter);

        List<Clubs> clubsList = clubsService.getAllTeams(filter);
        if(clubsList.isEmpty()){
            System.out.println("LISTA VUOTA");
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
