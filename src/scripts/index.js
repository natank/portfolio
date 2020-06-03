let ticking = false; // represent continus scroll
let navCheckbox;
let btnModalOpen, btnModalClose;

document.addEventListener('DOMContentLoaded', () => {
    navCheckbox = document.querySelector('.navbar__toggle input[type="checkbox"]');
    btnModalShow = document.querySelectorAll('.js-modal-show');
    btnModalHide = docuemnt.querySelectorAll('.js-modal-hide');
    
    navCheckbox.addEventListener('click', navToggle);
    btnModalShow.forEach(btn => {
        btn.addEventListener('click', showModal)
    })
});

// The purpose of this function is to hide the mobile nav upon scroll
function navToggle(e) {
    if(e.target.checked) {
        // mobile nav made - add the onScroll listener to the window
        window.addEventListener('scroll', onScroll)
    } else {
        window.removeEventListener('scroll', onScroll);
    }
}

function onScroll() {
    if(window.scrollY >= 300) {
        navCheckbox.checked = false;
    } 
}

function showModal(element) {
    element.classList.remove('card__modal--visible');
    element.classList.add('card__modal--visible');
}

function closeModal(element) {
    element.classList.remove('card__modal--visible')
    element.classList.add('card__modal--hidden')
}