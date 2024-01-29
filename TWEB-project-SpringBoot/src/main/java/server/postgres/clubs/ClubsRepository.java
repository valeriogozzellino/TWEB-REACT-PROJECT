package server.postgres.clubs;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ClubsRepository  extends JpaRepository<Clubs, String> {

    @Query(value = "SELECT DISTINCT c1.* " +
            "FROM clubs c1 join competitions c2  on c1.domestic_competition_id=c2.competition_id " +
            "WHERE c1.last_season = :filterSeason AND c2.country_name = :filterCountry",
            nativeQuery = true)
    List<Clubs> findBySeasonAndClubs(int filterSeason, String filterCountry);
    @Query(value = "SELECT DISTINCT c1.* " +
            "FROM clubs c1 join competitions c2  on c1.domestic_competition_id=c2.competition_id " +
            "WHERE c2.country_name = :filterCountry",
            nativeQuery = true)
    List<Clubs> findByCountry(String filterCountry);
    @Query(value = "SELECT DISTINCT c1.* " +
            "FROM clubs c1 " +
            "WHERE c1.last_season = :filterSeason",
            nativeQuery = true)
    List<Clubs> findBySeason(int filterSeason);
    @Query(value = "SELECT DISTINCT c1.* " +
            "FROM clubs c1",
            nativeQuery = true)
    List<Clubs> getAllClubs();

    @Query(value = "SELECT DISTINCT c1.country_name " +
            "FROM competitions c1 join clubs c2 on c2.domestic_competition_id=c1.competition_id ",
            nativeQuery = true)
    List<String> getCountry();

    @Query(value = "SELECT DISTINCT last_season " +
            "FROM clubs "+"ORDER BY last_season",
            nativeQuery = true)
    List<Integer> getClubsSeason();

    @Query(value = "SELECT * FROM clubs WHERE club_id = :clubId", nativeQuery = true)
    Clubs getTeamById(int clubId);

    @Query(value = "SELECT * FROM clubs WHERE domestic_competition_id = :competitionId", nativeQuery = true)
    List<Clubs> getAllTeamsByCompetition(String competitionId);

}
