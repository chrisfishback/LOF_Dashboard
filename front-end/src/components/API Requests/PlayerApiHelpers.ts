import axios, {AxiosResponse} from "axios";
import {GameInfo} from "../PlayerGameInfo.tsx";
import {PlayerInfo} from "../PlayerPage.tsx";

let tempInfo : PlayerInfo = {
    summonerName: "temp",
    rank: "temp",
    prevGames: [],
    summonerLevel: "-1",
}

function getAccountInformation(summonerName: string, tagline: string): PlayerInfo | null {
    // https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id/thebighook/NA1?api_key=***

    tempInfo.summonerName = summonerName;

    const puuid_url = `/api/get-account/${summonerName}/${tagline}`;

    axios.get(puuid_url)
        .then((response: AxiosResponse) => {
            console.log("Request: getAccountInformation");
            let puuid = response.data.puuid;
            getSummonerInformation(puuid);
        })
        .catch((error) => {
            console.error('Error fetching summoner data: ', error);
        });

    return tempInfo;
}

function getSummonerInformation(init_puuid: string) {
    const summonerId_url = `/api/get-summoner/${init_puuid}`;

    axios.get(summonerId_url)
        .then((response: AxiosResponse) => {
            console.log("Request: getSummonerInformation");
            let summonerId = response.data.id;
            tempInfo.summonerLevel = response.data.summonerLevel;
            getLeagueInformation(summonerId, init_puuid);
        })
        .catch((error) => {
            console.error('Error fetching account data: ', error);
        });
}

function getLeagueInformation(init_id: string, init_puuid: string) {
    // /lol/league/v4/entries/by-summoner/{encryptedSummonerId}

    const leagueInfo_url = `/api/get-league-info/${init_id}`

    axios.get(leagueInfo_url)
        .then((response: AxiosResponse) => {
            console.log("Request: getLeagueInformation");
            if (response.data.length === 0) {
                tempInfo.rank = "No rank available this season";
            } else {
                tempInfo.rank = "I need to do something about this - you have a rank";
            }
            getRankedMatchHistory(init_puuid);
        })
        .catch((error) => {
            console.error('Error fetching league data:', error);
        });
}

function getRankedMatchHistory(init_puuid: string) {
    const matchInfo_url = `/api/get-matches/${init_puuid}`;

    axios.get(matchInfo_url)
        .then((response: AxiosResponse) => {
            console.log(response.data);

            tempInfo.prevGames = response.data;
            // tempInfo.prevGames.map(el => {
            //     if (el != null)
            //         getMatchInformation(el)
            //     else
            //         console.log("NULL DATA")
            // })

            // set player info state upon receiving full data
            // setPlayerInfo(tempInfo);
        })
        .catch((error) => {
            console.error('Error fetching match data:', error);
        });
}

async function getMatchInformation(matchId: string) {
    const matchId_url = `/api/get-match-info/${matchId}`

    await axios.get(matchId_url)
        .then((response: AxiosResponse) => {
            console.log("Request: getMatchInformation");
            parseMatchData(response.data);
        })
        .catch((error) => {
            console.error('Error fetching matchId data:', error);
        });
}

function parseMatchData(matchData: any) : GameInfo {
    let playerNumber = -1;

    const tempGameInfo: GameInfo = {
        champion: "",
        win: false,
        lane: "",
        kills: -1,
        deaths: -1,
        assists: -1,
    };

    let index = 0;
    matchData.info.participants.map((player: any) => {
        if (player.summonerName === tempInfo.summonerName) {
            playerNumber = index;
        }
        index++;
    });

    if (playerNumber !== -1) {
        const participant = matchData.info.participants[playerNumber];
        tempGameInfo.champion = participant.championName;
        tempGameInfo.win = participant.win;
        tempGameInfo.lane = participant.lane;
        tempGameInfo.kills = participant.kills;
        tempGameInfo.deaths = participant.deaths;
        tempGameInfo.assists = participant.assists;

        //setGamesInfo(prevItems => [...prevItems, tempGameInfo]);
    } else {
        console.log("ERROR FINDING CHAMPION INFORMATION");
    }

    return tempGameInfo;
}