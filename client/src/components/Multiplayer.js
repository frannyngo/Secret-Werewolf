import { Redirect, useLocation } from "react-router-dom";
import { io } from 'socket.io-client'
import { useState, useEffect } from "react";
import ReactScrollableFeed from 'react-scrollable-feed';
import MultiWitch from './img/multiWitch.png';
import MultiElmininatedWitch from './img/mutliEliminatedWitch.png';

let socket = null;

const Multiplayer = ({ token }) => {
    const [ username, setUsername ] = useState('');
    const [ roomName, setRoomName ] = useState('');
    const [ message, setMessage ] = useState();
    const [ messages, setMessages ] = useState([]);
    const ENDPOINT = 'http://localhost:5000';
    const [ messagesActived, setMA ] = useState(false);
    const location = useLocation();
    const [ usersName, setUsersName ] = useState([]);
    const [ start, setStart ] = useState(false)

    // game stuff below 
    const [ werewolf, setWerewolf ] = useState();
    const [ witch, setWitch ] = useState(); 
    const [ votes, setVotes ] = useState();

const sendMessage = (e) => {
    e.preventDefault();
    
    if (message) {
        socket.emit('sendMessage', message, token);
        setMessage('');
    };
}

const Start = (e) => {
    e.preventDefault();
    setStart(true)
    
    //-----------------------------ASSIGNING ROLES-------------------------------------->
    
    // const randomWitch = usersName[Math.floor((Math.random() * usersName.length))];
    // setWitch(randomWitch);

    // const noWitch = username.filter((user) => {
    //     return !user === witch
    // });

    // const randomWerewolf = noWitch[Math.floor((Math.random() * noWitch.length))];

    // setWitch(randomWerewolf);

    //---------------------------------------------------------------------------------->



    
}

useEffect(() => {

    if (!location.username || !location.name || !token) return

    setUsername(location.username);
    setRoomName(location.name);
    // setURL(search);

    socket = io(ENDPOINT, {transports: ['websocket'], upgrade: false});

    socket.emit('join', { username: location.username, roomName: location.name, token }, () => {
    });

    return () => {
        if (!socket) return;
        socket.disconnect();
        socket.off();
    }

}, [location]);


useEffect(() => {

    if (!socket) return
    
    socket.on('message', (data) => {
        setMessages(m => [...m, data]);
    });
    setMA(true);

    socket.on('roomData', ({ room, data }) => {  
        console.log(data)
        data.forEach(u => {
            console.log('INSIDE LOOP ', u.username)
            setUsersName(un => [...un, u.username])
        })
    });
    
}, [])


    if (!location.name) {
        return <Redirect to='/room' />
    }

    if (!token) {
    return <Redirect to='/' />
    }


    return (
        <div className='outerContainer'>

                { !usersName?
                    <p>
                        Loadding....
                    </p>
                :
                    <div className="leaderboardzz">
                        <th> 
                            Users:
                        </th>

                        { usersName.map(( username, key ) => {
                            return (
                            <tr key={key} className='listusers'>
                                <td>
                                    <p>
                                        {username}
                                    </p>
                                </td>
                            </tr>
                        )})
                        
                        }
                    </div>
                }

            <div className='multiContainer'>
                <div className='infoBar'>
                    <div className='leftInnerContainer'>
                        <h3>
                            {roomName}
                        </h3>
                    </div>
                </div>
                    <ReactScrollableFeed>
                        { 
                        messages.map((message, i) => {
                        return (    
                            <div className='messageContainer' key={i}>
                                <p className='sentText'> 
                                    {message.user}
                                </p>  
                                <div className='messageBox'>
                                    <p className='messageText'>
                                        {message.text}
                                    </p>
                                </div>
                            </div>
                                    )
                                }
                            ) 
                        }
                    </ReactScrollableFeed>
                <form className='formz'>
                    <input className='inputz'
                        value={message}
                        onChange={e => setMessage(e.target.value)}
                        onKeyPress={e => e.key === 'Enter' ? sendMessage(e) : null}
                        placeholder={'What would you like to say?'}
                        >
                    </input>
                    <button className='sendButton'
                        onClick={(e) => { sendMessage(e)}}
                        >
                        Send
                    </button>
                </form>                
            </div>
                
            {    
                usersName.length <= 7?

                <div className='multiplayerCard'>
                    <p>
                        Waiting for more players....
                    </p>
                </div>
            :
                <div className='multiplayerCard'>
                    {
                       
                        !start?

                        <button className="btn btn-background-circle" 
                            onClick={Start}
                            >
                            Ready
                        </button>
                        :
                        <>
                            <div className='multibtns' height='10px'>
                                <button>
                                    trishaT
                                </button>
                                &emsp;&emsp;
                                <button>
                                    Aguilar
                                </button>
                                &emsp;&emsp;
                                <button>
                                    LT
                                </button>
                                &emsp;&emsp;
                                <button>
                                    Julez
                                </button>
                                &emsp;&emsp;
                                <button>
                                    DNCA
                                </button>
                                &emsp;&emsp;
                                <button>
                                    gersh
                                </button>
                            </div>
                            <div className='multiimage'>
                                <img src={MultiWitch} alt='single' width='380px;' height='380px'/>
                            </div>
                        </>
                    }
                </div>
            }

        </div>
    );
}

export default Multiplayer;