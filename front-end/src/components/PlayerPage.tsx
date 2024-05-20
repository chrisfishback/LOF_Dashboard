import {Accordion, AccordionDetails, AccordionSummary, Typography} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {Player} from "../App.tsx";
import {useEffect} from "react";
import axios, {AxiosResponse} from "axios";

type PlayerPageProps = { player: Player };

function PlayerPage(props : PlayerPageProps) {

    //const {player} = props
    let {id, puuid, summonerId, summonerName, team, tagline} = props.player;
    let tempInfo : PlayerInfo = {
        summonerName: summonerName,
        rank: "temp",
        lastTwentyGames: [],
        summonerLevel: "-1",
    }

    async function getAccountInformation() {
        // https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id/thebighook/NA1?api_key=***

        const puuid_url = `/api/get-account/${summonerName}/${tagline}`;

        await axios.get(puuid_url)
            .then((response: AxiosResponse) => {
                console.log(response.data);
                puuid = response.data.puuid;

                getSummonerInformation(puuid);
            })
            .catch((error) => {
                console.error('Error fetching summoner data: ', error);
            });
    }

    async function getSummonerInformation(init_puuid: string) {
        //https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/DAVg3J8PjIO2EQRWSWRsEDHDvVOKN09yOcB1MgmMMRKgIbeGGYmUR9mt0B_nCp3qFP7d-0MF1O5lpg?api_key=***

        const summonerId_url = `/api/get-summoner/${init_puuid}`;

        await axios.get(summonerId_url)
            .then((response: AxiosResponse) => {
                console.log(response.data);
                summonerId = response.data.id;
                tempInfo.summonerLevel = response.data.summonerLevel;

                getLeagueInformation(summonerId);
                getRankedMatchHistory(init_puuid);
            })
            .catch((error) => {
                console.error('Error fetching account data: ', error);
            });
    }

    async function getLeagueInformation(init_id: string) {
        // /lol/league/v4/entries/by-summoner/{encryptedSummonerId}

        const leagueInfo_url = `/api/get-league-info/${init_id}`

        await axios.get(leagueInfo_url)
            .then((response: AxiosResponse) => {
                console.log(response.data);

                if (response.data.length === 0)
                    tempInfo.rank = "No rank available this season"
                else {

                }
            })
            .catch((error) => {
                console.error('Error fetching league data:', error);
            });
    }

    async function getRankedMatchHistory(init_puuid: string) {

        const matchInfo_url = `/api/get-matches/${init_puuid}`

        await axios.get(matchInfo_url)
            .then((response: AxiosResponse) => {
                console.log(response.data);

                tempInfo.lastTwentyGames = response.data;
                tempInfo.lastTwentyGames.map(el => {
                    if (el != null)
                        getMatchInformation(el)
                    else
                        console.log("NULL DATA")
                })
            })
            .catch((error) => {
                console.error('Error fetching match data:', error);
            });
    }

    async function getMatchInformation(matchId: string) {
        const matchId_url = `/api/get-match-info/${matchId}`

        await axios.get(matchId_url)
            .then((response: AxiosResponse) => {
                console.log(response.data);
                parseMatchData(response.data);
            })
            .catch((error) => {
                console.error('Error fetching matchId data:', error);
            });

    }

    function parseMatchData(matchData : any) {

        let playerNumber = -1;

        let tempGameInfo : GameInfo = {
            champion: "",
            win: false,
            lane: "",
            kills: -1,
            deaths: -1,
            assists: -1,
        }

        let index = 0;
        matchData.info.participants.map((player : any) => {
            if (player.summonerName === tempInfo.summonerName) {
                playerNumber = index;
            }

            index++;
        })

        if (playerNumber != -1) {
            //     champion: string;
            tempGameInfo.champion = matchData.info.participants[playerNumber].championName;
            //     win: boolean;
            tempGameInfo.win = matchData.info.participants[playerNumber].win;
            //     lane: number;
            tempGameInfo.lane = matchData.info.participants[playerNumber].lane;
            //     kills: number;
            tempGameInfo.kills = matchData.info.participants[playerNumber].kills;
            //     deaths: number;
            tempGameInfo.deaths = matchData.info.participants[playerNumber].deaths;
            //     assists: number;
            tempGameInfo.assists = matchData.info.participants[playerNumber].assists;

            console.log(tempGameInfo)
        } else
            console.log("ERROR FINDING CHAMPION INFORMATION")

    }

    //get correct PUUID and summonerID using tagline and summonerName
    useEffect(  () => {
        getAccountInformation();
    }, []);

    return (
        <>
            <Accordion key={props.player.summonerId}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls={`${props.player.summonerId}-content`} id={`${props.player.summonerId}-header`}>
                    <Typography>{props.player.summonerName}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Rank: temp
                    </Typography>
                </AccordionDetails>
            </Accordion>
        </>
    )
}

export default PlayerPage;

type PlayerInfo = {
    summonerName: string;
    rank: string;
    lastTwentyGames: [];
    summonerLevel: string;
}

type GameInfo = {
    champion: string;
    win: boolean;
    lane: string;
    kills: number;
    deaths: number;
    assists: number;
}