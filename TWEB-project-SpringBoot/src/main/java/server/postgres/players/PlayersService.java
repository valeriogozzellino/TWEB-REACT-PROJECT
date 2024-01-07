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

    public List<Players> getAllPlayers(int filter) {
        List<Players> playersList = playerRepository.findPlayersByClubs(filter);
        return playersList;
    }
    public Players getPlayerByID(int filter) {
        Players player = playerRepository.findPlayerByID(filter);
        return player;
    }
}
