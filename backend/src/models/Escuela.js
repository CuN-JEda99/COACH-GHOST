const mongoose = require('mongoose');
const { isInMemory } = require('../config/db');
const memStore = require('./store');

const escuelaSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, 'El nombre de la escuela es obligatorio'],
    trim: true
  },
  barrio: {
    type: String,
    required: [true, 'El barrio es obligatorio'],
    enum: ['Suba', 'Kennedy', 'Engativá', 'Chapinero', 'Bosa', 'Usaquén']
  },
  direccion: {
    type: String,
    required: [true, 'La dirección es obligatoria']
  },
  horarios: {
    type: String,
    required: [true, 'Los horarios son obligatorios']
  },
  telefono: {
    type: String,
    default: '3100000000'
  },
  cupos: {
    type: Number,
    default: 25
  },
  fechaRegistro: {
    type: Date,
    default: Date.now
  }
});

let MongooseEscuela;
try {
  MongooseEscuela = mongoose.model('Escuela', escuelaSchema);
} catch (e) {
  MongooseEscuela = mongoose.models.Escuela;
}

class EscuelaRepository {
  static async create(data) {
    if (!isInMemory()) {
      try {
        return await MongooseEscuela.create(data);
      } catch (e) {
        console.warn('Fallo Mongoose en escuela create, usando memoria:', e.message);
      }
    }
    const nuevo = {
      _id: 'esc_' + Date.now() + '_' + Math.floor(Math.random() * 1000),
      ...data,
      fechaRegistro: new Date()
    };
    memStore.escuelas.push(nuevo);
    memStore.saveEscuelas();
    return nuevo;
  }

  static async find(query = {}) {
    if (!isInMemory()) {
      try {
        return await MongooseEscuela.find(query);
      } catch (e) {
        console.warn('Fallo Mongoose escuela find, usando memoria:', e.message);
      }
    }
    return memStore.escuelas.filter(esc => {
      for (const key in query) {
        if (esc[key] !== query[key]) return false;
      }
      return true;
    });
  }

  static async findById(id) {
    if (!isInMemory()) {
      try {
        return await MongooseEscuela.findById(id);
      } catch (e) {}
    }
    return memStore.escuelas.find(esc => String(esc._id) === String(id)) || null;
  }

  static async countDocuments() {
    if (!isInMemory()) {
      try {
        return await MongooseEscuela.countDocuments();
      } catch (e) {}
    }
    return memStore.escuelas.length;
  }

  static async deleteMany() {
    if (!isInMemory()) {
      try {
        await MongooseEscuela.deleteMany({});
      } catch (e) {}
    }
    memStore.escuelas = [];
    memStore.saveEscuelas();
  }

  static async insertMany(items) {
    if (!isInMemory()) {
      try {
        return await MongooseEscuela.insertMany(items);
      } catch (e) {}
    }
    const processed = items.map(item => ({
      _id: 'esc_' + Date.now() + '_' + Math.floor(Math.random() * 1000),
      ...item,
      fechaRegistro: new Date()
    }));
    memStore.escuelas.push(...processed);
    memStore.saveEscuelas();
    return processed;
  }
}

module.exports = {
  MongooseEscuela,
  Escuela: EscuelaRepository
};
