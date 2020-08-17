const express = require('express');

const app = express();

const database = {
  users: [
    {
      id: '123',
      name: 'John',
      email: 'john@gmail.com',
      password: 'cookies',
      entries: 0,
      joined: new Date()
    },
    {
      id: '124',
      name: 'Sarah',
      email: 'sarah@gmail.com',
      password: 'apples',
      entries: 0,
      joined: new Date()
    },

  ]
}

app.get('/', (req, res) => {
  res.send('this is working');
})

app.post('/signin', (req, res) => {
  if(req.body.email === database.users[0].email &&
      req.body.password === database.users[0].password) {
        res.json('Success');
      } else {
        res.status(400).json('Error Logging In')
      }
})

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
