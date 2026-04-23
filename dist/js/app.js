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
};

document.addEventListener("DOMContentLoaded", () => {
  handleActiveLinks();
});
