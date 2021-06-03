//node server which will handle socket io connection
 
const io = require('socket.io')(8000)
const users = {};

/*app.use((req,res,next) =>{
    res.setHeader('Access-Control-Origin','*');
    res.setHeader('Access-Control-Allow-Methods','GET','POST','PUT','DELETE');
    res.setHeader('Access-Control-Allow-Headers','Control-Type, Authorization');
    next();
});*/

io.on('connection', socket =>{
    socket.on('new-user-joined',name =>{
        console.log("new user", name)
        users[socket.id] = name;
        socket.broadcast.emit('user-joined',name);
   
    });
    socket.on('send',message =>{
        socket.broadcast.emit('receive', {message: message, name: users[socket.
            id]})
    });
});


