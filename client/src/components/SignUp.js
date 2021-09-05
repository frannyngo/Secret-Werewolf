import React, {useState} from 'react';

const SignUp = () => {
    
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isPending, setIsPending] = useState(false)


    const Submit = async (e) => {
        e.preventDefault();
        setIsPending(true);

        try {
            const response = await fetch('http://localhost:5000/signup', {
                method: 'POST',
                credentials: 'include',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    username: username,
                    email: email,
                    password: password
                })
                });
                setIsPending(false);
                console.log(response.data);
                alert('Account Created!');
                window.location = '/';
        } catch (error) {
            console.log(error);
        }
    }

    return(
            <section> 
            <form className="create" onSubmit={Submit}>
                <br/>
                <br/>
                <br/>
                <br/>
                <h1 className="text-center mt-5"> Sign up!</h1>
                <br/>
                <h4>Get started with us today! Create your account by filling out the information below!</h4>
                <br/>
                <br/>
                <div>
                    <label htmlFor='username'>Username</label>
                    <input required
                    type='text' 
                    name='username' 
                    id='username' 
                    placeholder='Enter your username'
                    values={username.username}
                    onChange={e => setUsername(e.target.value)}></input>
                </div>
                <div>
                    <label htmlFor='email'>Email</label>
                    <input required
                    type='text' 
                    name='email' 
                    id='email' 
                    placeholder='Enter your email'
                    values={email.email}
                    onChange={e => setEmail(e.target.value)}></input>
                </div>
                <div>
                    <label htmlFor='password'>Password</label>
                    <input required
                    type='password' 
                    name='password' 
                    id='password' 
                    placeholder='Enter your password'
                    values={password.password}
                    onChange={e => setPassword(e.target.value)}></input>
                </div>
                <br/>
                { !isPending && <button className="btn btn-background-circle" >Sign Up</button> }
                { isPending && <button className="btn btn-background-circle" disabled>Creating Account...</button> }            
            </form>
    </section>
    )
}

export default SignUp;