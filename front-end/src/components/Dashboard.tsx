import {useEffect} from "react";
import axios from "axios";

function Dashboard() {

    useEffect(() => {
        axios.get('api/game-data')
            .then((response) => {
                console.log(response.data)
            })
            .catch((error) => {
                console.error(error)
            })
    }, []);

    return (
        <>
            <h1>Dashboard Page</h1>
        </>
    )
}

export default Dashboard;