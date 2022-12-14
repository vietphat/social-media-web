const routes = {
    home: '/',
    register: '/register',
    login: '/login',
    forgotPassword: '/forgot-password',
    resetPassword: '/reset-password/:token',
    profile: '/profile/:userId',
    changeInfo: '/change-info',
    changePassword: '/change-password',
    chatbox: '/chatbox/:conversationId',
    liked: '/liked',
    explore: '/explore',
};

export default routes;
