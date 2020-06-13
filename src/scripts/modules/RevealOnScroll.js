import throttle from 'lodash/throttle';
import debounce from 'lodash/debounce';

class RevealOnScroll {
  constructor(elements, scrollThresholdPercent = 75) {
    // items to be revealed are classed with .js-reveal-on-scroll
    this.itemsToReveal = elements;
    this.revealOn = scrollThresholdPercent;

    this.browserHeight = window.innerHeight;

    // upon page load, add all items to reveal
    this.hideInitially();
    // throttle the scroll event handler to 5Hz
    this.scrollThrottle = throttle(this.calcCaller, 200).bind(this);
    this.events();
  }

  events() {
    // hookup the scroll event to the throttled event listener
    window.addEventListener('scroll', this.scrollThrottle)
    // upon window refresh, refresh the browserHeight property
    window.addEventListener('resize', debounce(() => {
      this.browserHeight = window.innerHeight
    }, 333))
  }

  // scroll event handler (to be throttled)
  calcCaller() {
    // calc which items should be reveald upon scroll event
    this.itemsToReveal.forEach(el => {
      if (!el.isRevealed) {
        this.calculateIfScrolledTo(el);
      }
    })
  }

  calculateIfScrolledTo(el) {
    // do the caclation only if the item is already within the window
    if (window.scrollY + this.browserHeight > el.offsetTop) {
      let scrollPercent = (el.getBoundingClientRect().y / this.browserHeight) * 100;
      // item is revealed if it reaches 'revealOn' percentage of the view port
      if (scrollPercent < this.revealOn) {
        el.classList.add("reveal-item--is-visible");
        el.isRevealed = true;
        if (el.isLastItem) {
          // if the last item has been revealed, remove the event listener
          window.removeEventListener('scroll', this.scrollThrottle)
        }
      }
    }
  }

  hideInitially() {
    this.itemsToReveal.forEach(el => {
      el.classList.add("reveal-item");
      el.isRevealed = false;
    });
    // mark the last item to be revealed
    this.itemsToReveal[this.itemsToReveal.length - 1].isLastItem = true;
  }
}

document.addEventListener('DOMContentLoaded', e => {
  new RevealOnScroll(document.querySelectorAll(".stack__fe"));
  new RevealOnScroll(document.querySelectorAll(".stack__be"));
  new RevealOnScroll(document.querySelectorAll(".stack__dev"));
  new RevealOnScroll(document.querySelectorAll(".recent-work__cards"));
  new RevealOnScroll(document.querySelectorAll(".responsibilities ul"));
  new RevealOnScroll(document.querySelectorAll(".contact p"));
})