const express = require("express");
const path = require("path");
const http = require("http");
const socketio = require("socket.io");
const formatMessage = require('./utils/messages');
const { userJoin , getCurrentUser } = require('./utils/user');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const botName = 'chatroom bot';
//set static folder
app.use(express.static(path.join(__dirname,'public')));
//run when client connects
io.on('connection',socket => {

    socket.on('joinRoom',({ username , room}) =>{

        const user = userJoin(socket.id,username, room);
        socket.join(user.room );

        console.log("new ws connection..");
    //welcome the current user
    socket.emit('message',formatMessage(botName,'welcome to chatroom'));

    //broadcast when a user connects
    socket.broadcast.to(user.room).emit('message',formatMessage(botName,`${user.username} has joinned the chat`));
    });

    //when a user disconnect
    socket.on('disconnect',()=>{
        io.emit('message', formatMessage(botName,`User has left the chat`));
    });
    //listen for the chat message
    socket.on('chatMessage', msg =>{
        const user = getCurrentUser(socket.id);
       io.to(user.room).emit('message',formatMessage(user.username, msg));
    });
});

const PORT = 3000 || process.env.PORT;

server.listen(PORT, () => console.log(`server is running on ${PORT}`));