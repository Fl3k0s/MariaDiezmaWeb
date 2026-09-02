function openAppointmentModal(collectionName) {
      const modal = document.getElementById('appointment-modal');
      if (collectionName) {
        window.location.href = 'cita.html?coleccion=' + encodeURIComponent(collectionName);
      } else {
        window.location.href = 'cita.html';
      }
    }

    function closeAppointmentModal() {
      const modal = document.getElementById('appointment-modal');
      if (modal) {
        modal.classList.remove('open');
        document.body.style.overflow = '';
      }
    }

    function handleFormSubmit(event) {
      event.preventDefault();
      const formView = document.getElementById('modal-form-view');
      const confirmView = document.getElementById('modal-confirmation-view');
      const selectElem = document.getElementById('input-collection');
      const confirmedTarget = document.getElementById('confirmed-collection');

      if (selectElem && confirmedTarget) {
        confirmedTarget.textContent = selectElem.value;
      }

      if (formView && confirmView) {
        formView.style.display = 'none';
        confirmView.style.display = 'block';
      }
    }

    // Cerrar modal al hacer clic en el fondo
    const modalBackdrop = document.getElementById('appointment-modal');
    if (modalBackdrop) {
      modalBackdrop.addEventListener('click', function(e) {
        if (e.target === this) {
          closeAppointmentModal();
        }
      });
    }

    // Cerrar modal con tecla ESC
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') {
        closeAppointmentModal();
      }
    });
