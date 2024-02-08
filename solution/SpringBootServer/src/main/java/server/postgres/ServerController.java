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


    /**
     * Get a list of players belonging to a specific team.
     *
     * @param filter The team ID used to filter players.
     * @return A list of Players who are part of the specified team.
     */
    @GetMapping("/get-player-by-team")
    public List<Players> getPlayersByTeam(@RequestParam(name = "filter") int filter) {
        return playersService.getPlayersByTeam(filter);
    }

    /**
     * Get a player by their unique player ID.
     *
     * @param filter The unique player ID.
     * @return The Players object corresponding to the specified player ID.
     */
    @GetMapping("/get-player-by-playerId")
    public Players getPlayerByID(@RequestParam(name = "filter") int filter) {
        return playersService.getPlayerByID(filter);
    }

    /**
     * Get a list of all players.
     *
     * @return A list of all Players.
     */
    @GetMapping("/get-all-players")
    public List<Players> getAllPlayers() {
        return playersService.getAllPlayers();
    }

    /**
     * Get a list of countries that have competitions.
     *
     * @return A list of country names as Strings.
     */
    @GetMapping("/get-competitions-country")
    public List<String> getCompetitionsCountry() {
        return competitionsService.getCountry();
    }

    /**
     * Get a list of seasons that clubs participate in.
     *
     * @return A list of season years as Integers.
     */
    @GetMapping("/get-club-season")
    public List<Integer> getClubSeason() {

        return clubsService.getClubsSeason();
    }
    /**
     * Get a list of clubs filtered by season and country.
     *
     * @param filterCountry The country to filter by.
     * @param filterSeason The season to filter by.
     * @return A list of Clubs that match the specified season and country.
     */
    @GetMapping("/get-teams-by-season-and-country")
    public List<Clubs> getTeamsBySeasonAndCountry(@RequestParam(name = "filterCountry") String filterCountry,
                                        @RequestParam(name = "filterSeason") int filterSeason) {


        return clubsService.getAllTeams(filterSeason,filterCountry);
    }
    /**
     * Get a list of countries that have clubs.
     *
     * @return A list of country names as Strings.
     */
    @GetMapping("/get-teams-country")
    public List<String> getTeamsCountry() {

        return clubsService.getCountry();
    }
    /**
     * Register a new user.
     *
     * @param newUser The Users object containing the user's details.
     */
    @PostMapping("/sign-up")
    public boolean  saveUserDB(@RequestBody Users newUser) {
        return usersService.saveUserDB(newUser);
    }

    /**
     * Check user's credentials for authentication.
     *
     * @param email The user's email.
     * @param password The user's password.
     * @return The Users object if credentials are valid, otherwise null.
     */
    @GetMapping("/check-credentials")
    public Users  checkCredentials(@RequestParam(name = "email") String email,
                                  @RequestParam(name = "password") String password) {
        return usersService.checkCredentials(email, password);
    }

    /**
     * Get a list of competitions filtered by country or all competitions if 'All' is specified.
     *
     * @param filter The country to filter by or 'All' to get all competitions.
     * @return A list of Competitions based on the country filter or all competitions.
     */
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
    /**
     * Get a team by its unique club ID.
     *
     * @param clubId The unique club ID.
     * @return The Clubs object corresponding to the specified club ID.
     */
    @GetMapping("/get-team-by-id/{clubId}")
    public Clubs getTeamById(@PathVariable int clubId) {
        return clubsService.getTeamById(clubId);
    }

    /**
     * Get a competition by its unique competition ID.
     *
     * @param competitionId The unique competition ID.
     * @return The Competitions object corresponding to the specified competition ID.
     */
    @GetMapping("/get-competitions-by-id")
    public Competitions getCompetitionById(@RequestParam(name = "competitionId") String competitionId) {
        return  competitionsService.getCompetitionById(competitionId);
    }
    /**
     * Get a list of teams participating in a specific competition.
     *
     * @param filterCompetition The competition ID used to filter teams.
     * @return A list of Clubs that are part of the specified competition.
     */
    @GetMapping("/get-teams-by-competition")
    public List<Clubs> getTeamsByCompetitions(@RequestParam(name = "filterCompetition") String filterCompetition) {

        return clubsService.getAllTeamsByCompetition(filterCompetition);
    }


}
