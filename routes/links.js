const cron = require('node-cron');
const express = require('express');
const router = express.Router();
const { ObjectId } = require('mongodb'); // Importa ObjectId desde mongodb
const { connectDB } = require('../database'); // Importa la función connectDB
const { isLoggedIn } = require('../lib/auth'); 
const multer = require('multer'); // Importa multer para manejar archivos en Node.js
const path = require('path');
const fs = require('fs');
const axios = require('axios');
require('dotenv').config();
 

// Configuración de Multer para manejar la carga de archivos
const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024
    }
});

router.get('/', isLoggedIn, async (req, res) => {
    const client = await connectDB();
    const db = client.db(process.env.dbName); // Nombre de la base de datos desde la configuración
    const linksCollection = db.collection(process.env.coleccion); // Nombre de tu colección en MongoDB

    const links = await linksCollection.find({ user_id: new ObjectId(req.user._id) }).toArray(); // Utiliza new para crear un nuevo ObjectId
    console.log(links); // Verifica que los datos contienen imageLinks
    res.render('links/list', { links });
});




// Ruta para agregar un nuevo enlace (GET)
router.get('/add', (req, res) => {
    res.render('links/add');
});

// Ruta para agregar un nuevo enlace (POST)
router.post('/add', upload.array('fotos', 4), async (req, res) => {
    const { departamento, distrito, marca, modelo, almacenamiento, ram, precio, condicion, detalles, descripcion, vendedor, telefono, email } = req.body;
    const client = await connectDB();
    const db = client.db(process.env.dbName);
    const linksCollection = db.collection(process.env.coleccion);

    const newLink = {
        departamento,
        distrito,
        marca,
        modelo,
        almacenamiento,
        ram,
        precio: parseFloat(precio),
        condicion,
        detalles,
        descripcion,
        vendedor,
        telefono,
        email,
        created_at: new Date(),
        user_id: new ObjectId(req.user._id),
    };


    const files = req.files;
    const imageLinks = [];

    for (const file of files) {
        const folder = `${req.user.username}/${marca}_${modelo}`;
        try {
            const url = await uploadImage(file, folder);
            imageLinks.push(url);
        } catch (err) {
            console.error('Error al subir archivo y obtener URL:', err);
            return res.status(500).send('Ocurrió un error al subir imágenes.');
        }
    }

    newLink.imageLinks = imageLinks;
    await linksCollection.insertOne(newLink);

    req.flash('success', 'Publicación guardada exitosamente');
    res.redirect('/links');
});


 
// SUBIDA A ImgBB
const uploadImage = (file) => {
    return new Promise((resolve, reject) => {
        const apiKey = '4832a3471a8e7ece05df013585b763d6'; 
        const apiUrl = 'https://api.imgbb.com/1/upload';

        // Configuración del formulario para enviar la imagen a ImgBB
        const formData = new FormData();
        formData.append('image', file.buffer.toString('base64')); // Convierte el buffer de la imagen a base64
        formData.append('key', apiKey);
        formData.append('expiration', 1296000); // 15 días en segundos (15 * 24 * 60 * 60)  
        axios.post(apiUrl, formData, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
        .then(response => {
            if (response.data && response.data.data && response.data.data.url) {
                resolve(response.data.data.url); // Resuelve con la URL pública de la imagen en ImgBB
            } else {
                reject('Error al subir imagen a ImgBB');
            }
        })
        .catch(error => {
            console.error('Error al subir imagen a ImgBB:', error);
            reject(error);
        });
    });
};




// Ruta para ver los detalles de una publicación (GET)
router.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const client = await connectDB(); // Conecta a la base de datos
        const db = client.db(process.env.dbName); // Selecciona la base de datos
        const linksCollection = db.collection(process.env.coleccion); // Selecciona la colección 'links'

        const link = await linksCollection.findOne({ _id: new ObjectId(id) }); // Encuentra la publicación por ID

        if (!link) {
            req.flash('error', 'Publicación no encontrada');
            return res.redirect('/links');
        }

        res.render('links/publicacion', { link });
    } catch (err) {
        console.error('Error al recuperar la publicación para ver:', err);
        req.flash('error', 'Error al recuperar la publicación para ver');
        res.redirect('/links');
    }
});



// Ruta para editar un enlace (GET) 
router.get('/edit/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const client = await connectDB(); // Conecta a la base de datos
        const db = client.db(process.env.dbName); // Selecciona la base de datos
        const linksCollection = db.collection(process.env.coleccion); // Selecciona la colección 'links'

        const link = await linksCollection.findOne({ _id: new ObjectId(id) }); // Crea una instancia de ObjectId

        if (!link) {
            req.flash('error', 'Enlace no encontrado');
            return res.redirect('/links');
        }

        res.render('links/edit', { link });
    } catch (err) {
        console.error('Error al recuperar enlace para editar:', err);
        req.flash('error', 'Error al recuperar enlace para editar');
        res.redirect('/links');
    }
});


router.post('/edit/:id', upload.single('imagen'), async (req, res) => {
    const { id } = req.params;

    const { departamento, distrito, marca, modelo, almacenamiento, ram, precio, condicion, detalles, descripcion, vendedor, telefono, email } = req.body;
    let updateObject = {
        departamento,
        distrito,
        marca,
        modelo,
        almacenamiento,
        ram,
        precio,
        condicion,
        detalles,
        descripcion,
        vendedor,
        telefono,
        email,
    };



    // Verifica si se subió una nueva imagen
    if (req.file) {
        updateObject.imagen = req.file.filename;
    }

    try {
        const client = await connectDB(); // Conectar a la base de datos
        const db = client.db(process.env.dbName); // Seleccionar la base de datos
        const linksCollection = db.collection(process.env.coleccion); // Seleccionar la colección 'links'

        const result = await linksCollection.updateOne(
            { _id: new ObjectId(id) }, // Encontrar el enlace por su ID
            { $set: updateObject } // Actualizar los campos especificados
        );

        if (result.modifiedCount === 0) {
            req.flash('error', 'No se realizaron cambios');
        } else {
            req.flash('success', 'Enlace actualizado exitosamente');
        }

        res.redirect('/links');
    } catch (err) {
        console.error('Error al actualizar el enlace:', err);
        req.flash('error', 'Error al actualizar el enlace');
        res.redirect('/links');
    }
});



// Función para eliminar publicaciones antiguas
const deleteOldLinks = async () => {
    const client = await connectDB();
    const db = client.db(process.env.dbName);
    const linksCollection = db.collection(process.env.coleccion);

    // Cambia el tiempo para considerar publicaciones más antiguas de 15 días en milisegundos.
    const fifteenDaysAgo = new Date(Date.now() - 15 * 24 * 60 * 60 * 1000);
    const oldLinks = await linksCollection.find({ createdAt: { $lt: fifteenDaysAgo } }).toArray();
 

    console.log(`Eliminadas ${oldLinks.length} publicaciones antiguas.`);
};

// Programar el trabajo cron para que se ejecute todos los días a medianoche
cron.schedule('0 0 * * *', deleteOldLinks);

module.exports = router;