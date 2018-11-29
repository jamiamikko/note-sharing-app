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

const caller = new RTCPeerConnection(servers);

const onIceCandidate = (evt) => {
  socket.emit('candidate', JSON.stringify({candidate: evt.candidate}));
};

caller.onaddstream = (event) => {
  console.log('onaddstream called');
};

caller.onicecandidate = (evt) => {
  if (!evt.candidate) return;
  console.log('onicecandidate called');
  onIceCandidate(evt);
};

const socket = io.connect('http://localhost:3000');

const makeNewCall = (socket) => {
  caller
    .createOffer()
    .then((res) => {
      caller.setLocalDescription(new RTCSessionDescription(res));

      socket.emit('call', JSON.stringify(res));
    })
    .catch((err) => {
      console.log(err);
    });
};

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

socket.on('answer', (message) => {
  caller.setRemoteDescription(new RTCSessionDescription(JSON.parse(message)));
});

socket.on('call', (message) => {
  console.log(message);
  socket.emit('answer', 'Call answered');

  caller.setRemoteDescription(new RTCSessionDescription(JSON.parse(message)));

  caller.createAnswer().then((call) => {
    caller.setLocalDescription(new RTCSessionDescription(call));
    socket.emit('answer', JSON.stringify(call));
  });
});

socket.on('candidate', (message) => {
  console.log(message);
  caller.addIceCandidate(new RTCIceCandidate(JSON.parse(message).candidate));
});
