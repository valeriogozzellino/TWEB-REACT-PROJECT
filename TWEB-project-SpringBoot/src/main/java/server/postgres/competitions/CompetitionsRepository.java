package server.postgres.competitions;

import org.springframework.data.jpa.repository.JpaRepository;

public interface CompetitionsRepository   extends JpaRepository<Competitions, String> {

}
