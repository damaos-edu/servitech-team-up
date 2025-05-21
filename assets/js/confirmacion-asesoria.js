document.addEventListener('DOMContentLoaded', function() {
  // Generar fecha y hora aleatoria para la demostración
  const randomDate = getRandomFutureDate();
  const randomTime = getRandomTimeSlot();
  const randomTransactionId = generateTransactionId();
  
  document.getElementById('sessionDate').textContent = randomDate;
  document.getElementById('sessionTime').textContent = randomTime;
  document.getElementById('transactionId').textContent = randomTransactionId;
  
  // Funciones para generar datos aleatorios
  function getRandomFutureDate() {
    const today = new Date();
    const futureDate = new Date(today);
    futureDate.setDate(today.getDate() + Math.floor(Math.random() * 10) + 1);
    
    // Formatear fecha en español
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return futureDate.toLocaleDateString('es-ES', options);
  }
  
  function getRandomTimeSlot() {
    const hours = ['9:00 AM - 10:00 AM', '10:30 AM - 11:30 AM', '1:00 PM - 2:00 PM', 
                  '2:30 PM - 3:30 PM', '4:00 PM - 5:00 PM', '5:30 PM - 6:30 PM'];
    return hours[Math.floor(Math.random() * hours.length)];
  }
  
  function generateTransactionId() {
    const prefix = 'ST-2025517-';
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    return prefix + randomNum;
  }
});
