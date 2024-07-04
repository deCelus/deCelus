const express = require('express');
const morgan = require('morgan');
const path = require('path');
const exphbs = require('express-handlebars');
const session = require('express-session');
const { validationResult } = require('express-validator');
const passport = require('passport');
const flash = require('connect-flash');
const MongoStore = require('connect-mongo');
const bodyParser = require('body-parser');
const modelsRouter = require('./routes/modelsRouter');
const distritoRouter = require('./routes/distritoRouter');



const { connectDB } = require('./database');

// Intializations
const app = express();
require('./lib/passport');

// Settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
  defaultLayout: 'main',
  layoutsDir: path.join(app.get('views'), 'layouts'),
  partialsDir: path.join(app.get('views'), 'partials'),
  extname: '.hbs',
  helpers: require('./lib/handlebars')
}));
app.set('view engine', '.hbs');
app.use('/api/modelos', modelsRouter);
app.use('/api/distritos', distritoRouter);

// Middlewares
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const startServer = async () => {
  try {
    const client = await connectDB();

    app.use(session({
      secret: 'faztmysqlnodemysql',
      resave: false,
      saveUninitialized: false,
      store: MongoStore.create({
        clientPromise: Promise.resolve(client),
        dbName: 'celulares'
      })
    }));
    app.use(flash());
    app.use(passport.initialize());
    app.use(passport.session());
    app.use((req, res, next) => {
      // Añade express-validator a req
      req.validate = validationResult;
      next();
    });

    // Global variables
    app.use((req, res, next) => {
      app.locals.message = req.flash('message');
      app.locals.success = req.flash('success');
      app.locals.user = req.user;
      next();
    });

    // Routes
    app.use(require('./routes/index'));
    app.use(require('./routes/authentication'));
    app.use('/links', require('./routes/links'));

    // Public
    app.use(express.static(path.join(__dirname, 'public')));
	

    // Starting
    app.listen(app.get('port'), () => {
      console.log('Server is in port', app.get('port'));
    });
  } catch (err) {
    console.error('Failed to connect to the database', err);
  }
};

startServer();
module.exports = app;
