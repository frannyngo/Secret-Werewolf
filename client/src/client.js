const net = require('net');
const client = new net.socket();

client.on('data', (data) => {
    console.log('Data received from server:' + data);
});

client.connect(5000, '127.0.0.1', () => {
    client.write('Franny');
});
