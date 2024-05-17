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
}
