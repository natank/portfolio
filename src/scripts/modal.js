const toggleScroll = require('./toggleScroll');
let btnModalOpen, btnModalClose, navItems;

function openModal(event) {
  // Clone these modal code right after the container element
  let modal = event.target.closest('.card').querySelector('.card__modal').cloneNode(true);
  const container = document.querySelector('.container');
  container.parentNode.insertBefore(modal, container.nextSibling);

  // 
  // Wait a bit for the modal to be inserted to the DOM
  // Instead of integrating mutation observer, just use setTimeout with zero latency...
  setTimeout(() => {
    // Make the modal variable point to the cloned modal
    modal = container.nextElementSibling;
    // Show the modal
    modal.classList.add('card__modal--open');
    modal.classList.remove('card__modal--close');
  }, 0)

  // // Disable scrolling while modal is opened
  toggleScroll.disable();
  // Attach modal close callback to the modal close btn
  let modalCloseBtn = modal.querySelector('.modal__close');
  modalCloseBtn.addEventListener('click', closeModal);
}

function closeModal(event) {
  // Locate the modal inserted right after the container
  const container = document.querySelector('.container');
  const modal = container.nextElementSibling;
  // close the modal
  modal.classList.add('card__modal--close')
  modal.classList.remove('card__modal--open')
  // Wait a bit for the animation to complete before removing the modal from the DOM.
  setTimeout(() => {
    // remove the modal from the DOM
    modal.parentNode.removeChild(modal);
    // Re-Enable scrolling 
    toggleScroll.enable();
  }, 1000)
}


document.addEventListener('DOMContentLoaded', () => {
  btnModalOpen = document.querySelectorAll('.js-modal-open');
  btnModalClose = document.querySelectorAll('.js-modal-close');
  btnModalOpen.forEach(btn => {
    btn.addEventListener('click', openModal)
  })
  btnModalClose.forEach(btn => {
    btn.addEventListener('click', closeModal)
  })
})

