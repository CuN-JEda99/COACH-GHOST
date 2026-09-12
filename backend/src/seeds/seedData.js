const { Escuela } = require('../models/Escuela');
const { Cliente } = require('../models/Cliente');

const initialEscuelas = [
  {
    nombre: 'Academia Gol Suba',
    barrio: 'Suba',
    direccion: 'Calle 145 # 92 - 30, Rincón de Suba',
    horarios: 'Lunes a Viernes 3:00 PM - 7:00 PM | Sábados 8:00 AM - 1:00 PM',
    telefono: '3124567890',
    cupos: 30
  },
  {
    nombre: 'Futuras Estrellas Kennedy',
    barrio: 'Kennedy',
    direccion: 'Av. Primero de Mayo # 71D - 20, Canchas Timiza',
    horarios: 'Martes, Jueves y Sábados 7:00 AM - 12:00 PM',
    telefono: '3157891234',
    cupos: 25
  },
  {
    nombre: 'Titanes El Salitre Engativá',
    barrio: 'Engativá',
    direccion: 'Calle 64 # 111A - 15, Parque Álamos Norte',
    horarios: 'Lunes, Miércoles y Viernes 4:00 PM - 8:00 PM',
    telefono: '3209876543',
    cupos: 20
  },
  {
    nombre: 'Club Semillero Chapinero',
    barrio: 'Chapinero',
    direccion: 'Carrera 7 # 58 - 42, Polideportivo Chapinero',
    horarios: 'Martes y Jueves 5:00 PM - 8:30 PM | Sábados 9:00 AM - 2:00 PM',
    telefono: '3183456789',
    cupos: 20
  },
  {
    nombre: 'Huracanes Bosa FC',
    barrio: 'Bosa',
    direccion: 'Carrera 80J # 65 Sur - 12, Cancha Bosa Centro',
    horarios: 'Miércoles y Viernes 3:30 PM - 7:00 PM | Domingos 8:00 AM - 1:00 PM',
    telefono: '3112233445',
    cupos: 28
  },
  {
    nombre: 'Usaquén Elite Soccer',
    barrio: 'Usaquén',
    direccion: 'Calle 165 # 8G - 40, Canchas San Cristóbal Norte',
    horarios: 'Lunes a Jueves 4:00 PM - 7:30 PM | Sábados 8:00 AM - 12:00 PM',
    telefono: '3198765432',
    cupos: 22
  }
];

const initialClientes = [
  {
    nombre: 'Santiago Gómez Rodríguez',
    edad: 17,
    barrio: 'Suba',
    posicion: 'Delantero',
    whatsapp: '3109876543',
    plan: 'Plan Jugador',
    estado: 'Activo',
    fechaRegistro: new Date(Date.now() - 3600000 * 24 * 3)
  },
  {
    nombre: 'Mateo Hernández Ruiz',
    edad: 19,
    barrio: 'Kennedy',
    posicion: 'Medio',
    whatsapp: '3201234567',
    plan: 'Plan Escuela',
    estado: 'Activo',
    fechaRegistro: new Date(Date.now() - 3600000 * 24 * 2)
  },
  {
    nombre: 'Nicolás Peña Silva',
    edad: 16,
    barrio: 'Engativá',
    posicion: 'Defensa',
    whatsapp: '3156789012',
    plan: 'Plan Familiar',
    estado: 'Activo',
    fechaRegistro: new Date(Date.now() - 3600000 * 24 * 1)
  },
  {
    nombre: 'David Leonardo Castro',
    edad: 21,
    barrio: 'Chapinero',
    posicion: 'Arquero',
    whatsapp: '3187654321',
    plan: 'Plan Jugador',
    estado: 'Activo',
    fechaRegistro: new Date(Date.now() - 3600000 * 12)
  },
  {
    nombre: 'Sebastián Mora Morales',
    edad: 18,
    barrio: 'Suba',
    posicion: 'Delantero',
    whatsapp: '3143210987',
    plan: 'Plan Escuela',
    estado: 'Inactivo',
    fechaRegistro: new Date(Date.now() - 3600000 * 4)
  }
];

const seedDatabase = async () => {
  try {
    const totalEscuelas = await Escuela.countDocuments();
    if (totalEscuelas === 0) {
      console.log('🌱 Inicializando catálogo de escuelas en Bogotá...');
      await Escuela.insertMany(initialEscuelas);
      console.log(`✅ ${initialEscuelas.length} escuelas registradas con éxito`);
    } else {
      console.log(`ℹ️ Escuelas existentes en base de datos: ${totalEscuelas}`);
    }

    const totalClientes = await Cliente.countDocuments();
    if (totalClientes === 0) {
      console.log('🌱 Inicializando clientes de prueba...');
      await Cliente.insertMany(initialClientes);
      console.log(`✅ ${initialClientes.length} clientes de prueba registrados`);
    } else {
      console.log(`ℹ️ Clientes existentes en base de datos: ${totalClientes}`);
    }
  } catch (error) {
    console.error('❌ Error al inicializar datos semilla:', error.message);
  }
};

module.exports = { seedDatabase, initialEscuelas, initialClientes };
