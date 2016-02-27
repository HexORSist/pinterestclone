var logger          = require('morgan'),
    cors            = require('cors'),
    http            = require('http'),
    express         = require('express'),
    errorhandler    = require('errorhandler'),
    cors            = require('cors'),
    dotenv          = require('dotenv'),
    bodyParser      = require('body-parser'),
    passport        = require('passport'),
    session         = require('express-session'),
    cookieParser    = require('cookie-parser'),
    flash           = require('connect-flash');


var app = express();

dotenv.load();

// Parsers
// old version of line
// app.use(bodyParser.urlencoded());
// new version of line
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(cookieParser());
//app.use(app.router);
app.use(session({ secret: process.env.SECRET,
                  resave: true,
                  saveUninitialized: true})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash());

app.use(function(err, req, res, next) {
  if (err.name === 'StatusError') {
    res.send(err.status, err.message);
  } else {
    next(err);
  }
});

/*if (process.env.NODE_ENV === 'development') {
  app.use(logger('dev'));
  app.use(errorhandler())
}*/


require('./server/config/passport')(passport); // pass passport for configuration
require('./server/user-routes')(passport,app); // pass passport for configuration
require('./server/anonymous-routes')(app);
require('./server/protected-routes')(app);

//app.use(require('./server/anonymous-routes'));
//app.use(require('./server/protected-routes'));
//app.use(require('./server/user-routes'));

app.use('/build', express.static(process.cwd() + '/build'));

var port = process.env.PORT || 3001;

http.createServer(app).listen(port, function (err) {
  console.log('listening in http://localhost:' + port);
});

