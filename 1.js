document.addEventListener('DOMContentLoaded', () => {
    // Referencias a elementos del DOM
    const landingPage = document.getElementById('landing-page');
    const paymentPage = document.getElementById('payment-page');
    const successPage = document.getElementById('success-page');

    const btnLogin = document.getElementById('btn-login');
    const btnBack = document.getElementById('btn-back');
    const paymentForm = document.getElementById('fake-payment-form');

    // Función para cambiar de página con transición simple
    function switchPage(fromPage, toPage) {
        fromPage.classList.remove('active');
        fromPage.classList.add('hidden'); // Aseguramos que se oculte

        // Timeout pequeño para permitir que la animación CSS funcione si la hubiera
        setTimeout(() => {
            toPage.classList.remove('hidden');
            toPage.classList.add('active');
        }, 50);
    }

    // Evento: Clic en Iniciar Sesión -> Ir a Pago
    btnLogin.addEventListener('click', () => {
        switchPage(landingPage, paymentPage);
    });

    // Evento: Clic en Volver -> Ir a Landing
    btnBack.addEventListener('click', () => {
        switchPage(paymentPage, landingPage);
    });

    // Evento: Enviar formulario de pago -> Ir a Éxito (Simulado)
    paymentForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Evita que se recargue la página realmente

        // Validación visual simple
        const inputs = paymentForm.querySelectorAll('input');
        let isValid = true;

        inputs.forEach(input => {
            if (!input.value) {
                isValid = false;
                input.style.borderColor = '#ED4245'; // Rojo error
            } else {
                input.style.borderColor = 'rgba(0,0,0,0.3)'; // Reset
            }
        });

        if (isValid) {
            // Simulamos un pequeño delay de "procesamiento"
            const submitBtn = paymentForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerText;
            submitBtn.innerText = "Procesando...";
            submitBtn.disabled = true;

            setTimeout(() => {
                submitBtn.innerText = originalText;
                submitBtn.disabled = false;
                switchPage(paymentPage, successPage);
            }, 1000);
        }
    });

    // Formateo visual simple para la tarjeta (opcional para mejorar UX)
    const cardNumber = document.getElementById('card-number');
    cardNumber.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, ''); // Solo números
        value = value.replace(/(.{4})/g, '$1 ').trim(); // Agrupar de 4 en 4
        e.target.value = value;
    });

    const cardExpiry = document.getElementById('card-expiry');
    cardExpiry.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length >= 2) {
            value = value.substring(0, 2) + '/' + value.substring(2, 4);
        }
        e.target.value = value;
    });
});
