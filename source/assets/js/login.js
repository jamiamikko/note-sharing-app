'use strict';

const $registerForm = document.querySelector('.js-register-form');

const $inputs = {
  username: document.querySelector('#username'),
  password: document.querySelector('#password')
};

const baseUrl = window.location.origin;

const isValid = () =>
  $inputs.username.value !== '' && $inputs.password.value !== '';

const register = (event) => {
  event.preventDefault();

  const data = {
    username: $inputs.username.value,
    password: $inputs.password.value
  };

  if (isValid()) {
    fetch(baseUrl + '/register', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then((res) => {
        if (res.ok) {
          window.location.pathname = '/login';
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
};

const init = () => {
  $registerForm.addEventListener('submit', register, false);
};

document.addEventListener('DOMContentLoaded', init, false);
