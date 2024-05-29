import {FormControl, Grid, InputLabel, List, ListItem, ListItemText, MenuItem, Select, TextField} from "@mui/material";
import Typography from "@mui/material/Typography";
import {useState} from "react";
import Button from "@mui/material/Button";
import {Team} from "../../App.tsx";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import * as React from "react";

type AddWeekGamesProps = {
    teams: Team[];
}

function AddWeekGames(props: AddWeekGamesProps) {

    const [gameWeeks, setGameWeeks] = useState<GameWeek[]>([])
    const [gameIdInput, setGameIdInput] = useState("");
    const [team1Input, setTeam1Input] = useState("");
    const [team2Input, setTeam2Input] = useState("");
    const [weekInput, setWeekInput] = useState(1)

    function  handleWeekSubmit(event: React.FormEvent) {
        event.preventDefault();
        console.log("new week")
        let tempWeek : GameWeek = {
            week: gameWeeks.length+1,
            games: [],
        }
        setGameWeeks(prevState => [...prevState, tempWeek])
    }

    function handleGameSubmit(event: React.FormEvent) {
        event.preventDefault();

        let tempGame = {
            gameId: gameIdInput,
            team1: team1Input,
            team2: team2Input,
            week: weekInput,
        }

        gameWeeks[weekInput-1].games.push(tempGame);

        setGameWeeks(prevState => {
            const updatedWeeks = [...prevState];
            updatedWeeks[weekInput - 1] = {
                ...updatedWeeks[weekInput - 1],
                games: [...updatedWeeks[weekInput - 1].games, tempGame],
            };
            return updatedWeeks;
        });

        setGameIdInput("");
        setTeam1Input("");
        setTeam2Input("");
        setWeekInput(1); // Reset week input to default value
    }

    function handleDeleteWeek(week:number) {
        console.log("Unsure if I would like to implement this feature: ", week)
    }

    return (
        <Box sx={{ width: '100%', marginTop: 4 }}>
            <Grid container spacing={2} sx={{ maxWidth: 600, margin: 'auto' }}>
                {gameWeeks && gameWeeks.map((gameWeek, weekIndex) => (
                    <Grid item xs={12} key={weekIndex}>
                        <Typography variant="h5" sx={{ bgcolor: '#FDB0C0', borderRadius: 1, color: 'white', padding: 1 }}>
                            Week {gameWeek.week}
                            <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteWeek(weekIndex)} sx={{marginLeft: '420px'}}>
                                <DeleteIcon/>
                            </IconButton>
                        </Typography>
                        <List>
                            {gameWeek.games && gameWeek.games.map((game, gameIndex) => (
                                <ListItem key={gameIndex}>
                                    <ListItemText sx={{ paddingLeft: 2 }}
                                                  primary={`${game.gameId} - ${game.team1} vs ${game.team2}`} />
                                </ListItem>
                            ))}
                        </List>
                    </Grid>
                ))}
            </Grid>

            <form onSubmit={handleWeekSubmit}>
                <Grid container spacing={2} sx={{ maxWidth: 600, margin: 'auto' }}>
                    <Grid item xs={12} sx={{ paddingTop: 2 }}>
                        <Button variant="contained" color={'primary'} type={'submit'}>Add Week</Button>
                    </Grid>
                </Grid>
            </form>

            <form onSubmit={handleGameSubmit}>
                <h4>Add Game</h4>
                <Grid container spacing={2} sx={{ maxWidth: 600, margin: 'auto' }}>
                    <Grid item xs={4}>
                        <FormControl required sx={{ width: '100%' }}>
                            <InputLabel id="week-label">Week</InputLabel>
                            <Select
                                labelId="week-label"
                                id="week"
                                value={weekInput}
                                onChange={e => setWeekInput(e.target.value as number)}
                                label="Week"
                                required
                            >
                                {gameWeeks.map(el => (<MenuItem key={el.week} value={el.week}>{el.week}</MenuItem>))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={8}>
                        <TextField required id="game-id" label="Game Id" variant="standard"
                                   sx={{ width: '100%' }}
                                   value={gameIdInput}
                                   onChange={e => setGameIdInput(e.target.value)} />
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl required sx={{ width: '100%' }}>
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
                        <FormControl required sx={{ width: '100%' }}>
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
                    <Grid item xs={12} sx={{ paddingTop: 2 }}>
                        <Button variant="contained" color={'primary'} type={'submit'}>Add Game</Button>
                    </Grid>
                </Grid>
            </form>
        </Box>
    );
}

export default AddWeekGames;

export type GameWeek = {
    week: number;
    games: RecGameInfo[];
}

export type RecGameInfo = {
    gameId: string;
    team1: string;
    team2: string;
    week: number;
}