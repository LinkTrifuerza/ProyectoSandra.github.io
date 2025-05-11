// carrito.js
let carrito = [];

function actualizarCarritoDOM() {
  const carritoItems = document.getElementById('carrito-items');
  const cantidad = document.getElementById('carrito-cantidad');
  if (carritoItems) {
    carritoItems.innerHTML = carrito.length === 0
      ? '<p>El carrito está vacío.</p>'
      : carrito.map((item, i) => `
        <div>
          <b>${item.nombre}</b> - $${item.precio} 
          <button onclick="eliminarDelCarrito(${i})">Eliminar</button>
        </div>
      `).join('');
  }
  if (cantidad) cantidad.textContent = carrito.length;
}

window.agregarAlCarrito = function(id) {
  obtenerProductos().then(productos => {
    const producto = productos.find(p => p.id === id);
    if (producto) {
      carrito.push(producto);
      actualizarCarritoDOM();
      Toastify({text: "Producto agregado al carrito", duration: 2000, gravity: "bottom", position: "right", style: {background: "#4caf50"}}).showToast();
    }
  });
};

window.eliminarDelCarrito = function(index) {
  carrito.splice(index, 1);
  actualizarCarritoDOM();
  Toastify({text: "Producto eliminado", duration: 2000, gravity: "bottom", position: "right", style: {background: "#f44336"}}).showToast();
};

document.getElementById('carrito-btn').onclick = function() {
  document.getElementById('carrito').style.display = 'block';
  actualizarCarritoDOM();
};

document.getElementById('vaciar-carrito').onclick = function() {
  carrito = [];
  actualizarCarritoDOM();
  Toastify({text: "Carrito vaciado", duration: 2000, gravity: "bottom", position: "right", style: {background: "#f44336"}}).showToast();
};
