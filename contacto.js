// contacto.js
document.getElementById('form-contacto').onsubmit = function(e) {
    e.preventDefault();
    const nombre = this.querySelector('input[type="text"]').value.trim();
    const email = this.querySelector('input[type="email"]').value.trim();
    const mensaje = this.querySelector('textarea').value.trim();
  
    if (!nombre || !email || !mensaje) {
      Toastify({text: "Todos los campos son obligatorios", duration: 2000, gravity: "bottom", position: "right", style: {background: "#f44336"}}).showToast();
      return;
    }
    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      Toastify({text: "Email inválido", duration: 2000, gravity: "bottom", position: "right", style: {background: "#f44336"}}).showToast();
      return;
    }
    Toastify({text: "Mensaje enviado correctamente", duration: 2000, gravity: "bottom", position: "right", style: {background: "#4caf50"}}).showToast();
    this.reset();
  };
  