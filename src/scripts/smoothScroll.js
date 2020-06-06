function scrollTo(event) {
  event.preventDefault();
  let id = event.target.href.split('#')[1];
  let element = document.querySelector(`#${id}`);
  element.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

module.exports = {
  scrollTo
}