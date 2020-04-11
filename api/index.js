const express = require('express');

const callback = require('./callback');
const login = require('./login');

const app = express();

app.get('/api/login', login);
app.get('/api/callback', callback);

app.listen(3000);
