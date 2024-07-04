const express = require('express');
const router = express.Router();
const passport = require('passport');
const { isLoggedIn } = require('../lib/auth');
const { ObjectId } = require('mongodb');
const { connectDB } = require('../database');
const { validationResult } = require('express-validator');

const registeredDevices = new Set();

router.get('/signin', (req, res) => {
  res.render('auth/signin');
});

router.post('/signin', (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    req.flash('message', errors.array()[0].msg);
    return res.redirect('/signin');
  }
  
  passport.authenticate('local.signin', (err, user, info) => {
    if (err) {
      console.error('Error in authentication:', err);
      req.flash('error', 'Error in authentication');
      return res.redirect('/signin');
    }
    
    if (!user) {
      req.flash('error', info.message);
      return res.redirect('/signin');
    }
    
    req.login(user, (err) => {
      if (err) {
        console.error('Error in login:', err);
        req.flash('error', 'Error in login');
        return res.redirect('/signin');
      }
      
      const username = user.username;
      return res.redirect(`/profile/${username}`);
    });
    
  })(req, res, next);
});



router.get('/signup', (req, res) => {
  res.render('auth/signup');
});

router.post('/signup', async (req, res, next) => {
  const { nombre, apellido, telefono, email, username, password, confirmPassword, deviceIdentifier } = req.body;
  if (registeredDevices.has(deviceIdentifier)) {
    req.flash('message', 'Ya existe una cuenta creada en este dispositivo. Inicia sesión.');
    return res.redirect('/signin');
  }
  registeredDevices.add(deviceIdentifier);

  // Validar que las contraseñas coincidan
  if (password !== confirmPassword) {
    req.flash('message', 'Las contraseñas no coinciden');
    return res.redirect('/signup');
  }

  // Conexión a la base de datos
  const client = await connectDB();
  const db = client.db('celulares');
  const usersCollection = db.collection('users');

  try {
    // Verificar si ya existe un usuario con el mismo username, email o teléfono
    const existingUser = await usersCollection.findOne({
      $or: [
        { username: username },
        { email: email },
        { telefono: telefono }
      ]
    });

    // Si el usuario ya existe, mostrar mensaje de error indicando el campo duplicado
    if (existingUser) {
      if (existingUser.username === username) {
        req.flash('message', 'El username ya está registrado');
      } else if (existingUser.email === email) {
        req.flash('message', 'El email ya está registrado');
      } else if (existingUser.telefono === telefono) {
        req.flash('message', 'El teléfono ya está registrado');
      }
      return res.redirect('/signup');
    }

    // Si no existe, proceder con el registro utilizando passport.authenticate
    passport.authenticate('local.signup', {
      successRedirect: '/',
      failureRedirect: '/signup',
      failureFlash: true
    })(req, res, next);

  } catch (err) {
    console.error('Error al verificar usuario existente:', err);
    req.flash('error', 'Error al verificar usuario existente');
    res.redirect('/signup');
  }
});



router.get('/logout', (req, res) => {
  req.logOut();
  res.redirect('/');
});



router.get('/profile/:username', async (req, res) => {
  const client = await connectDB();
  const db = client.db('celulares');
  const usersCollection = db.collection('users');

  try {
    const username = req.params.username;
    const user = await usersCollection.findOne({ username: username });

    if (!user) {
      req.flash('error', 'Usuario no encontrado');
      return res.redirect('/');
    }

    const isCurrentUser = req.isAuthenticated() && req.user.username === username;

    // Renderizar la vista de perfil con los datos del usuario encontrado
    res.render('profile', { user: user, isCurrentUser: isCurrentUser });
  } catch (err) {
    console.error('Error al buscar usuario:', err);
    req.flash('error', 'Error al cargar perfil');
    res.redirect('/');
  }
});





router.post('/profile/edit', isLoggedIn, async (req, res) => {
  const { email, telefono } = req.body;

  const client = await connectDB();
  const db = client.db('celulares');
  const usersCollection = db.collection('users');

  try {
    const result = await usersCollection.updateOne(
      { _id: new ObjectId(req.user._id) },
      { $set: { email, telefono } }
    );
    if (result.modifiedCount === 1) {
      req.flash('success', 'Perfil actualizado correctamente');
    } else {
      req.flash('error', 'No se realizaron cambios en el perfil');
    }
    const username = req.user.username;
    res.redirect(`/profile/${username}`); // Utiliza backticks para interpolar la variable
  } catch (err) {
    console.error('Error al actualizar perfil:', err);
    req.flash('error', 'Error al actualizar perfil');
    const username = req.user.username;
    res.redirect(`/profile/${username}`); // Utiliza backticks para interpolar la variable
  }
});


module.exports = router;
