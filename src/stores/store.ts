import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import { persistReducer, persistStore } from "redux-persist";
import type { WebStorage } from "redux-persist/es/types";
import storage from "redux-persist/lib/storage";

const getStorage = (): WebStorage => {
  const maybeStorage = storage as unknown;

  // Check if it's the wrapped version { default: WebStorage }
  if (
    maybeStorage &&
    typeof maybeStorage === "object" &&
    "default" in maybeStorage
  ) {
    return (maybeStorage as { default: WebStorage }).default;
  }

  // Otherwise, return it as the standard WebStorage
  return maybeStorage as WebStorage;
};

const persistConfig = {
  key: "root",
  storage: getStorage(),
  whitelist: ["auth"],
};

const rootReducer = combineReducers({
  auth: authReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
