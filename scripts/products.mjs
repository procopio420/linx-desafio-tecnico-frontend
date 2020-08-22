`use strict`;

let ProductPageURL = 'https://frontend-intern-challenge-api.iurykrieger.now.sh/products?page=1';

const generateProductCard = ({ name, image, description, installments, oldPrice, price }) => {
  return `<img src="${image}" alt="" class="product-img" />
  <h3 class="product-name">${name}</h3>
  <p class="product-description">${description}</p>
  <p class="old-price">De: R$${oldPrice.toFixed(2)}</p>
  <p class="new-price">Por: R$${price.toFixed(2)}</p>
  <p class="installment-payment">
  ou ${installments.count}x de R$${installments.value.toFixed(2)}
  </p>
  <button class="button button-card">Comprar</button>`;
};

const renderProductCard = (product) => {
  const productCard = document.createElement('div');
  productCard.className = 'product-card';

  productCard.innerHTML = generateProductCard(product);

  return productCard;
};

const getProducts = async () => {
  const response = await fetch(ProductPageURL);
  const result = await response.json();

  ProductPageURL = `https://${result.nextPage}`;

  return result.products;
};

export { getProducts, generateProductCard, renderProductCard };
