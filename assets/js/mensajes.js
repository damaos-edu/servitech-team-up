document.addEventListener('DOMContentLoaded', function() {
  // Manejar clic en el botón de videollamada
  const videoCallBtn = document.getElementById('videoCallBtn');
  const videoCallModal = document.getElementById('videoCallModal');
  const cancelCallBtn = document.getElementById('cancelCallBtn');
  const modalClose = document.querySelector('.modal-close');
  
  videoCallBtn.addEventListener('click', function() {
    videoCallModal.style.display = 'flex';
  });
  
  // Cerrar el modal
  function closeModal() {
    videoCallModal.style.display = 'none';
  }
  
  cancelCallBtn.addEventListener('click', closeModal);
  modalClose.addEventListener('click', closeModal);
  
  // Cerrar modal al hacer clic fuera
  window.addEventListener('click', function(event) {
    if (event.target === videoCallModal) {
      closeModal();
    }
  });
    // Función para desplazar al último mensaje
  function scrollToLastMessage() {
    const chatBody = document.querySelector('.chat-body');
    const messages = chatBody.querySelectorAll('.message');
    
    if (messages.length > 0) {
      // Tomamos el último mensaje real (evitamos posibles elementos no visibles)
      const lastMessage = messages[messages.length - 1];
      
      // Verificar si hay un indicador de "escribiendo..." y ajustar según sea necesario
      const typingIndicator = document.querySelector('.typing-indicator');
      let targetElement = lastMessage;
      
      if (typingIndicator && window.getComputedStyle(typingIndicator).display !== 'none') {
        targetElement = typingIndicator;
      }
      
      // Desplazarse al final del contenedor de chat
      if (targetElement) {
        // Usar comportamiento suave para una mejor experiencia de usuario
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'end' });
      } else {
        // Si no hay un elemento específico, simplemente desplazarse al final
        chatBody.scrollTop = chatBody.scrollHeight;
      }
    } else {
      // Si no hay mensajes, simplemente desplazarse al final
      chatBody.scrollTop = chatBody.scrollHeight;
    }
  }
  
  // Manejar chat móvil
  const chatItems = document.querySelectorAll('.chat-item');
  const backBtn = document.querySelector('.back-btn');
  const chatWindow = document.querySelector('.chat-window');
  const sidebar = document.querySelector('.sidebar');
  
  chatItems.forEach(item => {
    item.addEventListener('click', function() {
      // Marcar el chat actual como activo y remover la clase de los demás
      chatItems.forEach(chat => chat.classList.remove('active'));
      this.classList.add('active');
      
      if (window.innerWidth < 768) {
        sidebar.classList.add('hidden');
        chatWindow.classList.add('active');
      }
      
      // Desplazar al último mensaje cuando se selecciona una conversación
      scrollToLastMessage();
    });
  });
  
  if (backBtn) {
    backBtn.addEventListener('click', function() {
      sidebar.classList.remove('hidden');
      chatWindow.classList.remove('active');
    });
  }
    // También desplazamos al último mensaje cuando la página se carga por primera vez
  // para asegurar que el usuario vea el contenido más reciente
  scrollToLastMessage();
  
  // Asegurarse de que el desplazamiento funcione correctamente después de que todas las imágenes y recursos estén cargados
  window.addEventListener('load', function() {
    setTimeout(scrollToLastMessage, 300);
  });
  
  // Simular envío de mensaje
  const chatInput = document.querySelector('.chat-input-field input');
  const sendBtn = document.querySelector('.send-btn');
  
  function sendMessage() {
    const message = chatInput.value.trim();
    if (message) {
      // Aquí se agregaría la lógica para enviar el mensaje
      chatInput.value = '';
      
      // Después de enviar un mensaje, desplazar al último mensaje
      setTimeout(scrollToLastMessage, 100); // Pequeño retraso para asegurar que el DOM se ha actualizado
    }
  }
  
  sendBtn.addEventListener('click', sendMessage);
  
  chatInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      sendMessage();
    }
  });
});
