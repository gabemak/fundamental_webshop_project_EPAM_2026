import{n as e,r as t,t as n}from"./main-DDy8OPbm.js";import{n as r,t as i}from"./main-D7MyJQla.js";import"./header-DqwkfWMZ.js";var a=t((()=>{})),o=e((()=>{a(),n(),r();var e=[],t=[],o=1,s=12;async function c(){try{e=(await(await fetch(`/src/assets/data.json`)).json()).data,e&&Array.isArray(e)&&(t=[...e],u(1),p(),m(),h())}catch(e){console.error(`Hiba az adatok betöltésekor:`,e)}}function l(){let t=document.getElementById(`catalog-search`);if(!t)return;let n=t.value.trim().toLowerCase();if(!n)return;let r=e.find(e=>e.name.toLowerCase().includes(n));r?window.location.href=`/src/pages/productDetails.html?id=${r.id}`:(alert(`Product not found`),t.value=``)}function u(e){o=e;let n=(e-1)*s,r=n+s;d(t.slice(n,r),t.length,n+1,Math.min(r,t.length)),f(t.length)}function d(e,t,n,r){let a=document.getElementById(`product-grid`);if(!a)return;a.innerHTML=e.map(e=>{let t=e.name,n=t.indexOf(` `);return n!==-1&&(t=t.substring(0,n+1)+`<br>`+t.substring(n+1)),`
  <div class="product-card">
    <span class="sale-badge">SALE</span>
    <a href="/src/pages/productDetails.html?id=${e.id}" class="product-details-link">
      <div class="image-container">
        <img src="${e.imageUrl}" alt="${e.name}">
      </div>
      <div class="card-content">
        <h4>${t}</h4>
        <p class="price">$${e.price}</p>
      </div>
    </a>
    <button class="btn-add-cart" data-id="${e.id}">ADD TO CART</button>
  </div>
`}).join(``),a.querySelectorAll(`.btn-add-cart`).forEach(t=>{t.addEventListener(`click`,t=>{let n=t.currentTarget.dataset.id,r=e.find(e=>e.id===n);r&&i({id:r.id,name:r.name,price:r.price,imageUrl:r.imageUrl})})});let o=document.getElementById(`results-info`);o&&(o.innerText=`Showing ${n}–${r} of ${t} results`)}function f(e){let t=document.getElementById(`pagination`);if(!t)return;let n=Math.ceil(e/s),r=`<button class="page-btn" ${o===1?`disabled`:``} id="prev-page">Prev</button>`;for(let e=1;e<=n;e++)r+=`<button class="page-btn ${e===o?`active`:``}" data-page="${e}">${e}</button>`;r+=`<button class="page-btn" ${o===n?`disabled`:``} id="next-page">Next</button>`,t.innerHTML=r,t.querySelectorAll(`.page-btn`).forEach(e=>{e.addEventListener(`click`,e=>{let t=e.currentTarget;t.id===`prev-page`?u(o-1):t.id===`next-page`?u(o+1):u(parseInt(t.getAttribute(`data-page`))),window.scrollTo({top:0,behavior:`smooth`})})})}function p(){let t=document.getElementById(`top-sets-container`);t&&(t.innerHTML=[...e].sort(()=>.5-Math.random()).slice(0,5).map(e=>`
    <div class="set-item">
      <img src="${e.imageUrl}" alt="${e.name}">
      <div class="set-info">
        <h5>${e.name}</h5>
        <div class="rating">${`★`.repeat(Math.floor(e.rating))}${`☆`.repeat(5-Math.floor(e.rating))}</div>
        <p class="price">$${e.price}</p>
      </div>
    </div>
  `).join(``))}function m(){let e=document.getElementById(`catalog-search`),t=document.querySelector(`.search-btn`);t&&t.addEventListener(`click`,e=>{e.preventDefault(),e.stopPropagation(),l()}),e&&e.addEventListener(`keydown`,e=>{e.key===`Enter`&&(e.preventDefault(),e.stopPropagation(),l())})}document.addEventListener(`click`,e=>{let t=e.target,n=t.closest(`.product-card`);if(n&&!t.closest(`.add-to-cart-btn`)){let e=n.querySelector(`.add-to-cart-btn`)?.getAttribute(`data-id`);e&&(window.location.href=`/src/pages/productDetails.html?id=${e}`)}});function h(){let t=document.getElementById(`sort-select`);t&&t.addEventListener(`change`,()=>{let n=t.value,r=[...e];switch(n){case`price-low`:r.sort((e,t)=>e.price-t.price);break;case`price-high`:r.sort((e,t)=>t.price-e.price);break;case`popularity`:r.sort((e,t)=>(t.popularity||0)-(e.popularity||0));break;case`rating`:r.sort((e,t)=>(t.rating||0)-(e.rating||0));break;default:r=[...e];break}let i=r.length;d(r,i,1,i)})}c()}));n(),o();