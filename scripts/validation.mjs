`use strict`;

function appendErrorMessage(message, container, input) {
  const errorMessage = document.createElement('p');
  errorMessage.innerText = message;
  input.classList.add('input-error');
  container.appendChild(errorMessage);
  setTimeout(() => {
    input.classList.remove('input-error');
    container.removeChild(errorMessage);
  }, 4000);
}

function checkName(name) {
  return name.length ? true : false;
}

function checkEmail(email) {
  if (!email.length) return false;

  const regexEmail = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
  return regexEmail.test(email);
}

// checkCPF function inspired by https://hackingnaweb.com/programacao/gerar-cpfs-validos/

function checkCPF(cpf) {
  const sanitizedCPF = cpf.replaceAll('-', '').replaceAll('.', '');

  if (sanitizedCPF.length !== 11) return false;

  const isAllTheSameDigit = () => {
    let isDiff = true;
    for (let i = 1; i < sanitizedCPF.length; i++) {
      if (sanitizedCPF[i] !== sanitizedCPF[i - 1]) {
        isDiff = false;
        break;
      }
    }
    return isDiff;
  };

  if (isAllTheSameDigit()) return false;

  const cpfNumbersSumAndMod = (length) => {
    let sum = 0;
    let mod = 0;
    for (let i = 0; i < length; i++) {
      sum += parseInt(sanitizedCPF.substring(i, i + 1)) * (length + 1 - i);
    }
    mod = (sum * 10) % 11;

    if (mod === 10 || mod === 11) mod = 0;
    if (mod !== parseInt(sanitizedCPF.substring(length, length + 1))) return false;

    return true;
  };

  if (cpfNumbersSumAndMod(9) && cpfNumbersSumAndMod(10)) {
    return true;
  }

  return false;
}

export { checkCPF, checkEmail, checkName, appendErrorMessage };
