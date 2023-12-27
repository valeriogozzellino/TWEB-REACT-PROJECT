package server.postgres.players;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface PlayersRepository extends JpaRepository<Players, String> {
    //@Query
}
