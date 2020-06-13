function scrollTo(event) {
  event.preventDefault();
  let id = event.target.href.split('#')[1];
  let element = document.querySelector(`#${id}`);
  element.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

document.addEventListener('DOMContentLoaded', () => {
  const navItems = document.querySelectorAll('.navbar__nav li');
  const recentWorkBtn = document.querySelector('#btn-recent-work');
  const items = [...navItems, recentWorkBtn]
  items.forEach(item => {
    item.addEventListener('click', scrollTo)
  })
  // exclude the 'cv' link from smoothScroll
  const cvDownloadLink = document.querySelector('#cv');
  cvDownloadLink.removeEventListener('click', scrollTo)
})