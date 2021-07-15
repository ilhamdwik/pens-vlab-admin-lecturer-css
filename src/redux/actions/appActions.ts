import { createAction, createAsyncAction } from "typesafe-actions";
import { AppReducerState } from "../reducers/appReducer";

/**
 * Shallow merge new state with current app reducer state and initial state
 * Useful to update persistor state when reducer has new params
 *
 * @param state params of the app reducer
 */
export const setStoreState = createAction(
  "APP_SET_STORE_STATE",
  (state: Partial<AppReducerState>) => state
)();

export const toggleDarkMode = createAction(
  "TOGGLE_DARK_MODE",
  (dark: boolean) => dark
)();

export const getServerTime = createAsyncAction(
  "REQUEST_GET_SERVER_TIME",
  "SUCCESS_GET_SERVER_TIME",
  "ERROR_GET_GET_SERVER_TIME"
)<
  {
    onSuccess: (res: { time: number }) => void;
    onFailure: (err: Error) => void;
  },
  string,
  Error
>();
