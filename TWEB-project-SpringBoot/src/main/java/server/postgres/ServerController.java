package server.postgres;

import org.springframework.web.bind.annotation.*;
import server.postgres.clubs.Clubs;
import server.postgres.clubs.ClubsService;
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
        System.out.println("Stampo il filtro: " + filter);
        List<Players> playersList = playersService.getAllPlayers(filter);
        if(playersList.isEmpty()){
            System.out.println("LISTA VUOTA");
        }else{
            System.out.println("LA LISTA HA " + playersList.size()+ " giocatori");
        }
        return playersList;
    }
    @GetMapping("/all-teams")
    public List<Clubs> getAllTeams(@RequestParam(name = "filter") String filter) {
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
