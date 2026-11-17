document.addEventListener('DOMContentLoaded', () => {
  const sidebar = document.querySelector('.sidebar');
  if (!sidebar) return;
  const canonical = new Map([
    ['crusader.html', 'Crusader.html'],
    ['valkchams.html', 'valkChams.html']
  ]);
  for (const link of sidebar.querySelectorAll('a[href]')) {
    const href = link.getAttribute('href');
    if (canonical.has(href)) link.setAttribute('href', canonical.get(href));
  }
});
