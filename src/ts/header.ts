export function setActiveNavLink() {
  const navLinks = document.querySelectorAll(".nav-link a");

  navLinks.forEach((link) => {
    const anchor = link as HTMLAnchorElement;
    const href = anchor.getAttribute("href");

    if (!href) return;
    const isHome =
      (window.location.pathname === "/" ||
        window.location.pathname === "/index.html") &&
      href === "index.html";
    const isCurrentPage = window.location.pathname.includes(href);

    if (isHome || isCurrentPage) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
}

window.addEventListener("load", () => {
  setActiveNavLink();
});
