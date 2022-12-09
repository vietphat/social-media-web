const routes = {
    home: '/',
    register: '/register',
    login: '/login',
    forgotPassword: '/forgot-password',
    resetPassword: '/reset-password/:token',
    inbox: '/inbox/:conversationId',
    profile: '/profile/:userId',
    changeInfo: '/change-info',
    changePassword: '/change-password',
    chatbox: '/chatbox/:conversationId',
};

export default routes;
