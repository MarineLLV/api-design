const express = require('express');

const app = express();

app.get('/', (req, res) => {
    console.log('Hello from Express');
    res.status(200)
    res.json({ message: 'hello' })
});

module.exports = app;