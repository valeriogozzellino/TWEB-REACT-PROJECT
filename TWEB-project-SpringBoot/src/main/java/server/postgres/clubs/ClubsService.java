package server.postgres.clubs;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ClubsService {

    private final ClubsRepository clubsRepository;

    public ClubsService(ClubsRepository clubsRepository) {
        this.clubsRepository = clubsRepository;
    }

    /**
     * Retrieve a list of clubs optionally filtered by season and country.
     *
     * @param filterSeason The season to filter clubs. 0 indicates no season filter.
     * @param filterCountry The country to filter clubs. 'All' indicates no country filter.
     * @return A list of Clubs that match the specified season and/or country.
     */
    public List<Clubs> getAllTeams(int filterSeason, String filterCountry) {
        List<Clubs> clubsList = null;
        if(filterSeason == 0 && filterCountry.equals("All") ){
            clubsList = clubsRepository.getAllClubs();
        }else if (filterSeason == 0 ){
            clubsList = clubsRepository.findByCountry(filterCountry);
        }else if(filterCountry.equals("All")){
            clubsList = clubsRepository.findBySeason(filterSeason);
        }else{
            clubsList = clubsRepository.findBySeasonAndClubs(filterSeason, filterCountry);
        }
        return clubsList;
    }

    /**
     * Retrieve a list of countries that have clubs.
     *
     * @return A list of country names as Strings, including an 'All' option.
     */
    public List<String> getCountry() {
        List<String> countryList =clubsRepository.getCountry();
        countryList.add("All");
        return countryList;
    }

    /**
     * Retrieve a list of seasons in which clubs participate.
     *
     * @return A list of season years as Integers, including a 0 option indicating no specific season.
     */
    public List<Integer> getClubsSeason() {
        List<Integer> seasonList = clubsRepository.getClubsSeason();
        seasonList.add(0);
        return seasonList;
    }

    /**
     * Retrieve a club by its unique ID.
     *
     * @param clubId The unique ID of the club.
     * @return The Clubs object corresponding to the specified club ID.
     */
    public Clubs getTeamById(int clubId) {
        return clubsRepository.getTeamById(clubId);
    }

    /**
     * Retrieve a list of clubs participating in a specific competition.
     *
     * @param competitionId The ID of the competition used to filter clubs.
     * @return A list of Clubs that are part of the specified competition.
     */
    public List<Clubs> getAllTeamsByCompetition(String competitionId){
        return clubsRepository.getAllTeamsByCompetition(competitionId);
    }
}
