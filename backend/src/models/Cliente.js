const mongoose = require('mongoose');
const { isInMemory } = require('../config/db');
const memStore = require('./store');

const clienteSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, 'El nombre es obligatorio'],
    trim: true,
    minlength: [3, 'El nombre debe tener al menos 3 caracteres']
  },
  edad: {
    type: Number,
    required: [true, 'La edad es obligatoria'],
    min: [14, 'La edad mínima es 14 años'],
    max: [24, 'La edad máxima es 24 años']
  },
  barrio: {
    type: String,
    required: [true, 'El barrio es obligatorio'],
    enum: {
      values: ['Suba', 'Kennedy', 'Engativá', 'Chapinero', 'Bosa', 'Usaquén'],
      message: '{VALUE} no es un barrio válido registrado'
    }
  },
  posicion: {
    type: String,
    required: [true, 'La posición es obligatoria'],
    enum: {
      values: ['Delantero', 'Defensa', 'Medio', 'Arquero'],
      message: '{VALUE} no es una posición válida'
    }
  },
  whatsapp: {
    type: String,
    required: [true, 'El WhatsApp es obligatorio'],
    match: [/^\d{10}$/, 'El WhatsApp debe contener exactamente 10 dígitos']
  },
  plan: {
    type: String,
    required: [true, 'El plan es obligatorio'],
    enum: {
      values: ['Jugador', 'Escuela', 'Familiar', 'Plan Jugador', 'Plan Escuela', 'Plan Familiar', 'FREE', 'PRO', 'ELITE'],
      message: '{VALUE} no es un plan válido'
    }
  },
  estado: {
    type: String,
    enum: ['Activo', 'Inactivo'],
    default: 'Activo'
  },
  fechaRegistro: {
    type: Date,
    default: Date.now
  }
});

let MongooseCliente;
try {
  MongooseCliente = mongoose.model('Cliente', clienteSchema);
} catch (e) {
  MongooseCliente = mongoose.models.Cliente;
}

class ClienteRepository {
  static async create(data) {
    if (!isInMemory()) {
      try {
        return await MongooseCliente.create(data);
      } catch (e) {
        console.warn('Fallo Mongoose en runtime, usando memoria:', e.message);
      }
    }
    const nuevo = {
      _id: 'cli_' + Date.now() + '_' + Math.floor(Math.random() * 1000),
      ...data,
      estado: data.estado || 'Activo',
      fechaRegistro: new Date()
    };
    memStore.clientes.unshift(nuevo);
    memStore.saveClientes();
    return nuevo;
  }

  static async find(query = {}) {
    if (!isInMemory()) {
      try {
        return await MongooseCliente.find(query).sort({ fechaRegistro: -1 });
      } catch (e) {
        console.warn('Fallo Mongoose find, usando memoria:', e.message);
      }
    }
    return memStore.clientes.filter(c => {
      for (const key in query) {
        if (c[key] !== query[key]) return false;
      }
      return true;
    });
  }

  static async findById(id) {
    if (!isInMemory()) {
      try {
        return await MongooseCliente.findById(id);
      } catch (e) {}
    }
    return memStore.clientes.find(c => String(c._id) === String(id)) || null;
  }

  static async findByIdAndUpdate(id, update, options = {}) {
    if (!isInMemory()) {
      try {
        return await MongooseCliente.findByIdAndUpdate(id, update, { new: true, ...options });
      } catch (e) {}
    }
    const index = memStore.clientes.findIndex(c => String(c._id) === String(id));
    if (index === -1) return null;
    const updated = { ...memStore.clientes[index], ...(update.$set || update) };
    memStore.clientes[index] = updated;
    memStore.saveClientes();
    return updated;
  }

  static async countDocuments() {
    if (!isInMemory()) {
      try {
        return await MongooseCliente.countDocuments();
      } catch (e) {}
    }
    return memStore.clientes.length;
  }

  static async deleteMany() {
    if (!isInMemory()) {
      try {
        await MongooseCliente.deleteMany({});
      } catch (e) {}
    }
    memStore.clientes = [];
    memStore.saveClientes();
  }

  static async insertMany(items) {
    if (!isInMemory()) {
      try {
        return await MongooseCliente.insertMany(items);
      } catch (e) {}
    }
    const processed = items.map(item => ({
      _id: 'cli_' + Date.now() + '_' + Math.floor(Math.random() * 1000),
      ...item,
      estado: item.estado || 'Activo',
      fechaRegistro: item.fechaRegistro || new Date()
    }));
    memStore.clientes.push(...processed);
    memStore.saveClientes();
    return processed;
  }
}

module.exports = {
  MongooseCliente,
  Cliente: ClienteRepository
};
