const debug =require('debug')('server:debug');

const config = require('config');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var tagRouter = require('./routes/tag/tag');
var noteRouter = require('./routes/notes/note');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/**
 * All the different routes from my API
 */
app.use('/api/tags/', tagRouter);
app.use('/api/notes/', noteRouter);

const listen =app.listen(config.get('port'),()=>{
    debug(`server is running on port ${config.get('port')} and in ${config.get('name')} mode`);
});

module.exports = app;
module.exports.port=listen.address().port;