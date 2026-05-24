document.addEventListener('DOMContentLoaded', function () {
  // Global timer for all sliders to ensure perfectly simultaneous transition
  window.globalSliderNextFns = [];
  setInterval(function() {
    window.globalSliderNextFns.forEach(function(fn) { fn(); });
  }, 3000);

  // 1. Image-Swap Overlay Scheduler
  var swapBlock = document.getElementById('quote-swap');
  if (swapBlock) {
    var overlayImage = swapBlock.querySelector('.swap-overlay');
    if (overlayImage) {
      var isOverlayVisible = false;
      window.globalSliderNextFns.push(function () {
        isOverlayVisible = !isOverlayVisible;
        if (isOverlayVisible) {
          overlayImage.classList.add('is-active');
        } else {
          overlayImage.classList.remove('is-active');
        }
      });
    }
  }

  // 2. Trail Section Sliders
  initTrailSlider('slider-unboxing');
  initTrailSlider('slider-road');

  // 3. Speaker Section Sliders (s1 ~ s7)
  initTrailSlider('slider-s1');
  initTrailSlider('slider-s2');
  initTrailSlider('slider-s3');
  initTrailSlider('slider-s4');
  initTrailSlider('slider-s5');
  initTrailSlider('slider-s6');
  initTrailSlider('slider-s7');

  // 4. Section 04 Sliders
  initTrailSlider('slider-sec4-s1');
  initTrailSlider('slider-sec4-s2');
  initTrailSlider('slider-sec4-s3');
  initTrailSlider('slider-sec4-s4');

  // 5. Celebration Slider
  initTrailSlider('slider-celebration');

  // 6. Winner Container Swap (every 3 seconds to match)
  var winnerContainer = document.querySelector('.winner-container');
  if (winnerContainer) {
    var winnerImages = winnerContainer.querySelectorAll('.winner-img');
    if (winnerImages.length > 1) {
      var currentWinnerIdx = 0;
      window.globalSliderNextFns.push(function() {
        winnerImages[currentWinnerIdx].classList.remove('is-active');
        currentWinnerIdx = (currentWinnerIdx + 1) % winnerImages.length;
        winnerImages[currentWinnerIdx].classList.add('is-active');
      });
    }
  }

  // 7. Behind Slider
  initTrailSlider('slider-behind');
  initTrailSlider('slider-cheer-crew');

  // 8. Product Feedback Slider
  initTrailSlider('slider-feedback');
});

/**
 * Initialize an auto-sliding carousel with dot indicators and swipe support.
 * @param {string} sliderId - The id of the .trail-slider element
 * @param {number} interval - Auto-slide interval in ms
 */
function initTrailSlider(sliderId) {
  var slider = document.getElementById(sliderId);
  if (!slider) return;

  var track = slider.firstElementChild;
  if (!track) return;
  var slides = track.children;
  var count = slides.length;
  if (count === 0) return;

  var current = 0;

  function goTo(index) {
    if (slides[current]) slides[current].classList.remove('is-active');
    current = index;
    if (slides[current]) slides[current].classList.add('is-active');
  }

  // Initialize first slide
  if (slides[current]) slides[current].classList.add('is-active');

  function next() {
    goTo((current + 1) % count);
  }

  // Add to global sync timer
  if (window.globalSliderNextFns) {
    window.globalSliderNextFns.push(next);
  }

  // Touch/swipe support
  var startX = 0;
  var isDragging = false;

  slider.addEventListener('touchstart', function (e) {
    startX = e.touches[0].clientX;
    isDragging = true;
  }, { passive: true });

  slider.addEventListener('touchend', function (e) {
    if (!isDragging) return;
    isDragging = false;
    var diff = startX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        goTo((current + 1) % count);
      } else {
        goTo((current - 1 + count) % count);
      }
    }
  }, { passive: true });
}
