package com.example.LoF_Dashboard.RankedMatch;

import jakarta.persistence.*;

@Entity
@Table(name = "RANKED_MATCH")
public class RankedMatch {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String summonerName;
    private String champion;
    private boolean win;
    private String lane;
    private int kills;
    private int deaths;
    private int assists;

    public RankedMatch(String summonerName, String champion, boolean win, String lane, int kills, int deaths, int assists) {
        this.summonerName = summonerName;
        this.champion = champion;
        this.win = win;
        this.lane = lane;
        this.kills = kills;
        this.deaths = deaths;
        this.assists = assists;
    }

    public RankedMatch() {
        this.summonerName = "summonerName";
        this.champion = "champion";
        this.win = false;
        this.lane = "lane";
        this.kills = -1;
        this.deaths = -1;
        this.assists = -1;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSummonerName() {
        return summonerName;
    }

    public void setSummonerName(String summonerName) {
        this.summonerName = summonerName;
    }

    public String getChampion() {
        return champion;
    }

    public void setChampion(String champion) {
        this.champion = champion;
    }

    public boolean isWin() {
        return win;
    }

    public void setWin(boolean win) {
        this.win = win;
    }

    public String getLane() {
        return lane;
    }

    public void setLane(String lane) {
        this.lane = lane;
    }

    public int getKills() {
        return kills;
    }

    public void setKills(int kills) {
        this.kills = kills;
    }

    public int getDeaths() {
        return deaths;
    }

    public void setDeaths(int deaths) {
        this.deaths = deaths;
    }

    public int getAssists() {
        return assists;
    }

    public void setAssists(int assists) {
        this.assists = assists;
    }
}
