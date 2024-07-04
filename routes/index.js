const express = require('express');
const router = express.Router();
const { connectDB } = require('../database');

router.get('/', async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = 6;

    try {
        const client = await connectDB();
        const db = client.db('celulares');
        const publicationsCollection = db.collection('links');

        const totalPublications = await publicationsCollection.countDocuments();
        const totalPages = Math.ceil(totalPublications / limit);

        const publications = await publicationsCollection.find()
            .sort({ created_at: -1 })
            .skip((page - 1) * limit)
            .limit(limit)
            .toArray();

        const pages = [];
        for (let i = 1; i <= totalPages; i++) {
            pages.push({ number: i, active: i === page });
        }

        res.render('index', {
            publications: publications,
            hasPrevPage: page > 1,
            hasNextPage: page < totalPages,
            prevPage: page - 1,
            nextPage: page + 1,
            pages: pages 
        });
    } catch (err) {
        console.error('Error al obtener publicaciones:', err);
        req.flash('error', 'Error al cargar publicaciones');
        res.redirect('/');
    }
});

router.get('/filtros', async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = 6;

    try {
        const client = await connectDB();
        const db = client.db('celulares');
        const publicationsCollection = db.collection('links');

        const departamento = req.query.departamento || '';
        const distrito = req.query.distrito || '';
        const marca = req.query.marca || '';
        const modelo = req.query.modelo || '';
        const ram = parseInt(req.query.ram) || 0;
        const almacenamiento = parseInt(req.query.almacenamiento) || 0;
        const condicion = req.query.condicion || '';
        const precio = parseInt(req.query.precio) || 0;


        const filtro = {}; 
 
        if (departamento && departamento !== "Cualquier departamento") { 
            filtro.departamento = departamento;
        }
        if (distrito && distrito !== "Cualquier distrito") {
            filtro.distrito = distrito;
        }
        if (marca && marca !== "Cualquier marca") {
            filtro.marca = marca;
        } 
        
        if (modelo  && modelo !== "Cualquier modelo") {
            filtro.modelo = modelo;
        }
        if (ram && ram !== "Cualquier RAM") {
            filtro.ram = ram;
        }
        if (almacenamiento && almacenamiento !== "Cualquier almacenamiento") {
            filtro.almacenamiento = almacenamiento;
        }
        if (condicion && condicion !== "Cualquier condición") {
            filtro.condicion = condicion;
        }
        if (parseInt(precio) > 0) {
            filtro.precio = { $lte: parseInt(precio) }; // Convertir precio a número aquí
        }

        const totalPublications = await publicationsCollection.countDocuments(filtro);
        const totalPages = Math.ceil(totalPublications / limit);

        const publications = await publicationsCollection.find(filtro)
            .sort({ created_at: -1 })
            .skip((page - 1) * limit)
            .limit(limit)
            .toArray();

        const pages = [];
        for (let i = 1; i <= totalPages; i++) {
            pages.push({ number: i, active: i === page });
        }

        res.json({
            publications: publications,
            hasPrevPage: page > 1,
            hasNextPage: page < totalPages,
            prevPage: page - 1,
            nextPage: page + 1,
            pages: pages 
        });
    } catch (err) {
        console.error('Error al obtener publicaciones con filtros:', err);
        res.status(500).json({ error: 'Error al cargar publicaciones con filtros' });
    }
});

module.exports = router;