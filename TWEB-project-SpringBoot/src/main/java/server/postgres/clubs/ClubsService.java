package server.postgres.clubs;

import org.springframework.stereotype.Service;

@Service
public class ClubsService {

    private final ClubsRepository clubsRepository;

    public ClubsService(ClubsRepository clubsRepository) {
        this.clubsRepository = clubsRepository;
    }
}
