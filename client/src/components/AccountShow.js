import { useParams } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";

const AccountShow = ({ token }) => {
    const { id } = useParams();
    const [ account, setAccount ] = useState();

    useEffect(() => {
        axios.post(`http://localhost:5000/accounts/${id}`, {
            account_id: id
        })
        .then(response => {
            setAccount(response.data);
        });
    }, [])

    if (!token) {
        return <Redirect to='/' />
    }

    return (
        <div className='showpage'>
            { !account? <p> Loading data... </p> : 
            <> 
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <h1>
                    {account.username}
                </h1>
                <br/>
                <h3>
                    Games: {account.total_games || "Insufficient Data"}
                </h3> 
                <br/>
                <h3>
                    Wins: {account.total_wins || "Insufficient Data" }
                </h3>
                <br/> 
                <h3>
                    Win%: {(account.total_wins/account.total_games * 100).toFixed(1) || "Insufficient Data"} 
                </h3>  
                <br/>
                <h3>
                    Kills: {account.total_kills || "Insufficient Data"}
                </h3> 
                <br/>
                <h3>
                    Kills Per Round: {(account.total_kills/account.total_games).toFixed(1) || "Insufficient Data"}
                </h3>
            </> 
            } 
        </div>
    )
}

export default AccountShow;