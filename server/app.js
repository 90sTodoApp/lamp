require('dotenv').config()

const express = require('express');
const app = express();
const PORT = 3000
const path = require('path');
const authRouter = require('./routes/todoRoutes');
const indexRouter = require('./routes/index');

// added MAbe
const createError = require('http-errors');
const cookieParser = require('cookie-parser');

// added
const logger = require('morgan');
const passport = require('passport');
const session = require('express-session');

const SQLiteStore = require('connect-sqlite3')(session);
// 
// added for establishing sessions
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  store: new SQLiteStore({ db: 'sessions.db', dir: './var/db' })
}));
app.use(passport.authenticate('session'));
//

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// app.use(router)

app.listen(PORT, () => {
    console.log(`LAMP is running on port ${PORT}`)
})


// added Mabe


app.locals.pluralize = require('pluralize');

// view engine setup
app.use('/', authRouter);
app.use('/', indexRouter);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


module.exports = app;
