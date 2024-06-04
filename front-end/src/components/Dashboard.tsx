import { useState, useEffect } from "react";
import axios from "axios";
import { allSummonerStats, summonerStats } from "./dashboard-components/gameDataHelpers.ts";
import { combineBySummonerName } from "./dashboard-components/gameDataHelpers.ts";
import KDAChart from "./dashboard-components/charts/KDAChart.tsx";

function Dashboard() {
    const [gamesData, setGamesData] = useState<allSummonerStats>({ totalsPerSummoner: [] });

    useEffect(() => {
        axios.get('api/game-data')
            .then((response) => {
                const data: summonerStats[] = response.data;
                const combinedData = combineBySummonerName(data);
                console.log(combinedData);
                setGamesData(combinedData);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    return (
        <>
            <h1>Dashboard Page</h1>
            <KDAChart gamesData={gamesData}/>
        </>
    );
}

export default Dashboard;