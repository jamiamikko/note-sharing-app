'use strict';

const $registerForm = document.querySelector('.js-register-form');

const register = (event) => {
  event.preventDefault();

  console.log('Noi');
};

const init = () => {
  $registerForm.addEventListener('submit', register, false);
};

document.addEventListener('DOMContentLoaded', init, false);
