package server.postgres.clubs;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ClubsService {

    private final ClubsRepository clubsRepository;

    public ClubsService(ClubsRepository clubsRepository) {
        this.clubsRepository = clubsRepository;
    }
    public List<Clubs> getAllTeams(String filter) {
        List<Clubs> clubsList = clubsRepository.findByPlayersAndClubs(filter);
        return clubsList;
    }
}
