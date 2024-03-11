import {configureStore} from '@reduxjs/toolkit';
import { postReducer } from './slices/post';

const store = configureStore({
    reducer: {
        posts: postReducer
    }
})

export default store;