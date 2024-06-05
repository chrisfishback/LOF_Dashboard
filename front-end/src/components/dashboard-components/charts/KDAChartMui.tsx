import { BarChart } from '@mui/x-charts';
import { AllSummonerStatsType, summonerStats } from '../gameDataHelpers';
import Typography from '@mui/material/Typography';

type KDAChartMuiProps = {
    gamesData: AllSummonerStatsType;
};

function KDAChartMui(gamesData : KDAChartMuiProps) {
    const top5Players = gamesData.gamesData.totalsPerSummoner
        .sort((a: summonerStats, b: summonerStats) => b.kills - a.kills) // Sort by kills in descending order
        .slice(0, 5); // Select the top 5 players

    const data = top5Players.map((player: summonerStats) => ({
        name: player.summonerName,
        kills: player.kills,
        deaths: player.deaths,
        assists: player.assists
    }));

    // const names = data.map(player => player.name);
    // const kills = data.map(player => player.kills);
    // const deaths = data.map(player => player.deaths);
    // const assists = data.map(player => player.assists);

    // console.log(names, kills, deaths, assists);
    //
    // if(names.length <= 0 || kills.length <= 0 || deaths.length <= 0|| assists.length <= 0) {
    //     return (
    //         <p>Loading...</p>
    //     )
    // }

    return (
        <>
            <Typography variant="h5" gutterBottom>
                Kills/Deaths/Assists - Top 5
            </Typography>
            <BarChart
                dataset={data}
                xAxis={[{ scaleType: 'band', dataKey: 'name' }]}
                series={[
                    { dataKey: 'kills', label: 'kills' },
                    { dataKey: 'deaths', label: 'deaths' },
                    { dataKey: 'assists', label: 'assists' }
                ]}
                width={500}
                height={300}
            />
        </>
    );
}

export default KDAChartMui;
