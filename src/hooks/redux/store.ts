import {
  configureStore,
  combineReducers,
} from "@reduxjs/toolkit";
import { alertsReducer } from "./reducers/alertsReducer";
import { currUserReducer } from "./reducers/currentUserReducers";
import { errorReducer } from "./reducers/errorReducer";
import { postsReducer } from "./reducers/postsReducer";
import {userReducer} from "./reducers/userReducer";

const rootReducer = combineReducers({
  userReducer: userReducer,
  alertReducer : alertsReducer,
  currUserReducer: currUserReducer,
  errorReducer: errorReducer,
  postsReducer: postsReducer
});


const store = configureStore({
  reducer: rootReducer,
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof rootReducer>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
