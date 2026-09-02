// Gestión del menú móvil
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');
    if (mobileToggle && navMenu) {
      mobileToggle.addEventListener('click', () => {
        const isOpen = navMenu.classList.toggle('open-mobile');
        mobileToggle.setAttribute('aria-expanded', isOpen);
      });
    }

    // Acordeón de FAQ
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
      const btn = item.querySelector('.faq-question-btn');
      btn.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        // Cerrar los demás
        faqItems.forEach(i => {
          i.classList.remove('active');
          i.querySelector('.faq-question-btn').setAttribute('aria-expanded', 'false');
        });
        // Alternar el actual
        if (!isActive) {
          item.classList.add('active');
          btn.setAttribute('aria-expanded', 'true');
        }
      });
    });

    // Gestión del Modal de Cita
    const modal = document.getElementById('modal-cita');
    const btnOpenNav = document.getElementById('btn-open-modal-nav');
    const btnOpenCta = document.getElementById('btn-open-modal-cta');
    const btnClose = document.getElementById('modal-close-btn');
    const btnCloseSuccess = document.getElementById('btn-close-success');
    const formContainer = document.getElementById('modal-form-container');
    const successState = document.getElementById('modal-success-state');
    const appointmentForm = document.getElementById('appointment-form');

    function openModal() {
      if (modal) {
        modal.classList.add('open');
        document.body.style.overflow = 'hidden';
      }
    }

    function closeModal() {
      if (modal) {
        modal.classList.remove('open');
        document.body.style.overflow = '';
        setTimeout(() => {
          if (formContainer && successState) {
            formContainer.style.display = 'block';
            successState.style.display = 'none';
          }
          if (appointmentForm) appointmentForm.reset();
        }, 300);
      }
    }

    if (btnOpenNav) {
      btnOpenNav.addEventListener('click', (e) => {
        e.preventDefault();
        window.location.href = 'cita.html';
      });
    }

    if (btnOpenCta) {
      btnOpenCta.addEventListener('click', (e) => {
        e.preventDefault();
        window.location.href = 'cita.html';
      });
    }
    
    if (btnClose) btnClose.addEventListener('click', closeModal);
    if (btnCloseSuccess) btnCloseSuccess.addEventListener('click', closeModal);

    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
      });
    }

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal && modal.classList.contains('open')) {
        closeModal();
      }
    });

    if (appointmentForm) {
      appointmentForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if (formContainer && successState) {
          formContainer.style.display = 'none';
          successState.style.display = 'block';
        }
      });
    }
