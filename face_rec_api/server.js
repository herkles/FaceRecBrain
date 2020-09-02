const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const app = express();
const knex = require('knex')

const db  = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'test',
    database : 'smart-brain'
  }
});

app.use(bodyParser.json());
app.use(cors());

const database = {
  users: [
    {
      id: '123',
      name: 'John',
      email: 'john@gmail.com',
      password: 'test',
      entries: 0,
      joined: new Date()
    },
    {
      id: '124',
      name: 'Sally',
      email: 'sally@gmail.com',
      password: 'bananas',
      entries: 0,
      joined: new Date()
    },
  ],
  login: [
    {
      id: '987',
      has: '',
      email: 'john@gmail.com'
    }
  ]
}

app.get('/', (req, res) => {
  res.send(database.users);
})

app.post('/signin', (req, res) => {
  if (req.body.email === database.users[0].email &&
      req.body.password === database.users[0].password) {
    res.json(database.users[0]);
    } else {
      res.status(400).json('Error Logging In')
    }
})

app.post('/register', (req, res) => {
  const { email, name, password } = req.body;
  db('users')
    .returning('*')
    .insert({
      email: email,
      name: name,
      joined: new Date()
    })
      .then(user => {
        res.json(user[0]);
    })
    .catch(err => res.status(400).json('unable to register'))
})

app.get('/profile/:id', (req, res) => {
  const { id } = req.params;
  db.select('*').from('users').where({id})  
  .then(user => {
    if (user.length) {
      res.json(user[0])
    } else {
      res.status(400).json('Not Found')
    }
  })
    .catch(err => res.status(400).json('Not Found'))
})

app.put('/image', (req, res) => {
  const { id } = req.body;
  let found = false;
  database.users.forEach(user => {
    if (user.id === id) {
      found = true;
      user.entries++
      return res.json(user.entries);
    } 
  })
  if (!found) {
    res.status(400).json('not found');
  }
})




// // Load hash from your password DB.



app.listen(3000, ()=> {
  console.log('app is running on port 3000');
})

/*
/ --> res = this is working
/signin --> POST = success/fail
/register --> Post = user
/profile/:userId --> GET = user
/image --> PUT --> user

*/
