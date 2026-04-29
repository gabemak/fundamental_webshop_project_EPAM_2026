export interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  salesStatus: boolean;
  category?: string;
  color?: string;
  size?: string;
}

export function createProductCardHTML(p: any): string {
  return `
    <div class="product-card">
      <span class="sale-badge">SALE</span>
      <div class="image-container">
        <img src="${p.imageUrl}" alt="${p.name}">
      </div>
      <div class="card-content">
        <h4>${p.name}</h4>
        <p class="price">$${p.price}</p>
        <button class="btn-add-cart">ADD TO CART</button>
      </div>
    </div>
  `;
}
