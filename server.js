const express = require("express");
const path = require("path");
const http = require("http");
const socketio = require("socket.io");


const app = express();
const server = http.createServer(app);
const io = socketio(server);
//set static folder
app.use(express.static(path.join(__dirname,'public')));
//run when client connects
io.on('connection',socket => {
    console.log("new ws connection..");
    //welcome the current user
    socket.emit('message','welcome to chatroom');

    //broadcast when auser connects
    socket.broadcast.emit('message','A new user has joinned the chat');
    
    //when a user disconnect
    socket.on('disconnect',()=>{
        io.emit('message', 'a user has left the chat');
    });
});

const PORT = 3000 || process.env.PORT;

server.listen(PORT, () => console.log(`server is running on ${PORT}`));