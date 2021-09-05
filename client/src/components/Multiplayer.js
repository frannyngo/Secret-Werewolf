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

    const location = useLocation();
    const socket = io(ENDPOINT, {transports: ['websocket'], upgrade: false});



const sendMessage = (e) => {
    e.preventDefault();
    
    if (message) {
        socket.emit('sendMessage', { user: username, text: message });
        setMessage('');
    };
    console.log(messages);
    console.log(url);
}

// -----------------------JOIN/DISCONNECT------------------>
useEffect(() => {
    const socket = io(ENDPOINT, {transports: ['websocket'], upgrade: false});
    ;
    const { name, username, search } = location
    setUsername(username);
    setRoomName(name);
    setURL(search);

    socket.emit('join', { username, roomName }, () => {

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

}, [ENDPOINT, location, !username, !roomName, !url]);

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
                        <div>
                            {/* img */}
                        </div>
                        <div className='annoying'>
                            { messages.map((message, i) => {
                                <div key={i}>
                                    <p>
                                        {message.user} : {message.text}  
                                    </p>  
                                </div>
                            })}
                        </div>
                    
                    </div>
                
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
            </div>
        </div>
    );
}

export default Multiplayer;