package com.example.LoF_Dashboard.RankedMatch;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

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

//    public List<RankedMatch> getAllRankedMatches(String puuid) throws InterruptedException {
//        var obj = getAccount(summonerName, tagline);
//        var id = (String) obj.get ("id");
//        return new ArrayList<>();
//    }
//
//    public Object getRankedMatchHistory(String puuid) throws InterruptedException {
//        Thread.sleep(5000);
//        String url = "https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/"
//                + puuid + "/ids?type=ranked&start=0&count=5&api_key=" + apiKey;
//        Object obj = restTemplate.getForObject(url, Object.class);
//        return obj;
//    }
//
//    public Object getMatchInformation(String matchId) throws InterruptedException {
//        Thread.sleep(5000);
//        String url = "https://americas.api.riotgames.com/lol/match/v5/matches/"
//                + matchId + "?api_key=" + apiKey;
//        Object obj = restTemplate.getForObject(url, Object.class);
//        return obj;
//    }
}
