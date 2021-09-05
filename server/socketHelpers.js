const users = [];

const addUser = ({ id, username, roomName }) => {

    const existingUser = users.find((user) => {
        user.room === roomName & user.name === username
    });

        if (existingUser) {
            return { error: 'Username taken'}
        }

        const user = { id, roomName, username } ;
        return { user }
}

const removeUser = (id) => {
    const index = users.findIndex((user) => {
        user.id === id

        if (index !== -1) {
            return users.splice(index, 1)[0];
        }
    });
}

const getUser = (id) => {
    users.find((user) => {
        if (user.id === id) {
            return user;
        }
    });
}

const getUserInRoom = (roomName) => {
    users.filter((user) => {
        user.roomName === roomName
    });
}


module.exports = { addUser, removeUser, getUser, getUserInRoom }




   
{/* <div className='home'> 
<br/>
<br/>
<br/>
<br/>
<h1>
    How to play:
</h1>
<br/>
<p>
    Each round is split between a 'morning' and a 'night' phase.
</p>
<br/>
<p>
    The game starts in the 'morning', where all users vote to eliminate who they believe the werewolf is. 
    Majority of the votes win, but if the votes end as a tie, nobody gets eliminated this round.
    If the werewolf (you) gets voted for elimination, YOU LOSE.
</p>
<br/>
<p>
    If the werewolf survives the 'morning', the 'night' phase follows.  
    In this phase, the werewolf may anonymously eliminate any other player we wishes.
</p>
<br/>
<p>
    There will also be one healer who may anonymously choose to heal ONE player including him/herself at the start of the 'night' phase.
</p>
<br/>
<p>
     If the healer guesses who the werewolf decided to eliminate correctly, that chosen player does not get eliminated. 
</p>
<br/>
<p>
    Pro tip: Find and kill the healer to have a better chance of winning.
</p>
<br/>
<p>
    &emsp; 
</p>
<h1>
    How to win:
</h1>
<br/>
<p>
    You are the werewolf, hiding in plain sight as a regular human. 
</p>
<br/>
<p>
    Your goal is to eliminate all but ONE other player (including yourself) left, without getting caught. 
</p>

</div> */}