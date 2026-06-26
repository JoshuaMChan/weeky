(function () {
  const today = new Date().getDay();
  const input = document.getElementById(`day-${today}`);
  if (input) input.checked = true;

  const label = document.querySelector(`.mobile-day-nav label[for="day-${today}"]`);
  if (label) {
    label.scrollIntoView({ inline: 'center', block: 'nearest' });
  }
})();
