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

let cart: any[] = JSON.parse(localStorage.getItem("cart") || "[]");

export function initCartLogic() {
  updateCartBadge();

  document.body.addEventListener("click", (e) => {
    const target = e.target as HTMLElement;

    if (target && target.classList.contains("btn-add-cart")) {
      addToCart({ id: Date.now(), name: "Suitcase" });
      showToast("Product added to cart!");
    }
  });
}

function addToCart(product: any) {
  cart.push(product);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartBadge();
}

function updateCartBadge() {
  const badge = document.querySelector(".cart-count");
  if (badge) {
    badge.textContent = cart.length.toString();
    badge.classList.toggle("d-none", cart.length === 0);
  }
}

function showToast(message: string) {
  const toast = document.createElement("div");
  toast.className = "cart-toast";
  toast.textContent = message;
  document.body.appendChild(toast);

  setTimeout(() => toast.classList.add("show"), 100);
  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

let cartItems: any[] = JSON.parse(localStorage.getItem("cart") || "[]");

function updateCartUI() {
  const countElement = document.getElementById("cart-count");
  if (countElement) {
    const totalItems = cartItems.length;
    countElement.textContent = totalItems.toString();

    countElement.style.display = totalItems > 0 ? "flex" : "none";
  }
}

document.addEventListener("click", (e) => {
  const target = e.target as HTMLElement;

  if (target.classList.contains("btn-add-cart")) {
    cartItems.push({ id: Date.now() });
    localStorage.setItem("cart", JSON.stringify(cartItems));

    updateCartUI();

    const originalText = target.innerText;
    target.innerText = "ADDED!";
    target.style.backgroundColor = "#28a745";

    setTimeout(() => {
      target.innerText = originalText;
      target.style.backgroundColor = "";
    }, 1000);
  }
});

document.addEventListener("DOMContentLoaded", initMainPage);
document.addEventListener("DOMContentLoaded", checkLoginStatus);
document.addEventListener("DOMContentLoaded", initCartLogic);
document.addEventListener("DOMContentLoaded", updateCartUI);
