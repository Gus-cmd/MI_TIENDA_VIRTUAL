document.addEventListener('DOMContentLoaded', function() {
    const carritoCantidad = document.getElementById('carritoCantidad');
    let cantidadProductos = localStorage.getItem('cantidadProductos') ? parseInt(localStorage.getItem('cantidadProductos')) : 0;
    carritoCantidad.textContent = cantidadProductos;

    // Este código no debe escuchar a los botones agregar-carrito aquí, ya que es para la página del carrito solamente
});
