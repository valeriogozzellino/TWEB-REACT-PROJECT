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

    public List<String> getAllPlayers() {
        List<String> playersList = playerRepository.findByPlayersAndClubs();
        return playersList;
    }
}
