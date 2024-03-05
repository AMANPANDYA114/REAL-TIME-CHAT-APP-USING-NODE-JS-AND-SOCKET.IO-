
const socket = io();

var username;
let textarea = document.querySelector('#textarea');
let messageArea = document.querySelector('.message__area');
const keyPressSound = document.getElementById('keyPressSound');
do {
    username = prompt('Please enter your name');
} while (!username);


textarea.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        sendMessage(textarea.value);
        keyPressSound.play();
    }
});

function sendMessage(message) {
    let msg = {
        user: username,
        message: message
    };
    // Now you can do something with the 'msg' variable, such as sending it through the socket

    appendMessage(msg, 'outgoing');
    textarea.value='';
   
    socket.emit('message',msg)
}

function appendMessage(msg, type) {
    let mainDiv = document.createElement('div');

    let className = type;
    mainDiv.classList.add(className, 'message');

    let markup = `<h4>${msg.user}</h4>
    <p>${msg.message}</p>`;

    mainDiv.innerHTML = markup;
    messageArea.appendChild(mainDiv);
}

socket.on('message',(msg)=>{
  appendMessage(msg,'incoming')
  textarea.value='';
  ScrollBottom();
})

function ScrollBottom(){
    messageArea.scrollTop=messageArea.scrollHeight
}
