(() => {
  const root = document.documentElement;
  const toggle = document.getElementById('theme-toggle');
  const syncToggle = () => {
    const dark = root.dataset.theme === 'dark';
    toggle.setAttribute('aria-pressed', String(dark));
    toggle.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
    toggle.title = dark ? 'Switch to light mode' : 'Switch to dark mode';
  };
  syncToggle();
  toggle.addEventListener('click', () => {
    root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
    try { localStorage.setItem('theme', root.dataset.theme); } catch (_) { /* Theme still works without storage. */ }
    syncToggle();
  });

  // Open a directly linked paper in the complete publication list.
  const revealLinkedPaper = () => {
    const hash = window.location.hash.slice(1);
    const target = hash ? document.getElementById(hash) : null;
    if (target && target.closest('.all-publications')) {
      target.closest('details').open = true;
      target.scrollIntoView();
    }
  };
  window.addEventListener('hashchange', revealLinkedPaper);
  revealLinkedPaper();

  // Native details stay accessible and all publications are included when printing.
  const publications = document.querySelector('.all-publications');
  let wasOpen = false;
  window.addEventListener('beforeprint', () => { wasOpen = publications.open; publications.open = true; });
  window.addEventListener('afterprint', () => { publications.open = wasOpen; });
})();
