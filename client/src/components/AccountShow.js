import { useParams } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
import { Redirect, Link } from "react-router-dom";

const AccountShow = ({ token }) => {
    const { id } = useParams();
    const [ accounts, setAccounts ] = useState([]);
    const [ accountsGames, setAccountsGames ] = useState([]);
    const [ accountsKills, setAccountsKills ] = useState([]);
    const [ userData, setUserData ] = useState();

    const getAccounts = async() => {
        try {
            const response = await fetch('http://localhost:5000/leaderboard');
            const jsonData = await response.json();

            setAccounts(jsonData);
        } catch (error) {
            console.log(error);
        }
    };

        const SubmitKills = async() => {
                try {
                    const response = await fetch('http://localhost:5000/leaderboard/kills');
                    const jsonData = await response.json();
        
                    setAccountsKills(jsonData);
                } catch (error) {
                    console.log(error);
                }
        };



        const SubmitGames = async() => {
            try {
                const response = await fetch('http://localhost:5000/leaderboard/games');
                const jsonData = await response.json();

                setAccountsGames(jsonData);
            } catch (error) {
                console.log(error);
            }
        };


    useEffect(() => {
        getAccounts();
        SubmitGames();
        SubmitKills();

    }, [])

    useEffect(() => {

        axios.post(`http://localhost:5000/accounts/${id}`, {
            account_id: id
        })
        .then(response => {
            setUserData(response.data);
        });
    }, []);


    if (!userData) {
        return <p> Loading.. </p>
    }

    if (!token) {
        return <Redirect to='/' />
    }

    return (
        <div className='leaderboardPage'>
    
            <div className="leaderboards1">
                <th> 
                    Win Leaders
                </th>
                <th> 
                    &emsp;
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
                                {account.total_wins}
                            </p>
                        </td>
                    </tr> 
                    ))
                    }
                </tbody>
            </div>
    
            <div className="leaderboards2">
                <th> 
                    Game Leaders
                </th>
                <th> 
                    &emsp;
                </th>
                <tbody>
                    {accountsGames.map(acc => (
                    <tr className="leaderboard-accounts" 
                        key={acc.account_id}
                        >
                        <td> 
                            <Link to={`/accounts/${acc.account_id}`}>
                                <p>
                                    {acc.username} 
                                </p> 
                            </Link>
                        </td>
                        <td>
                            <p>
                                {acc.total_games}
                            </p>
                        </td>
                    </tr> 
                    ))
                    }
                </tbody>
            </div>
    
            <div className="leaderboards3">
                <th> 
                    Kill Leaders
                </th>
                <th> 
                    &emsp;
                </th>
                <tbody>
                    {accountsKills.map(ac => (
                    <tr className="leaderboard-accounts" 
                        key={ac.account_id}
                        >
                        <td> 
                            <Link to={`/accounts/${ac.account_id}`}>
                                <p>
                                    {ac.username} 
                                </p> 
                            </Link>
                        </td>
                        <td>
                            <p>
                                {ac.total_kills}
                            </p>
                        </td>
                    </tr> 
                    ))
                    }
                </tbody>
            </div>
    
            <div className="leaderboardsme">
                <th> 
                    {userData.username}
                </th>
                <tbody>
                    
                    <tr className="leaderboard-accounts-me" >
                        <tr>
                            <td> 
                                Games
                            </td>
                        
                            <td>
                                <p>
                                    {userData.total_games || '0' }
                                </p>
                            </td>
                        </tr>
                        <tr>
                            <td> 
                                Wins
                            </td>
                            <td>
                                <p>
                                    {userData.total_wins || '0' }
                                </p>
                            </td>
                        </tr>
                        <tr>
                            <td> 
                                Wins% 
                            </td>
                            <td>
                                <p>
                                    {(userData.total_wins/userData.total_games * 100).toFixed(1) || "0"}
                                </p>
                            </td>
                        </tr>
                        <tr>
                            <td> 
                                Kills 
                            </td>
                            <td>
                                <p>
                                    {userData.total_kills || "Insufficient Data"}
                                </p>
                            </td>
                        </tr>
                        <tr>
                            <td> 
                                Kill/Game 
                            </td>
                            <td>
                                <p>
                                    {(userData.total_kills/userData.total_games).toFixed(1) || "Insufficient Data"}
                                </p>
                            </td>
                        </tr>
                    </tr> 
    
                </tbody>
            </div>
    
        </div>
        );
    }
    

export default AccountShow;