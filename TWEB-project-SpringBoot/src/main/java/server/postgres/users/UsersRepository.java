package server.postgres.users;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import server.postgres.players.Players;

import java.util.List;

public interface UsersRepository extends JpaRepository<Users, String> {

    @Query(value = "SELECT DISTINCT * " +
            "FROM users " + "WHERE email = :email AND password = :password",
            nativeQuery = true)
    Users checkCredentials(String email, String password);
}
