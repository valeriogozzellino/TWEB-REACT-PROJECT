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
        List<Clubs> clubsList = null;
        if(filter.equals("All")){
            clubsList = clubsRepository.getAllClubs();
        }else{
            clubsList = clubsRepository.findByCompetitionsAndClubs(filter);
        }
        return clubsList;
    }
    public List<String> getCountry() {
        List<String> countryList =clubsRepository.getCountry();
        countryList.add("All");
        return countryList;
    }
}
