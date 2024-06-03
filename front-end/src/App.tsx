import './App.css';
import { Header } from "./components/header_footer/Header.tsx";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import Error from "./components/Error.tsx";
import TeamsPage from "./components/TeamsPage.tsx";
import Dashboard from "./components/Dashboard.tsx";
import { useEffect, useState } from "react";
import axios from "axios";
import AdminPageWrapper from "./components/Admin.tsx";

export default function App() {
    const [players, setPlayers] = useState<Player[]>([]);
    const [teamNames, setTeamNames] = useState<string[]>([]);
    const [teams, setTeams] = useState<Team[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

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
        const fetchData = async () => {
            try {
                const [gamesResponse, playersResponse, teamsResponse] = await Promise.all([
                    axios.get('/api/game'),
                    axios.get('/api/player'),
                    axios.get('/api/teams')
                ]);

                console.log(gamesResponse.data);
                setPlayers(playersResponse.data);
                const teamsByName: string[] = teamsResponse.data.map((el: { id: number, team: string }) => el.team);
                setTeamNames(teamsByName);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/teams" element={<TeamsPage teams={teams} />} />
                <Route path="/admin/*" element={<AdminPageWrapper teams={teams} setTeams={setTeams} players={players} setPlayers={setPlayers} />} />
                <Route path="*" element={<Error />} />
            </Routes>
        </Router>
    );
}

export type Player = {
    id: number;
    summonerName: string;
    team: string;
    tagline: string;
    rank: string;
    level: string;
}

export type Team = {
    name: string;
    players: Player[];
}