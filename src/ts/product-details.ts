import { updateCartCounter } from "./main";

interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  description?: string;
  category: string;
  color: string;
  size?: string;
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
    }

    updateCartCounter();
  } catch (error) {
    console.error("Hiba az oldal inicializálásakor:", error);
  }
}

function renderRelatedProducts(currentId: string) {
  const container = document.getElementById("related-grid");
  if (!container) return;

  const related = allProducts.filter((p) => p.id !== currentId).slice(0, 4);

  container.innerHTML = related
    .map(
      (product) => `
    <div class="product-card">
      <div class="product-image">
        <img src="${product.imageUrl}" alt="${product.name}">
        <button class="add-to-cart-quick" data-id="${product.id}">Add To Cart</button>
      </div>
      <div class="product-info">
        <h3>${product.name}</h3>
        <p class="price">$${product.price}</p>
      </div>
    </div>
  `,
    )
    .join("");

  container.querySelectorAll(".clickable-img").forEach((img) => {
    img.addEventListener("click", (e) => {
      const id = (e.target as HTMLElement).dataset.id;
      window.location.href = `productDetails.html?id=${id}`;
    });
  });
}

function renderDetails(product: Product) {
  const title = document.getElementById("product-title");
  const price = document.getElementById("product-price");
  const img = document.getElementById("current-image") as HTMLImageElement;
  const shortDesc = document.getElementById("product-short-desc");
  const tabContent = document.getElementById("tab-content");

  if (title) title.innerText = product.name;
  if (price) price.innerText = `$${product.price}`;
  if (img) img.src = product.imageUrl;

  if (shortDesc) {
    shortDesc.innerHTML = `
      <p style="margin-bottom: 20px;">
        Vestibulum commodo sapien non elit porttitor, vitae volutpat nibh mollis. Nulla porta risus id neque tempor, in efficitur justo imperdiet. Etiam a ex at ante tincidunt.
      </p>
    `;
  }

  if (tabContent) {
    tabContent.innerHTML = `<p>Detailed description for ${product.name} goes here.</p>`;
  }
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
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const quantity = parseInt(qtyInput.value);
    const existingItem = cart.find(
      (item: any) => item.id === currentProduct?.id,
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.push({ ...currentProduct, quantity });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCounter();
    alert("Product added to cart!");
  });
}

initProductPage();
