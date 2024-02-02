package server.postgres.players;

import jakarta.persistence.*;

import java.math.BigDecimal;
import java.util.Date;


@Entity
@Table(name = "players")
public class Players {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "player_id")
    private Long playerId;

    @Column(name = "first_name", length = 255)
    private String firstName;

    @Column(name = "last_name", length = 255)
    private String lastName;

    @Column(name = "name", length = 255)
    private String name;

    @Column(name = "last_season")
    private int lastSeason;

    @Column(name = "current_club_id")
    private int currentClubId;

    @Column(name = "player_code", length = 50)
    private String playerCode;

    @Column(name = "country_of_birth", length = 100)
    private String countryOfBirth;

    @Column(name = "city_of_birth", length = 100)
    private String cityOfBirth;

    @Column(name = "country_of_citizenship", length = 100)
    private String countryOfCitizenship;

    @Column(name = "date_of_birth")
    @Temporal(TemporalType.DATE)
    private Date dateOfBirth;

    @Column(name = "sub_position", length = 50)
    private String subPosition;

    @Column(name = "position", length = 50)
    private String position;

    @Column(name = "foot", length = 10)
    private String foot;

    @Column(name = "height_in_cm")
    private int heightInCm;

    @Column(name = "market_value_in_eur", precision = 15, scale = 2)
    private BigDecimal marketValueInEur;

    @Column(name = "highest_market_value_in_eur", precision = 15, scale = 2)
    private BigDecimal highestMarketValueInEur;

    @Column(name = "contract_expiration_date")
    @Temporal(TemporalType.DATE)
    private Date contractExpirationDate;

    @Column(name = "agent_name", length = 255)
    private String agentName;

    @Column(name = "image_url", length = 255)
    private String imageUrl;

    @Column(name = "url", length = 255)
    private String url;

    @Column(name = "current_club_domestic_competition_id", length = 10)
    private String currentClubDomesticCompetitionId;

    @Column(name = "current_club_name", length = 255)
    private String currentClubName;

    // Costruttore vuoto
    public Players() {
    }

    public Long getPlayerId() {
        return playerId;
    }

    public void setPlayerId(Long playerId) {
        this.playerId = playerId;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getLastSeason() {
        return lastSeason;
    }

    public void setLastSeason(int lastSeason) {
        this.lastSeason = lastSeason;
    }

    public int getCurrentClubId() {
        return currentClubId;
    }

    public void setCurrentClubId(int currentClubId) {
        this.currentClubId = currentClubId;
    }

    public String getPlayerCode() {
        return playerCode;
    }

    public void setPlayerCode(String playerCode) {
        this.playerCode = playerCode;
    }

    public String getCountryOfBirth() {
        return countryOfBirth;
    }

    public void setCountryOfBirth(String countryOfBirth) {
        this.countryOfBirth = countryOfBirth;
    }

    public String getCityOfBirth() {
        return cityOfBirth;
    }

    public void setCityOfBirth(String cityOfBirth) {
        this.cityOfBirth = cityOfBirth;
    }

    public String getCountryOfCitizenship() {
        return countryOfCitizenship;
    }

    public void setCountryOfCitizenship(String countryOfCitizenship) {
        this.countryOfCitizenship = countryOfCitizenship;
    }

    public Date getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(Date dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public String getSubPosition() {
        return subPosition;
    }

    public void setSubPosition(String subPosition) {
        this.subPosition = subPosition;
    }

    public String getPosition() {
        return position;
    }

    public void setPosition(String position) {
        this.position = position;
    }

    public String getFoot() {
        return foot;
    }

    public void setFoot(String foot) {
        this.foot = foot;
    }

    public int getHeightInCm() {
        return heightInCm;
    }

    public void setHeightInCm(int heightInCm) {
        this.heightInCm = heightInCm;
    }

    public BigDecimal getMarketValueInEur() {
        return marketValueInEur;
    }

    public void setMarketValueInEur(BigDecimal marketValueInEur) {
        this.marketValueInEur = marketValueInEur;
    }

    public BigDecimal getHighestMarketValueInEur() {
        return highestMarketValueInEur;
    }

    public void setHighestMarketValueInEur(BigDecimal highestMarketValueInEur) {
        this.highestMarketValueInEur = highestMarketValueInEur;
    }

    public Date getContractExpirationDate() {
        return contractExpirationDate;
    }

    public void setContractExpirationDate(Date contractExpirationDate) {
        this.contractExpirationDate = contractExpirationDate;
    }

    public String getAgentName() {
        return agentName;
    }

    public void setAgentName(String agentName) {
        this.agentName = agentName;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getCurrentClubDomesticCompetitionId() {
        return currentClubDomesticCompetitionId;
    }

    public void setCurrentClubDomesticCompetitionId(String currentClubDomesticCompetitionId) {
        this.currentClubDomesticCompetitionId = currentClubDomesticCompetitionId;
    }

    public String getCurrentClubName() {
        return currentClubName;
    }

    public void setCurrentClubName(String currentClubName) {
        this.currentClubName = currentClubName;
    }
}