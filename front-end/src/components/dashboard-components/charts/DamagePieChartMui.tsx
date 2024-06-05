import { Box, Typography } from "@mui/material";
import { PieChart } from "@mui/x-charts";
import { AllSummonerStatsType } from "../gameDataHelpers.ts";


// @ts-ignore
const COLORS = [
    '#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF',
    '#FF6E9D', '#5FCCFF', '#FFC233', '#45E71A', '#FF5842'
];

export default function DamagePieChartMui({ gamesData }: DamagePieChartProps) {
    const data = gamesData.totalsPerSummoner.map(player => ({
        name: player.summonerName,
        value: player.totalDamage
    }));

    return (
        <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            height="100%"
        >
            <Typography variant="h5" gutterBottom>
                Total Damage
            </Typography>
            <PieChart
                series={[
                    {
                        data
                    }
                ]}
                width={400}
                height={200}
            />
        </Box>
    );
}

type DamagePieChartProps = {
    gamesData: AllSummonerStatsType
};
