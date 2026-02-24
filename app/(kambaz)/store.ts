import { configureStore } from "@reduxjs/toolkit";
import coursesReducer from "./courses/reducer";
import modulesReducer from "./courses/[cid]/modules/reducer";
import accountReducer from "./account/reducer";

const store = configureStore({
  reducer: { coursesReducer, modulesReducer, accountReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;