const express = require('express')
const path = require('path');
const app = express();
const db = require('./db');

app.use(express.json());

app.get('/', (req, res, next)=> {
  res.sendFile(path.join(__dirname, 'index.html'));
});


app.listen(3000, ()=> console.log('listening on port 3000'));
