import {Player, Team} from "../../App.tsx";
import * as React from "react";
import {FormControl, Grid, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import Button from "@mui/material/Button";
import {useEffect, useState} from "react";
import axios, {AxiosResponse} from "axios";
import TeamsList from "./TeamsList.tsx";

type AddTeamPlayersProps = { teams: Team[], setTeams: React.Dispatch<React.SetStateAction<Team[]>>, players: Player[], setPlayers: React.Dispatch<React.SetStateAction<Player[]>> };


//using teamInput for multiple of the input forms. It's causing issues
function ModifyTeams(props : AddTeamPlayersProps) {

    const [summonerNameInput, setSummonerNameInput] = useState("");
    const [taglineInput, setTaglineInput] = useState("");
    const [teamInput, setTeamInput] = useState("");
    const [newTeamName, setNewTeamName] = useState("");

    const [lastRefreshTime, setLastRefreshTime] = useState(0);
    const refreshInterval = 120000; // 120 seconds in milliseconds
    const [timeLeft, setTimeLeft] = useState(0);
    const [show, setShow] = useState(false);

    function handleRefresh() {
        console.log("clicked refresh")
        const currentTime = Date.now();
        if (currentTime - lastRefreshTime >= refreshInterval) {
            setShow(false);

            props.teams.map(team => {
                team.players.map(player => {

                    const puuid_url = `/api/get-account/${player.summonerName}/${player.tagline}`;

                    axios.get(puuid_url)
                        .then((response: AxiosResponse) => {
                            console.log("Backend refresh request for: ", player.summonerName);

                            getSummonerInformation(response.data.puuid, player)

                            const matchInfo_url = `/api/ranked-matches/${player.summonerName}/${response.data.puuid}`;

                            axios.get(matchInfo_url)
                                .then((response: AxiosResponse) => {
                                    console.log(response);
                                    console.log("Got data for: ", player.summonerName );

                                })
                                .catch((error) => {
                                    console.error('Error fetching league data:', error);
                                });

                        })
                        .catch((error) => {
                            console.error('Error fetching summoner data: ', error);
                        });
                })
            })

            setLastRefreshTime(currentTime);
        } else {
            setTimeLeft(Math.floor((refreshInterval - (currentTime - lastRefreshTime)) / 1000));
            console.log('Please wait', timeLeft, 'seconds before refreshing again.');
            setShow(true);
        }
    }

    function getSummonerInformation(init_puuid: string, player: Player) {
        const summonerId_url = `/api/get-summoner/${init_puuid}`;

        axios.get(summonerId_url)
            .then((response: AxiosResponse) => {
                player.level = response.data.summonerLevel;
                player = getLeagueInformation(response.data.id, player);
            })
            .catch((error) => {
                console.error('Error fetching account data: ', error);
            });

        return player;
    }

    function getLeagueInformation(init_id: string, player: Player) {
        const leagueInfo_url = `/api/get-league-info/${init_id}`

        axios.get(leagueInfo_url)
            .then((response: AxiosResponse) => {
                if (response.data.length === 0) {
                    player.rank = "No rank available this season";
                } else {
                    player.rank = response.data[0].tier + " " +response.data[0].rank;
                }

                let put_url = '/api/player/' + player.id

                axios.put(put_url, {
                    summonerName: player.summonerName,
                    tagline: player.tagline,
                    team: player.team,
                    rank: player.rank,
                    level: player.level
                })
                    .then(function (response) {
                        console.log("Put Request for Rank and Level for: ", player.summonerName, response)
                    })
                    .catch(function (error) {
                        console.error(error);
                    })

            })
            .catch((error) => {
                console.error('Error fetching league data:', error);
            });

        return player;
    }

    useEffect(() => {
        console.log("Teams updated: ", props.teams);
    }, [props.teams]);

    function handlePlayerSubmit(e:any) {
        e.preventDefault();

        axios.post('/api/player', {
            summonerName: summonerNameInput,
            tagline: taglineInput,
            team: teamInput,
            rank: "",
            level: ""
        })
            .then(function (response) {
                console.log(response);

                props.setPlayers(prevState => [...prevState, response.data]);
            })
            .catch(function (error) {
                console.error(error);
            });
    }

    function handleTeamSubmit(e:any) {
        e.preventDefault();

        axios.post('/api/teams', {
            team: newTeamName
        })
            .then(function (response) {
                console.log(response);

                let tempTeam: Team = {
                    name: newTeamName,
                    players: []
                }

                props.setTeams(prevState => [...prevState, tempTeam]);
                setNewTeamName("");
            })
            .catch(function (error) {
                console.error(error);
            });
    }

    return (
        <>
            <Grid container spacing={2} sx={{maxWidth: 600, margin: 'auto'}}>
                <TeamsList teams={props.teams} setPlayers={props.setPlayers}/>
            </Grid>
            <form onSubmit={handlePlayerSubmit}>
                <h4>Add Player</h4>
                <Grid container spacing={2} sx={{maxWidth: 600, margin: 'auto'}}>
                    <Grid item xs={8}>
                        <TextField required id="summoner-name" label="Summoner Name" variant="standard"
                                   sx={{width: '100%'}}
                                   onChange={e => setSummonerNameInput(e.target.value)}/>
                    </Grid>
                    <Grid item xs={4}>
                        <TextField required id="tagline" label="Tagline" variant="standard" sx={{width: '100%'}}
                                   onChange={e => setTaglineInput(e.target.value)}/>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl required sx={{width: '100%'}}>
                            <InputLabel id="team-label">Team</InputLabel>
                            <Select
                                labelId="team-label"
                                id="team"
                                value={teamInput}
                                onChange={e => setTeamInput(e.target.value)}
                                label="Team"
                                required
                            >
                                {props.teams.map(el => (<MenuItem key={el.name} value={el.name}>{el.name}</MenuItem>))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={3} sx={{paddingTop: 2}}>
                        <Button variant="contained" color={'primary'} type={'submit'}>Add Player</Button>
                    </Grid>
                </Grid>
            </form>

            {/* add team */}
            <h4>Add Team</h4>
            <form onSubmit={handleTeamSubmit}>
                <Grid container spacing={2} sx={{maxWidth: 600, margin: 'auto'}}>
                    <Grid item xs={12}>
                        <TextField required id="team-name" label="Team Name" variant="standard"
                                   sx={{width: '100%'}}
                                   value={newTeamName}
                                   onChange={e => setNewTeamName(e.target.value)}/>
                    </Grid>
                    <Grid item xs={3} sx={{paddingTop: 2}}>
                        <Button variant="contained" color={'primary'} type={'submit'}>Add Team</Button>
                    </Grid>
                </Grid>
            </form>

            <Grid item xs={3} sx={{paddingTop: 5}}>
                <Button variant="contained" color={'primary'} onClick={handleRefresh}>Refresh Match Data</Button>
                {show && <p>Please wait {timeLeft} seconds before refreshing again</p>}
            </Grid>
        </>
    )
}

export default ModifyTeams;