let socket = io("http://localhost:9000");

let name = prompt("Enter your name");

let chatWrapper = document.querySelector(".chat-wrapper");
let messageForm = document.querySelector(".message-form");
let messageInput = document.querySelector(".message-input");
let typing = document.querySelector(".typing");

let h3 = document.createElement("h3");

h3.textContent = `${name} joined`;

chatWrapper.append(h3);

socket.emit("new-user", name);


messageForm.addEventListener('submit',(e) => {
    let messageInput = document.querySelector(".message-input");
    let text = messageInput.value;
    let p = document.createElement("p");
    p.textContent = `Siz: ${text}`;
    e.preventDefault();
    messageInput.value = "";
    chatWrapper.append(p);

    socket.emit("send-message", {name, text});
});


messageInput.addEventListener('input', (e) => {
    socket.emit("typing", name);
});


socket.on("new-user", (name) => {
    let h4 = document.createElement("h4");
    h4.textContent = `${name} joined`;
    chatWrapper.append(h4);
});


socket.on("send-user-message", ({name, text}) => {
    let p = document.createElement("p");
    p.textContent = `${name}: ${text}`;
    chatWrapper.append(p);
});


socket.on("user-typing", (name) => {
    typing.textContent = `${name} typing...`;

    setTimeout(() => {
        typing.textContent = "";
    }, 1000);
});

