package server.postgres.clubs;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ClubsService {

    private final ClubsRepository clubsRepository;

    public ClubsService(ClubsRepository clubsRepository) {
        this.clubsRepository = clubsRepository;
    }
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
    public List<String> getCountry() {
        List<String> countryList =clubsRepository.getCountry();
        countryList.add("All");
        return countryList;
    }
    public List<Integer> getClubsSeason() {
        List<Integer> seasonList = clubsRepository.getClubsSeason();
        seasonList.add(0);
        return seasonList;
    }

    public Clubs getTeamById(int clubId) {
        return clubsRepository.getTeamById(clubId);
    }
}
