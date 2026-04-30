import "../scss/main.scss";
import "../scss/pages/_cart.scss";
import { updateCartBadge } from "./main";

interface CartItem {
  id: string;
  name: string;
  price: number;
  imageUrl: string; // ELLENŐRIZD: a localStorage-ban is ez a kulcs?
  quantity: number;
}

let cart: CartItem[] = JSON.parse(localStorage.getItem("cart") || "[]");

function renderCart() {
  const body = document.getElementById("cart-items-body");
  if (!body) return;

  if (cart.length === 0) {
    body.innerHTML = `<tr><td colspan="6" style="text-align:center; padding: 20px;">Your cart is empty.</td></tr>`;
    updateTotals();
    return;
  }

  body.innerHTML = cart
    .map(
      (item, index) => `
        <tr>
            <td><img src="${item.imageUrl || "https://via.placeholder.com/50"}" class="prod-img" style="width: 50px;"></td>
            <td style="font-weight:700">${item.name || "Unknown Product"}</td>
            <td style="font-weight:700">$${item.price || 0}</td>
            <td>
                <div class="quantity-control">
                    <button class="qty-btn" data-index="${index}" data-delta="-1">-</button>
                    <span class="qty-val">${item.quantity}</span>
                    <button class="qty-btn" data-index="${index}" data-delta="1">+</button>
                </div>
            </td>
            <td style="font-weight:700">$${(item.price || 0) * (item.quantity || 0)}</td>
            <td><button class="remove-btn" data-index="${index}" style="color:#b92770; border:none; background:none; cursor:pointer;">🗑</button></td>
        </tr>
    `,
    )
    .join("");

  attachEventListeners(); // Eseménykezelők hozzáadása
  updateTotals();
}

function updateTotals() {
  const subtotal = cart.reduce(
    (acc, item) => acc + (item.price || 0) * (item.quantity || 0),
    0,
  );
  const shipping = cart.length > 0 ? 30 : 0;

  const subTotalEl = document.getElementById("sub-total");
  const grandTotalEl = document.getElementById("grand-total");

  if (subTotalEl) subTotalEl.textContent = `$${subtotal}`;
  if (grandTotalEl) grandTotalEl.textContent = `$${subtotal + shipping}`;
}

function attachEventListeners() {
  document.querySelectorAll(".qty-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const target = e.target as HTMLElement;
      const index = parseInt(target.dataset.index!);
      const delta = parseInt(target.dataset.delta!);
      changeQty(index, delta);
    });
  });

  document.querySelectorAll(".remove-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const target = e.target as HTMLElement;
      const index = parseInt(target.dataset.index!);
      removeItem(index);
    });
  });
}

function changeQty(index: number, delta: number) {
  if (cart[index]) {
    cart[index].quantity += delta;
    if (cart[index].quantity < 1) cart[index].quantity = 1;
    saveAndRefresh();
  }
}

function removeItem(index: number) {
  cart.splice(index, 1);
  saveAndRefresh();
}

function saveAndRefresh() {
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
  updateCartBadge();
}

document.getElementById("clear-cart")?.addEventListener("click", () => {
  cart = [];
  saveAndRefresh();
});

document.addEventListener("DOMContentLoaded", () => {
  renderCart();
});
