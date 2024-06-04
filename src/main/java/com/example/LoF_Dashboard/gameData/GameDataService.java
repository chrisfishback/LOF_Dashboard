package com.example.LoF_Dashboard.gameData;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.util.List;
import java.util.Map;

@Service
public class GameDataService {

    private final RestTemplate restTemplate;

    @Value("RGAPI-d6660762-3466-4c4c-a432-552e8816b0f2")
    private String apiKey;

    private GameDataRepository gameDataRepository;

    public GameDataService(GameDataRepository gameDataRepository, RestTemplate restTemplate) {
        this.gameDataRepository = gameDataRepository;
        this.restTemplate = restTemplate;
    }

    public List<GameData> getGameData() {
        return gameDataRepository.findAll();
    }

    public void createGameData(String gameId) {
        String url = "https://americas.api.riotgames.com/lol/match/v5/matches/" + gameId + "?api_key=" + apiKey;
        Map<String, Object> fetchedMatchData = getMatchData(url);

        if (fetchedMatchData != null) {
            Map<String, Object> participants = (Map<String, Object>) fetchedMatchData.get("info");
            for (Map<String, Object> player : (List<Map<String, Object>>) participants.get("participants")) {
                GameData gameData = parseParticipantData(player, gameId);
                gameDataRepository.save(gameData);
            }
        }
    }

    private Map<String, Object> getMatchData(String url) {
        try {
            return restTemplate.getForObject(url, Map.class);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    private GameData parseParticipantData(Map<String, Object> player, String gameId) {
        GameData tempGameData = new GameData();
        tempGameData.setGameId(gameId);
        tempGameData.setSummonerName((String) player.get("summonerName"));
        tempGameData.setChampionName((String) player.get("championName"));
        tempGameData.setLane((String) player.get("lane"));
        tempGameData.setKills(((Number) player.get("kills")).intValue());
        tempGameData.setDeaths(((Number) player.get("deaths")).intValue());
        tempGameData.setAssists(((Number) player.get("assists")).intValue());
        tempGameData.setGoldEarned(((Number) player.get("goldEarned")).intValue());
        tempGameData.setTotalDamage(((Number) player.get("totalDamageDealtToChampions")).intValue());
        tempGameData.setTowerDamage(((Number) player.get("damageDealtToTurrets")).intValue());
        tempGameData.setPentakills(((Number) player.get("pentaKills")).intValue());
        tempGameData.setTotalDamageTaken(((Number) player.get("totalDamageTaken")).intValue());
        tempGameData.setDragonKills(((Number) player.get("dragonKills")).intValue());
        tempGameData.setBaronKills(((Number) player.get("baronKills")).intValue());
        tempGameData.setTowerKills(((Number) player.get("turretKills")).intValue());
        tempGameData.setTotalTeammateHeals(((Number) player.get("totalHealsOnTeammates")).intValue());
        tempGameData.setVisionScore(((Number) player.get("visionScore")).intValue());
        tempGameData.setWardsPlaced(((Number) player.get("wardsPlaced")).intValue());
        tempGameData.setWardsKilled(((Number) player.get("wardsKilled")).intValue());
        tempGameData.setKillParticipation(((Number) ((Map<String, Object>) player.get("challenges")).get("killParticipation")).doubleValue());
        tempGameData.setScuttleCrabKills(((Number) ((Map<String, Object>) player.get("challenges")).get("scuttleCrabKills")).intValue());
        tempGameData.setTotalTimeCCDealt(((Number) player.get("totalTimeCCDealt")).intValue());
        tempGameData.setTotalMinionsKilled(((Number) player.get("totalMinionsKilled")).intValue());
        tempGameData.setInhibitorsKilled(((Number) player.get("inhibitorKills")).intValue());
        return tempGameData;
    }

}
