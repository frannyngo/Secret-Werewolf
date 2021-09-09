import { Redirect, Link } from "react-router-dom";
import Roles from './img/roles.png';
import Who from './img/who.png';
import RolesWerewolf from './img/rolesWerewolf.png';
import RolesWitch from './img/rolesWitch.png';
import RolesVillager from './img/rolesVillager.png';
import RolesPhase from './img/rolesPhase.png';

const About = ({ token }) => {

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
                <input type='radio' name='radio-btn' id='radio5' />
                <input type='radio' name='radio-btn' id='radio6' />
                
                <div className='slide first'>
                    <img src={Who} alt='who' />
                </div>
                <div className='slide'>
                    <img src={RolesPhase} alt='who' />
                </div>
                <div className='slide'>
                    <img src={Roles} alt='who' />
                </div>
                <div className='slide'>
                    <img src={RolesVillager} alt='who' />
                </div>
                <div className='slide'>
                    <img src={RolesWitch} alt='who' />
                </div>
                <div className='slide'>
                    <img src={RolesWerewolf} alt='who' />
                </div>

                <div className='navigation-manual'> 
                    <label for='radio1' className='manual-btn'></label>
                    <label for='radio2' className='manual-btn'></label>
                    <label for='radio3' className='manual-btn'></label>
                    <label for='radio4' className='manual-btn'></label>
                    <label for='radio5' className='manual-btn'></label>
                    <label for='radio6' className='manual-btn'></label>
                </div>

            </div>

        </div>

</div>
    );
}

export default About;