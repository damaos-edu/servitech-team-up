document.addEventListener('DOMContentLoaded', function() {
  const paymentMethods = document.querySelectorAll('.payment-method');
  const creditCardForm = document.getElementById('creditCardForm');
  const paymentMethodSection = document.querySelector('.payment-method-section');
  const returnBtn = document.getElementById('returnBtn');
  const continueBtn = document.getElementById('continueBtn');
  
  // Evento para seleccionar método de pago
  paymentMethods.forEach(method => {
    method.addEventListener('click', function() {
      const selectedMethod = this.dataset.method;
      
      // Eliminar selección previa
      paymentMethods.forEach(m => m.classList.remove('selected'));
      
      // Marcar como seleccionado
      this.classList.add('selected');
      
      // Mostrar formulario específico según método
      if (selectedMethod === 'credit-card') {
        paymentMethodSection.style.display = 'none';
        creditCardForm.style.display = 'block';
      }
    });
  });
  
  // Evento para botón volver
  returnBtn.addEventListener('click', function() {
    creditCardForm.style.display = 'none';
    paymentMethodSection.style.display = 'block';
  });
    // Evento para continuar
  continueBtn.addEventListener('click', function() {
    // Mostrar mensaje de procesamiento
    const originalText = continueBtn.innerHTML;
    continueBtn.disabled = true;
    continueBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Procesando...';
    
    // Simulación de procesamiento de pago (2 segundos)
    setTimeout(function() {
      // Redirigir a la página de confirmación
      window.location.href = 'confirmacion-asesoria.html';
    }, 2000);
  });
});
