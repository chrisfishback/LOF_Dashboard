import {FormControl, Grid, InputLabel, List, ListItem, ListItemText, MenuItem, Select, TextField} from "@mui/material";
import Typography from "@mui/material/Typography";
import {useState} from "react";
import Button from "@mui/material/Button";
import {Team} from "../../App.tsx";

type AddWeekGamesProps = {
    teams: Team[];
}

function AddWeekGames(props: AddWeekGamesProps) {

    const [gameWeeks, setGameWeeks] = useState<GameWeek[]>([])
    const [gameIdInput, setGameIdInput] = useState("");
    const [team1Input, setTeam1Input] = useState("");
    const [team2Input, setTeam2Input] = useState("");

    function  handleWeekSubmit() {
        console.log("new week")
        let tempWeek : GameWeek = {
            week: gameWeeks.length+1,
            games: [],
        }
        setGameWeeks(prevState => [...prevState, tempWeek])
    }

    function handleGameSubmit() {
        console.log(gameWeeks);
        console.log(gameIdInput);
    }

    return (
        <>
            <Grid container spacing={2} sx={{maxWidth: 600, margin: 'auto'}}>
                {gameWeeks && gameWeeks.map((gameWeek, weekIndex) => (
                    <div key={weekIndex}>
                        <Grid item xs={12}>
                            <Typography variant="h5" sx={{bgcolor: '#FDB0C0', borderRadius: 1, color: 'white'}}>
                                Week {gameWeek.week}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <List>
                                {gameWeek.games && gameWeek.games.map((game) => (
                                    <ListItem key={game.gameId}>
                                        <ListItemText sx={{paddingLeft: 2}}
                                                      primary={`${game.gameId} - ${game.teams[0]} vs ${game.teams[1]}`}/>
                                    </ListItem>
                                ))}
                            </List>
                        </Grid>
                    </div>
                ))}
            </Grid>

            <form onSubmit={handleWeekSubmit}>
                <Grid container spacing={2} sx={{maxWidth: 600, margin: 'auto'}}>
                    <Grid item xs={3} sx={{paddingTop: 2}}>
                        <Button variant="contained" color={'primary'} type={'submit'}>Add Week</Button>
                    </Grid>
                </Grid>
            </form>

            <form onSubmit={handleGameSubmit}>
                <h4>Add Game</h4>
                <Grid container spacing={2} sx={{maxWidth: 600, margin: 'auto'}}>
                    <Grid item xs={12}>
                        <TextField required id="game-id" label="Game Id" variant="standard"
                                   sx={{width: '100%'}}
                                   onChange={e => setGameIdInput(e.target.value)}/>
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl required sx={{width: '100%'}}>
                            <InputLabel id="team-1-label">Team 1</InputLabel>
                            <Select
                                labelId="team-1-label"
                                id="team1"
                                value={team1Input}
                                onChange={e => setTeam1Input(e.target.value)}
                                label="Team 1"
                                required
                            >
                                {props.teams.map(el => (<MenuItem key={el.name} value={el.name}>{el.name}</MenuItem>))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl required sx={{width: '100%'}}>
                            <InputLabel id="team-2-label">Team 2</InputLabel>
                            <Select
                                labelId="team-2-label"
                                id="team2"
                                value={team2Input}
                                onChange={e => setTeam2Input(e.target.value)}
                                label="Team 2"
                                required
                            >
                                {props.teams.map(el => (<MenuItem key={el.name} value={el.name}>{el.name}</MenuItem>))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={3} sx={{paddingTop: 2}}>
                        <Button variant="contained" color={'primary'} type={'submit'}>Add Game</Button>
                    </Grid>
                </Grid>
            </form>
        </>
    )
}

export default AddWeekGames;

export type GameWeek = {
    week: number;
    games: RecGameInfo[];
}

export type RecGameInfo = {
    gameId: string;
    teams: string[];
}