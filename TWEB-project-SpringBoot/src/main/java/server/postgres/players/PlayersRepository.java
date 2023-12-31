package server.postgres.players;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;
import java.util.List;

public interface PlayersRepository extends JpaRepository<Players, String> {
    @Query(value = "SELECT DISTINCT p1.* " +
            "FROM players p1 " + "WHERE p1.current_club_name = :filter ",
            nativeQuery = true)
    List<Players> findPlayersByClubs(String filter);
}
