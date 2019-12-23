// server.js
const express = require('express');
const dotenv = require('dotenv');
// require('babel-polyfill');
const ReflectionWithDB = require('./src/controllers/reflection');
const UserWithDb = require('./src/controllers/user');
const Auth = require('./src/middleware/auth');

dotenv.config();
const Reflection = ReflectionWithDB;
const app = express()

app.use(express.json())

app.get('/', (req, res) => {
  return res.status(200).send({'message': 'Wew! Congratulations! Your first endpoint is working'});
});

app.post('/api/v1/reflections', Auth.verifyToken, Reflection.create);
app.get('/api/v1/reflections', Auth.verifyToken, Reflection.getAll);
app.get('/api/v1/reflections/:id', Auth.verifyToken, Reflection.getOne);
app.put('/api/v1/reflections/:id', Auth.verifyToken, Reflection.update);
app.delete('/api/v1/reflections/:id', Auth.verifyToken, Reflection.delete);
app.post('/api/v1/users', UserWithDb.create);
app.get('/api/v1/users/me', UserWithDb.me);
app.post('/api/v1/users/login', UserWithDb.login);
app.delete('/api/v1/users/me', Auth.verifyToken, UserWithDb.delete);

app.listen(3000)
console.log('app running on port ', 3000);