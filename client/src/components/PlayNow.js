 import { useHistory, Redirect } from "react-router-dom";
 import SinglePlayer from './img/singleplayer.png';
 import Multiplayer from './img/multiplaayer.png';
 
 const PlayNow = ({ token }) => {
    // const [ multiplayer, setMultiplayer ] = useState(false);
    // const [ single, setSingle ] = useState(false);
    let history = useHistory();

    const Multi = () => {
        history.push('/room');
    }

    const Single = () => {
        history.push('/play');
    }

    if (!token) {
        return <Redirect to='/' />
    }

     return (
        <>
            <div className='container'>
                <div className='card'>
                    <div className='image'>
                        <img src={SinglePlayer} alt='single' />
                    </div>
                    <div className='description'>
                        <h3>
                            Single Player
                        </h3>
                        <p>
                            Play against 5 AI villagers and 1 AI Witch trying catch YOU as the werewolf!
                        </p>
                    </div>
                    <button className='btn btn-background-circle'
                        onClick={Single}
                            >
                            Single
                    </button>
                </div>
                <div className='card'>
                    <div className='image'>
                        <img src={Multiplayer} alt='single' />
                    </div>
                    <div className='description'>
                        <h3>
                            Multiplayer
                        </h3>
                        <p>
                            Play against other users with a real-time chat, and randomly assigned roles!
                        </p>
                    </div>
                    <button className='btn btn-background-circle'
                        onClick={Multi}
                            >
                            Multiplayer
                    </button>
                </div>
            </div>
        </>
     );
 }

 export default PlayNow;