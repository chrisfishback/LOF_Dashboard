import {Card, CardContent, CardMedia} from "@mui/material";
import Typography from "@mui/material/Typography";

type PlayerGameInfoPageProps = { gameInfo: GameInfo };

function PlayerGameInfo(props : PlayerGameInfoPageProps) {

    let {champion, win, lane, kills, deaths, assists} = props.gameInfo
    console.log("PLAYER GAME PAGE")
    let champion_image = 'https://ddragon.leagueoflegends.com/cdn/12.4.1/img/champion/' + champion + '.png';

    return (
        <>
            {/*<p>{champion} - {lane} - {kills}/{deaths}/{assists}</p>*/}
            {/*<img src={champion_image} alt={champion}/>*/}
            {/*{ win ? <p>win</p> : <p>loss</p> }*/}
            <Card sx={{ maxWidth: 150 }}>
                <CardMedia
                    sx={{ height: 100 }}
                    image={champion_image}
                    title={champion}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {champion} - {lane}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {kills}/{deaths}/{assists}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        { win ? 'win' : 'loss' }
                    </Typography>
                </CardContent>
            </Card>
        </>
    )
}

export default PlayerGameInfo;

export type GameInfo = {
    champion: string;
    win: boolean;
    lane: string;
    kills: number;
    deaths: number;
    assists: number;
}