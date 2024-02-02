var createError = require('http-errors');
var express = require('express');
const cors = require('cors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const swaggerUi = require('swagger-ui-express');
const YAML = require('js-yaml');
const fs = require('fs');

var indexRouter = require('./routes/index');
var teamsRouter = require('./routes/teams');
var singleTeamRouter = require('./routes/single_team');
var playerRouter = require('./routes/player');
var logInRouter = require('./routes/logIn');
var gamesRouter = require('./routes/games');
var competitionRouter = require('./routes/competitions');
var singleGameRouter = require('./routes/single_game');
var userRouter = require('./routes/users');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use('/', indexRouter);
app.use('/teams', teamsRouter);
app.use('/single-team', singleTeamRouter);
app.use('/player', playerRouter);
app.use('/competitions', competitionRouter);
app.use('/logIn', logInRouter);
app.use('/games', gamesRouter);
app.use('/single-game', singleGameRouter);
app.use('/users', userRouter);

// Load Swagger YAML files
function loadYAMLFiles(...filePaths) {
  return filePaths.reduce((acc, filePath) => {
    const content = YAML.load(fs.readFileSync(filePath, 'utf8'));
    return { ...acc, ...content };
  }, {});
}

const swaggerDocument = loadYAMLFiles(
    path.join(__dirname, 'docs/FootballAPI.yaml'),
);

// Setup Swagger UI
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// Error handler to return JSON
app.use(function(err, req, res, next) {
  const errorResponse = {
    message: err.message,
    error: req.app.get('env') === 'development' ? err : {}
  };

  res.status(err.status || 500);
  res.json(errorResponse);
});

module.exports = app;
