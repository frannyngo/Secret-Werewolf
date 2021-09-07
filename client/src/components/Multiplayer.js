import { Redirect, useLocation } from "react-router-dom";
import { io } from 'socket.io-client'
import { useState, useEffect } from "react";

let socket;

const Multiplayer = ({ token }) => {
    const [ username, setUsername ] = useState('');
    const [ roomName, setRoomName ] = useState('');
    const [ url, setURL ] = useState('');
    const [ message, setMessage ] = useState();
    const [ messages, setMessages ] = useState([{ user:'', text:'' }]);
    const ENDPOINT = 'http://localhost:5000';
    const [ isPending, setIsPending ] = useState(false);

    const location = useLocation();
    const socket = io(ENDPOINT, {transports: ['websocket'], upgrade: false});

const sendMessage = (e) => {
    e.preventDefault();
    
    if (message) {
        socket.emit('sendMessage', { user: username, text: message });
        setMessage('');
    };
}

// const Ready = (e) => { 
//     e.preventDefault();
//     setIsPending(true);
//     console.log(players)

//     let user = players.find(player => player.id === token)

//     console.log(user);

//     setEverybodyReady([...everybodyReady, user]);
// }


// -----------------------JOIN/DISCONNECT------------------>
useEffect(() => {
    const socket = io(ENDPOINT, {transports: ['websocket'], upgrade: false});
    ;
    const { name, username, search } = location
    setUsername(username);
    setRoomName(name);
    setURL(search);


    // const newz = players
    // newz.push({ user: username, id: token }) // <------- create unique players with socket.id 
    // setPlayers(newz);
    // console.log(token)
    // console.log( username )

    socket.emit('join', { username, roomName, token }, () => {

    });

    socket.on('message', (message) => {
        const messagez = messages
        messagez.push({user: message.username, text: message.text })
        setMessages(messagez);
        // setMessages([...messages, {user: message.username, text: message.text }]);
        // console.log(messages);
    });
    
    return () => {
        socket.emit('disconnected', { username })
        socket.off();
    }

}, [ENDPOINT, location, !username, !roomName, !url, messages, setMessages]);

// -------------SEND MESSAGE/ADD TO MESSAGES--------------->


// ----------------------------------------->


    if (!location.name) {
        return <Redirect to='/room' />
    }

    if (!token) {
    return <Redirect to='/' />
    }


    return (
        <div className='outerContainer'>
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
                
                { !isPending && <button className="btn btn-background-circle">Ready</button> }
                { isPending && <button className="btn btn-background-circle" disabled>Waiting for others....</button> }

        </div>
    );
}

export default Multiplayer;