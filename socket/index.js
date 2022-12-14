const io = require('socket.io')(8900, {
  cors: {
    origin: 'http://localhost:3000',
  },
});

let users = [];

const addUser = (userId, socketId) => {
  console.log('addUser() addedData: ', { userId, socketId });
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  console.log('Getuser: receiverId', userId);
  console.log('Getuser: users connected', users);
  return users.find((user) => user.userId === userId);
};

io.on('connection', (socket) => {
  //when ceonnect
  console.log('a user connected.');

  //take userId and socketId from user
  socket.on('addUser', (userId) => {
    console.log('addUser addedUserId', userId);
    addUser(userId, socket.id);
    console.log('addUser users', users);

    io.emit('getUsers', users);
  });

  //send and get message
  socket.on('sendMessage', ({ sender, receiverId, text }) => {
    const user = getUser(receiverId);

    if (user) {
      io.to(user.socketId).emit('getMessage', {
        sender,
        text,
      });
    }
  });

  //when disconnect
  socket.on('disconnect', () => {
    console.log('a user disconnected!');
    removeUser(socket.id);
    io.emit('getUsers', users);
  });
});
