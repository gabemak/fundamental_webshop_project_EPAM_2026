import { updateCartBadge } from "./main";

interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  description?: string;
  category: string;
  color: string;
  size?: string;
  rating?: number;
}

let allProducts: Product[] = [];
let currentProduct: Product | null = null;

async function initProductPage() {
  try {
    const response = await fetch("/src/assets/data.json");
    const json = await response.json();
    allProducts = json.data;

    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    if (!id) {
      window.location.href = "catalog.html";
      return;
    }

    currentProduct = allProducts.find((p) => p.id === id) || null;

    if (currentProduct) {
      renderDetails(currentProduct);
      renderRelatedProducts(id);
      setupEventListeners();
      setupTabs();
    }
  } catch (error) {
    console.error("Initialization error:", error);
  }
}

function renderDetails(product: Product) {
  const title = document.getElementById("product-title");
  const price = document.getElementById("product-price");
  const mainImg = document.getElementById("current-image") as HTMLImageElement;

  if (title) title.innerText = product.name;
  if (price) price.innerText = `$${product.price}`;
  if (mainImg) mainImg.src = product.imageUrl;

  const thumbContainer = document.getElementById("thumbnail-container");
  if (thumbContainer) {
    const images = [
      product.imageUrl,
      product.imageUrl,
      product.imageUrl,
      product.imageUrl,
    ];
    thumbContainer.innerHTML = images
      .map(
        (src, i) => `
      <img src="${src}" class="thumb ${i === 0 ? "active" : ""}" alt="Thumb ${i}">
    `,
      )
      .join("");

    thumbContainer.querySelectorAll(".thumb").forEach((thumb) => {
      thumb.addEventListener("click", (e) => {
        const target = e.target as HTMLImageElement;
        mainImg.src = target.src;
        thumbContainer
          .querySelectorAll(".thumb")
          .forEach((t) => t.classList.remove("active"));
        target.classList.add("active");
      });
    });
  }

  populateSelect("size-select", product.size || "S, M, L, XL");
  populateSelect("color-select", "Red, Blue, Green, Black, Grey");
  populateSelect("category-select", "Carry-ons, Suitcases, Luggage sets");
}

function populateSelect(id: string, optionsStr: string) {
  const select = document.getElementById(id) as HTMLSelectElement;
  if (!select) return;
  const options = optionsStr.split(", ");
  options.forEach((opt) => {
    const el = document.createElement("option");
    el.value = opt.toLowerCase();
    el.textContent = opt;
    select.appendChild(el);
  });
}

function setupEventListeners() {
  const qtyInput = document.getElementById("quantity") as HTMLInputElement;
  const plusBtn = document.getElementById("plus");
  const minusBtn = document.getElementById("minus");

  plusBtn?.addEventListener("click", () => {
    qtyInput.value = (parseInt(qtyInput.value) + 1).toString();
  });

  minusBtn?.addEventListener("click", () => {
    const val = parseInt(qtyInput.value);
    if (val > 1) qtyInput.value = (val - 1).toString();
  });

  const addBtn = document.getElementById("add-to-cart");
  addBtn?.addEventListener("click", () => {
    if (!currentProduct) return;

    const size = (document.getElementById("size-select") as HTMLSelectElement)
      .value;
    if (!size) {
      alert("Please select a size!");
      return;
    }

    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const quantity = parseInt(qtyInput.value);

    const existingItem = cart.find(
      (item: any) =>
        item.id === currentProduct?.id && item.selectedSize === size,
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.push({
        ...currentProduct,
        quantity,
        selectedSize: size,
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartBadge();
    alert("Added to cart!");
  });
}

function setupTabs() {
  const tabBtns = document.querySelectorAll(".tab-btn");
  const content = document.getElementById("tab-content");

  if (content)
    content.innerHTML =
      "<p>Standard high-quality polycarbonate material with 360-degree wheels.</p>";

  tabBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      tabBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      const tab = (btn as HTMLElement).dataset.tab;
      if (content) {
        content.innerHTML = `<p>${tab?.charAt(0).toUpperCase()}${tab?.slice(1)} information for ${currentProduct?.name}.</p>`;
      }
    });
  });
}

function renderRelatedProducts(currentId: string) {
  const container = document.getElementById("related-grid");
  if (!container) return;

  const related = allProducts
    .filter((p) => p.id !== currentId)
    .sort(() => 0.5 - Math.random())
    .slice(0, 4);

  container.innerHTML = related
    .map(
      (p) => `
    <div class="product-card">
        <div class="product-image-container">
            <img src="${p.imageUrl}" alt="${p.name}" onclick="window.location.href='productDetails.html?id=${p.id}'">
            ${p.price > 300 ? '<span class="sale-badge">SALE</span>' : ""}
        </div>
        <div class="product-content">
            <h3 class="product-name">${p.name}</h3>
            <p class="product-price">$${p.price}</p>
            <button class="btn-add-to-cart" onclick="window.location.href='productDetails.html?id=${p.id}'">View Details</button>
        </div>
    </div>
  `,
    )
    .join("");
}

initProductPage();
