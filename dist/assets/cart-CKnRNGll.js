import{n as e,r as t,t as n}from"./main-YdjzZ70V.js";import{n as r,r as i}from"./header-Dt4JWo_7.js";var a=t((()=>{})),o=e((()=>{n(),a(),r();var e=JSON.parse(localStorage.getItem(`cart`)||`[]`);function t(){let t=document.getElementById(`cart-items-body`);if(t){if(e.length===0){t.innerHTML=`<tr><td colspan="6" style="text-align:center; padding: 20px;">Your cart is empty.</td></tr>`,o();return}t.innerHTML=e.map((e,t)=>`
        <tr class="cart-row">
            <td><img src="${e.imageUrl}" class="prod-img" alt="${e.name}"></td>
            <td style="font-weight:700">${e.name}</td>
            <td style="font-weight:700">$${e.price}</td>
            <td>
                <div class="quantity-control">
                    <button class="qty-btn" data-index="${t}" data-delta="-1">-</button>
                    <span class="qty-val">${e.quantity}</span>
                    <button class="qty-btn" data-index="${t}" data-delta="1">+</button>
                </div>
            </td>
            <td style="font-weight:700">$${e.price*e.quantity}</td>
            <td><button class="remove-btn" data-index="${t}" style="color:#b92770; border:none; background:none; cursor:pointer; font-size: 1.2rem;">🗑</button></td>
        </tr>
    `).join(``),s(),o()}}function o(){let t=e.reduce((e,t)=>e+t.price*t.quantity,0),n=e.length>0?30:0,r=0;t>3e3&&(r=t*.1);let i=document.getElementById(`sub-total`),a=document.getElementById(`grand-total`),o=document.getElementById(`discount-amount`),s=document.getElementById(`discount-row`);i&&(i.textContent=`$${t}`),o&&(o.innerText=`-$${r.toFixed(2)}`),s&&(s.style.display=r>0?`flex`:`none`),a&&(a.textContent=`$${(t-r+n).toFixed(2)}`)}function s(){document.querySelectorAll(`.qty-btn`).forEach(t=>{t.addEventListener(`click`,t=>{let n=t.currentTarget,r=parseInt(n.dataset.index),i=parseInt(n.dataset.delta);e[r]&&(e[r].quantity+=i,e[r].quantity<1&&(e[r].quantity=1),c())})}),document.querySelectorAll(`.remove-btn`).forEach(t=>{t.addEventListener(`click`,t=>{let n=t.currentTarget,r=parseInt(n.dataset.index);e.splice(r,1),c()})})}function c(){localStorage.setItem(`cart`,JSON.stringify(e)),t(),i()}document.addEventListener(`DOMContentLoaded`,()=>{t();let n=document.getElementById(`clear-cart`);n&&n.addEventListener(`click`,()=>{e=[],c()});let r=document.querySelector(`.btn-checkout`);r&&r.addEventListener(`click`,()=>{if(e.length===0)return;e=[],localStorage.setItem(`cart`,JSON.stringify(e)),i();let t=document.getElementById(`cart-items-body`);t&&(t.innerHTML=`
          <tr>
            <td colspan="6" style="text-align:center; padding: 50px; color: #b92770;">
              <h2>Thank you for your purchase!</h2>
              <p>Your order has been received.</p>
            </td>
          </tr>`),o()})}),document.addEventListener(`DOMContentLoaded`,()=>{t()}),document.getElementById(`clear-cart`)?.addEventListener(`click`,()=>{e=[],c()}),document.addEventListener(`DOMContentLoaded`,()=>{t()})}));n(),o();