package server.postgres.clubs;

import jakarta.persistence.*;

import java.math.BigDecimal;

@Entity
@Table(name= "clubs")
public class Clubs {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "club_id")
    private int clubId;
    @Column(name = "club_code", length = 50)
    private String clubCode;
    @Column(name = "name", length = 255)
    private String name;
    @Column(name = "domestic_competition_id", length = 50)
    private String domesticCompetitionId;
    @Column(name = "total_market_value", precision = 15, scale = 2)
    private BigDecimal totalMarketValue;
    @Column(name = "squad_size")
    private int squadSize;
    @Column(name = "average_age", precision = 5, scale = 2)
    private BigDecimal averageAge;
    @Column(name = "foreigners_number")
    private int foreignersNumber;
    @Column(name = "foreigners_percentage", precision = 5, scale = 2)
    private BigDecimal foreignersPercentage;
    @Column(name = "national_team_players")
    private int nationalTeamPlayers;
    @Column(name = "stadium_name", length = 255)
    private String stadiumName;
    @Column(name = "stadium_seats")
    private int stadiumSeats;
    @Column(name = "net_transfer_record", length = 255)
    private String netTransferRecord;
    @Column(name = "coach_name", length = 255)
    private String coachName;
    @Column(name = "last_season")
    private int lastSeason;
    @Column(name = "url", length = 255)
    private String url;

    public Clubs() {
    }


    public int getClubId() {
        return clubId;
    }

    public void setClubId(int clubId) {
        this.clubId = clubId;
    }

    public String getClubCode() {
        return clubCode;
    }

    public void setClubCode(String clubCode) {
        this.clubCode = clubCode;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDomesticCompetitionId() {
        return domesticCompetitionId;
    }

    public void setDomesticCompetitionId(String domesticCompetitionId) {
        this.domesticCompetitionId = domesticCompetitionId;
    }

    public BigDecimal getTotalMarketValue() {
        return totalMarketValue;
    }

    public void setTotalMarketValue(BigDecimal totalMarketValue) {
        this.totalMarketValue = totalMarketValue;
    }

    public int getSquadSize() {
        return squadSize;
    }

    public void setSquadSize(int squadSize) {
        this.squadSize = squadSize;
    }

    public BigDecimal getAverageAge() {
        return averageAge;
    }

    public void setAverageAge(BigDecimal averageAge) {
        this.averageAge = averageAge;
    }

    public int getForeignersNumber() {
        return foreignersNumber;
    }

    public void setForeignersNumber(int foreignersNumber) {
        this.foreignersNumber = foreignersNumber;
    }

    public BigDecimal getForeignersPercentage() {
        return foreignersPercentage;
    }

    public void setForeignersPercentage(BigDecimal foreignersPercentage) {
        this.foreignersPercentage = foreignersPercentage;
    }

    public int getNationalTeamPlayers() {
        return nationalTeamPlayers;
    }

    public void setNationalTeamPlayers(int nationalTeamPlayers) {
        this.nationalTeamPlayers = nationalTeamPlayers;
    }

    public String getStadiumName() {
        return stadiumName;
    }

    public void setStadiumName(String stadiumName) {
        this.stadiumName = stadiumName;
    }

    public int getStadiumSeats() {
        return stadiumSeats;
    }

    public void setStadiumSeats(int stadiumSeats) {
        this.stadiumSeats = stadiumSeats;
    }

    public String getNetTransferRecord() {
        return netTransferRecord;
    }

    public void setNetTransferRecord(String netTransferRecord) {
        this.netTransferRecord = netTransferRecord;
    }

    public String getCoachName() {
        return coachName;
    }

    public void setCoachName(String coachName) {
        this.coachName = coachName;
    }

    public int getLastSeason() {
        return lastSeason;
    }

    public void setLastSeason(int lastSeason) {
        this.lastSeason = lastSeason;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }
}
