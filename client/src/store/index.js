import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import userReducer from './userSlice';
import timelineReducer from './timelineSlice';

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
};

const rootReducer = combineReducers({ user: userReducer, timeline: timelineReducer });
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

const persistor = persistStore(store);

export { loginStart, loginSuccess, loginFailed, logout, follow, unfollow, replaceUserData } from './userSlice';
export {
    setTimelinePosts,
    createPost,
    fetchTimelinePosts,
    likePost,
    unlikePost,
    likeComment,
    unlikeComment,
    addComment,
} from './timelineSlice';

// export { fetchStart, fetchSuccess, fetchFailed, like, dislike } from './postsSlice';
export { persistor };
export default store;
