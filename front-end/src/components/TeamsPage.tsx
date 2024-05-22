import {Accordion, AccordionDetails, AccordionSummary, Grid, Typography} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {Player, Team} from "../App.tsx";
import PlayerPage from "./teams-components/PlayerPage.tsx";
import Box from "@mui/material/Box";

type TeamsPageProps = { teams: Team[] };

function TeamsPage(props : TeamsPageProps) {

    return (
        <>
            <Box sx={{ width: '100%', marginTop: 4 }}>
                <h1>Teams Page</h1>
                <h6>Sit back and relax - this will take awhile to populate</h6>
                {props.teams.map((team: Team, index) => (
                    <Grid container spacing={2} sx={{maxWidth: 800, margin: 'auto'}}>
                        <Grid item xs={12} key={index}>
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
                        </Grid>
                    </Grid>
                ))}
            </Box>
        </>
    )
}

export default TeamsPage;