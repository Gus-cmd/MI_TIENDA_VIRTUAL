document.addEventListener('DOMContentLoaded', function() {
    const carritoCantidad = document.getElementById('carritoCantidad');
    let cantidadProductos = localStorage.getItem('cantidadProductos') ? parseInt(localStorage.getItem('cantidadProductos')) : 0;
    carritoCantidad.textContent = cantidadProductos;

    const botonesAgregarCarrito = document.querySelectorAll('.agregar-carrito');
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    botonesAgregarCarrito.forEach(function(boton) {
        boton.addEventListener('click', function(event) {
            event.preventDefault();

            const nombreProducto = this.getAttribute('data-nombre');
            const precioProducto = this.getAttribute('data-precio');
            const imagenProducto = this.parentElement.querySelector('.product-image').src;

            // Verificar si el producto ya está en el carrito
            const productoExistente = carrito.find(p => p.nombre === nombreProducto);
            if (productoExistente) {
                productoExistente.cantidad++; // Incrementar la cantidad si ya existe
            } else {
                // Agregar el producto al carrito
                const producto = {
                    nombre: nombreProducto,
                    precio: precioProducto,
                    imagen: imagenProducto,
                    cantidad: 1
                };
                carrito.push(producto);
            }

            // Actualizar local storage y contador en el ícono del carrito
            localStorage.setItem('carrito', JSON.stringify(carrito));
            cantidadProductos++;
            carritoCantidad.textContent = cantidadProductos;
            localStorage.setItem('cantidadProductos', cantidadProductos);

            // Mostrar mensaje temporal de "Has agregado al carrito"
            mostrarMensaje('Has agregado "' + nombreProducto + '" al carrito.');

            // Disparar un evento personalizado para notificar cambios en el carrito
            const eventoCarritoActualizado = new CustomEvent('carritoActualizado', {
                detail: {
                    carrito: carrito,
                    cantidadProductos: cantidadProductos
                }
            });
            document.dispatchEvent(eventoCarritoActualizado);
        });
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
        }, 1000); // 3000 milisegundos = 1 segundos
    }
});
