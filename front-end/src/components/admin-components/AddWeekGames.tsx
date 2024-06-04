import { FormControl, Grid, InputLabel, List, ListItem, ListItemText, MenuItem, Select, TextField } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { Team } from "../../App";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import * as React from "react";
import axios, { AxiosResponse } from "axios";
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';

type AddWeekGamesProps = {
    teams: Team[];
}

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

function AddWeekGames(props: AddWeekGamesProps) {
    const [gameWeeks, setGameWeeks] = useState<GameWeek[]>([]);
    const [gameIdInput, setGameIdInput] = useState<string>("");
    const [team1Input, setTeam1Input] = useState<string>("");
    const [team2Input, setTeam2Input] = useState<string>("");
    const [weekInput, setWeekInput] = useState<number | "">(""); // Initialize with an empty string

    function handleWeekSubmit(event: React.FormEvent) {
        event.preventDefault();
        let tempWeek: GameWeek = {
            week: gameWeeks.length + 1,
            games: [],
        };
        setGameWeeks(prevState => [...prevState, tempWeek]);
        setWeekInput(tempWeek.week); // Update weekInput to the new week
    }

    function handleGameSubmit(event: React.FormEvent) {
        event.preventDefault();

        // Ensure weekInput is within range
        const weekExists = gameWeeks.some(week => week.week === weekInput);
        if (!weekExists) {
            console.error(`Week ${weekInput} is out of range`);
            return;
        }

        let tempGame: RecGameInfo = {
            gameId: gameIdInput,
            team1: team1Input,
            team2: team2Input,
            week: weekInput as number, // Ensure the type is number
        };

        //add to game table
        axios.post('/api/game', tempGame)
            .then((response) => {
                console.log(response);

                setGameWeeks(prevState => {
                    const updatedWeeks = [...prevState];
                    const weekIndex = updatedWeeks.findIndex(week => week.week === weekInput);
                    if (weekIndex !== -1) {
                        updatedWeeks[weekIndex] = {
                            ...updatedWeeks[weekIndex],
                            games: [...updatedWeeks[weekIndex].games, tempGame].sort((a, b) => a.team1.localeCompare(b.team1)),
                        };
                    }
                    return updatedWeeks;
                });
            })
            .catch((error) => {
                console.error(error);
            });

        //add to gameData table
        axios.post('/api/game-data/'+gameIdInput)
            .then(() => {
                console.log("Created game data for: " + gameIdInput)
            })
            .catch((error) => {
                console.error(error);
            });

        setGameIdInput("");
        setTeam1Input("");
        setTeam2Input("");
    }

    function handlePopulateWeekData(week: number) {
        console.log("Populate Week Data (Will probably implement just uploading upon adding a week: ", week);
    }

    function parseGames(games: RecGameInfo[]) {
        const weeksMap = new Map<number, RecGameInfo[]>();

        games.forEach(game => {
            if (!weeksMap.has(game.week)) {
                weeksMap.set(game.week, []);
            }
            weeksMap.get(game.week)?.push(game);
        });

        const newGameWeeks = Array.from(weeksMap.entries()).map(([week, games]) => ({
            week,
            games: games.sort((a, b) => a.team1.localeCompare(b.team1))
        }));

        setGameWeeks(newGameWeeks);
    }

    useEffect(() => {
        axios.get('/api/game')
            .then((response: AxiosResponse<RecGameInfo[]>) => {
                console.log(response.data);
                parseGames(response.data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);

    useEffect(() => {
        // Update weekInput to the first week if gameWeeks is populated
        if (gameWeeks.length > 0 && !gameWeeks.some(week => week.week === weekInput)) {
            setWeekInput(gameWeeks[0].week);
        }
    }, [gameWeeks]);

    return (
        <Box sx={{ width: '100%', marginTop: 4 }}>
            <Grid container spacing={2} sx={{ maxWidth: 600, margin: 'auto' }}>
                {gameWeeks && gameWeeks.map((gameWeek, weekIndex) => (
                    <Grid item xs={12} key={weekIndex}>
                        <Typography variant="h5" sx={{ bgcolor: '#FDB0C0', borderRadius: 1, color: 'white', padding: 1 }}>
                            Week {gameWeek.week}
                            <IconButton edge="end" aria-label="upload" onClick={() => handlePopulateWeekData(gameWeek.week)} sx={{ marginLeft: '420px' }}>
                                <DriveFolderUploadIcon />
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
                        <Button variant="contained" color="primary" type="submit">Add Week</Button>
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
                                {gameWeeks.map(el => (
                                    <MenuItem key={el.week} value={el.week}>
                                        {el.week}
                                    </MenuItem>
                                ))}
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
                                {props.teams.map(el => (
                                    <MenuItem key={el.name} value={el.name}>
                                        {el.name}
                                    </MenuItem>
                                ))}
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
                                {props.teams.map(el => (
                                    <MenuItem key={el.name} value={el.name}>
                                        {el.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sx={{ paddingTop: 2 }}>
                        <Button variant="contained" color="primary" type="submit">Add Game</Button>
                    </Grid>
                </Grid>
            </form>
        </Box>
    );
}

export default AddWeekGames;