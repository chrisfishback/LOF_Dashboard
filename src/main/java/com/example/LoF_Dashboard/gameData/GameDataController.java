package com.example.LoF_Dashboard.gameData;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/gameData")
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
}
