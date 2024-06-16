document.addEventListener('DOMContentLoaded', function () {
    const showPasswordBtn = document.getElementById('showPasswordBtn');
    const showConfirmPasswordBtn = document.getElementById('showConfirmPasswordBtn');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirm-password');
    const emailInput = document.getElementById('email');
    const form = document.getElementById('registerForm');

    // Mostrar/ocultar contraseñas
    showPasswordBtn.addEventListener('click', function () {
        togglePasswordVisibility(passwordInput, showPasswordBtn);
    });

    showConfirmPasswordBtn.addEventListener('click', function () {
        togglePasswordVisibility(confirmPasswordInput, showConfirmPasswordBtn);
    });

    // Validación de campos obligatorios y formato de correo electrónico
    form.addEventListener('submit', function (event) {
        let isValid = true;

        // Limpiar mensajes de error previos
        clearErrorMessages();

        // Validar campos obligatorios
        const requiredFields = [passwordInput, confirmPasswordInput, emailInput];
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                field.setCustomValidity("Este campo es obligatorio.");
                field.reportValidity();
                isValid = false;
            } else {
                field.setCustomValidity("");
            }
        });

        // Validar formato de correo electrónico
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value.trim())) {
            emailInput.setCustomValidity("Por favor, introduce un correo electrónico válido.");
            emailInput.reportValidity();
            isValid = false;
        } else {
            emailInput.setCustomValidity("");
        }

        // Validar contraseñas coincidentes
        if (passwordInput.value !== confirmPasswordInput.value) {
            confirmPasswordInput.setCustomValidity("Las contraseñas no coinciden.");
            confirmPasswordInput.reportValidity();
            isValid = false;
        } else {
            confirmPasswordInput.setCustomValidity(""); // Borrar mensaje de error
        }

        // Prevención de envío del formulario si hay errores
        if (!isValid) {
            event.preventDefault();
        } else {
            // Redirigir al catálogo de productos si la validación es exitosa
            window.location.href = '/shop/Catalogo.html'; // Cambia esta URL a la de tu catálogo de productos
        }
    });

    // Limpiar mensaje de error cuando las contraseñas coinciden
    confirmPasswordInput.addEventListener('input', function () {
        if (passwordInput.value === confirmPasswordInput.value) {
            confirmPasswordInput.setCustomValidity("");
        }
    });

    function togglePasswordVisibility(input, button) {
        if (input.type === 'password') {
            input.type = 'text';
            button.innerHTML = '<i class="bi bi-eye-slash"></i>';
        } else {
            input.type = 'password';
            button.innerHTML = '<i class="bi bi-eye"></i>';
        }
    }

    function clearErrorMessages() {
        // Limpiar todos los mensajes de error
        document.querySelectorAll('.invalid-feedback').forEach(errorElem => {
            errorElem.textContent = '';
        });
    }
});
