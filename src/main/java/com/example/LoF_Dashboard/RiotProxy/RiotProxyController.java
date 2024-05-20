package com.example.LoF_Dashboard.RiotProxy;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@RestController
public class RiotProxyController {

    @Value("RGAPI-d6660762-3466-4c4c-a432-552e8816b0f2")
    private String apiKey;

    private final RestTemplate restTemplate;

    public RiotProxyController(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    @GetMapping("/api/get-account/{summonerName}/{tagline}")
    public Object getAccount(@PathVariable String summonerName, @PathVariable String tagline) throws InterruptedException {
        Thread.sleep(5000);
        String url = "https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id/"
                + summonerName + "/" + tagline + "?api_key=" + apiKey;
        return restTemplate.getForObject(url, Object.class);
    }

    //https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/DAVg3J8PjIO2EQRWSWRsEDHDvVOKN09yOcB1MgmMMRKgIbeGGYmUR9mt0B_nCp3qFP7d-0MF1O5lpg?api_key=***
    @GetMapping("/api/get-summoner/{puuid}")
    public Object getSummoner(@PathVariable String puuid) throws InterruptedException {
        Thread.sleep(5000);
        String url = "https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/"
                + puuid + "?api_key=" + apiKey;
        return restTemplate.getForObject(url, Object.class);
    }

    // /lol/league/v4/entries/by-summoner/{encryptedSummonerId}
    @GetMapping("/api/get-league-info/{id}")
    public Object getLeagueInformation(@PathVariable String id) throws InterruptedException {
        Thread.sleep(5000);
        String url = "https://na1.api.riotgames.com/lol/league/v4/entries/by-summoner/"
                + id + "?api_key=" + apiKey;
        return restTemplate.getForObject(url, Object.class);
    }

    // https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/DAVg3J8PjIO2EQRWSWRsEDHDvVOKN09yOcB1MgmMMRKgIbeGGYmUR9mt0B_nCp3qFP7d-0MF1O5lpg/ids?type=ranked&start=0&count=20&api_key=
    @GetMapping("/api/get-matches/{puuid}")
    public Object getRankedMatchHistory(@PathVariable String puuid) throws InterruptedException {
        Thread.sleep(5000);
        String url = "https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/"
                + puuid + "/ids?type=ranked&start=0&count=5&api_key=" + apiKey;
        return restTemplate.getForObject(url, Object.class);
    }

    //https://americas.api.riotgames.com/lol/match/v5/matches/NA1_4969064550?api_key=
    @GetMapping("/api/get-match-info/{matchId}")
    public Object getMatchInformation(@PathVariable String matchId) throws InterruptedException {
        Thread.sleep(5000);
        String url = "https://americas.api.riotgames.com/lol/match/v5/matches/"
                + matchId + "?api_key=" + apiKey;
        return restTemplate.getForObject(url, Object.class);
    }

}
