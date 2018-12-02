'use strict';

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

const socket = io.connect(window.location.origin);

const username = sessionStorage.getItem('username');

$form.addEventListener(
  'submit',
  (event) => {
    event.preventDefault();
    const value = $chatInput.value;

    if (value !== '') {
      socket.emit('message', JSON.stringify({text: value, user: username}));

      $chatBox.innerHTML +=
        '<div class="chat__row"><p class="chat__sender">' +
        username +
        ':</p><p class="chat__comment">"' +
        value +
        '"</p></div>';

      $chatInput.value = '';
    }
  },
  false
);

socket.on('join', (user) => {
  $chatBox.innerHTML +=
    '<div class="chat__row"><p class="chat__comment">"' +
    user +
    ' joined"</p></div>';
});

socket.on('message', (messageJson) => {
  const data = JSON.parse(messageJson);

  $chatBox.innerHTML +=
    '<div class="chat__row"><p class="chat__sender">' +
    data.user +
    ':</p><p class="chat__comment">"' +
    data.text +
    '"</p></div>';
});

socket.emit('join', username);
