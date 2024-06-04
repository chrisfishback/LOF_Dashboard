package com.example.LoF_Dashboard.gameData;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/game-data")
public class GameDataController {

    private GameDataService gameDataService;

    public GameDataController(GameDataService gameDataService) {
        this.gameDataService = gameDataService;
    }

    @PostMapping("/{gameID}")
    @ResponseStatus(HttpStatus.CREATED)
    public void createGameData(@PathVariable String gameID) {
        gameDataService.createGameData(gameID);
    }

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<GameData> getGameData() {
        return gameDataService.getGameData();
    }
}
