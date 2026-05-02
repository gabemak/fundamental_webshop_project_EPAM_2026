import "../scss/pages/_catalog.scss";
import "../scss/main.scss";
import { addToCart } from "./main";

interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  category: string;
  color: string;
  size: string;
  salesStatus: boolean;
  rating: number;
  popularity: number;
}

let allProducts: Product[] = [];
let currentDisplayList: Product[] = [];
let currentPage = 1;
const itemsPerPage = 12;

async function loadProducts() {
  try {
    const response = await fetch("/src/assets/data.json");
    const jsonResponse = await response.json();
    allProducts = jsonResponse.data;

    if (allProducts && Array.isArray(allProducts)) {
      currentDisplayList = [...allProducts];
      renderPage(1);
      renderRandomTopSets();
      setupEventListeners();
      setupSort();
    }
  } catch (error) {
    console.error("Hiba az adatok betöltésekor:", error);
  }
}

function handleSearch() {
  const searchInput = document.getElementById(
    "catalog-search",
  ) as HTMLInputElement | null;
  if (!searchInput) return;

  const term = searchInput.value.trim().toLowerCase();

  if (!term) return;

  const foundProduct = allProducts.find((p) =>
    p.name.toLowerCase().includes(term),
  );

  if (foundProduct) {
    window.location.href = `productDetails.html?id=${foundProduct.id}`;
  } else {
    alert("Product not found");
    searchInput.value = "";
  }
}

function renderPage(page: number) {
  currentPage = page;
  const start = (page - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const paginatedItems = currentDisplayList.slice(start, end);

  renderProducts(
    paginatedItems,
    currentDisplayList.length,
    start + 1,
    Math.min(end, currentDisplayList.length),
  );
  renderPagination(currentDisplayList.length);
}

function renderProducts(
  products: Product[],
  total: number,
  from: number,
  to: number,
) {
  const grid = document.getElementById("product-grid");
  if (!grid) return;

  grid.innerHTML = products
    .map((p) => {
      let displayName = p.name;
      const firstSpaceIndex = displayName.indexOf(" ");
      if (firstSpaceIndex !== -1) {
        displayName =
          displayName.substring(0, firstSpaceIndex + 1) +
          "<br>" +
          displayName.substring(firstSpaceIndex + 1);
      }

      return `
  <div class="product-card">
    <span class="sale-badge">SALE</span>
    <a href="productDetails.html?id=${p.id}" class="product-details-link">
      <div class="image-container">
        <img src="${p.imageUrl}" alt="${p.name}">
      </div>
      <div class="card-content">
        <h4>${displayName}</h4>
        <p class="price">$${p.price}</p>
      </div>
    </a>
    <button class="btn-add-cart" data-id="${p.id}">ADD TO CART</button>
  </div>
`;
    })
    .join("");

  grid.querySelectorAll(".btn-add-cart").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const id = (e.currentTarget as HTMLElement).dataset.id;
      const product = products.find((p) => p.id === id);
      if (product) {
        addToCart({
          id: product.id,
          name: product.name,
          price: product.price,
          imageUrl: product.imageUrl,
        });
      }
    });
  });

  const info = document.getElementById("results-info");
  if (info) info.innerText = `Showing ${from}–${to} of ${total} results`;
}

function renderPagination(totalItems: number) {
  const container = document.getElementById("pagination");
  if (!container) return;

  const totalPages = Math.ceil(totalItems / itemsPerPage);
  let html = `<button class="page-btn" ${currentPage === 1 ? "disabled" : ""} id="prev-page">Prev</button>`;
  for (let i = 1; i <= totalPages; i++) {
    html += `<button class="page-btn ${i === currentPage ? "active" : ""}" data-page="${i}">${i}</button>`;
  }
  html += `<button class="page-btn" ${currentPage === totalPages ? "disabled" : ""} id="next-page">Next</button>`;
  container.innerHTML = html;

  container.querySelectorAll(".page-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const target = e.currentTarget as HTMLElement;
      if (target.id === "prev-page") renderPage(currentPage - 1);
      else if (target.id === "next-page") renderPage(currentPage + 1);
      else renderPage(parseInt(target.getAttribute("data-page")!));
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  });
}

function renderRandomTopSets() {
  const container = document.getElementById("top-sets-container");
  if (!container) return;
  const shuffled = [...allProducts].sort(() => 0.5 - Math.random());
  const randomSets = shuffled.slice(0, 5);
  container.innerHTML = randomSets
    .map(
      (set) => `
    <div class="set-item">
      <img src="${set.imageUrl}" alt="${set.name}">
      <div class="set-info">
        <h5>${set.name}</h5>
        <div class="rating">${"★".repeat(Math.floor(set.rating))}${"☆".repeat(5 - Math.floor(set.rating))}</div>
        <p class="price">$${set.price}</p>
      </div>
    </div>
  `,
    )
    .join("");
}

function setupEventListeners() {
  const searchInput = document.getElementById(
    "catalog-search",
  ) as HTMLInputElement | null;
  const searchBtn = document.querySelector(
    ".search-btn",
  ) as HTMLButtonElement | null;

  if (searchBtn) {
    searchBtn.addEventListener("click", (e: Event) => {
      e.preventDefault();
      e.stopPropagation();
      handleSearch();
    });
  }

  if (searchInput) {
    searchInput.addEventListener("keydown", (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        e.preventDefault();
        e.stopPropagation();
        handleSearch();
      }
    });
  }
}

document.addEventListener("click", (e) => {
  const target = e.target as HTMLElement;
  const card = target.closest(".product-card");

  if (card && !target.closest(".add-to-cart-btn")) {
    const id = card.querySelector(".add-to-cart-btn")?.getAttribute("data-id");
    if (id) {
      window.location.href = `productDetails.html?id=${id}`;
    }
  }
});

function setupSort() {
  const sortSelect = document.getElementById(
    "sort-select",
  ) as HTMLSelectElement;

  if (!sortSelect) return;

  sortSelect.addEventListener("change", () => {
    const sortValue = sortSelect.value;
    let sortedProducts = [...allProducts];

    switch (sortValue) {
      case "price-low":
        sortedProducts.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        sortedProducts.sort((a, b) => b.price - a.price);
        break;
      case "popularity":
        sortedProducts.sort(
          (a, b) => (b.popularity || 0) - (a.popularity || 0),
        );
        break;
      case "rating":
        sortedProducts.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case "default":
      default:
        sortedProducts = [...allProducts];
        break;
    }

    const productsLength = sortedProducts.length;

    renderProducts(sortedProducts, productsLength, 1, productsLength);
  });
}

loadProducts();
