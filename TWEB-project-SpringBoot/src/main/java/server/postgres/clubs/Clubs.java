package server.postgres.clubs;

public class Clubs {
    private int clubId;
    private String clubCode;
    private String name;
    private int domesticCompetitionId;
    private double totalMarketValue;
    private int squadSize;
    private double averageAge;
    private int foreignersNumber;
    private double foreignersPercentage;
    private int nationalTeamPlayers;
    private String stadiumName;
    private int stadiumSeats;
    private double netTransferRecord;
    private String coachName;
    private int lastSeason;
    private String url;

    // Costruttore vuoto
    public Clubs() {
    }

    // Getter e Setter per ogni campo

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

    public int getDomesticCompetitionId() {
        return domesticCompetitionId;
    }

    public void setDomesticCompetitionId(int domesticCompetitionId) {
        this.domesticCompetitionId = domesticCompetitionId;
    }

    public double getTotalMarketValue() {
        return totalMarketValue;
    }

    public void setTotalMarketValue(double totalMarketValue) {
        this.totalMarketValue = totalMarketValue;
    }

    public int getSquadSize() {
        return squadSize;
    }

    public void setSquadSize(int squadSize) {
        this.squadSize = squadSize;
    }

    public double getAverageAge() {
        return averageAge;
    }

    public void setAverageAge(double averageAge) {
        this.averageAge = averageAge;
    }

    public int getForeignersNumber() {
        return foreignersNumber;
    }

    public void setForeignersNumber(int foreignersNumber) {
        this.foreignersNumber = foreignersNumber;
    }

    public double getForeignersPercentage() {
        return foreignersPercentage;
    }

    public void setForeignersPercentage(double foreignersPercentage) {
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

    public double getNetTransferRecord() {
        return netTransferRecord;
    }

    public void setNetTransferRecord(double netTransferRecord) {
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
