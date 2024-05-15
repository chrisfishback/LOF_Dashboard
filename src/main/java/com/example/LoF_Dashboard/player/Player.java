package com.example.LoF_Dashboard.player;

import jakarta.persistence.*;

@Entity
@Table(name = "PLAYER")
public class Player {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String puuid;
    private String summonerId;
    private String summonerName;
    private String team;

    public Player(String puuid, String summonerId, String summonerName, String team) {
        this.puuid = puuid;
        this.summonerId = summonerId;
        this.summonerName = summonerName;
        this.team = team;
    }

    public Player() {
        this.puuid = "puuid";
        this.summonerId = "summonerId";
        this.summonerName = "summonerName";
        this.team = "team";
    }

    public String getPuuid() {
        return puuid;
    }

    public void setPuuid(String puuid) {
        this.puuid = puuid;
    }

    public String getSummonerId() {
        return summonerId;
    }

    public void setSummonerId(String summonerId) {
        this.summonerId = summonerId;
    }

    public String getSummonerName() {
        return summonerName;
    }

    public void setSummonerName(String summonerName) {
        this.summonerName = summonerName;
    }

    public String getTeam() {
        return team;
    }

    public void setTeam(String team) {
        this.team = team;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}
