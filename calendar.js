(function () {
  const DAY_COUNT = 7;
  const SWIPE_THRESHOLD = 50;
  const MOBILE_QUERY = '(max-width: 640px)';

  function selectDay(day) {
    const input = document.getElementById(`day-${day}`);
    if (!input) return;

    input.checked = true;
    document
      .querySelector(`.mobile-day-nav label[for="day-${day}"]`)
      ?.scrollIntoView({ inline: 'center', block: 'nearest' });
  }

  function getSelectedDay() {
    for (let i = 0; i < DAY_COUNT; i++) {
      if (document.getElementById(`day-${i}`)?.checked) return i;
    }
    return 0;
  }

  selectDay(new Date().getDay());

  const scroll = document.querySelector('.calendar-scroll');
  if (!scroll) return;

  let startX = 0;
  let startY = 0;

  scroll.addEventListener(
    'touchstart',
    (event) => {
      startX = event.changedTouches[0].clientX;
      startY = event.changedTouches[0].clientY;
    },
    { passive: true }
  );

  scroll.addEventListener(
    'touchend',
    (event) => {
      if (!window.matchMedia(MOBILE_QUERY).matches) return;

      const touch = event.changedTouches[0];
      const deltaX = touch.clientX - startX;
      const deltaY = touch.clientY - startY;

      if (Math.abs(deltaX) < SWIPE_THRESHOLD) return;
      if (Math.abs(deltaX) < Math.abs(deltaY)) return;

      const current = getSelectedDay();
      if (deltaX < 0 && current < DAY_COUNT - 1) selectDay(current + 1);
      else if (deltaX > 0 && current > 0) selectDay(current - 1);
    },
    { passive: true }
  );
})();
