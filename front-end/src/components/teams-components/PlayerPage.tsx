import {Accordion, AccordionDetails, AccordionSummary, Grid, Typography} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {Player} from "../../App.tsx";
import {useEffect, useState} from "react";
import axios, {AxiosResponse} from "axios";
import PlayerGameInfo, {GameInfo} from "./PlayerGameInfo.tsx";

type PlayerPageProps = { player: Player };

function PlayerPage(props : PlayerPageProps) {

    const [playerInfo, setPlayerInfo] = useState<PlayerInfo>({} as PlayerInfo)
    const [gamesInfo, setGamesInfo] = useState<GameInfo[]>([])

    //const {player} = props
    let {id, summonerName, team, tagline} = props.player;

    let tempInfo : PlayerInfo = {
        summonerName: summonerName,
        rank: "temp",
        summonerLevel: "-1",
    }

    function getRankedMatches() {
        const rankedMatches_url = `/api/ranked-matches/${summonerName}`;

        axios.get(rankedMatches_url)
            .then((response: AxiosResponse) => {
                //console.log("IN PLAYER REQUESTING RANKED MATCH INFO");
                //puuid = response.data.puuid;
                console.log("GET RANKED MATCH INFO FOR EACH PLAYER: ", response)
                parseMatchData(response.data)
            })
            .catch((error) => {
                console.error('Error fetching summoner data: ', error);
            });
    }

    function getAccountInformation() {
        // https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id/thebighook/NA1?api_key=***

        const puuid_url = `/api/get-account/${summonerName}/${tagline}`;

        axios.get(puuid_url)
            .then((response: AxiosResponse) => {
                console.log("Request: getAccountInformation");
                //puuid = response.data.puuid;
                getSummonerInformation(response.data.puuid);
            })
            .catch((error) => {
                console.error('Error fetching summoner data: ', error);
            });
    }

    function getSummonerInformation(init_puuid: string) {
        const summonerId_url = `/api/get-summoner/${init_puuid}`;

        axios.get(summonerId_url)
            .then((response: AxiosResponse) => {
                console.log("Request: getSummonerInformation");
                tempInfo.summonerLevel = response.data.summonerLevel;
                getLeagueInformation(response.data.id);
            })
            .catch((error) => {
                console.error('Error fetching account data: ', error);
            });
    }

    function getLeagueInformation(init_id: string) {
        const leagueInfo_url = `/api/get-league-info/${init_id}`

        axios.get(leagueInfo_url)
            .then((response: AxiosResponse) => {
                console.log("Request: getLeagueInformation");
                if (response.data.length === 0) {
                    tempInfo.rank = "No rank available this season";
                } else {
                    tempInfo.rank = response.data[0].tier + " " +response.data[0].rank;
                }

                setPlayerInfo(tempInfo);
            })
            .catch((error) => {
                console.error('Error fetching league data:', error);
            });
    }

    //
    // function getRankedMatchHistory(init_puuid: string) {
    //     const matchInfo_url = `/api/get-matches/${init_puuid}`;
    //
    //     axios.get(matchInfo_url)
    //         .then((response: AxiosResponse) => {
    //             console.log(response.data);
    //
    //             tempInfo.prevGames = response.data;
    //             tempInfo.prevGames.map(el => {
    //                 if (el != null)
    //                     getMatchInformation(el)
    //                 else
    //                     console.log("NULL DATA")
    //             })
    //
    //             // set player info state upon receiving full data
    //             setPlayerInfo(tempInfo);
    //         })
    //         .catch((error) => {
    //             console.error('Error fetching match data:', error);
    //         });
    // }
    //
    // async function getMatchInformation(matchId: string) {
    //     const matchId_url = `/api/get-match-info/${matchId}`
    //
    //     await axios.get(matchId_url)
    //         .then((response: AxiosResponse) => {
    //             console.log("Request: getMatchInformation");
    //             parseMatchData(response.data);
    //         })
    //         .catch((error) => {
    //             console.error('Error fetching matchId data:', error);
    //         });
    // }
    //
    function parseMatchData(matchData: any)  {

        // let tempGameInfo: GameInfo = {
        //     champion: "",
        //     win: false,
        //     lane: "",
        //     kills: -1,
        //     deaths: -1,
        //     assists: -1,
        // };

        matchData.map((match : any) => {
            let tempGameInfo : GameInfo = {
                champion: "",
                win: false,
                lane: "",
                kills: -1,
                deaths: -1,
                assists: -1,
            };

            tempGameInfo.champion = match.champion;
            tempGameInfo.win = match.win;
            tempGameInfo.lane = match.lane;
            tempGameInfo.kills = match.kills;
            tempGameInfo.deaths = match.deaths;
            tempGameInfo.assists = match.assists;

            setGamesInfo(prevItems => [...prevItems, tempGameInfo]);
        })
    }

    //get correct PUUID and summonerID using tagline and summonerName
    useEffect(  () => {
        getAccountInformation();

        getRankedMatches();
    }, []);

    return (
        <>
            <Accordion key={id}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls={`${id}-content`} id={`${id}-${team}-header`}>
                    <Typography>{summonerName}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography variant="h6">Rank: {playerInfo.rank} - Level: {playerInfo.summonerLevel}</Typography>
                    <Typography variant="h6">Ranked Game History</Typography>
                    <Grid container spacing={2} sx={{margin: 'auto'}}>
                        {gamesInfo.length > 0 ? (
                            gamesInfo.map((game, index) => (
                                <Grid key={index} item xs={12}>
                                    <PlayerGameInfo key={index} gameInfo={game} />
                                </Grid>
                            ))
                        ) : (
                            <Typography>No game history available</Typography>
                        )}
                    </Grid>
                </AccordionDetails>
            </Accordion>
        </>
    )
}

export default PlayerPage;

export type PlayerInfo = {
    summonerName: string;
    rank: string;
    summonerLevel: string;
}