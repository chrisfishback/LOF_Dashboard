import {PieChart, Pie, Cell, Tooltip, ResponsiveContainer} from "recharts";
import { AllSummonerStatsType } from "../gameDataHelpers.ts";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const COLORS = [
    '#0088FE', // blue
    '#00C49F', // green
    '#FFBB28', // yellow
    '#FF8042', // orange
    '#AF19FF', // purple
    '#FF6E9D', // pink
    '#5FCCFF', // light blue
    '#FFC233', // gold
    '#45E71A', // bright green
    '#FF5842', // red
];

export default function DamagePieChart(summonerGameData : DamagePieChartProps) {
    let colorIndex = 0;

    const customTooltip = ({ active, payload }: any) => {
        if (active && payload && payload.length) {
            const data = payload[0].payload;
            return (
                <div className="custom-tooltip" style={{ backgroundColor: "#fff", border: "1px solid #ccc", padding: "10px" }}>
                    <p className="label">{`${data.summonerName} : ${data.totalDamage}`}</p>
                </div>
            );
        }
        return null;
    };

    return (
        <>
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
                <ResponsiveContainer width="100%" height={400}>
                    <PieChart>
                        {/*width={400} height={400*/}
                        <Pie
                            data={summonerGameData.gamesData.totalsPerSummoner}
                            cx={200}
                            cy={200}
                            labelLine={false}
                            label={({index}) => summonerGameData.gamesData.totalsPerSummoner[index].summonerName}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="totalDamage"
                        >
                            {summonerGameData.gamesData.totalsPerSummoner.map((index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[colorIndex++]}/>
                            ))}
                        </Pie>
                        <Tooltip content={customTooltip}/>
                    </PieChart>
                </ResponsiveContainer>
            </Box>
        </>
    );
}

type DamagePieChartProps = {
    gamesData: AllSummonerStatsType
};