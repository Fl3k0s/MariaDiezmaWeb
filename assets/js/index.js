function openAppointmentModal(event) {
      if (event) event.preventDefault();
      window.location.href = 'pages/cita.html';
    }

    function closeAppointmentModal() {
      const modal = document.getElementById('modal-cita-backdrop');
      modal.classList.remove('is-open');
      document.body.style.overflow = '';
      setTimeout(() => {
        document.getElementById('modal-form-view').style.display = 'block';
        document.getElementById('modal-success-view').style.display = 'none';
      }, 300);
    }

    function closeAppointmentModalOnOut(event) {
      if (event.target.id === 'modal-cita-backdrop') {
        closeAppointmentModal();
      }
    }

    function handleAppointmentSubmit(event) {
      event.preventDefault();
      document.getElementById('modal-form-view').style.display = 'none';
      document.getElementById('modal-success-view').style.display = 'block';
    }

    function toggleMobileNav() {
      const nav = document.querySelector('.site-nav');
      if (nav.style.display === 'flex') {
        nav.style.display = 'none';
      } else {
        nav.style.display = 'flex';
        nav.style.flexDirection = 'column';
        nav.style.position = 'absolute';
        nav.style.top = '76px';
        nav.style.left = '0';
        nav.style.width = '100%';
        nav.style.backgroundColor = '#ffffff';
        nav.style.padding = '1.5rem';
        nav.style.borderBottom = '1px solid var(--border)';
      }
    }

    // Cerrar modal con tecla Escape
    document.addEventListener('keydown', function(event) {
      if (event.key === 'Escape') {
        closeAppointmentModal();
      }
    });
