const { renderProducts } = require('./Products');

const DOMNextPageButton = document.getElementById('next-page-button');

window.onload = () => {
  renderProducts();
  DOMNextPageButton.addEventListener('click', () => {
    renderProducts();
  });
};
