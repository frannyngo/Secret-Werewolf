import { Redirect } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const PostGame = ({ token, win, userKills, setInGame, inGame }) => {
    
    const [ userData, setUserData ] = useState({ username: '', 
                                                total_games: 0,
                                                total_kills: 0,
                                                total_wins: 0 
                                            });
    const game = 1                                        
    let gameResults = 0

    if (win === true) {
        gameResults = 1
    }
    
    let newTotalGames = game + userData.total_games;
    let newTotalWins = gameResults + userData.total_wins;
    let newTotalKills = userKills + userData.total_kills;


    const Continue = () => {
        axios.put('http://localhost:5000/postgame/me', {
            token: token,
            total_games: newTotalGames,
            total_wins: newTotalWins,
            total_kills: newTotalKills
        })
        .then(response => {
            console.log(response.data);
        })
        .catch(error => {
            console.log(error);
        });

        setInGame(false);
    }
    

   useEffect(() => {
    axios.post('http://localhost:5000/accounts/me', {
        token: token,
    })
    .then(response => {
        setUserData(response.data);
    });
}, [])

    if (!token) {
        return <Redirect to='/' />
    }

    if (!inGame) {
        return <Redirect to='/' />
    }

    return (
        <div className='postgame'>
            { !userData? <p> Loading data... </p> 
            : 
            <>  
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                {
                    win?
                        <h3>
                            Congratulations {userData.username} you won!
                        </h3>
                    :
                        <h3>
                            {userData.username}  you got caught!
                        </h3>
                }
                <br/>
                <h3>
                    You eliminated {userKills} players! 
                </h3>

                <p>
                    -----------------------------------------------------------------------------------------
                </p>
                <br/>
                <div className='endgame'>
                    <h2>
                        Total Games: &emsp; {userData.total_games || 0 } &emsp; + &emsp; {game} &emsp; = &emsp; {newTotalGames || 0}
                    </h2>
                    <br/>
                    <h2>
                        Total Wins: &emsp; {userData.total_wins || 0 } &emsp; + &emsp; {gameResults} &emsp; = &emsp; {newTotalWins || 0}
                    </h2>
                    <br/>
                    <h2>
                        Total Kills: &emsp; {userData.total_kills || 0 } &emsp; + &emsp; {userKills} &emsp; = &emsp; {newTotalKills || 0}
                    </h2>
                    <p>
                        &emsp;
                    </p>
                    <p>
                        Your account has been updated..
                    </p>
                    <br/>
                    <button className='btn btn-background-circle'
                        onClick={Continue}
                        >
                        Continue
                    </button>
                </div>
        </>
        }
        </div>
    );
}

export default PostGame;