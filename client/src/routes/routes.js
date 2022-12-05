import { NoSuggestionsLayout } from '~/layouts';
import config from '~/config';

// pages
import Home from '~/pages/Home';
import Login from '~/pages/Login';
import Register from '~/pages/Register';
import Profile from '~/pages/Profile';

// public routes
const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.register, component: Register, layout: null },
    { path: config.routes.login, component: Login, layout: null },
    { path: config.routes.profile, component: Profile, layout: NoSuggestionsLayout },
    // { path: config.routes.upload, component: Upload, layout: HeaderOnly },
    // { path: config.routes.search, component: Search, layout: null },
];

// private routes
const privateRoutes = [];

export { publicRoutes, privateRoutes };
