// Get dependencies 
const cors = require('cors');
const path = require('path');
const bp = require('body-parser');
const express = require('express');
const Board = require('./GameBoardManager.js');

// Configure app
const app = express();
app.use(cors());
app.use(bp.json());
app.use(bp.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, '../dist')));

const PORT = 3000;

app.get('/', (req, res) => {
    res.end();
});

app.post('/board', (req, res) => {
    var newBoard = Board.GenerateBoard(req.body);
    res.send(newBoard);
    res.end();
});

app.post('/checkSpot', (req, res) => {
    var newBoard = Board.CheckSpot(req.body);
    res.send(newBoard);
    res.end();
});

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});