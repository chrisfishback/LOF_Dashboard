package com.example.LoF_Dashboard.gameData;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.*;

import lombok.Getter;
import lombok.Setter;


@Entity
@Getter
@Setter
@Table(name = "game_data")
public class GameData {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "game_id")
    private String gameId;

    @Column(name = "summoner_id")
    private String summonerId;

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

    public GameData(String gameId, String summonerId, String championName, String lane, int kills, int deaths, int assists, int goldEarned, int totalDamage, int towerDamage, int pentakills, int totalDamageTaken, int dragonKills, int baronKills, int towerKills, int totalTeammateHeals, int visionScore, int wardsPlaced, int wardsKilled, double killParticipation, int scuttleCrabKills, int totalTimeCCDealt) {
        this.gameId = gameId;
        this.summonerId = summonerId;
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
    }

    public GameData() {
        this.gameId = "gameId";
        this.summonerId = "summonerId";
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
    }
}