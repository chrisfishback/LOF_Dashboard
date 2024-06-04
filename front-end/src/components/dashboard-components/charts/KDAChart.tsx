import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { allSummonerStats, summonerStats } from "../gameDataHelpers";

type KDAChartProps = {
    gamesData: allSummonerStats;
}

function KDAChart({ gamesData }: KDAChartProps) {
    const data = gamesData.totalsPerSummoner.map((player: summonerStats) => ({
        name: player.summonerName,
        kills: player.kills,
        deaths: player.deaths,
        assists: player.assists
    }));

    return (
        <ResponsiveContainer width="100%" height={400}>
            <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="kills" fill="#8884d8" />
                <Bar dataKey="deaths" fill="#82ca9d" />
                <Bar dataKey="assists" fill="#ffc658" />
            </BarChart>
        </ResponsiveContainer>
    );
}

KDAChart.defaultProps = {
    gamesData: { totalsPerSummoner: [] }
};

export default KDAChart;