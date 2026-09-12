const catalogoEntrenamientos = {
  Delantero: {
    enfoque: 'Definición, Desmarque y Golpeo de Alta Precisión',
    descripcionIA: 'Plan biomecánico enfocado en optimizar el tiempo de reacción en el área rival, orientación corporal ante el arquero y finalización al primer toque.',
    ejercicios: [
      {
        id: 'del-1',
        titulo: 'Definición al Primer Toque en Carrera Diagonal',
        categoria: 'Definición',
        intensidad: 'Alta (85% FCM)',
        repeticiones: '4 series x 8 repeticiones (descanso 45s)',
        descripcion: 'Recepción de pase filtrado en ruptura; perfila el cuerpo a 45° antes de entrar al área y define al poste lejano usando el empeine interior sin controlar el balón.',
        claveTecnica: 'Fijar el pie de apoyo a 15 cm del balón apuntando hacia el poste seleccionado; no desacelerar la carrera previa.',
        material: '4 conos, 1 arco con arquero/conos en esquinas, 6 balones'
      },
      {
        id: 'del-2',
        titulo: '1v1 con Recorte Explosivo y Disparo Rápido',
        categoria: 'Definición en Espacio Reducido',
        intensidad: 'Máxima (Sprint corto)',
        repeticiones: '5 series x 6 duelos (descanso 60s)',
        descripcion: 'Enfrenta al maniquí/defensa a velocidad media, amaga con el hombro derecho y realiza un recorte interior seco con la zurda para sacar el tiro antes de que el arquero achique el ángulo.',
        claveTecnica: 'Bajar el centro de gravedad en el cambio de dirección; armado del tiro ultra-corto para evitar bloqueos defensivos.',
        material: 'Maniquí o estaca defensiva, 8 balones'
      },
      {
        id: 'del-3',
        titulo: 'Control Orientado y Volea Bajo Presión Simulada',
        categoria: 'Finalización Aérea',
        intensidad: 'Media-Alta',
        repeticiones: '4 series x 10 balones aéreos',
        descripcion: 'Balón cruzado desde la banda a media altura. Amortigua con el pecho orientado hacia la portería y conecta volea cruzada de sobrepique antes del segundo bote.',
        claveTecnica: 'Bloqueo del tobillo al impacto; inclinar el tronco hacia adelante para evitar que el disparo se eleve por encima del travesaño.',
        material: 'Centro desde banda o lanzador automático, balones'
      }
    ]
  },
  Defensa: {
    enfoque: 'Perfilamiento, Cierre y Retardo Táctico',
    descripcionIA: 'Algoritmo defensivo orientado a la postura biomecánica de anticipación, timing de barrida limpia y corte de líneas de pase progresivas.',
    ejercicios: [
      {
        id: 'def-1',
        titulo: 'Cierre Diagonal y Retardo en 1v1',
        categoria: 'Perfilamiento y Cierre',
        intensidad: 'Media-Alta',
        repeticiones: '5 series x 5 repeticiones por perfil (izq/der)',
        descripcion: 'Acompaña el sprint del atacante perfilado a 45° hacia la línea de banda, forzándolo a utilizar su pierna menos hábil sin tirarse al piso antes de tiempo.',
        claveTecnica: 'Nunca quedar frontal al atacante; mantener rodillas semiflexionadas y brazos abiertos para equilibrio y anticipación.',
        material: 'Pasillo delimitado con conos de 20x10 metros'
      },
      {
        id: 'def-2',
        titulo: 'Anticipación de Espaldas y Despeje Orientado',
        categoria: 'Interceptación Aérea y Terrestre',
        intensidad: 'Alta (Fuerza explosiva)',
        repeticiones: '4 series x 6 saltos con impacto',
        descripcion: 'Colocado por detrás del delantero imaginario; lee la trayectoria del pase raso o aéreo, mete el cuerpo con la cadera por delante y despeja hacia las bandas.',
        claveTecnica: 'Contacto legal de hombro para ganar la posición; despeje con la superficie del empeine hacia zona de seguridad (laterales).',
        material: 'Balones aéreos servidos desde 30 metros, estacas'
      },
      {
        id: 'def-3',
        titulo: 'Cobertura Escalonada y Corte de Línea de Pase',
        categoria: 'Táctica Individual de Cierre',
        intensidad: 'Media',
        repeticiones: '4 series x 8 transiciones rápidas',
        descripcion: 'Desplazamiento lateral rápido entre dos conos; al escuchar la señal sonora, realiza un sprint reactivo de 5 metros para bloquear el remate o centro.',
        claveTecnica: 'Puntas de los pies activas, reacción visual-auditiva instantánea sin cruzar los pies durante el desplazamiento lateral.',
        material: '4 conos en rombo, cronómetro reactivo'
      }
    ]
  },
  Medio: {
    enfoque: 'Visión Periférica, Control Orientado y Distribución',
    descripcionIA: 'Modelo táctico para mediocampistas enfocado en escaneo visual previo (head-check), desahogo bajo presión intensa y pases filtrados progresivos.',
    ejercicios: [
      {
        id: 'med-1',
        titulo: 'Giro Periférico con Doble Escaneo Visual (Head-Check)',
        categoria: 'Visión y Distribución',
        intensidad: 'Alta (Cognitivo + Motor)',
        repeticiones: '4 series x 10 pases con cambio de frente',
        descripcion: 'Antes de recibir el balón del central, gira la cabeza 2 veces hacia los lados; recibe con la pierna más alejada y filtra a un compañero en movimiento.',
        claveTecnica: 'Información previa: mirar 360° antes del contacto para ejecutar la entrega en máximo dos toques.',
        material: 'Conos numerados o con colores para estímulo visual'
      },
      {
        id: 'med-2',
        titulo: 'Cambio de Orientación con Control Orientado',
        categoria: 'Transición y Amplitud',
        intensidad: 'Media-Alta',
        repeticiones: '5 series x 6 lanzamientos largos precisos',
        descripcion: 'Controla balón que viene del lateral izquierdo y en un solo toque orienta la trayectoria hacia el carril opuesto para meter un pase largo de 35 metros.',
        claveTecnica: 'Golpeo con empeine exterior para dar curva de seguridad al balón lejos del alcance de la zaga rival.',
        material: '2 receptores en bandas opuestas, balones'
      },
      {
        id: 'med-3',
        titulo: 'Presión Tras Pérdida y Pase de Seguridad',
        categoria: 'Intensidad Táctica',
        intensidad: 'Máxima en intervalos de 6 segundos',
        repeticiones: '6 series x 3 repeticiones (descanso 90s)',
        descripcion: 'Pierde deliberadamente la posesión en 3/4 de cancha; asfixia al portador en los primeros 4 segundos y entrega de inmediato al volante de marca libre.',
        claveTecnica: 'Cerrar el ángulo de pase más peligroso mientras se acorta la distancia física con el rival.',
        material: 'Cuadrado de 15x15m, 4 jugadores o estacas'
      }
    ]
  },
  Arquero: {
    enfoque: 'Reflejos, Posicionamiento y Seguridad Aérea',
    descripcionIA: 'Sistema de reflejos y biomecánica bajo los tres palos: reducción de bisectriz en mano a mano, blocaje seguro y respuesta pliométrica en corto.',
    ejercicios: [
      {
        id: 'arq-1',
        titulo: 'Reacción a Doble Remate a Quemarropa',
        categoria: 'Reflejos Puros',
        intensidad: 'Máxima reactividad',
        repeticiones: '5 series x 6 secuencias de 2 disparos',
        descripcion: 'El entrenador dispara desde 7 metros a un poste; el arquero ataja o desvía y debe incorporarse en menos de 1 segundo para atajar el contra-remate.',
        claveTecnica: 'Empuje pliométrico con la pierna del suelo; manos en forma de "W" o "Copa" para retener o desviar fuera de zona de peligro.',
        material: 'Arco reglamentario, 12 balones, tablero de rebote'
      },
      {
        id: 'arq-2',
        titulo: 'Achique y Cruz en Mano a Mano',
        categoria: 'Posicionamiento y Bisectriz',
        intensidad: 'Alta (Fuerza excéntrica)',
        repeticiones: '4 series x 6 salidas frente a delantero',
        descripcion: 'Delantero entra en diagonal; el arquero avanza reduciendo el ángulo geométrico y adopta la postura de cruz cubriendo el piso y la media altura.',
        claveTecnica: 'No caerse antes del contacto del delantero; aguantar erguido hasta el último instante para provocar el error en la definición.',
        material: 'Balones, conos de guía de bisectriz'
      },
      {
        id: 'arq-3',
        titulo: 'Salida Aérea con Bloqueo en Balón Dividido',
        categoria: 'Seguridad en Pelota Quieta',
        intensidad: 'Media-Alta (Salto vertical)',
        repeticiones: '4 series x 8 centros laterales',
        descripcion: 'Centro con efecto cerrado desde el tiro de esquina. El arquero calcula el vértice parabólico, ataca el balón en el punto más alto con rodilla arriba como escudo protector.',
        claveTecnica: 'Voz de mando fuerte ("¡MÍA!"), contacto con dos manos en el punto más alto del salto antes de tocar el suelo.',
        material: 'Centrador desde el córner, muñeco de choque'
      }
    ]
  }
};

