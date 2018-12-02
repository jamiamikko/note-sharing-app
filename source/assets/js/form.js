'use strict';

const $form = document.querySelector('.js-add-note-form');

const $successMessage = document.querySelector('.js-success-message');
const $errorMessage = document.querySelector('.js-error-message');

const $inputs = {
  title: document.querySelector('#title'),
  content: document.querySelector('#content')
};
const baseUrl = window.location.origin + '/notes';

const isValid = () =>
  $inputs.title.value !== '' && $inputs.content.value !== '';

const submitForm = (event) => {
  event.preventDefault();

  if (isValid()) {
    const data = new FormData($form);

    fetch(baseUrl, {
      method: 'PUT',
      body: data
    })
      .then(() => {
        $form.classList.add('is-hidden');
        $successMessage.classList.remove('is-hidden');
      })
      .catch((err) => {
        console.log(err);
        $form.classList.add('is-hidden');
        $errorMessage.classList.remove('is-hidden');
      });
  }
};

const init = () => {
  $form.addEventListener('submit', submitForm, false);
};

document.addEventListener('DOMContentLoaded', init, false);
