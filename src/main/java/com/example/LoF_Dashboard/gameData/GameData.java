package com.example.LoF_Dashboard.gameData;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.*;

@Entity
@Table(name = "game_data")
public class GameData {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "game_id")
    private String gameId;

    @Column(name = "summoner_name")
    private String summonerName;

    @Column(name = "champion_name")
    private String championName;

    @Column(name = "lane")
    private String lane;

    @Column(name = "kills")
    private int kills;

    @Column(name = "deaths")
    private int deaths;

    @Column(name = "assists")
    private int assists;

    @Column(name = "gold_earned")
    private int goldEarned;

    @Column(name = "total_damage")
    private int totalDamage;

    @Column(name = "tower_damage")
    private int towerDamage;

    @Column(name = "pentakills")
    private int pentakills;

    @Column(name = "total_damage_taken")
    private int totalDamageTaken;

    @Column(name = "dragon_kills")
    private int dragonKills;

    @Column(name = "baron_kills")
    private int baronKills;

    @Column(name = "tower_kills")
    private int towerKills;

    @Column(name = "total_teammate_heals")
    private int totalTeammateHeals;

    @Column(name = "vision_score")
    private int visionScore;

    @Column(name = "wards_placed")
    private int wardsPlaced;

    @Column(name = "wards_killed")
    private int wardsKilled;

    @Column(name = "kill_participation")
    private double killParticipation;

    @Column(name = "scuttle_crab_kills")
    private int scuttleCrabKills;

    @Column(name = "total_time_cc_dealt")
    private int totalTimeCCDealt;

    @Column(name = "total_minions_killed")
    private int totalMinionsKilled;

    @Column(name = "inhibitors_killed")
    private int inhibitorsKilled;

    public GameData(String gameId, String summonerName, String championName, String lane, int kills, int deaths, int assists, int goldEarned, int totalDamage, int towerDamage, int pentakills, int totalDamageTaken, int dragonKills, int baronKills, int towerKills, int totalTeammateHeals, int visionScore, int wardsPlaced, int wardsKilled, double killParticipation, int scuttleCrabKills, int totalTimeCCDealt, int totalMinionsKilled, int inhibitorsKilled) {
        this.gameId = gameId;
        this.summonerName = summonerName;
        this.championName = championName;
        this.lane = lane;
        this.kills = kills;
        this.deaths = deaths;
        this.assists = assists;
        this.goldEarned = goldEarned;
        this.totalDamage = totalDamage;
        this.towerDamage = towerDamage;
        this.pentakills = pentakills;
        this.totalDamageTaken = totalDamageTaken;
        this.dragonKills = dragonKills;
        this.baronKills = baronKills;
        this.towerKills = towerKills;
        this.totalTeammateHeals = totalTeammateHeals;
        this.visionScore = visionScore;
        this.wardsPlaced = wardsPlaced;
        this.wardsKilled = wardsKilled;
        this.killParticipation = killParticipation;
        this.scuttleCrabKills = scuttleCrabKills;
        this.totalTimeCCDealt = totalTimeCCDealt;
        this.totalMinionsKilled = totalMinionsKilled;
        this.inhibitorsKilled = inhibitorsKilled;
    }

    public GameData() {
        this.gameId = "gameId";
        this.summonerName = "summonerName";
        this.championName = "championName";
        this.lane = "lane";
        this.kills = 0;
        this.deaths = 0;
        this.assists = 0;
        this.goldEarned = 0;
        this.totalDamage = 0;
        this.towerDamage = 0;
        this.pentakills = 0;
        this.totalDamageTaken = 0;
        this.dragonKills = 0;
        this.baronKills = 0;
        this.towerKills = 0;
        this.totalTeammateHeals = 0;
        this.visionScore = 0;
        this.wardsPlaced = 0;
        this.wardsKilled = 0;
        this.killParticipation = 0.0;
        this.scuttleCrabKills = 0;
        this.totalTimeCCDealt = 0;
        this.totalMinionsKilled = 0;
        this.inhibitorsKilled = 0;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getGameId() {
        return gameId;
    }

    public void setGameId(String gameId) {
        this.gameId = gameId;
    }

    public String getSummonerName() {
        return summonerName;
    }

    public void setSummonerName(String summonerName) {
        this.summonerName = summonerName;
    }

    public String getChampionName() {
        return championName;
    }

    public void setChampionName(String championName) {
        this.championName = championName;
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

    public int getGoldEarned() {
        return goldEarned;
    }

    public void setGoldEarned(int goldEarned) {
        this.goldEarned = goldEarned;
    }

    public int getTotalDamage() {
        return totalDamage;
    }

    public void setTotalDamage(int totalDamage) {
        this.totalDamage = totalDamage;
    }

    public int getTowerDamage() {
        return towerDamage;
    }

    public void setTowerDamage(int towerDamage) {
        this.towerDamage = towerDamage;
    }

    public int getPentakills() {
        return pentakills;
    }

    public void setPentakills(int pentakills) {
        this.pentakills = pentakills;
    }

    public int getTotalDamageTaken() {
        return totalDamageTaken;
    }

    public void setTotalDamageTaken(int totalDamageTaken) {
        this.totalDamageTaken = totalDamageTaken;
    }

    public int getDragonKills() {
        return dragonKills;
    }

    public void setDragonKills(int dragonKills) {
        this.dragonKills = dragonKills;
    }

    public int getBaronKills() {
        return baronKills;
    }

    public void setBaronKills(int baronKills) {
        this.baronKills = baronKills;
    }

    public int getTowerKills() {
        return towerKills;
    }

    public void setTowerKills(int towerKills) {
        this.towerKills = towerKills;
    }

    public int getTotalTeammateHeals() {
        return totalTeammateHeals;
    }

    public void setTotalTeammateHeals(int totalTeammateHeals) {
        this.totalTeammateHeals = totalTeammateHeals;
    }

    public int getVisionScore() {
        return visionScore;
    }

    public void setVisionScore(int visionScore) {
        this.visionScore = visionScore;
    }

    public int getWardsPlaced() {
        return wardsPlaced;
    }

    public void setWardsPlaced(int wardsPlaced) {
        this.wardsPlaced = wardsPlaced;
    }

    public int getWardsKilled() {
        return wardsKilled;
    }

    public void setWardsKilled(int wardsKilled) {
        this.wardsKilled = wardsKilled;
    }

    public double getKillParticipation() {
        return killParticipation;
    }

    public void setKillParticipation(double killParticipation) {
        this.killParticipation = killParticipation;
    }

    public int getScuttleCrabKills() {
        return scuttleCrabKills;
    }

    public void setScuttleCrabKills(int scuttleCrabKills) {
        this.scuttleCrabKills = scuttleCrabKills;
    }

    public int getTotalTimeCCDealt() {
        return totalTimeCCDealt;
    }

    public void setTotalTimeCCDealt(int totalTimeCCDealt) {
        this.totalTimeCCDealt = totalTimeCCDealt;
    }

    public int getTotalMinionsKilled() {
        return totalMinionsKilled;
    }

    public void setTotalMinionsKilled(int totalMinionsKilled) {
        this.totalMinionsKilled = totalMinionsKilled;
    }

    public int getInhibitorsKilled() {
        return inhibitorsKilled;
    }

    public void setInhibitorsKilled(int inhibitorsKilled) {
        this.inhibitorsKilled = inhibitorsKilled;
    }
}