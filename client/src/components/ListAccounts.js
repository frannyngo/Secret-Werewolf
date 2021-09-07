import React, { useEffect, useState} from 'react';
import { Link, Redirect } from 'react-router-dom';

const AccountShowList = ({ token }) => {

    const [accounts, setAccounts] = useState([]);

    const getAccounts = async() => {
        try {
            const response = await fetch('http://localhost:5000/leaderboard');
            const jsonData = await response.json();

            setAccounts(jsonData);
        } catch (error) {
            console.log(error);
        }
    };

    const Redirect = (e) => {
        e.preventDefault()
        const gettingAccounts = async() => {
            try {
                const response = await fetch('http://localhost:5000/leaderboard');
                const jsonData = await response.json();
    
                setAccounts(jsonData);
            } catch (error) {
                console.log(error);
            }
        };
        gettingAccounts();
    };

    const KillList= (e) => {
        e.preventDefault()
        const SubmitKills = async() => {
                try {
                    const response = await fetch('http://localhost:5000/leaderboard/kills');
                    const jsonData = await response.json();
        
                    setAccounts(jsonData);
                } catch (error) {
                    console.log(error);
                }
        };
        SubmitKills();
    };

    const GameList= (e) => {
        e.preventDefault()
        const SubmitGames = async() => {
            try {
                const response = await fetch('http://localhost:5000/leaderboard/games');
                const jsonData = await response.json();

                setAccounts(jsonData);
            } catch (error) {
                console.log(error);
            }
        };
        SubmitGames();
    };

    useEffect(() => {
        getAccounts();
    }, []);

    if (!token) {
        return <Redirect to='/' />
    }

    return (
    <div className='leaderboardPage'>
        <div className='leaderboardButtons'>
            <button className="btn btn-background-circle"
                onClick={Redirect}
                >
                Wins 
            </button>
            &nbsp;&nbsp;
            <button className="btn btn-background-circle"
                onClick={KillList}
                >
                Kills
            </button>
            &nbsp;&nbsp;
            <button className="btn btn-background-circle"
                onClick={GameList}
                >
                Games
            </button>
        </div>

        <div className="leaderboards">
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
    </div>
    );
}


export default AccountShowList;