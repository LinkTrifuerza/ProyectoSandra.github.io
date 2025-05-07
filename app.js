// app.js
// Encriptar contraseña simple (hash básico)
function hashPassword(pass) {
    return btoa(pass); // Solo ejemplo, usa una mejor en producción
  }
  
  // Registro
  window.registrarUsuario = function() {
    const nombre = document.getElementById('reg-nombre').value.trim();
    const email = document.getElementById('reg-email').value.trim();
    const pass = document.getElementById('reg-pass').value.trim();
  
    if (!nombre || !email || !pass) {
      Toastify({text: "Todos los campos son obligatorios", duration: 2000, gravity: "bottom", position: "right", style: {background: "#f44336"}}).showToast();
      return;
    }
    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      Toastify({text: "Email inválido", duration: 2000, gravity: "bottom", position: "right", style: {background: "#f44336"}}).showToast();
      return;
    }
    guardarUsuario({nombre, email, pass: hashPassword(pass)}).then(() => {
      Toastify({text: "Registro exitoso", duration: 2000, gravity: "bottom", position: "right", style: {background: "#4caf50"}}).showToast();
      setTimeout(() => window.location.href = "login.html", 2000);
    }).catch(err => {
      Toastify({text: err, duration: 2000, gravity: "bottom", position: "right", style: {background: "#f44336"}}).showToast();
    });
  };
  
  // Login
  window.loginUsuario = function() {
    const email = document.getElementById('login-email').value.trim();
    const pass = document.getElementById('login-pass').value.trim();
  
    if (!email || !pass) {
      Toastify({text: "Todos los campos son obligatorios", duration: 2000, gravity: "bottom", position: "right", style: {background: "#f44336"}}).showToast();
      return;
    }
    buscarUsuario(email).then(usuario => {
      if (usuario && usuario.pass === hashPassword(pass)) {
        Toastify({text: "Login exitoso", duration: 2000, gravity: "bottom", position: "right", style: {background: "#4caf50"}}).showToast();
        setTimeout(() => window.location.href = "index.html", 2000);
      } else {
        Toastify({text: "Usuario o contraseña incorrectos", duration: 2000, gravity: "bottom", position: "right", style: {background: "#f44336"}}).showToast();
      }
    });
  };
  