export function combineBySummonerName(data: summonerStats[]): AllSummonerStatsType {
    const result: { [key: string]: summonerStats } = {};

    for (const item of data) {
        const { summonerName } = item;

        if (!result[summonerName]) {
            result[summonerName] = {
                summonerName,
                kills: 0,
                deaths: 0,
                assists: 0,
                goldEarned: 0,
                totalDamage: 0,
                towerDamage: 0,
                totalDamageTaken: 0,
                visionScore: 0,
                wardsPlaced: 0,
                wardsKilled: 0,
                killParticipation: 0,
                totalTimeCCDealt: 0,
                totalMinionsKilled: 0,
            };
        }

        result[summonerName].kills += item.kills;
        result[summonerName].deaths += item.deaths;
        result[summonerName].assists += item.assists;
        result[summonerName].goldEarned += item.goldEarned;
        result[summonerName].totalDamage += item.totalDamage;
        result[summonerName].towerDamage += item.towerDamage;
        result[summonerName].totalDamageTaken += item.totalDamageTaken;
        result[summonerName].visionScore += item.visionScore;
        result[summonerName].wardsPlaced += item.wardsPlaced;
        result[summonerName].wardsKilled += item.wardsKilled;

        //this is very wrong and will need to be improved
        result[summonerName].killParticipation = (result[summonerName].killParticipation + item.killParticipation) / 2;

        result[summonerName].totalTimeCCDealt += item.totalTimeCCDealt;
        result[summonerName].totalMinionsKilled += item.totalMinionsKilled;
    }

    return { totalsPerSummoner: Object.values(result) };
}

export type summonerStats = {
    summonerName: string;
    kills: number;
    deaths: number;
    assists: number;
    goldEarned: number;
    totalDamage: number;
    towerDamage: number;
    totalDamageTaken: number;
    visionScore: number;
    wardsPlaced: number;
    wardsKilled: number;
    killParticipation: number;
    totalTimeCCDealt: number;
    totalMinionsKilled: number;
}

export type AllSummonerStatsType = {
    totalsPerSummoner: summonerStats[];
}