import { configureStore } from '@reduxjs/toolkit';
import video from '../components/video-items/videoSlice';

const stringMidleWare = () => (next) => (action) => {
    if(typeof action === 'string'){
        return next({
            type: action
        })
    }
    return next(action)
}

const store = configureStore({
    reducer: {video},
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(stringMidleWare),
    devTools: process.env.NODE_ENV !== 'production'
})             

export default store;