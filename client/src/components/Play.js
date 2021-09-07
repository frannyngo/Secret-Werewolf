import { useEffect, useState } from "react";
import axios from "axios";
import { useHistory, Redirect } from "react-router-dom";
import P1moon from './img/p1moon.png';
import P1dead from './img/p1dead.png';
import P2moon from './img/p2moon.png';
import P2dead from './img/p2dead.png';
import P3dead from './img/p3dead.png';
import P3moon from './img/p3moon.png';
import P4dead from './img/p4dead.png';
import P4moon from './img/p4moon.png';
import P5moon from './img/p5moon.png';
import P5dead from './img/p5dead.png';
import P6dead from './img/p6dead.png';
import P6moon from './img/p6moon.png';
import P1morning from './img/p1morning.png';
import P2morning from './img/p2morning.png';
import P3morning from './img/p3morning.png';
import P4morning from './img/p4morning.png';
import P5morning from './img/p5morning.png';
import P6morning from './img/p6morning.png';
import P1morndead from './img/p1morndead.png';
import P2morndead from './img/p2morndead.png';
import P3morndead from './img/p3morndead.png';
import P4morndead from './img/p4morndead.png';
import P5morndead from './img/p5morndead.png';
import P6morndead from './img/p6morndead.png';

const Play = ({ token, inGame, setInGame, setWin, setUserKills, userKills }) => {

    const [ userData, setUserData ] = useState();
    const [ nightPhase, setNightPhase ] = useState(false);
    const [ morningPhase, setMorningPhase ] = useState(true);
    const [ disabled, setDisabled ] = useState(false);
    const [ playersRemaining, setPlayersRemaining ] = useState(['Simon', 'Shaemus', 'Linda', 'Ed', 'Dana', 'Alfred']);
    const [ witch, setWitch ] = useState();
    const [ alive, setAlive ] = useState(true);
    const [ consoleLog, setConsoleLog ] = useState();
    const [ logVotes, setLogVotes ] = useState();
    const [ p1, setP1 ] = useState({ id: '' }); 
    const [ p2, setP2 ] = useState({ id: '' }); 
    const [ p3, setP3 ] = useState({ id: '' }); 
    const [ p4, setP4 ] = useState({ id: '' }); 
    const [ p5, setP5 ] = useState({ id: '' }); 
    const [ p6, setP6 ] = useState({ id: '' }); 
    const [ isAlert, setIsAlert ] = useState(false);
    const [ vp1, setVP1 ] = useState(0);
    const [ vp2, setVP2 ] = useState(0);
    const [ vp3, setVP3 ] = useState(0);
    const [ vp4, setVP4 ] = useState(0);
    const [ vp5, setVP5 ] = useState(0);
    const [ vp6, setVP6 ] = useState(0);
    const [ vp7, setVP7 ] = useState(0);

    // console.log(playersRemaining.length)

    const ShowAlert = () => {
        setIsAlert(true);
        setTimeout(() => {
            setIsAlert(false)
        }, 4000)
    }   

    let history = useHistory();
    setWin(null);
    console.log(playersRemaining)
    const Select = (e) => {

        const pp1 = document.getElementById('Simon');
        const pp2 = document.getElementById('Shaemus');
        const pp3 = document.getElementById('Linda');
        const pp4 = document.getElementById('Ed');
        const pp5 = document.getElementById('Dana');
        const pp6 = document.getElementById('Alfred');
    
        setP1(pp1);
        setP2(pp2);
        setP3(pp3);
        setP4(pp4);
        setP5(pp5);
        setP6(pp6);
    
        setVP1(0);
        setVP2(0);
        setVP3(0);
        setVP4(0);
        setVP5(0);
        setVP6(0);

        const selected = e.target.id;

        const cpuVotes = playersRemaining.filter((player) => {
            return player !== userData.username
        })

        if ( playersRemaining.length >= 3 ) {
            if ( morningPhase === true ) { 
                let votes = []; 
                for (let i = 0; i <= cpuVotes.length - 1; i++) {
                    let random = playersRemaining[Math.floor((Math.random() * playersRemaining.length))];
                    votes.push(random);
                    
                    // console.log(`v: ${random}`);
                    // console.log(pp1.id);
                    // console.log(pp2.id);
                    // console.log(pp3.id);
                    // console.log(pp4.id);
                    // console.log(pp5.id);
                    // console.log(pp6.id);

                    // if (random === pp1.id) {
                    //     setVP1(vp1 + 1);
                    // }
                    // else if (random === pp2.id) {
                    //     setVP2(vp2 + 1);
                    // }
                    // else if (random === pp3.id) {
                    //     setVP3(vp3 + 1);
                    // }
                    // else if (random === pp4.id) {
                    //     setVP4(vp4 + 1);
                    // }
                    // else if (random == pp5.id) {
                    //     setVP5(vp5 + 1);
                    // }
                    // else if (random === pp6.id) {
                    //     setVP6(vp6 + 1);
                    // } 
                    
                };
                votes.push(selected);
                setLogVotes(votes);
                
                let highestReoccurence = 1;
                let counter = 0;
                let mostVoted = null;

                playersRemaining.forEach((player) => {
                    let currentVotesCount =  votes.filter((vote) => {
                        return vote === player
                        }).length
                            if (counter < currentVotesCount) {
                                counter = currentVotesCount 
                                mostVoted = player
                                highestReoccurence = 1
                        } 
                            else if (counter === currentVotesCount) {
                                highestReoccurence += 1
                            }
                    })

                    if (highestReoccurence > 1) {
                        setConsoleLog(`Players are tied for votes, there will be no execution today!`);
                        ShowAlert();
                    }
                    else {
                        if (mostVoted === userData.username) {
                            setWin(false);
                            setPlayersRemaining(['Simon', 'Shaemus', 'Linda', 'Ed', 'Dana', 'Alfred']);
                            history.push('/postgame');
                        } 
                        else {
                            const hanged = document.getElementById(mostVoted); 
                            hanged.disabled = true;
                            hanged.value = false;
                            setConsoleLog(`Player ${mostVoted} has been hanged`);
                            ShowAlert();
                            console.log(`Player ${mostVoted} has been hanged`);
                            setPlayersRemaining(playersRemaining.filter((player) => {
                                return player !== mostVoted    
                            }));

                            if (playersRemaining.length === 2) {
                                setWin(true);
                                setPlayersRemaining(['Simon', 'Shaemus', 'Linda', 'Ed', 'Dana', 'Alfred'])
                                history.push('/postgame');
                            };
                        }
                    }

                setMorningPhase(false);
                setNightPhase(true);
            }
            else if (nightPhase === true) {
                const eliminate = e.target.id
                const playerEliminated = document.getElementById(eliminate);
                const witchProtects = playersRemaining[Math.floor((Math.random() * playersRemaining.length))];
                const witchalive = document.getElementById(witch);

                if (witchalive.value = true) {
                    if (eliminate === witchProtects) {
                        setConsoleLog(`Witch has healed player ${witchProtects} from a werewolf attack!`);
                        ShowAlert();
                    }
                    else if (eliminate !== witchProtects) {
                        playerEliminated.disabled = true;
                        playerEliminated.value = false;
                        setPlayersRemaining(playersRemaining.filter((player) => {
                            return player !== eliminate
                        }));
                        setUserKills(userKills + 1);
                        setConsoleLog(`The werewolf eliminated player ${eliminate}`);
                        ShowAlert()

                        if (playersRemaining.length === 2) {
                            setWin(true);
                            setPlayersRemaining(['Simon', 'Shaemus', 'Linda', 'Ed', 'Dana', 'Alfred'])
                            history.push('/postgame');
                        };
                    } 
                    else {
                        alert('somethings wrong with your night-phase, if witch is alive statements');
                    } 
                }
                else if (witchalive.value = false) {
                    playerEliminated.disabled = true;
                    playerEliminated.value = false;
                    setPlayersRemaining(playersRemaining.filter((player) => {
                        return player !== eliminate
                    }));
                    setUserKills(userKills + 1);
                    setConsoleLog(`The werewolf eliminated player ${eliminate}`);
                    ShowAlert();

                    if (playersRemaining.length === 2) {
                        setWin(true);
                        setPlayersRemaining(['Simon', 'Shaemus', 'Linda', 'Ed', 'Dana', 'Alfred'])
                        history.push('/postgame');
                    };
                }
                else {
                    alert('something wrong with witch alive condition statement');
                }

                setLogVotes();
                setMorningPhase(true);
                setNightPhase(false);
            }
            else {
                alert('Something wrong with phases...');
            }
        }

        else if (playersRemaining.length === 2) {
                setWin(true);
                setPlayersRemaining(['Simon', 'Shaemus', 'Linda', 'Ed', 'Dana', 'Alfred'])
                history.push('/postgame');
        }
        else {
            alert('Something is wrong with the game..');
        }
    }

    useEffect(() => {
        axios.post('http://localhost:5000/accounts/me', {
            token: token,
        })
        .then(response => {
            setUserData(response.data);

            let healer = Math.floor((Math.random() * playersRemaining.length));
            setWitch(playersRemaining[healer]);

            setPlayersRemaining([...playersRemaining, response.data.username])
            setInGame(true);

            setUserKills(0);

        });
    }, [])

    if (!token) {
        return <Redirect to='/' />
    }

    if ( !userData) {
        return <p> Loading.... </p>
    }

    return(
        <>  
               {/* { !morningPhase? 
                <div className='phases'>
                    <h2 className='phase'> 
                        NIGHT-PHASE
                    </h2>
                    <h3 className='who'>
                        Who would you like to eliminate?
                    </h3>
                </div>
                :
                <div className='phases'>
                    <h2 className='phase'>
                        MORNING-PHASE
                    </h2>
                    <h3 className="who">
                        Vote who you would like to "frame" as the "werewolf"
                    </h3>
                </div>
                } */}

            <div className={`${isAlert? 'alert show' : 'alert hide'}`} id='alert'>
                <span className='fas fa-exclamation-circle'>

                </span>
                <span className='msg'>
                    {consoleLog}
                </span>

            </div>

            {/* <h5 class='consolee'> {consoleLog} </h5> */}
            <div className='gamescreen'>

            <div className='gameinfo'>
                  
                    <h3 className='player7'
                        id={userData.username}
                        > 
                    </h3>
                    {/* <h3>
                        Votes:
                    </h3>
                  
                    { logVotes?   
                    <>  
                        {logVotes.map(v => (
                            <p className='vote'>
                                {v}
                            </p>            
                        ))
                        }   
                    </>
                    :
                    <>
                        <p>
                            No votes yet...
                        </p>
                    </>
                    }  */}
                </div>

                <div className='container'>
                    <div className='card'>
                        <p className='counter'>
                            {vp1}
                        </p>
                        <div className='image'>
                            { p1.disabled? 
                                morningPhase? 
                                    <img src={P1morndead} alt='player 1' />
                                :
                                    <img src={P1dead} alt='player 1' />
                            :
                                morningPhase?
                                    <img src={P1morning} alt='player 1 morning' />
                                :
                                    <img src={P1moon} alt='player 1 dead' /> 
                            }
                        </div>
                        <div className='description'>
                            <h3>
                                Simon
                            </h3>
                            <p>
                                I've heard that he's currently in med-school, studying to become a doctor. Could pose as a problem in the future..
                            </p>
                        </div>
                        <button 
                            className='playbutton'
                            id='Simon'
                            disabled={disabled}
                            onClick={Select}
                            value={alive}
                            >
                            Select
                        </button>
                    </div>

                    <div className='card'>
                        <p className='counter'>
                            {vp2}
                        </p>
                        <div className='image'>
                            { p2.disabled? 
                                morningPhase?
                                    <img src={P2morndead} alt='pl' />
                                :
                                    <img src={P2dead} alt='player 1' />
                            :   
                                morningPhase?
                                    <img src={P2morning} alt='player1' />
                                :
                                    <img src={P2moon} alt='player 1 dead' />
                            }
                        </div>
                        <div className='description'>
                            <h3>
                                Shaemus
                            </h3>
                            <p>
                                This mans beard is on-point. He has an elegant build and he's always drinking booze and partying at night,
                                could be easy prey? 
                            </p>
                        </div>
                        <button 
                            className='playbutton'
                            id='Shaemus'
                            disabled={disabled}
                            onClick={Select}
                            value={alive}
                            >
                            Select
                        </button>
                    </div>
                    
                    <div className='card'>
                        <p className='counter'>
                            {vp3}
                        </p>
                        <div className='image'>
                            { p3.disabled? 
                                morningPhase?
                                    <img src={P3morndead} alt='pl' />
                                :
                                    <img src={P3dead} alt='player 1' />
                            :   
                                morningPhase?
                                    <img src={P3morning} alt='player1' />
                                :
                                    <img src={P3moon} alt='player 1 dead' />
                            }                        
                        </div>
                        <div className='description'>
                            <h3>
                                Linda
                            </h3>
                            <p>
                                She's seems very articulate and well-educated, she also loves to read mystery novels.. She could pose as a problem if i dont eliminate her early. 
                            </p>
                        </div>
                        <button 
                            className='playbutton'
                            id='Linda'
                            disabled={disabled}
                            onClick={Select}
                            value={alive}
                            >
                            Select
                        </button>
                    </div>

                    <div className='card'>
                        <p className='counter'>
                            {vp4}
                        </p>
                        <div className='image'>
                            { p4.disabled? 
                                morningPhase?
                                    <img src={P5morndead} alt='pl' />
                                :
                                    <img src={P5dead} alt='player 1' />
                            :   
                                morningPhase?
                                    <img src={P5morning} alt='player1' />
                                :
                                    <img src={P5moon} alt='player 1 dead' />
                            }                        
                        </div>
                        <div className='description'>
                            <h3>
                                Ed
                            </h3>
                            <p>
                                I always see him at the diner in the morning, drinking coffee and eating a bagel. Then he goes out to party with Shaemus at night, they never leave together...
                            </p>
                        </div>
                        <button 
                            className='playbutton'
                            id='Ed'
                            disabled={disabled}
                            onClick={Select}
                            value={alive}
                            >
                            Select
                        </button> 
                    </div>
                    
                    <div className='card'>
                        <p className='counter'>
                            {vp5}
                        </p>
                        <div className='image'>
                            { p5.disabled? 
                                    morningPhase?
                                    <img src={P4morndead} alt='pl' />
                                :
                                    <img src={P4dead} alt='player 1' />
                            :   
                                morningPhase?
                                    <img src={P4morning} alt='player1' />
                                :
                                    <img src={P4moon} alt='player 1 dead' />
                            }                        
                        </div>
                        <div className='description'>
                            <h3>
                                Dana
                            </h3>
                            <p>
                                She is a successful business woman. I've also heard rumors that
                                she used to be a medic for the army. She could potentially be a first-responder to my victims.. 
                            </p>
                        </div>
                        <button 
                            className='playbutton'
                            id='Dana'
                            disabled={disabled}
                            onClick={Select}
                            value={alive}
                            >
                            Select
                        </button>
                    </div>

                    <div className='card'>
                       <p className='counter'>
                            {vp6}
                        </p>
                        <div className='image'>
                            { p6.disabled? 
                                morningPhase?
                                    <img src={P6morndead} alt='pl' />
                                    :
                                    <img src={P6dead} alt='player 1' />
                            :   
                                morningPhase?
                                    <img src={P6morning} alt='player1' />
                                    :
                                    <img src={P6moon} alt='player 1 dead' />
                            }                        
                        </div>
                        <div className='description'>
                            <h3>
                                Alfred
                            </h3>
                            <p>
                                A mysterious retired doctor, not much about him. I rarely ever see him around town. Rumors are, he spends his times hunting animals in the forest 
                                just outside of the town. 
                            </p>
                        </div>
                        <button 
                            className='playbutton'
                            id='Alfred'
                            disabled={disabled}
                            onClick={Select}
                            value={alive}
                            >
                            Select
                        </button>
                        
                    </div>

                </div>
            </div>       
            
        </>
    );
}


export default Play;