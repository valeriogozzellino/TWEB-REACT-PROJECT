package server.postgres.competitions;

import org.springframework.stereotype.Service;
import server.postgres.clubs.Clubs;

import java.util.List;

@Service
public class CompetitionsService {
    public final CompetitionsRepository competitionsRepository;

    public CompetitionsService(CompetitionsRepository competitionsRepository) {
        this.competitionsRepository = competitionsRepository;
    }

    public List<Competitions> getCompetitionsByCountry(String filter) {
        List<Competitions> competitionsList = competitionsRepository.findByCountry(filter);
        return competitionsList;
    }
    public List<Competitions> getAllCompetition() {
        List<Competitions> competitionsList = competitionsRepository.getAllCompetition();
        return competitionsList;
    }

    public List<String> getCountry() {
        List<String> countryList = competitionsRepository.getCountry();
        countryList.add("All");
        return countryList;
    }

}
