import { createStore } from "redux";
import rootReducer from "./reducer/index";

const store = createStore(rootReducer)

export default store

export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch