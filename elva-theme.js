(() => {
  const root = document.documentElement;
  const meta = document.querySelector('meta[name="theme-color"]');
  const system = window.matchMedia('(prefers-color-scheme: dark)');
  const key = 'elva-theme';
  let choice = 'system';
  try {
    const saved = localStorage.getItem(key);
    if (saved === 'light' || saved === 'dark') choice = saved;
  } catch (error) {
    // A blocked localStorage still allows choosing a theme for this session.
  }

  function applyTheme() {
    const dark = choice === 'dark' || (choice === 'system' && system.matches);
    root.dataset.theme = dark ? 'dark' : 'light';
    meta.content = dark ? '#1a1b1f' : '#ffffff';
  }

  applyTheme();
  system.addEventListener('change', applyTheme);
  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('input[name="elva-theme"]').forEach(input => {
      input.checked = input.value === choice;
      input.addEventListener('change', () => {
        choice = input.value;
        try { localStorage.setItem(key, choice); } catch (error) {}
        applyTheme();
      });
    });
  });
})();
