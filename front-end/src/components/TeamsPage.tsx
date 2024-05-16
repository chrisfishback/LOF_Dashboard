import {Accordion, AccordionDetails, AccordionSummary, Typography} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {Player, Team} from "../App.tsx";


function TeamsPage(props : Team[]) {

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
                                <Accordion key={player.summonerId}>
                                    <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls={`${player.summonerId}-content`} id={`${player.summonerId}-header`}>
                                        <Typography>{player.summonerName}</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Typography>
                                            Rank: Poopy
                                        </Typography>
                                    </AccordionDetails>
                                </Accordion>
                            ))}
                        </div>
                    </AccordionDetails>
                </Accordion>
            ))}

            {/*{players.players.map((el: Player) => (*/}
            {/*    <Accordion key={el.id}>*/}
            {/*        <AccordionSummary*/}
            {/*            expandIcon={<ExpandMoreIcon />}*/}
            {/*            aria-controls="panel2-content"*/}
            {/*            id="panel2-header"*/}
            {/*        >*/}
            {/*            {el.summonerName}*/}
            {/*        </AccordionSummary>*/}
            {/*        <AccordionDetails>*/}
            {/*            {"Team: " + el.team}*/}
            {/*        </AccordionDetails>*/}
            {/*    </Accordion>*/}
            {/*))}*/}


            {/*<Accordion>*/}
            {/*    <AccordionSummary*/}
            {/*        expandIcon={<ExpandMoreIcon />}*/}
            {/*        aria-controls="panel3-content"*/}
            {/*        id="panel3-header"*/}
            {/*    >*/}
            {/*        Hardcoded*/}
            {/*    </AccordionSummary>*/}
            {/*    <AccordionDetails>*/}
            {/*        Rank: Poopy*/}
            {/*    </AccordionDetails>*/}
            {/*</Accordion>*/}
        </>
    )
}

export default TeamsPage;