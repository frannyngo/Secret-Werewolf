import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';



 const AccountDetails = ({ token }) => {
    const [ userData, setUserData ] = useState();

    const [accounts, setAccounts] = useState([]);

    const getAccounts = async() => {
        try {
            const response = await fetch('http://localhost:5000/accounts');
            const jsonData = await response.json();

            setAccounts(jsonData);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getAccounts();
    }, []);

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
    <div className='profile'>
            <div className="leaderboard">
            <th> 
                Username:
            </th>
            <th>
                Games:
            </th>
            <th>
                Wins:
            </th>
            <th>
                Win%:
            </th>
            <th>
                Kills:
            </th>
            <th>
                Kills/Round:
            </th>
            <tbody>
                {accounts.map(account => (
                <tr className="leaderboard-accounts" 
                    key={account.account_id}
                    >
                    <td> 
                        <Link to={`/accounts/${account.account_id}`}>
                            <p>
                                {account.username} 
                            </p> 
                        </Link>
                    </td>
                    <td>
                        <p>
                            {account.total_games}
                        </p>
                    </td>
                    <td>
                        <p>
                            {account.total_wins}
                        </p>
                    </td>
                    <td>
                        <p>
                            {(account.total_wins/account.total_games * 100).toFixed(1)}
                        </p>
                    </td>
                    <td>
                        <p>
                            {account.total_kills}
                        </p>
                    </td>
                    <td>
                        <p>
                            {(account.total_kills/account.total_games).toFixed(1)}
                        </p>
                    </td>
                </tr> 
                ))
                }
            </tbody>
        </div>
        
        <div className="showpage">
            { !userData? <p> Loading data... </p> : 
            <> 
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
    </div>
    )
}

export default AccountDetails;