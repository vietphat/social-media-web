const authRouter = require('./auth');
const userRouter = require('./user');
const postRouter = require('./post');
const commentRouter = require('./comment');

const router = (app) => {
  app.use('/api/auth', authRouter);
  app.use('/api/users', userRouter);
  app.use('/api/posts', postRouter);
  app.use('/api/comments', commentRouter);
};

module.exports = router;
