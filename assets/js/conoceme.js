function openModalCita() {
      window.location.href = 'cita.html';
    }

    function closeModalCita() {
      const modal = document.getElementById('modalCita');
      modal.classList.remove('active');
      document.body.style.overflow = '';
      setTimeout(() => {
        document.getElementById('modalFormContent').style.display = 'block';
        document.getElementById('modalSuccessContent').style.display = 'none';
        document.getElementById('citaForm').reset();
      }, 300);
    }

    function handleBackdropClick(e) {
      if (e.target.id === 'modalCita') {
        closeModalCita();
      }
    }

    function handleFormSubmit(e) {
      e.preventDefault();
      document.getElementById('modalFormContent').style.display = 'none';
      document.getElementById('modalSuccessContent').style.display = 'block';
    }

    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') {
        closeModalCita();
      }
    });
