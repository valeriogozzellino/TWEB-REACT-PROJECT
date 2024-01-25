package server.postgres.players;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;
import java.util.List;

public interface PlayersRepository extends JpaRepository<Players, String> {
    @Query(value = "SELECT DISTINCT * " +
            "FROM players " + "WHERE current_club_id = :filter ",
            nativeQuery = true)
    List<Players> findPlayersByClubs(int filter);
    @Query(value = "SELECT DISTINCT * " +
            "FROM players " + "WHERE player_id = :filter ",
            nativeQuery = true)
    Players findPlayerByID(int filter);

    @Query(value = "SELECT DISTINCT * " +
            "FROM players ",
            nativeQuery = true)
    List<Players> getAllPlayers();
}
