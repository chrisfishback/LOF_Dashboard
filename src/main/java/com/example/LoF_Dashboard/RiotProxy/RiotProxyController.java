package com.example.LoF_Dashboard.RiotProxy;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@RestController
public class RiotProxyController {

    @Value("${riot.api.key}")
    private String apiKey;

    private final RestTemplate restTemplate;

    public RiotProxyController(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    @GetMapping("/api/get-account/{summonerName}/{tagline}")
    public Object getAccount(@PathVariable String summonerName, @PathVariable String tagline) {
        String url = "https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id/"
                + summonerName + "/" + tagline + "?api_key=" + apiKey;
        return restTemplate.getForObject(url, Object.class);
    }

    //https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/DAVg3J8PjIO2EQRWSWRsEDHDvVOKN09yOcB1MgmMMRKgIbeGGYmUR9mt0B_nCp3qFP7d-0MF1O5lpg?api_key=***
    @GetMapping("/api/get-summoner/{puuid}")
    public Object getSummoner(@PathVariable String puuid) {
        String url = "https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/"
                + puuid + "?api_key=" + apiKey;
        return restTemplate.getForObject(url, Object.class);
    }
}
