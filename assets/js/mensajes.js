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
  
  // Manejar chat móvil
  const chatItems = document.querySelectorAll('.chat-item');
  const backBtn = document.querySelector('.back-btn');
  const chatWindow = document.querySelector('.chat-window');
  const sidebar = document.querySelector('.sidebar');
  
  chatItems.forEach(item => {
    item.addEventListener('click', function() {
      if (window.innerWidth < 768) {
        sidebar.classList.add('hidden');
        chatWindow.classList.add('active');
      }
    });
  });
  
  if (backBtn) {
    backBtn.addEventListener('click', function() {
      sidebar.classList.remove('hidden');
      chatWindow.classList.remove('active');
    });
  }
  
  // Simular envío de mensaje
  const chatInput = document.querySelector('.chat-input-field input');
  const sendBtn = document.querySelector('.send-btn');
  
  function sendMessage() {
    const message = chatInput.value.trim();
    if (message) {
      // Aquí se agregaría la lógica para enviar el mensaje
      chatInput.value = '';
    }
  }
  
  sendBtn.addEventListener('click', sendMessage);
  
  chatInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      sendMessage();
    }
  });
});
