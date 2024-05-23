package com.example.LoF_Dashboard.RankedMatch;

import com.example.LoF_Dashboard.player.Player;
import com.example.LoF_Dashboard.player.PlayerRepository;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/ranked-match")
public class RankedMatchController {

    private final RankedMatchRepository rankedMatchRepository;

    public RankedMatchController(RankedMatchRepository rankedMatchRepository) {
        this.rankedMatchRepository = rankedMatchRepository;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public RankedMatch createRankedMatch(@RequestBody RankedMatch rankedMatch) {
        return rankedMatchRepository.save(rankedMatch);
    }

    @GetMapping
    @ResponseStatus(HttpStatus.ACCEPTED)
    public List<RankedMatch> getAllRankedMatch() {
        return rankedMatchRepository.findAll();
    }
}
