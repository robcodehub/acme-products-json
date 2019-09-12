const express = require('express')
const path = require('path');
const app = express();
const db = require('./db')('./products.json');


app.use((req, res, next) => {
  next();
});


app.use(express.json());

app.get('/', (req, res, next)=> {
  res.sendFile(path.join(__dirname, 'index.html'));
});


app.get('/api/products', async(req, res, next)=> {
  try {
    res.send(await db.findAll())
  }
  catch(ex) {
    next(ex)
  }
});

app.post('/api/products', async(req, res, next)=> {
  try {
    res.send(await db.create(req.body));
  }
  catch(ex) {
    next(ex)
  }
});


app.listen(3000, ()=> console.log('listening on port 3000'));
