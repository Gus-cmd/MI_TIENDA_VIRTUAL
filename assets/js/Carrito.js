 // Variables para el carrito
 let carrito = [];
 let totalPrecio = 0;
 const badgeCarrito = document.getElementById('carritoCantidad');

 // Función para agregar al carrito
 function agregarAlCarrito(nombre, precio) {
     carrito.push({ nombre, precio });
     totalPrecio += precio;
     badgeCarrito.innerText = carrito.length;
     alert(`Producto ${nombre} agregado al carrito. Total: $${totalPrecio}`);
 }

 // Event listener para botones de agregar al carrito
 const botonesAgregar = document.querySelectorAll('.agregar-carrito');
 botonesAgregar.forEach(boton => {
     boton.addEventListener('click', function() {
         const nombre = this.getAttribute('data-nombre');
         const precio = parseFloat(this.getAttribute('data-precio'));
         agregarAlCarrito(nombre, precio);
     });
 });

 document.getElementById('loginLink').addEventListener('click', function(event) {
 event.preventDefault(); // Evita el comportamiento predeterminado del enlace
 window.location.href = 'Login.html'; // Redirige a la página de login
});  