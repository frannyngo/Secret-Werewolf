import React from 'react';
import { Link } from 'react-router-dom';
import background from './img/wallpaper.png';

const Home = ({ token, setToken }) => {

    const dropToken = () => {
        setToken(undefined);
    };
    
    return (
        <div className='homebody' style={{ backgroundImage: `url(${background})` }}>
            <ul>
                { !token? 
                <>
                    <Link to='/signin'>
                        <li class='sigin' data-text='Sign In'>
                            <a href='#'>
                                Sign In
                            </a>
                        </li>
                    </Link>
                    <Link to='/signup'>
                        <li class='sigup' data-text='Sign Up'>
                            <a href='#'>
                                Sign Up
                            </a>
                        </li>
                     </Link>
                     <Link to='/about'>
                        <li class='about' data-text='About'>
                            <a href='#'>
                                About
                            </a>
                        </li>
                     </Link>
                </>
                    :
                <>
                    <Link to='/playnow'>
                        <li class='plaay' data-text="Play">
                            <a href='#'>
                                Play
                            </a>
                        </li>
                    </Link>
                    <Link to='/listaccounts'>
                        <li class='ldboard' data-text="Leaderboard">
                            <a href='#'>
                                Leaderboard
                            </a>
                        </li>
                    </Link>
                    <Link to='/accountdetails'>
                        <li class='maccount' data-text="My Account">
                            <a href='#'>
                                My Account
                            </a>
                        </li>
                    </Link>
                        <li class='signout' data-text="Sign Out" onClick={dropToken}>
                            <a href='#'>
                                Sign Out
                            </a>
                        </li>                
                </>
                }   
            </ul>
        </div>  
    );
  }

export default Home;