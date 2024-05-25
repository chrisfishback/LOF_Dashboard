import {Card, CardContent, CardMedia} from "@mui/material";
import Typography from "@mui/material/Typography";

type PlayerGameInfoPageProps = { gameInfo: GameInfo };

function PlayerGameInfo(props : PlayerGameInfoPageProps) {

    let {champion, win, lane, kills, deaths, assists} = props.gameInfo
    //console.log("PLAYER GAME PAGE")
    let champion_image = 'https://ddragon.leagueoflegends.com/cdn/12.4.1/img/champion/' + champion + '.png';

    return (
        <>
            {/*<p>{champion} - {lane} - {kills}/{deaths}/{assists}</p>*/}
            {/*<img src={champion_image} alt={champion}/>*/}
            {/*{ win ? <p>win</p> : <p>loss</p> }*/}
            <Card sx={{ display: 'flex', alignItems: 'center' }}>
                <CardContent sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                    <CardMedia
                        sx={{ height: 50, width: 50, marginRight: 2 }}
                        image={champion_image}
                        title={champion}
                    />
                    <Typography gutterBottom variant="h5" component="div" sx={{ flexGrow: 1 }}>
                        {champion} - {lane}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ marginLeft: 2 }}>
                        {kills}/{deaths}/{assists}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ marginLeft: 2 }}>
                        {win ? 'win' : 'loss'}
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