const express = require('express');
const logger = require('morgan');
const path = require('path');

const callback = require('./callback');
const login = require('./login');

const app = express();

app.set('view engine', 'pug');
app.set('views', path.resolve(__dirname, 'views'));

app.use(logger('short'));

app.get('/api/login', login);
app.get('/api/callback', callback);
app.get('/api/ping', (_, res) => res.send('pong'));

app.listen(process.env.PORT || 3000);
