'use strict';

// const constraints = {audio: true, video: true};

const servers = {
  iceServers: [
    {urls: 'stun:stun.services.mozilla.com'},
    {urls: 'stun:stun.l.google.com:19302'},
    {
      urls: 'turn:numb.viagenie.ca',
      credential: 'password123',
      username: 'mikkojam@metropolia.fi'
    }
  ]
};

const $chatBox = document.querySelector('.js-chat-window');
const $chatInput = document.querySelector('.js-input');
const $form = document.querySelector('.js-chat-form');

const socket = io.connect('http://localhost:3000');

$form.addEventListener(
  'submit',
  (event) => {
    event.preventDefault();
    const value = $chatInput.value;

    if (value !== '') {
      socket.emit('message', value);
      $chatBox.innerHTML +=
        '<div class="chat__row"><p class="chat__sender">User:</p><p class="chat__comment">"' +
        value +
        '"</p></div>';
      $chatInput.value = '';
    }
  },
  false
);

socket.on('message', (message) => {
  $chatBox.innerHTML +=
    '<div class="chat__row"><p class="chat__sender">User:</p><p class="chat__comment">"' +
    message +
    '"</p></div>';
});
