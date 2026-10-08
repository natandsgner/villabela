document.addEventListener('DOMContentLoaded', function () {
  // Font: Arial, Helvetica, sans-serif — fonte atual preservada em styles.css.
  var root = document.documentElement
  var year = document.getElementById('year')
  var menu = document.querySelector('.site-menu')
  var backdrop = document.querySelector('.menu-backdrop')
  var openButtons = document.querySelectorAll('.menu-trigger')
  var closeButton = document.querySelector('.menu-close')
  var themeButton = document.querySelector('.theme-toggle')
  var scrollTop = document.querySelector('.scroll-top')

  if (year) year.textContent = new Date().getFullYear()
  if (window.lucide) window.lucide.createIcons()

  // Theme toggle
  function applyTheme(theme) {
    root.setAttribute('data-theme', theme)
    if (themeButton) {
      var icon = themeButton.querySelector('[data-theme-icon]')
      var label = themeButton.querySelector('span')
      if (icon) icon.setAttribute('data-lucide', theme === 'dark' ? 'sun' : 'moon')
      if (label) label.textContent = theme === 'dark' ? 'Modo claro' : 'Modo escuro'
      themeButton.setAttribute('aria-label', theme === 'dark' ? 'Ativar modo claro' : 'Ativar modo escuro')
      if (window.lucide) window.lucide.createIcons()
    }
  }
  applyTheme(localStorage.getItem('villa-bela-theme') || 'light')
  if (themeButton) themeButton.addEventListener('click', function () { var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark'; localStorage.setItem('villa-bela-theme', next); applyTheme(next) })

  // Mobile hamburger menu
  function setMenu(open) { if (!menu) return; menu.classList.toggle('is-open', open); if (backdrop) backdrop.classList.toggle('is-visible', open); menu.setAttribute('aria-hidden', String(!open)); openButtons.forEach(function (button) { button.setAttribute('aria-expanded', String(open)) }); if (open && closeButton) closeButton.focus() }
  openButtons.forEach(function (button) { button.addEventListener('click', function () { setMenu(true) }) })
  if (closeButton) closeButton.addEventListener('click', function () { setMenu(false) })
  if (backdrop) backdrop.addEventListener('click', function () { setMenu(false) })
  if (menu) menu.querySelectorAll('a').forEach(function (link) { link.addEventListener('click', function () { setMenu(false) }) })
  document.addEventListener('keydown', function (event) { if (event.key === 'Escape') setMenu(false) })

  // Scroll to top
  function updateScrollButton() { if (scrollTop) scrollTop.classList.toggle('is-visible', window.scrollY > 280) }
  window.addEventListener('scroll', updateScrollButton, { passive: true }); updateScrollButton()
  if (scrollTop) scrollTop.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: 'smooth' }) })
})
