document.addEventListener('DOMContentLoaded', function() {
    const carritoCantidadElement = document.getElementById('carritoCantidad');
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    function agregarAlCarrito(event) {
        const boton = event.target;
        const id = boton.getAttribute('data-id');
        const nombre = boton.getAttribute('data-nombre');
        const precio = parseFloat(boton.getAttribute('data-precio'));

        const producto = {
            id: id,
            nombre: nombre,
            precio: precio,
            cantidad: 1 // Inicializamos la cantidad al agregarlo por primera vez
        };

        // Verificar si el producto ya está en el carrito
        const productoExistente = carrito.find(p => p.id === id);
        if (productoExistente) {
            productoExistente.cantidad++; // Incrementar la cantidad si ya existe
        } else {
            carrito.push(producto); // Agregar el producto al carrito si no existe
        }

        // Actualizar local storage y contador en el ícono del carrito
        localStorage.setItem('carrito', JSON.stringify(carrito));
        const cantidadProductos = carrito.reduce((total, p) => total + p.cantidad, 0);
        carritoCantidadElement.textContent = cantidadProductos;
        localStorage.setItem('cantidadProductos', cantidadProductos);

        // Mostrar mensaje temporal de "Has agregado al carrito"
        mostrarMensaje(`¡"${nombre}" se ha agregado al carrito! 🛒`);
    }

    // Asignar el evento de click a todos los botones de agregar al carrito
    const botonesAgregarCarrito = document.querySelectorAll('.agregar-carrito');
    botonesAgregarCarrito.forEach(boton => {
        boton.addEventListener('click', agregarAlCarrito);
    });

    const iconoCarrito = document.querySelector('.carrito');
    iconoCarrito.addEventListener('click', function(event) {
        event.preventDefault();
        window.open('Productos-detalle.html', '_blank'); // Abrir en una nueva pestaña o ventana
    });

    function mostrarMensaje(mensaje) {
        const mensajeDiv = document.createElement('div');
        mensajeDiv.classList.add('mensaje-agregado');
        mensajeDiv.textContent = mensaje;
        document.body.appendChild(mensajeDiv);

        setTimeout(function() {
            mensajeDiv.remove(); // Eliminar el mensaje después de 3 segundos
        }, 3000);
    }
});