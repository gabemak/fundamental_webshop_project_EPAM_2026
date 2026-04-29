export function setActiveNavLink() {
  const navLinks = document.querySelectorAll(".nav-link a");
  const currentUrl = window.location.href; // A teljes URL-t nézzük (pl. http://localhost:5173/catalog.html)

  navLinks.forEach((link) => {
    const anchor = link as HTMLAnchorElement;
    const href = anchor.getAttribute("href"); // pl. "catalog.html"

    if (!href) return;

    // Ellenőrizzük, hogy a teljes URL végén ott van-e a linkben megadott cél
    // VAGY ha a gyökérben vagyunk és a link az index.html
    const isHome =
      (window.location.pathname === "/" ||
        window.location.pathname === "/index.html") &&
      href === "index.html";
    const isCurrentPage = window.location.pathname.includes(href);

    if (isHome || isCurrentPage) {
      link.classList.add("active");
      console.log("Aktívvá téve:", href);
    } else {
      link.classList.remove("active");
    }
  });
}

// Vite + <load> specifikus indítás
window.addEventListener("load", () => {
  setActiveNavLink();
});
