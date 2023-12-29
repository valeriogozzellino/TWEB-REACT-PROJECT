package server.postgres.players;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;
import java.util.List;

public interface PlayersRepository extends JpaRepository<Players, String> {
    @Query(value = "SELECT DISTINCT p.first_name " +
            "FROM players p " +
            "JOIN clubs c ON p.current_club_name = c.name " ,
//            "WHERE s.scorer = :scorer " +
//            "AND g.date BETWEEN :startDate AND :endDate",
            nativeQuery = true)
    List<String> findByPlayersAndClubs();
}
