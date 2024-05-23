package com.example.LoF_Dashboard.player;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
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

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void deletePlayerById(@PathVariable Long id) {
        playerRepository.deleteById(id);
    }

    @PutMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public Player replaceShortcut(@RequestBody Player newPlayer, @PathVariable Long id) {
        return playerRepository.findById(id)
                .map(player -> {
                    player.setSummonerName(newPlayer.getSummonerName());
                    player.setTagline(newPlayer.getTagline());
                    player.setTeam(newPlayer.getTeam());
                    return playerRepository.save(player);
                })
                .orElseGet(() -> {
                    newPlayer.setId(id);
                    return playerRepository.save(newPlayer);
                });
    }


}
