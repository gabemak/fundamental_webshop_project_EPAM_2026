import{r as e}from"./main-DDy8OPbm.js";function t(e){return`
    <div class="product-card">
      <span class="sale-badge">SALE</span>
      <div class="image-container">
        <img src="${e.imageUrl}" alt="${e.name}">
      </div>
      <div class="card-content">
        <h4>${e.name}</h4>
        <p class="price">$${e.price}</p>
<button class="btn-add-cart" 
          data-id="${e.id}" 
          data-name="${e.name}" 
          data-price="${e.price}" 
          data-image="${e.imageUrl}">
    ADD TO CART
  </button>
      </div>
    </div>
  `}var n=e((()=>{}));async function r(){try{let e=(await(await fetch(`./src/assets/data.json`)).json()).data,n=document.getElementById(`selected-products-grid`);n&&(n.innerHTML=e.slice(0,4).map(e=>t(e)).join(``));let r=document.getElementById(`new-arrivals-grid`);r&&(r.innerHTML=e.slice(4,8).map(e=>t(e)).join(``))}catch(e){console.error(`Hiba az adatok betöltésekor:`,e)}}function i(){let e=localStorage.getItem(`isLoggedIn`),t=localStorage.getItem(`userName`),n=document.querySelector(`.action-icon`)?.parentElement;e===`true`&&n&&(n.innerHTML=`
            <span class="user-greeting">Hi, ${t}!</span>
            <a href="#" id="logoutBtn" class="logout-link">Logout</a>
        `,document.getElementById(`logoutBtn`)?.addEventListener(`click`,e=>{e.preventDefault(),localStorage.clear(),window.location.reload()}))}function a(e){let t=document.getElementById(`toast-container`);t||(t=document.createElement(`div`),t.id=`toast-container`,document.body.appendChild(t));let n=document.createElement(`div`);n.className=`toast`,n.innerText=e,t.appendChild(n),setTimeout(()=>{n.style.opacity=`0`,n.style.transition=`opacity 0.5s ease`,setTimeout(()=>n.remove(),500)},3e3)}function o(){let e=JSON.parse(localStorage.getItem(`cart`)??`[]`).reduce((e,t)=>e+t.quantity,0),t=document.getElementById(`cart-count`);t&&(t.innerText=e.toString(),t.style.display=e>0?`block`:`none`)}function s(e){let t=JSON.parse(localStorage.getItem(`cart`)??`[]`),n=t.findIndex(t=>t.id===e.id);n>-1?t[n].quantity+=1:t.push({...e,quantity:1}),localStorage.setItem(`cart`,JSON.stringify(t)),a(`${e.name} added to cart!`),o()}function c(){document.addEventListener(`click`,e=>{let t=e.target;if(t.classList.contains(`btn-add-cart`)&&!window.location.pathname.includes(`catalog.html`)){let e={id:t.dataset.id??``,name:t.dataset.name??`Product`,price:Number(t.dataset.price),imageUrl:t.dataset.image??``};e.id&&s(e)}})}var l=e((()=>{n(),c(),document.addEventListener(`DOMContentLoaded`,()=>{o(),r(),i()}),document.addEventListener(`DOMContentLoaded`,()=>{o()}),document.addEventListener(`DOMContentLoaded`,o)}));export{l as n,o as r,s as t};