import { NoSuggestionsLayout } from '~/layouts';
import config from '~/config';

// pages
import Home from '~/pages/Home';
import Login from '~/pages/Login';
import Register from '~/pages/Register';
import Profile from '~/pages/Profile';
import ForgotPassword from '~/pages/ForgotPassword';
import ResetPassword from '~/pages/ResetPassword';
import Inbox from '~/pages/Inbox';
import ChatBox from '~/pages/ChatBox';
import ChangeInfo from '~/pages/ChangeInfo';

// public routes
const publicRoutes = [
    { path: config.routes.register, component: Register, layout: null },
    { path: config.routes.login, component: Login, layout: null },
    { path: config.routes.forgotPassword, component: ForgotPassword, layout: null },
    { path: config.routes.resetPassword, component: ResetPassword, layout: null },
];

// private routes
const privateRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.profile, component: Profile, layout: NoSuggestionsLayout },
    { path: config.routes.inbox, component: Inbox, layout: NoSuggestionsLayout },
    { path: config.routes.chatbox, component: ChatBox, layout: NoSuggestionsLayout },
    { path: config.routes.changeInfo, component: ChangeInfo, layout: NoSuggestionsLayout },
];

export { publicRoutes, privateRoutes };
