const socket = io("http://localhost:5000")

const messageForm = document.getElementById('send-container'/*this the form id */)
const messageContainer = document.getElementById('message-container'/*this the message container 'win taffichi les msgs' id */)
const messageInput = document.getElementById('message-input'/*text input id 'text holder'*/ )
const userObject = JSON.parse(localStorage.getItem("userInfo"));
//we can get rid of it cuz we have the username
const name = userObject.username
//
appendMessage("vous avez rejoigné la messagerie")

socket.emit('new-user',name)


socket.on('chat-message',data =>{
    //go to messages html and add script defer src http://localhost:5000/socket.io/socket.io.js
    // and add another script defer scr script.js
    appendMessage(`${data.name} : ${data.message}`)

})

socket.on('user-connected', name =>{

    appendMessage(`${name} s'est connecté`)
})

socket.on('user-disconnected', name =>{

    appendMessage(`${name} s'est disconnecté`)
})

messageForm.addEventListener('submit',e=>{
    e.preventDefault();
    const message = messageInput.value ;
    appendMessage(`vous  : ${message}`)
    socket.emit('send-chat-message',message)
    messageInput.value = ""

})

function appendMessage(message) {
    const messageElement = document.createElement('div')
    messageElement.innerText = message
    messageContainer.append(messageElement)
} 
