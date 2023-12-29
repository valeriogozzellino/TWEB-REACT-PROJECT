package server.postgres.clubs;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ClubsRepository  extends JpaRepository<Clubs, String> {

    @Query(value = "SELECT DISTINCT c1.* " +
            "FROM clubs c1 join competitions c2  on c1.domestic_competition_id=c2.competition_id " +
//            "JOIN clubs c ON p.current_club_name = c.name " ,
            "WHERE c2.country_name=:filter ",
//            "AND g.date BETWEEN :startDate AND :endDate",
            nativeQuery = true)
    List<Clubs> findByPlayersAndClubs(String filter);
}
