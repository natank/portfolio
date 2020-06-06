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

module.exports = {
  toggle: siteHeaderToggle
}