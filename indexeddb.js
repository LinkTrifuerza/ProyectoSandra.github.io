// indexeddb.js
let db;
const DB_NAME = 'CoolCenterDB';
const DB_VERSION = 1;

function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onerror = (event) => reject('Error abriendo la base de datos');
    request.onsuccess = (event) => {
      db = event.target.result;
      resolve(db);
    };
    request.onupgradeneeded = (event) => {
      db = event.target.result;
      if (!db.objectStoreNames.contains('usuarios')) {
        db.createObjectStore('usuarios', { keyPath: 'email' });
      }
      if (!db.objectStoreNames.contains('productos')) {
        db.createObjectStore('productos', { keyPath: 'id' });
      }
    };
  });
}

// Guardar usuario
function guardarUsuario(usuario) {
  return openDB().then(db => {
    return new Promise((resolve, reject) => {
      const tx = db.transaction('usuarios', 'readwrite');
      const store = tx.objectStore('usuarios');
      const request = store.add(usuario);
      request.onsuccess = () => resolve();
      request.onerror = () => reject('Usuario ya existe');
    });
  });
}

// Buscar usuario
function buscarUsuario(email) {
  return openDB().then(db => {
    return new Promise((resolve) => {
      const tx = db.transaction('usuarios', 'readonly');
      const store = tx.objectStore('usuarios');
      const request = store.get(email);
      request.onsuccess = () => resolve(request.result);
    });
  });
}

// Guardar productos (solo una vez al iniciar)
function guardarProductosIniciales(productos) {
  return openDB().then(db => {
    const tx = db.transaction('productos', 'readwrite');
    const store = tx.objectStore('productos');
    productos.forEach(producto => store.put(producto));
  });
}

// Obtener todos los productos
function obtenerProductos() {
  return openDB().then(db => {
    return new Promise((resolve) => {
      const tx = db.transaction('productos', 'readonly');
      const store = tx.objectStore('productos');
      const request = store.getAll();
      request.onsuccess = () => resolve(request.result);
    });
  });
}
