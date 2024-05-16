import './App.css'
import {Header} from "./components/header_footer/Header.tsx";
import {Routes, Route, BrowserRouter as Router} from "react-router-dom";
import Error from "./components/Error.tsx"
import TeamsPage from "./components/TeamsPage.tsx";
import Admin from "./components/Admin.tsx";
import Dashboard from "./components/Dashboard.tsx";
import {useEffect, useState} from "react";
import axios, {AxiosResponse} from "axios";

export default function App() {

    const [players, setPlayers] = useState<Player[]>([]);
    const [teamNames, setTeamNames] = useState<string[]>([])
    const [teams, setTeams] = useState<Team[]>([])

    useEffect(() => {
        if (teamNames.length !== 0) {
            const separatedTeams = separateTeams(players, teamNames);
            setTeams(separatedTeams);
        }
    }, [players, teamNames]);

    function getPlayersPerTeam(initTeam: string, players: Player[]): Player[] {
        return players.filter((player: Player) => player.team === initTeam);
    }

    function separateTeams(players: Player[], teamNames: string[]): Team[] {
        return teamNames.map(team => {
            const teamPlayers = getPlayersPerTeam(team, players);
            return {
                name: team,
                players: teamPlayers,
            };
        });
    }

    useEffect(() => {
        axios.get('http://localhost:8080/api/player')
            .then((response: AxiosResponse) => {
                setPlayers(response.data)
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);

    useEffect(() => {
        axios.get('http://localhost:8080/api/teams')
            .then((response: AxiosResponse) => {
                const teamsByName : string[] = response.data.map((el: { id: number, team: string }) => el.team);
                setTeamNames(teamsByName);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });

    }, []);

    return (
        <>
            <Router>
                <Header/>
                <Routes>
                    <Route path="/" element={<Dashboard/>}/>
                    <Route path="/teams" element={<TeamsPage teams={teams}/>}/>
                    <Route path="/admin" element={<Admin/>}/>
                    <Route path="*" element={<Error/>}/>
                </Routes>
            </Router>
        </>
    )
}

export type Player = {
    id: number;
    puuid: string;
    summonerId: string;
    summonerName: string;
    team: string;
}

export type Team = {
    name: string;
    players : Player[];
}
