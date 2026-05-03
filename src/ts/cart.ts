import "../scss/main.scss";
import "../scss/pages/_cart.scss";
import { updateCartBadge } from "./main";

interface CartItem {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
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
        <tr class="cart-row">
            <td><img src="${item.imageUrl}" class="prod-img" alt="${item.name}"></td>
            <td style="font-weight:700">${item.name}</td>
            <td style="font-weight:700">$${item.price}</td>
            <td>
                <div class="quantity-control">
                    <button class="qty-btn" data-index="${index}" data-delta="-1">-</button>
                    <span class="qty-val">${item.quantity}</span>
                    <button class="qty-btn" data-index="${index}" data-delta="1">+</button>
                </div>
            </td>
            <td style="font-weight:700">$${item.price * item.quantity}</td>
            <td><button class="remove-btn" data-index="${index}" style="color:#b92770; border:none; background:none; cursor:pointer; font-size: 1.2rem;">🗑</button></td>
        </tr>
    `,
    )
    .join("");

  attachEventListeners();
  updateTotals();
}

function updateTotals() {
  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );
  const shipping = cart.length > 0 ? 30 : 0;

  let discount = 0;
  if (subtotal > 3000) {
    discount = subtotal * 0.1;
  }

  const subTotalEl = document.getElementById("sub-total");
  const grandTotalEl = document.getElementById("grand-total");
  const discountElement = document.getElementById("discount-amount");
  const discountRow = document.getElementById("discount-row");

  if (subTotalEl) subTotalEl.textContent = `$${subtotal}`;
  if (discountElement) discountElement.innerText = `-$${discount.toFixed(2)}`;
  if (discountRow) discountRow.style.display = discount > 0 ? "flex" : "none";
  if (grandTotalEl)
    grandTotalEl.textContent = `$${(subtotal - discount + shipping).toFixed(2)}`;
}

function attachEventListeners() {
  document.querySelectorAll(".qty-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const target = e.currentTarget as HTMLElement;
      const index = parseInt(target.dataset.index!);
      const delta = parseInt(target.dataset.delta!);
      if (cart[index]) {
        cart[index].quantity += delta;
        if (cart[index].quantity < 1) cart[index].quantity = 1;
        saveAndRefresh();
      }
    });
  });

  document.querySelectorAll(".remove-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const target = e.currentTarget as HTMLElement;
      const index = parseInt(target.dataset.index!);
      cart.splice(index, 1);
      saveAndRefresh();
    });
  });
}

function saveAndRefresh() {
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
  updateCartBadge();
}

document.addEventListener("DOMContentLoaded", () => {
  renderCart();

  const clearBtn = document.getElementById("clear-cart");
  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      cart = [];
      saveAndRefresh();
    });
  }

  const checkoutBtn = document.querySelector(".btn-checkout");
  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", () => {
      if (cart.length === 0) return;

      cart = [];
      localStorage.setItem("cart", JSON.stringify(cart));

      updateCartBadge();

      const body = document.getElementById("cart-items-body");
      if (body) {
        body.innerHTML = `
          <tr>
            <td colspan="6" style="text-align:center; padding: 50px; color: #b92770;">
              <h2>Thank you for your purchase!</h2>
              <p>Your order has been received.</p>
            </td>
          </tr>`;
      }

      updateTotals();
    });
  }
});

document.addEventListener("DOMContentLoaded", () => {
  renderCart();
});

document.getElementById("clear-cart")?.addEventListener("click", () => {
  cart = [];
  saveAndRefresh();
});

document.addEventListener("DOMContentLoaded", () => {
  renderCart();
});
