const scrollThresholdHandler = require('./scrollThreshold').onScroll;
import throttle from 'lodash/throttle';
function siteHeaderToggle(event) {
  let siteHeader = document.querySelector('#site-header');
  let headerVisibility = event.detail.direction === 'up';
  if (headerVisibility) {
    siteHeader.classList.remove('site-header--hidden');
    siteHeader.classList.add('site-header--visible')
  } else {
    siteHeader.classList.remove('site-header--visible');
    siteHeader.classList.add('site-header--hidden')
  }

}
let navCheckbox;
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



document.addEventListener('DOMContentLoaded', e => {
  window.addEventListener('scroll', throttle(scrollThresholdHandler, 300));
  document.addEventListener('scrollThresholdReached', siteHeaderToggle);

  navCheckbox = document.querySelector('.navbar__toggle input[type="checkbox"]');
  // Attach event listeners to DOM elements
  navCheckbox.addEventListener('click', mobileNavToggle);

})

