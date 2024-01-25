package server.postgres.users;

import org.springframework.stereotype.Service;

@Service
public class UsersService {
    public final UsersRepository usersRepository;

    public UsersService(UsersRepository usersRepository) {
        this.usersRepository = usersRepository;
    }

    public void saveUserDB(Users newUsers) {
        assert newUsers != null;
        usersRepository.save(newUsers);
    }
    public Users checkCredentials(String email, String password) {
        Users user = usersRepository.checkCredentials(email, password);
        return user;
    }
}
