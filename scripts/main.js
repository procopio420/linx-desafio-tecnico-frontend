`use strict`;

import { getProducts, renderProductCard } from './products.mjs';
import { checkCPF, checkEmail, checkName, appendErrorMessage } from './validation.mjs';

const userForm = document.getElementById('help-algorithm-form');
const friendForm = document.getElementById('newsteller-inline-form');

const userName = document.getElementById('user_name');
const userEmail = document.getElementById('user_email');
const userCPF = document.getElementById('user_cpf');

const userNameContainer = document.getElementById('user_name_container');
const userEmailContainer = document.getElementById('user_email_container');
const userCPFContainer = document.getElementById('user_cpf_container');

const friendName = document.getElementById('friend-name');
const friendEmail = document.getElementById('friend-email');

const friendNameContainer = document.getElementById('friend-name-container');
const friendEmailContainer = document.getElementById('friend-email-container');

const nextPageButton = document.getElementById('next-page-button');
const productList = document.getElementById('product-list');

userForm.addEventListener('submit', (e) => {
  e.preventDefault();
  if (checkCPF(userCPF.value) && checkEmail(userEmail.value) && checkName(userName.value)) {
    alert('Obrigado por ajudar nosso algoritmo! :)');
    return;
  }
  if (!checkName(userName.value)) {
    appendErrorMessage('Insira um nome.', userNameContainer, userName);
  }
  if (!checkEmail(userEmail.value)) {
    appendErrorMessage('Insira um e-mail válido.', userEmailContainer, userEmail);
  }
  if (!checkCPF(userCPF.value)) {
    appendErrorMessage('Insira um CPF válido.', userCPFContainer, userCPF);
  }

  return;
});

friendForm.addEventListener('submit', (e) => {
  e.preventDefault();
  if (checkEmail(friendEmail.value) && checkName(friendName.value)) {
    alert('Obrigado por compartilhar! :)');
    return;
  }
  if (!checkEmail(friendEmail.value)) {
    appendErrorMessage('Insira um e-mail válido.', friendEmailContainer, friendEmail);
  }
  if (!checkName(friendName.value)) {
    appendErrorMessage('Insira um nome.', friendNameContainer, friendName);
  }

  return;
});

const renderProducts = () => {
  getProducts().then((products) => {
    products.forEach((product) => {
      const productCard = renderProductCard(product);
      productList.appendChild(productCard);
    });
  });
};

window.onload = () => {
  renderProducts();
  nextPageButton.addEventListener('click', () => {
    renderProducts();
  });
};
