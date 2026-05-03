import { Product, createProductCardHTML } from "./ui-utils";

async function initMainPage() {
  try {
    const response = await fetch("./src/assets/data.json");
    const jsonResponse = await response.json();
    const allProducts: Product[] = jsonResponse.data;

    const selectedGrid = document.getElementById("selected-products-grid");
    if (selectedGrid) {
      selectedGrid.innerHTML = allProducts
        .slice(0, 4)
        .map((p) => createProductCardHTML(p))
        .join("");
    }

    const newArrivalsGrid = document.getElementById("new-arrivals-grid");
    if (newArrivalsGrid) {
      newArrivalsGrid.innerHTML = allProducts
        .slice(4, 8)
        .map((p) => createProductCardHTML(p))
        .join("");
    }
  } catch (error) {
    console.error("Hiba az adatok betöltésekor:", error);
  }
}

function checkLoginStatus() {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const userName = localStorage.getItem("userName");
  const userActionContainer =
    document.querySelector(".action-icon")?.parentElement;

  if (isLoggedIn === "true" && userActionContainer) {
    userActionContainer.innerHTML = `
            <span class="user-greeting">Hi, ${userName}!</span>
            <a href="#" id="logoutBtn" class="logout-link">Logout</a>
        `;

    document.getElementById("logoutBtn")?.addEventListener("click", (e) => {
      e.preventDefault();
      localStorage.clear();
      window.location.reload();
    });
  }
}

function showToast(message: string) {
  let container = document.getElementById("toast-container");
  if (!container) {
    container = document.createElement("div");
    container.id = "toast-container";
    document.body.appendChild(container);
  }

  const toast = document.createElement("div");
  toast.className = "toast";
  toast.innerText = message;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transition = "opacity 0.5s ease";
    setTimeout(() => toast.remove(), 500);
  }, 3000);
}

export function updateCartBadge() {
  const cart = JSON.parse(localStorage.getItem("cart") ?? "[]");
  const count = cart.reduce((acc: number, item: any) => acc + item.quantity, 0);
  const badge = document.getElementById("cart-count");

  if (badge) {
    badge.innerText = count.toString();
    badge.style.display = count > 0 ? "block" : "none";
  }
}

export function updateCartCounter(): void {
  const cart = JSON.parse(localStorage.getItem("cart") ?? "[]");
  const totalItems = cart.reduce(
    (sum: number, item: any) => sum + item.quantity,
    0,
  );

  const counterElement = document.querySelector(".cart-count");
  if (counterElement) {
    counterElement.textContent = totalItems.toString();
  }
}

export function addToCart(product: {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
}) {
  let cart = JSON.parse(localStorage.getItem("cart") ?? "[]");
  const existingIndex = cart.findIndex((item: any) => item.id === product.id);

  if (existingIndex > -1) {
    cart[existingIndex].quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));

  showToast(`${product.name} added to cart!`);
  updateCartBadge();
}

export function setupGlobalAddToCart() {
  document.addEventListener("click", (e) => {
    const target = e.target as HTMLElement;

    if (
      target.classList.contains("btn-add-cart") &&
      !window.location.pathname.includes("catalog.html")
    ) {
      const product = {
        id: target.dataset.id ?? "",
        name: target.dataset.name ?? "Product",
        price: Number(target.dataset.price),
        imageUrl: target.dataset.image ?? "",
      };

      if (product.id) {
        addToCart(product);
      }
    }
  });
}

setupGlobalAddToCart();
document.addEventListener("DOMContentLoaded", () => {
  updateCartBadge();
  initMainPage();
  checkLoginStatus();
});

document.addEventListener("DOMContentLoaded", () => {
  updateCartBadge();
});

document.addEventListener("DOMContentLoaded", updateCartBadge);
