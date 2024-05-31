import {Player, Team} from "../../App.tsx";
import {ListItem, ListItemText, TextField} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import axios from "axios";
import * as React from "react";
import {useState} from "react";
import SaveIcon from '@mui/icons-material/Save';

type PlayerItemProps = { player: Player, teams: Team[], setPlayers: React.Dispatch<React.SetStateAction<Player[]>>}

function PlayerItem(props: PlayerItemProps) {

    const [edit, setEdit] = useState(false)
    const [summonerNameInput, setSummonerNameInput] = useState(props.player.summonerName)
    const [taglineInput, setTaglineInput] = useState(props.player.tagline)


    const handleDelete = (id : number) => () => {
        let url : string =  '/api/player/' + id;

        axios.delete(url)
            .then(response => {
                console.log(response)
                props.setPlayers(prevPlayers => prevPlayers.filter(el => el.id !== id));
            })
            .catch(error => {
                console.error('Deletion Error', error);
            });
    }

    const handleEditRequest = () => {
        console.log("edit "+props.player.id)

        let url = '/api/player/' + props.player.id

        axios.put(url, {
            summonerName: summonerNameInput,
            tagline: taglineInput,
            team: props.player.team,
            rank: props.player.rank,
            level: props.player.level
        })
            .then(function (response) {
                console.log(response)
                setEdit(!edit)
            })
            .catch(function (error) {
                console.error(error);
            })
    }

    const handleEdit = () => {
        console.log('clicked edit')
        setEdit(!edit)
    }


    return (
        <>
            <ListItem
                key={props.player.id}
                secondaryAction={
                    <IconButton edge="end" aria-label="delete" onClick={handleDelete(props.player.id)}>
                        <DeleteIcon />
                    </IconButton>
                }
            >
                <IconButton edge="end" aria-label="edit" onClick={handleEdit}>
                    <EditIcon />
                </IconButton>
                {!edit ? (
                    <ListItemText sx={{ paddingLeft: 2 }} primary={`${props.player.summonerName}#${props.player.tagline}`} />
                ) : (
                    <>
                        <TextField
                            sx={{ marginLeft: 2 }}
                            required
                            id="outlined-required"
                            label="Summoner Name"
                            defaultValue={summonerNameInput}
                            onChange={e => setSummonerNameInput(e.target.value)}
                        />
                        <ListItemText primary={'#'} sx={{maxWidth: 10}}/>
                        <TextField
                            required
                            id="outlined-required"
                            label="Tagline"
                            defaultValue={taglineInput}
                            onChange={e => setTaglineInput(e.target.value)}
                        />
                        <IconButton edge="end" aria-label="save" onClick={handleEditRequest}>
                            <SaveIcon />
                        </IconButton>
                    </>
                )}

            </ListItem>
        </>
    )
}

export default PlayerItem;