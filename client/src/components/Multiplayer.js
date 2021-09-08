import { Redirect, useLocation } from "react-router-dom";
import { io } from 'socket.io-client'
import { useState, useEffect } from "react";

let socket = null;

const Multiplayer = ({ token }) => {
    const [ username, setUsername ] = useState('');
    const [ roomName, setRoomName ] = useState('');
    const [ url, setURL ] = useState('');
    const [ message, setMessage ] = useState();
    const [ messages, setMessages ] = useState([]);
    const ENDPOINT = 'http://localhost:5000';
    const [ isPending, setIsPending ] = useState(false);
    const [ messagesActived, setMA ] = useState(false);
    const location = useLocation();

const sendMessage = (e) => {
    e.preventDefault();
    
    if (message) {
        socket.emit('sendMessage', message, token);
        setMessage('');
    };
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
        console.log(data);
        console.log('aegjroeirgjgjiejg' ,messages)
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