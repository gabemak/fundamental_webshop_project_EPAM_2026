const handleActiveLinks = () => {
  const links = document.querySelectorAll("nav ul li a");
  let currentPath = window.location.pathname.split("/").pop();

  if (currentPath === "" || currentPath === "/") {
    currentPath = "index.html";
  }

  links.forEach((link) => {
    const href = link.getAttribute("href");

    if (href === currentPath) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });

  const handleActiveLinks = () => {
    const links = document.querySelectorAll("nav ul li a");

    // Ha még nincs a DOM-ban a header (Vite/PostHTML késés miatt),
    // várjunk egy kicsit vagy használjunk MutationObserver-t,
    // de egyszerűbb esetben csak hívjuk meg újra, ha üres:
    if (links.length === 0) {
      setTimeout(handleActiveLinks, 50);
      return;
    }

    let currentPath = window.location.pathname.split("/").pop();

    // Vite preview-nál vagy bizonyos szervereknél a '/' után nincs 'index.html'
    if (!currentPath || currentPath === "/") {
      currentPath = "index.html";
    }

    links.forEach((link) => {
      const href = link.getAttribute("href");

      // Tisztítsuk le a href-et is (pl. ha './index.html' van írva)
      const cleanHref = href.replace("./", "");

      if (cleanHref === currentPath) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });
  };
};

document.addEventListener("DOMContentLoaded", () => {
  handleActiveLinks();
});
