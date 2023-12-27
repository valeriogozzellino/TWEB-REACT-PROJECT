package server.postgres.players;

import org.springframework.stereotype.Service;

@Service
public class PlayersService {

    public final PlayersRepository playerRepository;

    public PlayersService(PlayersRepository playerRepository) {
        this.playerRepository = playerRepository;
    }

}
