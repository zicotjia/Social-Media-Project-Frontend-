import {
  configureStore,
  combineReducers,
} from "@reduxjs/toolkit";
import { alertsReducer } from "./reducers/alertsReducer";
import { currUserReducer } from "./reducers/currentUserReducers";
import { errorReducer } from "./reducers/errorReducer";
import { pageReducer } from "./reducers/pageReducer";
import { postsReducer } from "./reducers/postsReducer";
import {usersReducer} from "./reducers/usersReducer";

const rootReducer = combineReducers({
  usersReducer: usersReducer,
  alertReducer : alertsReducer,
  currUserReducer: currUserReducer,
  postsReducer: postsReducer,
  pageReducer: pageReducer,
  errorReducer: errorReducer
});


const store = configureStore({
  reducer: rootReducer,
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof rootReducer>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
