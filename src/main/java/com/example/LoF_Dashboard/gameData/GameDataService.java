package com.example.LoF_Dashboard.gameData;

import com.example.LoF_Dashboard.game.GameRepository;
import org.springframework.stereotype.Service;

@Service
public class GameDataService {

    private GameDataRepository gameDataRepository;

    public GameDataService(GameDataRepository gameDataRepository) {
        this.gameDataRepository = gameDataRepository;
    }

    public void createGameData(String gameId) {

    }
}
