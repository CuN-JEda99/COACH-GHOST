const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, '..', 'data');
if (!fs.existsSync(dataDir)) {
  try {
    fs.mkdirSync(dataDir, { recursive: true });
  } catch (err) {
    // Ignore error in read-only environments
  }
}

const clientesFile = path.join(dataDir, 'clientes.json');
const escuelasFile = path.join(dataDir, 'escuelas.json');

const loadData = (filePath) => {
  if (fs.existsSync(filePath)) {
    try {
      return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    } catch (e) {
      return [];
    }
  }
  return [];
};

const saveData = (filePath, data) => {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
  } catch (e) {
    // Memory only fallback
  }
};

const memStore = {
  clientes: loadData(clientesFile),
  escuelas: loadData(escuelasFile),
  
  saveClientes() {
    saveData(clientesFile, this.clientes);
  },
  
  saveEscuelas() {
    saveData(escuelasFile, this.escuelas);
  }
};

module.exports = memStore;
