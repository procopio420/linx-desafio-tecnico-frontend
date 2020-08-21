const DOMProductList = document.getElementById('product-list');
const DOMNextPageButton = document.getElementById('next-page-button');

let ProductPageURL =
  'https://frontend-intern-challenge-api.iurykrieger.now.sh/products?page=1';

const HTMLProductCard = (product) => {
  const {
    id,
    name,
    image,
    description,
    installments,
    oldPrice,
    price,
  } = product;
  const productCard = document.createElement('div');
  productCard.className = 'product-card';

  productCard.innerHTML = `<img src="${image}" alt="" class="product-img" />
                           <h3 class="product-name">${name}</h3>
                           <p class="product-description">${description}</p>
                           <p class="old-price">De: R$${oldPrice.toFixed(2)}</p>
                           <p class="new-price">Por: R$${price.toFixed(2)}</p>
                           <p class="installment-payment">
                               ou ${
                                 installments.count
                               }x de R$${installments.value.toFixed(2)}
                           </p>
                           <button class="button button-card">Comprar</button>`;

  return productCard;
};

const getProducts = async () => {
  const response = await fetch(ProductPageURL);
  const result = await response.json();

  ProductPageURL = `https://${result.nextPage}`;

  return result.products;
};

const renderProducts = () => {
  getProducts().then((products) => {
    products.forEach((product) => {
      const productCard = HTMLProductCard(product);
      DOMProductList.appendChild(productCard);
    });
  });
};

window.onload = () => {
  renderProducts();
  DOMNextPageButton.addEventListener('click', () => {
    renderProducts();
  });
};
