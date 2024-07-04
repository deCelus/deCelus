const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { connectDB } = require('../database');
const helpers = require('./helpers');
const { ObjectId } = require('mongodb'); // Importa ObjectId de mongodb

passport.use('local.signin', new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password',
  passReqToCallback: true
}, async (req, username, password, done) => {
  const client = await connectDB();
  const db = client.db('celulares');

  try {
    const user = await db.collection('users').findOne({ username });
    if (user) {
      const validPassword = await helpers.matchPassword(password, user.password);
      if (validPassword) {
        done(null, user, req.flash('success', 'Welcome ' + user.username));
      } else {
        done(null, false, req.flash('message', 'Incorrect Password'));
      }
    } else {
      done(null, false, req.flash('message', 'The Username does not exist.'));
    }
  } catch (err) {
    done(err);
  }
}));

passport.use('local.signup', new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password',
  passReqToCallback: true
}, async (req, username, password, done) => {
  const client = await connectDB();
  const db = client.db('celulares');

  const { nombre, apellido, telefono, email } = req.body;

  let newUser = {
    nombre,
    apellido,
    telefono,
    email,
    username,
    password: await helpers.encryptPassword(password),
    UsuarioVerificado: 'no',
    created_at: new Date(),
    updated_at: new Date(),
  };

  try {
    const result = await db.collection('users').insertOne(newUser);
    newUser._id = result.insertedId;
    return done(null, newUser);
  } catch (err) {
    return done(err);
  }
}));

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  const client = await connectDB();
  const db = client.db('celulares');
  try {
    const user = await db.collection('users').findOne({ _id: new ObjectId(id) });
    done(null, user);
  } catch (err) {
    done(err);
  }
});
