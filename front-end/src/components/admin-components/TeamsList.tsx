import {Player, Team} from "../../App.tsx";
import {Grid, List} from "@mui/material";
import Typography from "@mui/material/Typography";
import * as React from "react";
import PlayerItem from "./PlayerItem.tsx";

type TeamsListProps = { teams: Team[], setPlayers: React.Dispatch<React.SetStateAction<Player[]>>}

function TeamsList(props: TeamsListProps) {

    return (
        <>

            {props.teams.map((team, index) => (
                <Grid item xs={12} key={index}>
                    <List>
                        <Typography variant="h5" sx={{ bgcolor: '#FDB0C0', borderRadius: 1, color: 'white'}}>
                            {team.name}
                        </Typography>
                        {team.players && team.players.map((player: Player, index) => (
                            <PlayerItem key={index} player={player} teams={props.teams} setPlayers={props.setPlayers}/>
                        ))}
                    </List>
                </Grid>
            ))}
        </>
    )
}

export default TeamsList;