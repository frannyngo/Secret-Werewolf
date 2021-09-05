import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';


 const AccountDetails = ({ token }) => {
    const [ userData, setUserData ] = useState();

    useEffect(() => {
        axios.post('http://localhost:5000/accounts/me', {
            token: token,
        }).then(response => {
            setUserData(response.data);
        })
    }, [])
    
    if (!token) {
        return <Redirect to='/' />
    }

    return (
        <div className="showpage">
            { !userData? <p> Loading data... </p> : 
            <> 
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <h1>
                    {userData.username}
                </h1>
                <br/>
                <br/>
                <h3>
                    Games: {userData.total_games || "Insufficient Data"}
                </h3> 
                <br/>
                <h3>
                    Wins: {userData.total_wins || "Insufficient Data" }
                </h3> 
                <br/>
                <h3>
                    Win%: {(userData.total_wins/userData.total_games * 100).toFixed(1) || "Insufficient Data"}
                </h3>  
                <br/>
                <h3>
                    Kills: {userData.total_kills || "Insufficient Data"}
                </h3> 
                <br/>
                <h3>
                    Kills Per Game: {(userData.total_kills/userData.total_games).toFixed(1) || "Insufficient Data"}
                </h3>
            </> 
            } 
        </div>
    )
}

export default AccountDetails;