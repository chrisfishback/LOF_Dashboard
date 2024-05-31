package com.example.LoF_Dashboard.RankedMatch;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.client.RestTemplate;

import java.util.*;

@Service
public class RankedMatchService {

    private RankedMatchRepository rankedMatchRepository;

    @Value("RGAPI-d6660762-3466-4c4c-a432-552e8816b0f2")
    private String apiKey;

    private final RestTemplate restTemplate;

    public RankedMatchService(RankedMatchRepository rankedMatchRepository, RestTemplate restTemplate) {
        this.rankedMatchRepository = rankedMatchRepository;
        this.restTemplate = restTemplate;
    }

    public List<RankedMatch> getRankedMatchHistoryFromTable(String summonerName) {
        return rankedMatchRepository.findAllBySummonerName(summonerName);
    }

    @Transactional
    public List<RankedMatch> createRankedMatchHistory(String summonerName, String puuid) throws InterruptedException {
        List<String> matchIds = fetchLatestRankedMatchIds(puuid);

        rankedMatchRepository.deleteAllBySummonerName(summonerName);

        List<RankedMatch> matchesInfo = fetchAndSaveMatchDetails(matchIds, summonerName);

        return matchesInfo;
    }

    private List<String> fetchLatestRankedMatchIds(String puuid) throws InterruptedException {
        String getMatchIdsUrl = "https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/"
                + puuid + "/ids?type=ranked&start=0&count=5&api_key=" + apiKey;

        Thread.sleep(15000);
        return (List<String>) restTemplate.getForObject(getMatchIdsUrl, List.class);
    }

    private List<RankedMatch> fetchAndSaveMatchDetails(List<String> matchIds, String summonerName) throws InterruptedException {
        List<RankedMatch> matchesInfo = new ArrayList<>();

        for (String matchId : matchIds) {
            RankedMatch tempMatch = getMatchInfo(matchId, summonerName);
            matchesInfo.add(tempMatch);
        }

        rankedMatchRepository.saveAll(matchesInfo);
        return matchesInfo;
    }

    public RankedMatch getMatchInfo(String matchId, String summonerName) throws InterruptedException {
        Thread.sleep(15000);

        RankedMatch tempMatch = new RankedMatch();

        int index = 0;
        int playerNumber = -1;

        String getMatchInfoUrl = "https://americas.api.riotgames.com/lol/match/v5/matches/"
                + matchId + "?api_key=" + apiKey;

        Map<String, Object> fetchedMatchInfo = restTemplate.getForObject(getMatchInfoUrl, Map.class);

        Map<String, Object> participants = (Map<String, Object>) fetchedMatchInfo.get("info");
        for (Map<String, Object> player : (List<Map<String, Object>>) participants.get("participants")) {
            String playerSummonerName = (String) player.get("summonerName");
            if (playerSummonerName != null && playerSummonerName.equalsIgnoreCase(summonerName)) {
                playerNumber = index;
                tempMatch.setChampion((String) player.get("championName"));
                tempMatch.setWin((boolean) player.get("win"));
                tempMatch.setLane((String) player.get("lane"));
                tempMatch.setKills((int) player.get("kills"));
                tempMatch.setDeaths((int) player.get("deaths"));
                tempMatch.setAssists((int) player.get("assists"));
                tempMatch.setSummonerName(summonerName);
                break;
            }
            index++;
        }

        return tempMatch;
    }
}
