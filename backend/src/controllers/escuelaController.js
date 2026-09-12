const { Escuela } = require('../models/Escuela');

const obtenerEscuelas = async (req, res) => {
  try {
    const { barrio } = req.query;
    const query = {};
    if (barrio) {
      query.barrio = barrio;
    }

    const escuelas = await Escuela.find(query);
    return res.status(200).json({
      success: true,
      total: escuelas.length,
      escuelas
    });
  } catch (error) {
    console.error('Error al obtener escuelas:', error);
    return res.status(500).json({
      success: false,
      message: 'Error al consultar catálogo de escuelas'
    });
  }
};

const obtenerEscuelaPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const escuela = await Escuela.findById(id);
    if (!escuela) {
      return res.status(404).json({
        success: false,
        message: 'Escuela no encontrada'
      });
    }
    return res.status(200).json({
      success: true,
      escuela
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error al consultar la escuela'
    });
  }
};

module.exports = {
  obtenerEscuelas,
  obtenerEscuelaPorId
};
