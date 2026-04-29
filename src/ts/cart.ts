import "../scss/pages/_cart.scss";

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

  body.innerHTML = cart
    .map(
      (item, index) => `
        <tr>
            <td><img src="${item.imageUrl}" class="prod-img"></td>
            <td style="font-weight:700">${item.name}</td>
            <td style="font-weight:700">$${item.price}</td>
            <td>
                <div class="quantity-control">
                    <button onclick="changeQty(${index}, -1)">-</button>
                    <span>${item.quantity}</span>
                    <button onclick="changeQty(${index}, 1)">+</button>
                </div>
            </td>
            <td style="font-weight:700">$${item.price * item.quantity}</td>
            <td><button onclick="removeItem(${index})" style="color:#b92770; border:none; background:none; cursor:pointer;">🗑</button></td>
        </tr>
    `,
    )
    .join("");

  updateTotals();
}

function updateTotals() {
  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );
  const shipping = 30;

  document.getElementById("sub-total")!.textContent = `$${subtotal}`;
  document.getElementById("grand-total")!.textContent =
    `$${subtotal + shipping}`;
}

(window as any).changeQty = (index: number, delta: number) => {
  cart[index].quantity += delta;
  if (cart[index].quantity < 1) cart[index].quantity = 1;
  saveAndRefresh();
};

(window as any).removeItem = (index: number) => {
  cart.splice(index, 1);
  saveAndRefresh();
};

function saveAndRefresh() {
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

renderCart();
