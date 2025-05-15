/* Funcionalidad específica para feed.html (página de inicio/feed)*/
document.addEventListener('DOMContentLoaded', function() {
    const filterOptions = document.querySelectorAll('.filter-option');
    filterOptions.forEach(option => {
        option.addEventListener('click', function() {
            filterOptions.forEach(opt => opt.classList.remove('selected'));
            this.classList.add('selected');
            this.style.color = 'var(--primary-color)';
            this.style.fontWeight = '500';
        });
    });
    
    const postCards = document.querySelectorAll('.post-card');
    postCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.borderColor = 'rgba(58, 142, 255, 0.3)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.borderColor = 'var(--border-light)';
        });
    });
    
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', function () {
            const target = document.querySelector(this.dataset.target);
            const isOpen = target.classList.contains('open');

            // Close all accordion contents
            document.querySelectorAll('.accordion-content').forEach(content => content.classList.remove('open'));
            document.querySelectorAll('.accordion-header').forEach(h => h.classList.remove('active'));

            // Toggle the clicked accordion
            if (!isOpen) {
                target.classList.add('open');
                this.classList.add('active');
            }
        });
    });
    
    const openModalBtn = document.getElementById('open-modal-btn');
    const closeModalBtn = document.getElementById('close-modal-btn');
    const modal = document.getElementById('modal');

    openModalBtn.addEventListener('click', function () {
        modal.style.display = 'flex';
    });

    closeModalBtn.addEventListener('click', function () {
        modal.style.display = 'none';
    });

    window.addEventListener('click', function (e) {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
});

