let scroll_start_position = window.scrollY;
let threshold = 500;
let last_known_scroll_position = window.scrollY;
let last_known_scroll_direction = 'up';

function onScroll(e) {
  console.log("scrolled");
  let currScrollDir = window.scrollY > last_known_scroll_position ? 'down' : 'up';
  // User is scrolling in the same direction
  if (currScrollDir === last_known_scroll_direction) {
    let scroll_position = window.scrollY;
    setTimeout(() => {
      // User stopped scrolling for more than 500 ms
      if (scroll_position === window.scrollY) {
        scroll_start_position = window.scrollY
      }
    }, 500)

    // user scrolled more than threshold in the same direction
    if (Math.abs(window.scrollY - scroll_start_position) > threshold) {
      scroll_start_position = window.scrollY;
      let event = new CustomEvent('scrollThresholdReached', {
        detail: { direction: last_known_scroll_direction }
      });
      document.dispatchEvent(event);
    }

  } else { // user switched scrolling direction
    last_known_scroll_direction = last_known_scroll_direction === 'up' ? 'down' : 'up';
  }
  last_known_scroll_position = window.scrollY;

}

module.exports = {
  onScroll
}