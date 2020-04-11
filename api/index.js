const express = require('express');
const logger = require('morgan');

const callback = require('./callback');
const login = require('./login');

const app = express();

app.use(logger('short'));

app.get('/api/login', login);
app.get('/api/callback', callback);

app.listen(3000);