const historialRecomendaciones = [];

const recomendarEntrenamiento = async (req, res) => {
  try {
    const { posicion, edad, nivel, objetivo } = req.body;

    if (!posicion || !catalogoEntrenamientos[posicion]) {
      return res.status(400).json({
        success: false,
        message: 'Por favor proporciona una posición válida: Delantero, Defensa, Medio, Arquero'
      });
    }

    const entrenamiento = catalogoEntrenamientos[posicion];
    const recomendacionId = 'ia_rec_' + Date.now();

    const planGenerado = {
      id: recomendacionId,
      posicion,
      edad: edad || '14-24',
      nivel: nivel || 'Competitivo / Amateur Pro',
      objetivo: objetivo || 'Optimización técnico-táctica',
      enfoque: entrenamiento.enfoque,
      descripcionIA: entrenamiento.descripcionIA,
      ejercicios: entrenamiento.ejercicios,
      timestamp: new Date()
    };

    historialRecomendaciones.push(planGenerado);

    return res.status(200).json({
      success: true,
      message: `Plan inteligente generado por Coach Ghost IA para ${posicion}`,
      data: planGenerado
    });
  } catch (error) {
    console.error('Error en recomendador IA:', error);
    return res.status(500).json({
      success: false,
      message: 'Error al procesar la recomendación con IA'
    });
  }
};

module.exports = {
  recomendarEntrenamiento,
  catalogoEntrenamientos
};
