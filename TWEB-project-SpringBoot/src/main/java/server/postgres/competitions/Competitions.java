package server.postgres.competitions;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;


@Entity
@Table(name = "competitions")
public class Competitions {
    @Id
    @Column(name = "competition_id", length = 50)
    private String competitionId;

    @Column(name = "competition_code", length = 50)
    private String competitionCode;

    @Column(name = "name", length = 255)
    private String name;

    @Column(name = "sub_type", length = 50)
    private String subType;

    @Column(name = "type", length = 50)
    private String type;

    @Column(name = "country_id")
    private int countryId;

    @Column(name = "country_name", length = 255)
    private String countryName;

    @Column(name = "domestic_league_code", length = 50)
    private String domesticLeagueCode;

    @Column(name = "confederation", length = 50)
    private String confederation;

    @Column(name = "url", length = 255)
    private String url;

    // Costruttore vuoto
    public Competitions() {
    }

    // Getter e Setter per ogni campo

    public String getCompetitionId() {
        return competitionId;
    }

    public void setCompetitionId(String competitionId) {
        this.competitionId = competitionId;
    }

    public String getCompetitionCode() {
        return competitionCode;
    }

    public void setCompetitionCode(String competitionCode) {
        this.competitionCode = competitionCode;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSubType() {
        return subType;
    }

    public void setSubType(String subType) {
        this.subType = subType;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public int getCountryId() {
        return countryId;
    }

    public void setCountryId(int countryId) {
        this.countryId = countryId;
    }

    public String getCountryName() {
        return countryName;
    }

    public void setCountryName(String countryName) {
        this.countryName = countryName;
    }

    public String getDomesticLeagueCode() {
        return domesticLeagueCode;
    }

    public void setDomesticLeagueCode(String domesticLeagueCode) {
        this.domesticLeagueCode = domesticLeagueCode;
    }

    public String getConfederation() {
        return confederation;
    }

    public void setConfederation(String confederation) {
        this.confederation = confederation;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

}
