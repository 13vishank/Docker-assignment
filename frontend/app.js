const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const axios = require('axios');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/submit', async (req, res) => {
    // Send data to Flask backend
    try {
        const response = await axios.post('http://backend:5000/process', req.body);
        res.send(`<h1>Flask Response:</h1><p>${response.data}</p>`);
    } catch (error) {
        res.send(`<h1>Error:</h1><p>${error.message}</p>`);
    }
});

app.listen(3000, () => console.log('Frontend running on port 3000'));

