export function setActiveNavLink() {
  const navLinks = document.querySelectorAll(".nav-link a");

  navLinks.forEach((link) => {
    const anchor = link as HTMLAnchorElement;
    const href = anchor.getAttribute("href");

    if (!href) return;
    const pathname = window.location.pathname;
    const hrefPath = href.split("?")[0];
    const isHome =
      (pathname === "/" || pathname === "/index.html") &&
      (hrefPath === "/index.html" || hrefPath === "/");
    const isCurrentPage =
      hrefPath !== "/index.html" &&
      hrefPath !== "/" &&
      pathname.includes(hrefPath);

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
