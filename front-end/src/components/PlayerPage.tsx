import {Accordion, AccordionDetails, AccordionSummary, Typography} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {Player} from "../App.tsx";
import {useEffect} from "react";
import axios, {AxiosResponse} from "axios";

type PlayerPageProps = { player: Player };

function PlayerPage(props : PlayerPageProps) {

    //const {player} = props
    let {id, puuid, summonerId, summonerName, team, tagline} = props.player;

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
                console.error('Error fetching summoner data:', error);
            });
    }

    async function getSummonerInformation(init_puuid: string) {
        //https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/DAVg3J8PjIO2EQRWSWRsEDHDvVOKN09yOcB1MgmMMRKgIbeGGYmUR9mt0B_nCp3qFP7d-0MF1O5lpg?api_key=***

        const summonerId_url = `/api/get-summoner/${init_puuid}`;

        await axios.get(summonerId_url)
            .then((response: AxiosResponse) => {
                console.log(response.data);
                summonerId = response.data.id;

            })
            .catch((error) => {
                console.error('Error fetching account data:', error);
            });
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
                        Rank: Poopy
                    </Typography>
                </AccordionDetails>
            </Accordion>
        </>
    )
}

export default PlayerPage;

// type PlayerInfo = {
//     summonerName: string;
//     rank: string;
//     lastTenGames: prevGame[];
// }
//
// type prevGame = {
//     champion: string;
//     win: boolean;
//     lane: string;
//     damage: string;
//     kills: string;
//     deaths: string;
//     assists: string;
// }