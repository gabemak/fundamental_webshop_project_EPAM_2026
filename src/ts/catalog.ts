import "../scss/pages/_catalog.scss";
import "../scss/main.scss";

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
    }
  } catch (error) {
    console.error("Hiba az adatok betöltésekor:", error);
  }
}

function handleSort() {
  const sortVal = (document.getElementById("sort-select") as HTMLSelectElement)
    .value;

  switch (sortVal) {
    case "price-low":
      currentDisplayList.sort((a, b) => a.price - b.price);
      break;
    case "price-high":
      currentDisplayList.sort((a, b) => b.price - a.price);
      break;
    case "popularity":
      currentDisplayList.sort((a, b) => b.popularity - a.popularity);
      break;
    case "rating":
      currentDisplayList.sort((a, b) => b.rating - a.rating);
      break;
    default:
      currentDisplayList.sort((a, b) => parseInt(a.id) - parseInt(b.id));
  }
  renderPage(1);
}

function handleSearch() {
  const searchInput = document.getElementById(
    "catalog-search",
  ) as HTMLInputElement;
  const term = searchInput.value.trim().toLowerCase();

  if (!term) return;

  const foundProduct =
    allProducts.find((p) => p.name.toLowerCase() === term) ||
    allProducts.find((p) => p.name.toLowerCase().includes(term));

  if (foundProduct) {
    window.location.href = `product-details.html?id=${foundProduct.id}`;
  } else {
    alert("Product not found");
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
    .map(
      (p) => `
    <div class="product-card">
      ${p.salesStatus ? '<span class="sale-badge">SALE</span>' : ""}
      <div class="image-container">
        <img src="${p.imageUrl}" alt="${p.name}">
      </div>
      <h4>${p.name}</h4>
      <p class="price">$${p.price}</p>
      <button class="btn-add-cart">ADD TO CART</button>
    </div>
  `,
    )
    .join("");

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
  document
    .getElementById("sort-select")
    ?.addEventListener("change", handleSort);
  const searchBtn = document.querySelector(".search-btn");
  searchBtn?.addEventListener("click", handleSearch);
}

loadProducts();
