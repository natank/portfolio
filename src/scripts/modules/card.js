
document.addEventListener('DOMContentLoaded', e => {
  let elements = document.querySelectorAll('.js-content__description');
  elements.forEach(el => {
    let description = el.innerText;
    description = description.length > 55 ? `${description.substring(0, 90)}...` : description;
    el.innerText = description;
  })
})