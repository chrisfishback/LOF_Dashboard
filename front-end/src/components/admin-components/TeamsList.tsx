import {Team} from "../../App.tsx";
import {Grid, List, ListItem, ListItemText} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from '@mui/icons-material/Delete';
import Typography from "@mui/material/Typography";
import EditIcon from '@mui/icons-material/Edit';
import axios from "axios";

type TeamsListProps = { teams: Team[] }


function TeamsList(props: TeamsListProps) {

    const handleDelete = (id : number) => () => {
        let url : string =  '/api/player/' + id;

        //console.log(url)

        axios.delete(url)
            .then(response => {
                console.log(response)
            })
            .catch(error => {
                console.error('Deletion Error', error);
            });
    }


    return (
        <>

            {props.teams.map((team) => (
                <Grid item xs={12}>
                    <List>
                        <Typography variant="h5" sx={{ bgcolor: '#FDB0C0', borderRadius: 1, color: 'white'}}>
                            {team.name}
                        </Typography>
                        {team.players.map((player) => (
                            <ListItem
                                key={player.id}
                                secondaryAction={
                                    <IconButton edge="end" aria-label="delete" onClick={handleDelete(player.id)}>
                                        <DeleteIcon />
                                    </IconButton>
                                }
                            >
                                <IconButton edge="end" aria-label="edit">
                                    <EditIcon />
                                </IconButton>
                                <ListItemText sx={{paddingLeft:2}}
                                    primary={player.summonerName+'#'+player.tagline}
                                />
                            </ListItem>
                        ))}
                    </List>
                </Grid>
            ))}
        </>
    )
}

export default TeamsList;