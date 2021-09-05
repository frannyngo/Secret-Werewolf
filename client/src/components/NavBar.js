import { Link } from 'react-router-dom';

const NavBar = ({ token, setToken, inGame }) => {

    const dropToken = () => {
        setToken(undefined);
    };

    return (
        <nav className="navbar">

            { inGame? 
                <p>
                    &emsp;
                </p>
            :
            <>
                <Link to='/'> 
                    <h1>
                        Secret Werewolf
                    </h1> 
                </Link>
    
                <Link to='/'>
                    <p>
                         Home 
                    </p>
                </Link>
            </>
            }
            
            { !token?
            <> 
                <Link to='/signin'>
                    <p>
                        Sign in
                    </p>
                </Link> 
                <Link to='/signup'>
                    <p>
                        Sign up 
                    </p>
                </Link> 
            </> 
            : 
            <> 
                { inGame?
                <> 
                    <p>
                        Game in progress....
                    </p>
                </>
                :
                <>
                    <Link to='/playnow'>
                        <p>
                            Play
                        </p>
                    </Link>
                    <Link to='/listaccounts'>
                        <p>
                            Leaderboard 
                        </p>
                    </Link>
                    <Link to='/accountdetails'>
                        <p>
                            My Account
                        </p> 
                    </Link>

                    <p
                        onClick={dropToken}> 
                            Sign out 
                    </p>
                </>
                }
            </>
            }       
        </nav>
    );
}

export default NavBar;