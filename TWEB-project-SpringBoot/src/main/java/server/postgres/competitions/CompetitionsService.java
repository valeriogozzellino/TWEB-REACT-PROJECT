package server.postgres.competitions;

import org.springframework.stereotype.Service;

@Service
public class CompetitionsService {
    public final CompetitionsRepository competitionsRepository;

    public CompetitionsService(CompetitionsRepository competitionsRepository) {
        this.competitionsRepository = competitionsRepository;
    }

    //inserire le funzioni che gestiscono in DB
}
