package com.example.LoF_Dashboard.player;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.resource.ResourceUrlProvider;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/player")
public class PlayerController {

    private final PlayerRepository playerRepository;

    public PlayerController(PlayerRepository playerRepository) {
        this.playerRepository = playerRepository;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Player createPlayer(@RequestBody Player player) {
        return playerRepository.save(player);
    }

    @GetMapping
    @ResponseStatus(HttpStatus.ACCEPTED)
    public List<Player> getAllPlayer() {
        return playerRepository.findAll();
    }
}
