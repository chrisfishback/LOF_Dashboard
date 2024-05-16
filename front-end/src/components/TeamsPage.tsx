import {Accordion, AccordionDetails, AccordionSummary, Typography} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Player } from "../App.tsx";

export type PlayerListProps = {
    players: Player[]
}

function TeamsPage(players:PlayerListProps) {

    return (
        <>
            <h1>Teams Page</h1>



            <Accordion disabled >
                <AccordionSummary className={'team'}>
                    <Typography variant={'h5'} >Team 1</Typography>
                </AccordionSummary>
            </Accordion>

            {players.players.map((el: Player) => (
                <Accordion key={el.id}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2-content"
                        id="panel2-header"
                    >
                        {el.summonerName}
                    </AccordionSummary>
                    <AccordionDetails>
                        {"Team: " + el.team}
                    </AccordionDetails>
                </Accordion>
            ))}

            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2-content"
                    id="panel2-header"
                >
                    Hardcoded
                </AccordionSummary>
                <AccordionDetails>
                    Rank: Poopy
                </AccordionDetails>
            </Accordion>


            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel3-content"
                    id="panel3-header"
                >
                    Hardcoded
                </AccordionSummary>
                <AccordionDetails>
                    Rank: Poopy
                </AccordionDetails>
            </Accordion>
        </>
    )
}

export default TeamsPage;