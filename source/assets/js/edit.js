'use strict';

const $form = document.querySelector('.js-add-note-form');
const $fileInput = document.querySelector('.js-image-input');
const $imagePlaceholder = document.querySelector('.js-image-placeholder');

const $successMessage = document.querySelector('.js-success-message');
const $errorMessage = document.querySelector('.js-error-message');

const $inputs = {
  title: document.querySelector('#title'),
  content: document.querySelector('#content')
};
const baseUrl = window.location.origin + '/notes';

const isValid = () =>
  $inputs.title.value !== '' && $inputs.content.value !== '';

const getNoteId = () => {
  return location.pathname.split('/notes/edit/')[1];
};

const submitForm = (event) => {
  event.preventDefault();

  if (isValid()) {
    const data = new FormData($form);

    fetch(baseUrl + '/' + getNoteId(), {
      method: 'POST',
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

const fileChange = (event) => {
  const newFile = event.target.files[0];

  if (newFile) {
    const reader = new FileReader();

    reader.onload = (evt) => {
      const src = $imagePlaceholder.getAttribute('src');

      if (src.length) {
        $imagePlaceholder.setAttribute('src', evt.target.result);
      }
    };

    reader.readAsDataURL(newFile);
  }
};

const init = () => {
  $form.addEventListener('submit', submitForm, false);
  $fileInput.addEventListener('change', fileChange, false);
};

document.addEventListener('DOMContentLoaded', init, false);
