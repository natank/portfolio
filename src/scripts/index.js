let ticking = false; // represent continus scroll
let navCheckbox;
document.addEventListener('DOMContentLoaded', () => {
    navCheckbox = document.querySelector('.navbar__toggle input[type="checkbox"]');
    
    navCheckbox.addEventListener('click', navToggle);
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