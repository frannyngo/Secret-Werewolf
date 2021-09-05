import { Redirect, useHistory} from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const Room = ({ token }) => {
    const [ userdata, setUserdata ] = useState('');
    const [ name, setName ] = useState('');
    const history = useHistory();

    const Submit = (e) => {
        e.preventDefault();
        history.push({
            pathname: '/multiplayer',
            search: `?query=${name}`,
            name,
            username: userdata.username
        })
    }

    useEffect(() => {
        axios.post('http://localhost:5000/accounts/me', {
            token: token,
        })
            .then(response => {
            setUserdata(response.data);
    });
    
    }, [])

    if (!token) {
        return <Redirect to='/' /> 
    }

    return (
        <div>
            <form className="create" onSubmit={Submit}>
                <br/>
                <br/>
                <h1 className="text-center mt-5 text-white"
                    > 
                    Select A Room
                </h1>
                    <br/>
                    <br/>
                    <div>
                        <label htmlFor='room'>Room Name</label>
                        <input required
                            type='text' 
                            name='room' 
                            placeholder='Enter a room name!'
                            value={name}
                            onChange={e => setName(e.target.value)}
                            >
                        </input>
                            <button className="btn btn-background-circle"
                                type='submit'
                                >
                                Join
                            </button>
                </div>
            </form>
        </div>
    );
}

export default Room;