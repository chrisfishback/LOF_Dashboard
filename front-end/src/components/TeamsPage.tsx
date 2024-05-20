import {Accordion, AccordionDetails, AccordionSummary, Typography} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {Player, Team} from "../App.tsx";
import PlayerPage from "./PlayerPage.tsx";

type TeamsPageProps = { teams: Team[] };

function TeamsPage(props : TeamsPageProps) {

    return (
        <>
            <h1>Teams Page</h1>
            <h6>Sit back and relax - this will take awhile to populate</h6>
            {props.teams.map((team: Team) => (
                <Accordion key={team.name}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls={`${team.name}-content`} id={`${team.name}-header`}>
                        <Typography variant="h5">{team.name}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <div style={{ width: '100%' }}>
                            {team.players.map((player: Player) => (
                                <PlayerPage key={player.id} player={player}/>
                            ))}
                        </div>
                    </AccordionDetails>
                </Accordion>
            ))}
        </>
    )
}

export default TeamsPage;