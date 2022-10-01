const userRouter = require('./user');

const router = (app) => {
  app.use('/api/users', userRouter);
};

module.exports = router;
