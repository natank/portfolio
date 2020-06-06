let ticking = false; // represent continus scroll
let navCheckbox;
let btnModalOpen, btnModalClose, navItems;
let siteHeader;
const modal = require('./modal');
const smoothScroll = require('./smoothScroll').scrollTo;
const scrollThresholdHandler = require('./scrollThreshold').onScroll;
const siteHeaderToggle = require('./site-header').toggle;
import RevealOnScroll from './modules/RevealOnScroll'

document.addEventListener('DOMContentLoaded', () => {
    siteHeader = document.querySelector('#site-header');
    // query DOM for elements
    navCheckbox = document.querySelector('.navbar__toggle input[type="checkbox"]');
    btnModalOpen = document.querySelectorAll('.js-modal-open');
    btnModalClose = document.querySelectorAll('.js-modal-close');
    navItems = document.querySelectorAll('.navbar__nav li');

    // Attach event listeners to DOM elements
    navCheckbox.addEventListener('click', mobileNavToggle);

    btnModalOpen.forEach(btn => {
        btn.addEventListener('click', modal.open)
    })
    btnModalClose.forEach(btn => {
        btn.addEventListener('click', modal.close)
    })

    navItems.forEach(item => {
        item.addEventListener('click', smoothScroll)
    })

    window.addEventListener('scroll', scrollThresholdHandler);

    document.addEventListener('scrollThresholdReached', siteHeaderToggle);
    var slideUp = {
        distance: '150%',
        origin: 'bottom',
        opacity: null
    };
    let node = document.querySelector('.recent-work');


    new RevealOnScroll(document.querySelectorAll(".stack__fe"));
    new RevealOnScroll(document.querySelectorAll(".stack__be"));
    new RevealOnScroll(document.querySelectorAll(".stack__dev"));
    new RevealOnScroll(document.querySelectorAll(".recent-work__cards"));
    new RevealOnScroll(document.querySelectorAll(".responsibilities ul"));
    new RevealOnScroll(document.querySelectorAll(".contact p"));
});



// The purpose of this function is to hide the mobile nav upon scroll
function mobileNavToggle(e) {
    if (e.target.checked) {
        // mobile nav made - add the onScroll listener to the window
        window.addEventListener('scroll', onScroll)
    } else {
        window.removeEventListener('scroll', onScroll);
    }
}

function onScroll() {
    if (window.scrollY >= 300) {
        navCheckbox.checked = false;
    }
}

