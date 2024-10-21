const express = require("express");
const { Server } = require("socket.io");

const app = express();

app.use(express.static(__dirname + "/public"));

let server = app.listen(9000, () => {
  console.log(9000);
});

let io = new Server(server);

io.on("connection", (socket) => {
  socket.on("new-user", (name) => {
    socket.broadcast.emit("new-user", name);
  });

  socket.on("send-message", ({ name, text }) => {
    socket.broadcast.emit("send-user-message", { name, text });
  });


  socket.on("typing", (name) => {
    socket.broadcast.emit("user-typing", name);
  });
});
