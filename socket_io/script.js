const socket = io("http://localhost:5000")

const messageForm = document.getElementById('send-container'/*this the form id */)
const messageContainer = document.getElementById('message-container'/*this the message container 'win taffichi les msgs' id */)
const messageInput = document.getElementById('message-input'/*text input id 'text holder'*/ )

//we can get rid of it cuz we have the username
const name = prompt("what is your name ?")
//
appendMessage("you joined")

socket.emit('new-user',name)


socket.on('chat-message',data =>{
    //go to messages html and add script defer src http://localhost:5000/socket.io/socket.io.js
    // and add another script defer scr script.js
    appendMessage(`${data.name} : ${data.message}`)

})

socket.on('user-connected', name =>{

    appendMessage(`${name} joined`)
})

socket.on('user-disconnected', name =>{

    appendMessage(`${name} disconnected`)
})

messageForm.addEventListener('submit',e=>{
    e.preventDefault();
    const message = messageInput.value ;
    appendMessage(`You  : ${message}`)
    socket.emit('send-chat-message',message)
    messageInput.value = ""

})

const appendMessage = (message)=>{
    const messageElement = document.createElement('div')
    messageElement.innerText = message
    messageContainer.append(messageElement)
}