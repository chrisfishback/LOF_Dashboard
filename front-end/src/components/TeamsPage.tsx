import {Accordion, AccordionDetails, AccordionSummary, Grid, Typography} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {Player, Team} from "../App.tsx";
import PlayerPage from "./teams-components/PlayerPage.tsx";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import {useState} from "react";

type TeamsPageProps = { teams: Team[] };

function TeamsPage(props : TeamsPageProps) {

    const [lastRefreshTime, setLastRefreshTime] = useState(0);
    const refreshInterval = 60000; // 60 seconds in milliseconds
    const [timeLeft, setTimeLeft] = useState(0);
    const [show, setShow] = useState(false);

    function handleRefresh() {
        const currentTime = Date.now();
        if (currentTime - lastRefreshTime >= refreshInterval) {
            setShow(false);
            console.log('Clicked Refresh');
            setLastRefreshTime(currentTime);
        } else {
            setTimeLeft(Math.floor((refreshInterval - (currentTime - lastRefreshTime)) / 1000));
            console.log('Please wait', timeLeft, 'seconds before refreshing again.');
            setShow(true);
        }
    }

    return (
        <>
            <Box sx={{ width: '100%', marginTop: 4 }}>
                <h1>Teams Page</h1>
                <h6>Sit back and relax - this will take awhile to populate</h6>
                {props.teams.map((team: Team, index) => (
                    <Grid key={index} container spacing={2} sx={{maxWidth: 800, margin: 'auto'}}>
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
                <Grid item xs={3} sx={{paddingTop: 2}}>
                    <Button variant="contained" color={'primary'} onClick={handleRefresh}>Refresh Match Data</Button>
                    {show && <p>Please wait {timeLeft} seconds before refreshing again</p>}
                </Grid>
            </Box>
        </>
    )
}

export default TeamsPage;