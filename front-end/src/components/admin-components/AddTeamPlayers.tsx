import {Player, Team} from "../../App.tsx";
import * as React from "react";
import {FormControl, Grid, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import Button from "@mui/material/Button";
import {useState} from "react";
import axios from "axios";

type AddTeamPlayersProps = { teams: Team[], setTeams: React.Dispatch<React.SetStateAction<Team[]>>, players: Player[], setPlayers: React.Dispatch<React.SetStateAction<Player[]>> };

function AddTeamPlayers(props : AddTeamPlayersProps) {

    const [summonerNameInput, setSummonerNameInput] = useState("");
    const [taglineInput, setTaglineInput] = useState("");
    const [teamInput, setTeamInput] = useState("");

    async function handleSubmit(e:any) {
        e.preventDefault();

        await axios.post('/api/player', {
            summonerName: summonerNameInput,
            tagline: taglineInput,
            team: teamInput
        })
            .then(function (response) {
                console.log(response);

                props.setPlayers(prevState => [...prevState, response.data]);
            })
            .catch(function (error) {
                console.error(error);
            });
    }

    return (
        <>
            {/*<h1>Add Teams/Players</h1>*/}

            {/* add team */}

            <h3>Add Player</h3>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2} sx={{maxWidth: 600, margin: 'auto'}}>
                    <Grid item xs={8}>
                        <TextField required id="summoner-name" label="Summoner Name" variant="standard" sx={{width: '100%'}}
                                   onChange={e => setSummonerNameInput(e.target.value)}/>
                    </Grid>
                    <Grid item xs={4}>
                        <TextField required id="tagline" label="Tagline" variant="standard" sx={{width: '100%'}}
                                   onChange={e => setTaglineInput(e.target.value)}/>
                    </Grid>
                    {/*<Grid item xs={12}>*/}
                    {/*    <TextField required id="team" label="Team" variant="standard" sx={{width: '100%'}}*/}
                    {/*               onChange={e => setTeamInput(e.target.value)}/>*/}
                    {/*</Grid>*/}
                    <Grid item xs={12}>
                        <FormControl required sx={{  width: '100%' }}>
                            <InputLabel id="team-label">Team</InputLabel>
                            <Select
                                labelId="team-label"
                                id="team"
                                value={teamInput}
                                onChange={e => setTeamInput(e.target.value)}
                                label="Team"
                                required
                            >
                                {props.teams.map(el => ( <MenuItem key={el.name} value={el.name}>{el.name}</MenuItem> ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={2} sx={{paddingTop: 2}}>
                        <Button variant="contained" color={'primary'} type={'submit'}>Add</Button>
                    </Grid>
                </Grid>
            </form>

            {/* add player */}
        </>
    )
}

export default AddTeamPlayers;