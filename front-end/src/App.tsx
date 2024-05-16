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

    useEffect(() => {
        axios.get('http://localhost:8080/api/player')
            .then((response: AxiosResponse) => {
                console.log(response.data);
                setPlayers(response.data)
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
                    <Route path="/teams" element={<TeamsPage players={players}/>}/>
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
