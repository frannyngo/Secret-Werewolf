import { Redirect, Link } from "react-router-dom";
import Roles from './img/roles.png';
import LiveChat from './img/liveChat.png';
import MultiButtons from './img/multiButtons.png';
import MultiDead from './img/multiDead.png';

const AboutMultiplayer = ({ token }) => {

    if (!token) {
        return <Redirect to='/' />
        }

    return (
    <div className='aboutBody'>
        <div className='aboutButtons'>
            <Link to='/about'>
            <button className="btn btn-background-circle"
                > 
                Game
            </button>
            </Link>
            &emsp;&emsp;
            <Link to='/aboutsingle'>
            <button className="btn btn-background-circle"
                > 
                Single
            </button>
            </Link>
            &emsp;&emsp;
            <Link to='/aboutmultiplayer'>
            <button className="btn btn-background-circle"
                >  
                Multiplayer
            </button>
            </Link>
            </div>


        <div className='slider'>
            <div className='slides'>
                <input type='radio' name='radio-btn' id='radio1' />
                <input type='radio' name='radio-btn' id='radio2' />
                <input type='radio' name='radio-btn' id='radio3' />
                <input type='radio' name='radio-btn' id='radio4' />
                {/* <input type='radio' name='radio-btn' id='radio5' />
                <input type='radio' name='radio-btn' id='radio6' /> */}
                
                <div className='slide first'>
                    <img src={Roles} alt='who' />
                </div>
                <div className='slide'>
                    <img src={LiveChat} alt='who' />
                </div>
                <div className='slide'>
                    <img src={MultiButtons} alt='who' />
                </div>
                <div className='slide'>
                    <img src={MultiDead} alt='who' />
                </div>
                {/* <div className='slide'>
                    <img src={} alt='who' />
                </div>
                <div className='slide'>
                    <img src={} alt='who' />
                </div> */}

                <div className='navigation-manual'> 
                    <label for='radio1' className='manual-btn'></label>
                    <label for='radio2' className='manual-btn'></label>
                    <label for='radio3' className='manual-btn'></label>
                    <label for='radio4' className='manual-btn'></label>
                    {/* <label for='radio5' className='manual-btn'></label>
                    <label for='radio6' className='manual-btn'></label> */}
                </div>

            </div>

        </div>

</div>
    );
}

export default AboutMultiplayer;