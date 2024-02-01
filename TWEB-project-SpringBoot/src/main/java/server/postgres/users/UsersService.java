package server.postgres.users;

import org.springframework.stereotype.Service;

@Service
public class UsersService {
    public final UsersRepository usersRepository;

    public UsersService(UsersRepository usersRepository) {
        this.usersRepository = usersRepository;
    }

    /**
     * Save a new user to the database.
     *
     * @param newUsers The Users object containing the user's details.
     * Asserts that the newUsers object is not null before saving.
     */
    public void saveUserDB(Users newUsers) {
        assert newUsers != null;
        usersRepository.save(newUsers);
    }
    /**
     * Check if the provided credentials match an existing user in the database.
     *
     * @param email The email address of the user.
     * @param password The password of the user.
     * @return The Users object if credentials match, otherwise null.
     */
    public Users checkCredentials(String email, String password) {
        Users user = usersRepository.checkCredentials(email, password);
        return user;
    }
}
