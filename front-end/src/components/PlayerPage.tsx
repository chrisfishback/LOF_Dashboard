import {Accordion, AccordionDetails, AccordionSummary, Typography} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {Player} from "../App.tsx";
import {useEffect} from "react";
import axios, {AxiosResponse} from "axios";

type PlayerPageProps = { player: Player };

function PlayerPage(props : PlayerPageProps) {

    //const {player} = props
    let {id, puuid, summonerId, summonerName, team, tagline} = props.player;

    async function getPuuid(url: string) {
        // https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id/thebighook/NA1?api_key=***

        await axios.get(url)
            .then((response: AxiosResponse) => {
                console.log(response.data);
                puuid = response.data.puuid;
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }

    //get correct PUUID and summonerID using tagline and summonerName
    useEffect( () => {

        const puuid_url = `/api/get-account/${summonerName}/${tagline}`;

        getPuuid(puuid_url)

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