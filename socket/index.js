
const { Server } = require("socket.io");

const io = new Server({ cors: { origin: "*" } });

const onlineUsers = {}; //map user id to socket

const getUser = (userId) => {
  return onlineUsers[userId];
};
console.log(onlineUsers)
io.on("connection", (socket) => {
  console.log("connected", socket.id);
  const userId = socket.handshake.query.userId;

  if (userId) {
    onlineUsers[userId] = socket.id;
  }


  socket.on('sendMessage', ({data, receiverId}) => {
    const user = getUser(receiverId)
    if(user) {
      io.to(user).emit('receiveMessage', data)
    }
  })
 

  socket.on("disconnect", () => {
    delete onlineUsers[userId];
    io.emit("getOnlineUsers", Object.keys(onlineUsers));
  });
});

io.listen(5000 );
