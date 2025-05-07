// productos.js
document.addEventListener('DOMContentLoaded', () => {
    // Solo la primera vez, agrega productos (id, nombre, precio, características)
    const productosEjemplo = [
      {id: '1', nombre: 'Laptop X', precio: 999, caracteristicas: ['Intel i7', '16GB RAM', '512GB SSD', 'Pantalla 15"', 'Windows 11', 'Batería 8h', 'Peso 1.5kg', 'Color Gris']},
      {id: '2', nombre: 'Smartphone Y', precio: 599, caracteristicas: ['Android 13', '128GB', '6GB RAM', 'Cámara 48MP', 'Pantalla 6.5"', 'Batería 4000mAh', '5G', 'Color Negro']},
      // ...agrega hasta 20 productos
    ];
    // Solo descomenta la siguiente línea la primera vez para poblar la BD
    // guardarProductosIniciales(productosEjemplo);
  
    mostrarProductos();
  });
  
  function mostrarProductos(filtrados) {
    obtenerProductos().then(productos => {
      const lista = filtrados || productos;
      const container = document.getElementById('productos-container');
      if (!container) return;
      container.innerHTML = lista.map(p => `
        <div class="producto">
          <h3>${p.nombre}</h3>
          <p>Precio: $${p.precio}</p>
          <button onclick="verDetalles('${p.id}')">Ver detalles</button>
          <button onclick="agregarAlCarrito('${p.id}')">Agregar al carrito</button>
        </div>
      `).join('');
    });
  }
  
  // Búsqueda AJAX
  window.buscarProductos = function(termino) {
    obtenerProductos().then(productos => {
      const filtrados = productos.filter(p => 
        p.nombre.toLowerCase().includes(termino.toLowerCase())
      );
      mostrarProductos(filtrados);
    });
  };
  
  // Mostrar detalles
  window.verDetalles = function(id) {
    obtenerProductos().then(productos => {
      const producto = productos.find(p => p.id === id);
      if (producto) {
        const form = document.getElementById('form-contacto');
        form.querySelector('textarea').value = `Me interesa el producto: ${producto.nombre}`;
        window.location.hash = '#contacto';
      }
    });
  };
  