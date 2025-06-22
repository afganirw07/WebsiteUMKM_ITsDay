window.initNavbar = function() {
  const burger = document.getElementById("burger");
  const menu = document.getElementById("menu");
  const close = document.getElementById("close");
  let isOpen = false;

  if (!burger || !menu || !close) {
    console.error("Navbar elements not found");
    return;
  }

  function openMenu() {
    menu.classList.remove("translate-x-full");
    menu.classList.add("translate-x-0");
    isOpen = true;
  }

  function closeMenu() {
    menu.classList.remove("translate-x-0");
    menu.classList.add("translate-x-full");
    isOpen = false;
  }

  burger.addEventListener('click', () => {
    isOpen ? closeMenu() : openMenu();
  });

  close.addEventListener('click', closeMenu);
}
