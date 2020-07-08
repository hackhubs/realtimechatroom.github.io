const socket = io();
const chatFrom = document.getElementById('chat-form');



socket.on('message',message => {
  console.log(message);
});

//Message submit

chatFrom.addEventListener('submit', e =>{
  e.preventDefault();
  
  const msg = e.target.elements.msg.value;
  console.log(msg);
});