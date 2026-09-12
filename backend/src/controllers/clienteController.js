const { Cliente } = require('../models/Cliente');
const { Escuela } = require('../models/Escuela');

const BARRIOS_VALIDOS = ['Suba', 'Kennedy', 'Engativá', 'Chapinero', 'Bosa', 'Usaquén'];
const POSICIONES_VALIDAS = ['Delantero', 'Defensa', 'Medio', 'Arquero'];

const registrarContacto = async (req, res) => {
  try {
    const { nombre, edad, barrio, posicion, whatsapp, plan } = req.body;

    // 1. Validaciones estrictas de los 6 campos
    if (!nombre || typeof nombre !== 'string' || nombre.trim().length < 3) {
      return res.status(400).json({
        success: false,
        message: 'El nombre es obligatorio y debe tener al menos 3 caracteres.'
      });
    }

    const edadNum = Number(edad);
    if (isNaN(edadNum) || edadNum < 14 || edadNum > 24) {
      return res.status(400).json({
        success: false,
        message: 'La edad debe estar comprendida entre 14 y 24 años.'
      });
    }

    if (!barrio || !BARRIOS_VALIDOS.includes(barrio)) {
      return res.status(400).json({
        success: false,
        message: `El barrio debe ser uno de los autorizados en Bogotá: ${BARRIOS_VALIDOS.join(', ')}.`
      });
    }

    if (!posicion || !POSICIONES_VALIDAS.includes(posicion)) {
      return res.status(400).json({
        success: false,
        message: `La posición debe ser: ${POSICIONES_VALIDAS.join(', ')}.`
      });
    }

    const cleanWhatsapp = String(whatsapp || '').trim().replace(/\D/g, '');
    if (cleanWhatsapp.length !== 10) {
      return res.status(400).json({
        success: false,
        message: 'El número de WhatsApp debe tener exactamente 10 dígitos (ej: 3001234567).'
      });
    }

    if (!plan || typeof plan !== 'string' || plan.trim().length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Debes seleccionar un plan de interés válido.'
      });
    }

    // 2. Guardar cliente en la colección `clientes`
    const nuevoCliente = await Cliente.create({
      nombre: nombre.trim(),
      edad: edadNum,
      barrio,
      posicion,
      whatsapp: cleanWhatsapp,
      plan: plan.trim(),
      estado: 'Activo'
    });

    // 3. Lógica clave: buscar escuelas del mismo barrio
    const escuelasCercanas = await Escuela.find({ barrio });

    return res.status(201).json({
      success: true,
      message: `¡Registro exitoso! Te hemos vinculado con ${escuelasCercanas.length} escuela(s) en ${barrio}.`,
      cliente: nuevoCliente,
      escuelasCercanas
    });
  } catch (error) {
    console.error('Error al registrar contacto:', error);
    return res.status(500).json({
      success: false,
      message: 'Error al procesar el registro del cliente: ' + error.message
    });
  }
};

const obtenerClientes = async (req, res) => {
  try {
    const { barrio, posicion, estado } = req.query;
    const query = {};

    if (barrio) query.barrio = barrio;
    if (posicion) query.posicion = posicion;
    if (estado) query.estado = estado;

    const clientes = await Cliente.find(query);
    return res.status(200).json({
      success: true,
      total: clientes.length,
      clientes
    });
  } catch (error) {
    console.error('Error al listar clientes:', error);
    return res.status(500).json({
      success: false,
      message: 'Error al consultar lista de clientes'
    });
  }
};

const cambiarEstadoCliente = async (req, res) => {
  try {
    const { id } = req.params;
    const { estado } = req.body;

    if (!['Activo', 'Inactivo'].includes(estado)) {
      return res.status(400).json({
        success: false,
        message: 'El estado debe ser Activo o Inactivo'
      });
    }

    const clienteActualizado = await Cliente.findByIdAndUpdate(
      id,
      { estado },
      { new: true }
    );

    if (!clienteActualizado) {
      return res.status(404).json({
        success: false,
        message: 'Cliente no encontrado'
      });
    }

    return res.status(200).json({
      success: true,
      message: `Estado actualizado a ${estado}`,
      cliente: clienteActualizado
    });
  } catch (error) {
    console.error('Error al cambiar estado de cliente:', error);
    return res.status(500).json({
      success: false,
      message: 'Error al actualizar estado del cliente'
    });
  }
};

module.exports = {
  registrarContacto,
  obtenerClientes,
  cambiarEstadoCliente
};
