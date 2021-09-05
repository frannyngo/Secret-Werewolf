import React, {useState} from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

const SignIn = ({ setToken, token }) => {
    
    const [logusername, setLogUsername] = useState('');
    const [logpassword, setLogPassword] = useState('');
    const [isPending, setIsPending] = useState(false);
    const [invalid, setInvalid] = useState('')

    if (token) {
        return <Redirect to='/' />
    }
    
    const SubmitSignIn = async (e) => {
        e.preventDefault();
        setIsPending(true);

        axios.post('http://localhost:5000/signin', {
                    username: logusername,
                    password: logpassword
               })
               .then(response => {
                   setToken(response.data.token);
               })
               .catch(error => {
                   setInvalid(error.response.data);
               })
               .then(() => {
                   setIsPending(false);
               })
            }

    return(
            <div>
                <form className="create" onSubmit={SubmitSignIn}>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <h1 className="text-center mt-5 text-white"> Log In!</h1>
                    <br/>
                    <br/>
                    <div>
                        <label htmlFor='username'>Username</label>
                        <input required
                        type='text' 
                        name='username' 
                        id='username' 
                        placeholder='Enter your username'
                        value={logusername.username}
                        onChange={e => setLogUsername(e.target.value)}></input>
                    </div>
                    <div>
                        <label htmlFor='password' >Password</label>
                        <input required
                        type='password' 
                        name='password' 
                        id='password' 
                        placeholder='Enter your password'
                        value={logpassword.password}
                        onChange={e => setLogPassword(e.target.value)}></input>
                    </div>
                    <br/>
                    { !isPending && <button className="btn btn-background-circle" >Sign In</button> }
                    { isPending && <button className="btn btn-background-circle" disabled>Signing in....</button> }
                    <p> {invalid} </p>
                </form>
            </div>
    )
}

export default SignIn;