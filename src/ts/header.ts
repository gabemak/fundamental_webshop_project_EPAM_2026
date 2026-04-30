export function initActiveLink() {
  const navLinks = document.querySelectorAll(".nav-link a");

  // Csak a puszta fájlnevet kérjük le (pl. "catalog.html")
  // A split('/') szétvágja az utat, a pop() pedig kiveszi az utolsó részt.
  const currentFile = window.location.pathname.split("/").pop() || "index.html";

  console.log("Tisztított URL fájlnév:", currentFile);

  navLinks.forEach((link) => {
    const href = link.getAttribute("href"); // Ez pl. "catalog.html"

    if (href === currentFile) {
      link.classList.add("active");
      console.log("Találat! Aktív lett:", href);
    } else {
      link.classList.remove("active");
    }
  });
}

// Futtassuk akkor, amikor minden betöltődött
window.addEventListener("load", initActiveLink);
