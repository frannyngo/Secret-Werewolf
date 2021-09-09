import { Redirect, Link } from "react-router-dom";
import SingleInto from './img/singleIntro.png';
import SingleVotes from './img/singleVotes.png';
import SingleEliminate from './img/singleEliminate.png';
import SingleButton from './img/singleButton.png';
import SinglePhase from './img/singlePhase.png';
import SingleEliminated from './img/singleEliminated.png';

const AboutSingle = ({ token }) => {

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
                    <img src={SingleInto} alt='who' />
                </div>
                <div className='slide'>
                    <img src={SingleEliminate} alt='who' />
                </div>
                <div className='slide'>
                    <img src={SinglePhase} alt='who' />
                </div>
                <div className='slide'>
                    <img src={SingleVotes} alt='who' />
                </div>
                <div className='slide'>
                    <img src={SingleButton} alt='who' />
                </div>
                <div className='slide'>
                    <img src={SingleEliminated} alt='who' />
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

export default AboutSingle;