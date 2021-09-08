import { Redirect, useLocation } from "react-router-dom";
import { io } from 'socket.io-client'
import { useState, useEffect } from "react";

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
    
    const randomWitch = usersName[Math.floor((Math.random() * usersName.length))];
    setWitch(randomWitch);

    const noWitch = username.filter((user) => {
        return !user === witch
    });

    const randomWerewolf = noWitch[Math.floor((Math.random() * noWitch.length))];

    setWitch(randomWerewolf);

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

    socket.on('roomData', ({ room, users }) => {  
        console.log(users)
        const annoying = users[0].username
        usersName.push({ username: annoying })
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

                        { usersName.map(( users, key ) => {
                            return (
                            <tr key={key} className='listusers'>
                                <td>
                                    <p>
                                        {users.username}
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
                usersName.length <= 0?

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
                         <p>
                             hi
                         </p>

                    }
                    
                </div>
            }

        </div>
    );
}

export default Multiplayer;