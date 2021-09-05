const express = require('express');
const router = express.Router();

router.get('/multiplayer/hi', (request, response) => {
    response.send('Server is up and running')
    console.log('hiii')
});

module.exports = router;