import {Accordion, AccordionDetails, AccordionSummary, Typography} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {Player} from "../App.tsx";
import {useEffect} from "react";

type PlayerPageProps = { player: Player };

function PlayerPage(props : PlayerPageProps) {

    useEffect(() => {

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

type PlayerInfo = {
    summonerName: string;
    rank: string;
    lastTenGames: prevGame[];
}

type prevGame = {
    champion: string;
    win: boolean;
    lane: string;
    damage: string;
    kills: string;
    deaths: string;
    assists: string;
}