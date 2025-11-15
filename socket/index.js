const { Server } = require("socket.io");

const io = new Server({ cors: { origin: "*" } });

const onlineUsers = {}; //map user id to socket

const getUser = (userId) => {
  return onlineUsers[userId];
};
console.log(onlineUsers);
io.on("connection", (socket) => {
  console.log("connected", socket.id);
  const userId = socket.handshake.query.userId;

  if (userId) {
    onlineUsers[userId] = socket.id;
  }

  socket.on("sendMessage", ({ data, receiverId, userId }) => {
    const receiver = getUser(receiverId);
    const sender = getUser(userId);
    if (receiver) {
      io.to(receiver).emit("receiveMessage", data);
    }

    const targets = [sender, receiver].filter(Boolean);
    if (targets.length) {
      io.to(targets).emit("updateLastMessage", data);
    }
  });

  socket.on("disconnect", () => {
    delete onlineUsers[userId];
    io.emit("getOnlineUsers", Object.keys(onlineUsers));
    console.log("disconnected");
  });
});

io.listen(4000);
