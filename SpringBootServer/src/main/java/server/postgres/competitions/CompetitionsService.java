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

    /**
     * Retrieve a list of competitions filtered by country.
     *
     * @param filter The country name to filter competitions.
     * @return A list of Competitions that occur in the specified country.
     */
    public List<Competitions> getCompetitionsByCountry(String filter) {
        List<Competitions> competitionsList = competitionsRepository.findByCountry(filter);
        return competitionsList;
    }

    /**
     * Retrieve a list of all competitions.
     *
     * @return A list of all Competitions.
     */
    public List<Competitions> getAllCompetition() {
        List<Competitions> competitionsList = competitionsRepository.getAllCompetition();
        return competitionsList;
    }

    /**
     * Retrieve a competition by its unique ID.
     *
     * @param competitionId The unique ID of the competition.
     * @return The Competitions object corresponding to the specified competition ID.
     */
    public Competitions getCompetitionById(String competitionId) {
        System.out.println("competitionId--->"+ competitionId);
        Competitions competitions = competitionsRepository.getCompetitionById(competitionId);
        return competitions;
    }

    /**
     * Retrieve a list of countries that have competitions.
     *
     * @return A list of country names as Strings, including an 'All' option.
     */
    public List<String> getCountry() {
        List<String> countryList = competitionsRepository.getCountry();
        countryList.add("All");
        return countryList;
    }

    /**
     * Retrieve a list of competition IDs.
     *
     * @return A list of competition IDs as Strings, including an 'All' option.
     */
    public List<String> getCompetitionsId() {
        List<String> competitionIdList = competitionsRepository.getCompetitionsId();
        competitionIdList.add("All");
        return competitionIdList;
    }

}
