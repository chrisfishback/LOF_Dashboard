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

    //get already saved matches by summoner name
    @GetMapping("/{summoner}")
    @ResponseStatus(HttpStatus.OK)
    public List<RankedMatch> getRankedMatchHistoryFromTable(@PathVariable String summoner) throws InterruptedException {
        List<RankedMatch> obj = rankedMatchService.getRankedMatchHistoryFromTable(summoner);
        return obj;
    }

    //get, delete by summoner, and save updated set of matches - from API by puuid and summoner name
    @GetMapping("/{summoner}/{puuid}")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public List<RankedMatch> createRankedMatchHistory(@PathVariable String summoner, @PathVariable String puuid) throws InterruptedException {
        List<RankedMatch> matchHistory = rankedMatchService.createRankedMatchHistory(summoner, puuid);
        return matchHistory;
    }
    //curl -X GET http://localhost:8080/api/ranked-matches/TheBigHook/DAVg3J8PjIO2EQRWSWRsEDHDvVOKN09yOcB1MgmMMRKgIbeGGYmUR9mt0B_nCp3qFP7d-0MF1O5lpg

}
