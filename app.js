const express = require('express');
const app = express();
const path = require('path');
const http=require('http');
const socketio=require('socket.io');
const server = http.createServer(app);


const io = socketio(server);

app.set("view engine", "ejs");
// app.use(express.static("public"));
app.use(express.static(path.join(__dirname, "public")));
app.use('/leaflet', express.static(path.join(__dirname, 'node_modules/leaflet/dist')));

// io.on("connection", function (socket){
//     console.log(`Client connected: ${socket.id}`);
//     console.log('Client Connected: ${socket.id}');
//     socket.on("send-location", function(data){
//         console.log('Location received from ${socket.id}:',data);
//         io.emit("receive-location",{id: socket.id, ...data});
//     });

//     socket.on("disconnect",function(){
//         console.log(`Client disconnected: ${socket.id}`);
//         io.emit("user-disconnected",socket.id);
//     });
// });

io.on("connection", function (socket) {
    console.log(`Client connected: ${socket.id}`);

    socket.on("send-location", function (data) {
        console.log(`Location received from ${socket.id}:`, data);
        io.emit("receive-location", { id: socket.id, ...data });
    });

    socket.on("disconnect", function () {
        console.log(`Client disconnected: ${socket.id}`);
        io.emit("user-disconnected", socket.id);
    });
});


app.get("/",(req,res)=>{
    res.render('index');
});

// server.listen(3000, ()=>{
//     console.log('Server running on port 3000');    
// });

server.listen(3000, () => {
    console.log('Server running on port 3000');
}).on('error', (err) => {
    console.error('Server error:', err);
});