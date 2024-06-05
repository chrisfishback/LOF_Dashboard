import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { AllSummonerStatsType, summonerStats } from "../gameDataHelpers";
import Typography from "@mui/material/Typography";

type KDAChartProps = {
    gamesData: AllSummonerStatsType;
}

function KDAChart( gamesData: KDAChartProps) {

    if (!gamesData) {
        return (
            <p>ANGER</p>
        )
    }

    const top5Players = gamesData.gamesData.totalsPerSummoner
        .sort((a: summonerStats, b: summonerStats) => b.kills - a.kills) // Sort by kills in descending order
        .slice(0, 5); // Select the top 5 players

    const data = top5Players.map((player: summonerStats) => ({
        name: player.summonerName,
        kills: player.kills,
        deaths: player.deaths,
        assists: player.assists
    }));
    return (
        <>
            <Typography variant="h5" gutterBottom>
                Kills/Deaths/Assists - Top 5
            </Typography>
            <ResponsiveContainer width="100%" height={400}>
                <BarChart data={data} margin={{top: 20, right: 30, left: 20, bottom: 5}}>
                    <CartesianGrid strokeDasharray="3 3"/>
                    <XAxis dataKey="name"/>
                    <YAxis/>
                    <Tooltip/>
                    <Legend/>
                    <Bar dataKey="kills" fill="#8884d8"/>
                    <Bar dataKey="deaths" fill="#82ca9d"/>
                    <Bar dataKey="assists" fill="#ffc658"/>
                </BarChart>
            </ResponsiveContainer>
        </>
    );
}


export default KDAChart;