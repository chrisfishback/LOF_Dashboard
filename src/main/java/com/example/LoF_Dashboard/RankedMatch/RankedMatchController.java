package com.example.LoF_Dashboard.RankedMatch;

import com.example.LoF_Dashboard.player.Player;
import com.example.LoF_Dashboard.player.PlayerRepository;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/ranked-matches")
public class RankedMatchController {

    private final RankedMatchService rankedMatchService;

    public RankedMatchController(RankedMatchService rankedMatchService) {
        this.rankedMatchService = rankedMatchService;
    }

//    @GetMapping("/{summonerName}/{tagline}")
//    @ResponseStatus(HttpStatus.ACCEPTED)
//    public List<RankedMatch> getAllRankedMatch(@PathVariable String summonerName, @PathVariable String tagline) {
//        return rankedMatchService.getAllRankedMatches(summonerName, tagline);
//    }

//    @GetMapping("/api/get-account/{summonerName}/{tagline}")
//    public Object getAccount(@PathVariable String summonerName, @PathVariable String tagline) throws InterruptedException {
//        Thread.sleep(5000);
//        String url = "https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id/"
//                + summonerName + "/" + tagline + "?api_key=" + apiKey;
//        Object obj = restTemplate.getForObject(url, Object.class);
//        return obj;
//    }


//    @PostMapping
//    @ResponseStatus(HttpStatus.CREATED)
//    public RankedMatch createRankedMatch(@RequestBody RankedMatch rankedMatch) {
//        return rankedMatchRepository.save(rankedMatch);
//    }
//
//    @GetMapping
//    @ResponseStatus(HttpStatus.ACCEPTED)
//    public List<RankedMatch> getAllRankedMatch() {
//        return rankedMatchRepository.findAll();
//    }

//    @DeleteMapping
//    @ResponseStatus(HttpStatus.ACCEPTED)
}
