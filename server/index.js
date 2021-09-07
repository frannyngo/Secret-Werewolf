const express = require('express');
const app = express();
const logger = require('morgan');
app.use(logger('dev'))
const knex = require('./db');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const usersRoute = require('./routes/users.js');

//--------------------SOCKET--------------------------------->
const { addUser, removeUser, getUser, getUsers } = require('./socketHelpers');
const http = require('http');
const server = http.createServer(app);
var io = require('socket.io')(server, {
    cors: {
        origin: ["http://localhost:3000"],
      credentials: true,
    }
});

io.on('connection', (socket) => {
// ------------------JOIN------------------------------------------>

    socket.on('join', ({ username, roomName, token }) => {
            socket.emit('message', ({ user: 'admin', text: `${username}, welcome to the ${roomName} room!` }));
            addUser({ username: username, token: token, roomName: roomName})


            const users = getUsers(roomName);
            socket.emit('message', ({ user:'admin', text:`Players in ${roomName} room : ${users.username}` }));
    });

// ------------------DISCONNECT------------------------------------------>

    socket.on('disconnected', (message) => io.emit('message', { user: 'admin', text: message }));
  

// ------------------SEND MESSAGE------------------------------------------>
    socket.on('sendMessage', (message) => io.emit('message', message));
      
});

//----------------------------------------------------->

app.use('/multiplayer', usersRoute)

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.set("trust proxy", 1);

app.use(
    cors({
      origin: ["http://localhost:3000"],
      credentials: true,
    }),
  );

// create new account
app.post('/signup', (request, response) => { 
    try {
        const {username, email, password} = request.body;

        knex('account')
        .insert(
            {
                username: username,
                email: email,
                password: password
            }
        ).then(data => {
            response.send(data);
            response.send({message: 'Account created!'});
        })
    } catch (error) {
        response.send(error);
    }
});

// sign in account
app.post('/signin', (request, response) => { 
    const {username, password} = request.body;

    knex.select().from('account').where('username', username).then(data => {
        if (data.length > 0 && data[0].password === password)
            response.json({
                token: jwt.sign({account_id: data[0].account_id}, 'private key')
        }) 
        else {
            response.status(400).send('Invalid username/password');
        }
    })
    .catch(error => {
        response.status(500).send()
    })
});

//get all accounts
app.get('/accounts', async (request, response) => {
    const zero = 0;
    try {
        knex('account')
        .select('*')
        .where('total_wins', '>', zero)
        .orderBy('total_wins', 'desc')
        .limit(5)
        .then(data => {
            response.send(data);
        });
    } catch (error) {
        console.log(error.message); 
    }
});

app.get('/leaderboard', async (request, response) => {
    const zero = 0;
    try {
        knex('account')
        .select('*')
        .where('total_wins', '>', zero)
        .orderBy('total_wins', 'desc')
        .limit(15)
        .then(data => {
            response.send(data);
        });
    } catch (error) {
        console.log(error.message); 
    }
});

app.get('/leaderboard/kills', async (request, response) => {
    const zero = 0;
    try {
        knex('account')
        .select('*')
        .where('total_kills', '>', zero)
        .orderBy('total_kills', 'desc')
        .limit(15)
        .then(data => {
            response.send(data);
        });
    } catch (error) {
        console.log(error.message); 
    }
});

app.get('/leaderboard/games', async (request, response) => {
    const zero = 0;
    try {
        knex('account')
        .select('*')
        .where('total_games', '>', zero)
        .orderBy('total_games', 'desc')
        .limit(15)
        .then(data => {
            response.send(data);
        });
    } catch (error) {
        console.log(error.message); 
    }
});

// update account
app.put('/postgame/me', async (request, response) => {
    const { token, total_games, total_wins, total_kills } = request.body;
        jwt.verify(token, 'private key', (error, decoded) => {
            knex.select()
                .from('account')
                .where('account_id', decoded.account_id)
                .update({
                    total_games: total_games,
                    total_wins: total_wins,
                    total_kills: total_kills
                })
                .then(data => {
                    response.json(data[0]);
                })
                .catch(error => {
                    console.log(error);
                })
            })
});

app.post('/accounts/me', async (request, response) => {
    try {
        const {token} = request.body
        jwt.verify(token, 'private key', (error, decoded) => {
        knex.select().from('account').where('account_id', decoded.account_id)
            .then(data => {
                response.json(data[0]);
            })
        });
    } 
    catch (error) {
        response.status(500).send();
    }
});

app.post('/accounts/:id', async (request, response) => {
    try {
        const { id } = request.params
        knex.select().from('account').where('account_id', id)
            .then(data => {
                response.json(data[0]);
            });
    } 
    catch (error) {
        response.status(500).send();
    }
});

//delete account
app.delete('/accounts/:id'), async (request, response) => {
    try {
        const account_id = request.body.id;
        knex('account').where('account_id', account_id).delete().then(data => {
            response.send(data);
        });
    } catch (error) {
        console.log(error.message);
    }
};

const PORT = 5000;
const DOMAIN = 'localhost';

// const PORT_SOCKET = process.env.PORT || 4001;
// server.listen(PORT_SOCKET, () => {
//   console.log(`Listening on port ${PORT_SOCKET}`)
// });

server.listen(PORT, DOMAIN, () => {
    console.log(`Server is listening on http://${DOMAIN}:${PORT}`);
})
