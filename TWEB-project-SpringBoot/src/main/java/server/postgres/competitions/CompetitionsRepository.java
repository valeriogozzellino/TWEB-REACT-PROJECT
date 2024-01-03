package server.postgres.competitions;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import server.postgres.players.Players;

import java.util.List;

public interface CompetitionsRepository   extends JpaRepository<Competitions, String> {
        @Query(value = "SELECT DISTINCT c1.* " +
                "FROM competitions c1 " + "WHERE (c1.country_name = :filter)",
                nativeQuery = true)
        List<Competitions> findByCountry(String filter);
        @Query(value = "SELECT DISTINCT c1.* " +
                "FROM competitions c1 ",
                nativeQuery = true)
        List<Competitions> getAllCompetition();

    @Query(value = "SELECT DISTINCT c1.country_name " +
            "FROM competitions c1 ",
            nativeQuery = true)
    List<String> getCountry();

    @Query(value = "SELECT DISTINCT c1.competition_id " +
            "FROM competitions c1 ",
            nativeQuery = true)
    List<String> getCompetitionsId();
}
