const net = require('net');

const server = new net.createServer((socket) => {
    socket.on('data', (data) => {
        console.log('Data received on server:', data);
        socket.write('Roger', + data);
    });
    socket.on('end', () => {
        console.log('-------Connection closed------');
    });
})


server.listen(5000, '127.0.0.1');
