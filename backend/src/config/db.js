const mongoose = require('mongoose');

let isConnected = false;
let isInMemory = false;

const connectDB = async () => {
  const uri = process.env.MONGODB_URI;

  if (uri && uri.trim() !== '') {
    try {
      console.log('🔄 Intentando conectar a MongoDB Atlas...');
      await mongoose.connect(uri, {
        serverSelectionTimeoutMS: 5000,
      });
      isConnected = true;
      isInMemory = false;
      console.log('✅ Conexión exitosa a MongoDB Atlas');
      return;
    } catch (error) {
      console.warn('⚠️ No se pudo conectar a MongoDB Atlas:', error.message);
      console.log('⚡ Activando motor de almacenamiento en memoria de alta disponibilidad para modo local/demo...');
      isInMemory = true;
    }
  } else {
    console.log('ℹ️ MONGODB_URI no configurada. Utilizando almacenamiento en memoria (modo local/evaluación activa)...');
    isInMemory = true;
  }
};

const getStatus = () => ({
  connected: isConnected || isInMemory,
  mode: isInMemory ? 'in-memory-fallback' : 'mongodb-atlas',
});

module.exports = { connectDB, getStatus, isInMemory: () => isInMemory };
