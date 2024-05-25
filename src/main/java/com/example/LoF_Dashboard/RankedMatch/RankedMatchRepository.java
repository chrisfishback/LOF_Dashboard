package com.example.LoF_Dashboard.RankedMatch;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RankedMatchRepository extends JpaRepository<RankedMatch, Long> {
    List<RankedMatch> findAllBySummonerName(String summonerName);

    void deleteAllBySummonerName(String summonerName);
}
