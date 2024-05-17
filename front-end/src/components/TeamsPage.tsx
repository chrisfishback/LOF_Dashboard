import {Accordion, AccordionDetails, AccordionSummary, Typography} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {Player, Team} from "../App.tsx";
import PlayerPage from "./PlayerPage.tsx";
import {useEffect} from "react";

type TeamsPageProps = { teams: Team[] };

function TeamsPage(props : TeamsPageProps) {

    return (
        <>
            <h1>Teams Page</h1>
            {props.teams.map((team: Team) => (
                <Accordion key={team.name}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls={`${team.name}-content`} id={`${team.name}-header`}>
                        <Typography variant="h5">{team.name}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <div style={{ width: '100%' }}>
                            {team.players.map((player: Player) => (
                                <PlayerPage player={player}/>
                            ))}
                        </div>
                    </AccordionDetails>
                </Accordion>
            ))}
        </>
    )
}

export default TeamsPage;