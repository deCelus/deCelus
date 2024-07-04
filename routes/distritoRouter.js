

const express = require('express');
const router = express.Router();

const distritoPorDepartamento = {
    Capital: ['1.ª Sección Parque Central','2.ª Sección Barrio Cívico','3.ª Sección Parque O\'Higgins', '4.ª Sección Área Fundacional','5.ª Sección Residencial Sur','6.ª Sección Residencial Norte','7.ª Sección Residencial Parque','8.ª Sección Aeroparque','9.ª Sección Parque General San Martín','10.ª Sección Residencial Los Cerros','11.ª Sección San Agustín','12.ª Sección Piedemonte'],
    GeneralAlvear: ['Ciudad de General Alvear','Bowen',  'San Pedro del Atuel', 'Colonia Alvear Oeste'],
    GodoyCruz: ['Ciudad de Godoy Cruz', 'Gobernador Benegas', 'Godoy Cruz', 'Las Tortugas', 'Presidente Sarmiento', 'San Francisco del Monte', 'Trapiche', 'Villa Marini', 'Villa Hipódromo', 'Villa del Parque'],
    Guaymallen: ['Ciudad de Guaymallén','Belgrano', 'El Bermejo', 'Buena Nueva', 'Capilla del Rosario', 'Colonia Molina', 'Colonia Segovia', 'Dorrego', 'El Sauce', 'Jesús Nazareno', 'Kilómetro 8', 'Kilómetro 11', 'La Primavera', 'Las Cañas', 'Los Corralitos', 'Nueva Ciudad', 'Pedro Molina', 'Puente de Hierro', 'Rodeo de la Cruz', 'San Francisco del Monte', 'San José', 'Villa Nueva'],
    Junin: ['Ciudad de Junín','Algarrobo Grande', 'Alto Verde', 'Ingeniero Giagnoni', 'La Colonia', 'Los Barriales', 'Medrano', 'Mundo Nuevo', 'Phillips', 'Rodríguez Peña'],
    LaPaz: ['La Paz Norte', 'La Paz Sur', 'Desaguadero', 'Villa Antigua', 'Villa Nueva'],
    LasHeras: ['Ciudad de Las Heras','Capdevilla', 'El Algarrobal', 'El Borbollón', 'El Challao', 'El Pastal', 'El Plumerillo', 'El Resguardo', 'El Zapallar', 'La Cieneguita', 'Las Cuevas', 'Panquehua', 'Uspallata', 'Puente del Inca', 'Los Penitentes'],
    Lavalle: ['Ciudad de Lavalle','Alto del Olvido', 'Colonia Italia', 'Costa de Araujo', 'El Carmen', 'El Chilcal', 'El Plumero', 'El Vergel', 'Gustavo André', 'Jocolí', 'Jocolí Viejo', 'La Bajada', 'La Asunción', 'La Holanda', 'La Palmera', 'La Pega', 'Las Violetas', 'Lagunas del Rosario', 'El Paramillo', 'San Francisco', 'San José', 'San Miguel', 'Tres de Mayo', 'Villa Tulumaya', 'Oscar Mendoza'],
    LujanDeCuyo: ['Ciudad de Luján de Cuyo', 'Agrelo', 'Cacheuta', 'Carrodilla', 'Chacras de Coria', 'El Carrizal', 'Industrial', 'La Puntilla', 'Las Compuertas', 'Mayor Drummond', 'Perdriel', 'Potrerillos', 'Ugarteche', 'Vistalba', 'Vertientes del Pedemonte'],
    Maipu: ['Ciudad de Maipú','Colonia Bombal', 'Coquimbito', 'Cruz de Piedra', 'Fray Luis Beltrán', 'General Gutiérrez', 'General Ortega', 'Las Barrancas', 'Lunlunta', 'Luzuriaga', 'Rodeo del Medio', 'Russell', 'San Roque', 'Santa Blanca'],
    Malargue: ['Ciudad de Malargüe', 'Agua Escondida', 'Río Barrancas', 'Río Grande'],
    Rivadavia: ['Ciudad de Rivadavia','Andrade', 'El Mirador', 'La Central', 'La Libertad', 'Los Árboles', 'Los Campamentos', 'Los Huarpes', 'Medrano', 'Mundo Nuevo', 'Reducción', 'Santa María de Oro', 'San Isidro'],
    SanCarlos: ['Villa San Carlos','Chilecito', 'Eugenio Bustos', 'La Consulta', 'Pareditas'],
    SanMartin: ['Ciudad de San Martín', 'Alto Salvador', 'Alto Verde', 'Buen Orden', 'Chapanay', 'Chivilcoy', 'El Central', 'El Divisadero', 'El Espino', 'El Ramblón', 'Ingeniero Giagnoni', 'Las Chimbas', 'Montecaseros', 'Nueva California', 'Palmira', 'Tres Porteñas'],
    SanRafael: ['Ciudad de San Rafael','Cañada Seca', 'Cuadro Benegas', 'Cuadro Nacional', 'El Cerrito', 'El Nihuil', 'El Sosneado', 'Goudge', 'Jaime Prats', 'La Llave', 'Las Malvinas', 'Las Paredes', 'Monte Comán', 'Punta del Agua', 'Rama Caída', 'Real del Padre',  'Veinticinco de Mayo', 'Villa Atuel'],
    SantaRosa: ['Ciudad de Santa Rosa','Doce de Octubre', 'La Dormida', 'Las Catitas', 'Ñacuñan',  'El Marcado'],
    Tunuyan: ['Ciudad de Tunuyán','Campo de los Andes', 'Colonia Las Rosas', 'El Algarrobo', 'El Totoral', 'La Primavera', 'Las Pintadas', 'Los Árboles', 'Los Chacayes', 'Los Sauces', 'Villa Seca', 'Vista Flores'],
    Tupungato: ['Ciudad de Tupungato','Anchoris', 'Cordón del Plata', 'El Peral', 'El Zampal', 'El Zampalito', 'Gualtallary', 'La Arboleda', 'La Carrera', 'San José', 'Santa Clara', 'Villa Bastías', 'Zapata'],

};


router.get('/:departamento', (req, res) => {
    const { departamento } = req.params;
    const distrito = distritoPorDepartamento[departamento] || [];

    res.json(distrito);
});

module.exports = router;
