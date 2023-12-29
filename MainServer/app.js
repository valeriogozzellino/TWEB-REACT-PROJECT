var createError = require('http-errors');
var express = require('express');
const cors = require('cors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');
var teamsRouter = require('./routes/teams');
var rankingRouter = require('./routes/ranking');
var singleTeamRouter = require('./routes/single_team');
var playerRouter = require('./routes/player');
var logInRouter = require('./routes/logIn');
var signUpRouter = require('./routes/signUp');
var gamesRouter = require('./routes/games');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use('/', indexRouter);
// app.use('/users', usersRouter);
app.use('/teams', teamsRouter);
app.use('/ranking', rankingRouter);
app.use('/singe_team', singleTeamRouter);
app.use('/player', playerRouter);
console.log("sono in appuse");
app.use('/logIn', logInRouter);
app.use('/signUp', signUpRouter);
app.use('/games', gamesRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
