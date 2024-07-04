const express = require('express');
const router = express.Router();

// Importar funciones de controlador para manejar filtros y resultados
const { filtrarPublicaciones } = require('../lib/filtrosController');

// Ruta para filtrar publicaciones
router.get('/filtrar', filtrarPublicaciones);

module.exports = router;
