/* =============================================
   
   gives the Navbar shrink on scroll effect to include/booking,
   home and about us pages
  
   ============================================= */

document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.querySelector("nav.navbar");

  window.addEventListener(
    "scroll",
    () => {
      if (window.scrollY > 60) {
        navbar.classList.add("navbar-scrolled");
      } else {
        navbar.classList.remove("navbar-scrolled");
      }
    },
    { passive: true },
  );
});
