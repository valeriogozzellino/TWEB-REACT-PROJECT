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
        System.out.println("Sono in Get All Teams");
        List<Clubs> clubsList = null;
        if(filterSeason == 0 && filterCountry.equals("All") ){
            System.out.println("-------> 1");
            clubsList = clubsRepository.getAllClubs();
        }else if (filterSeason == 0 ){
            System.out.println("-------> 2");
            clubsList = clubsRepository.findByCountry(filterCountry);
        }else if(filterCountry.equals("All")){
            System.out.println("-------> 3");
            clubsList = clubsRepository.findBySeason(filterSeason);
        }else{
            System.out.println("-------> 4");
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
}
