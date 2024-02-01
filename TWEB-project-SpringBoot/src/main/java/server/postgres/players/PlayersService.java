package server.postgres.players;

import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class PlayersService {

    public final PlayersRepository playerRepository;

    public PlayersService(PlayersRepository playerRepository) {
        this.playerRepository = playerRepository;
    }

    /**
     * Retrieve a list of players belonging to a specific team.
     *
     * @param filter The team ID used to filter players.
     * @return A list of Players who are part of the specified team.
     */
    public List<Players> getPlayersByTeam(int filter) {
        List<Players> playersList = playerRepository.findPlayersByClubs(filter);
        return playersList;
    }
    /**
     * Retrieve a player by their unique player ID.
     *
     * @param filter The unique player ID.
     * @return The Players object corresponding to the specified player ID.
     */
    public Players getPlayerByID(int filter) {
        Players player = playerRepository.findPlayerByID(filter);
        return player;
    }
    /**
     * Retrieve a list of all players.
     *
     * @return A list of all Players.
     */
    public List<Players> getAllPlayers() {
        List<Players>  players = playerRepository.getAllPlayers();
        return players;
    }
}
