
type PlayerGameInfoPageProps = { gameInfo: GameInfo };

function PlayerGameInfo(props : PlayerGameInfoPageProps) {

    let {champion, win, lane, kills, deaths, assists} = props.gameInfo
    console.log("PLAYER GAME PAGE")

    return (
        <>
            <p>{champion} - {lane} - {kills}/{deaths}/{assists}</p>
            { win ? <p>win</p> : <p>loss</p> }
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