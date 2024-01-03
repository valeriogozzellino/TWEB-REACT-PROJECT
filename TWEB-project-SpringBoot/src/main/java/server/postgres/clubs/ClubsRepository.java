package server.postgres.clubs;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ClubsRepository  extends JpaRepository<Clubs, String> {

    @Query(value = "SELECT DISTINCT c1.* " +
            "FROM clubs c1 join competitions c2  on c1.domestic_competition_id=c2.competition_id " +
            "WHERE c2.competition_id = :filter ",
            nativeQuery = true)
    List<Clubs> findByCompetitionsAndClubs(String filter);
    @Query(value = "SELECT DISTINCT c1.* " +
            "FROM clubs c1",
            nativeQuery = true)
    List<Clubs> getAllClubs();

    //get all countryes of teams
    @Query(value = "SELECT DISTINCT c1.country_name " +
            "FROM competitions c1 ",
            nativeQuery = true)
    List<String> getCountry();
}
