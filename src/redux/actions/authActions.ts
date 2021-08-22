import { createAction, createAsyncAction } from "typesafe-actions";
import { EtholLecturer } from "../../types";

export const setUser = createAction("SET_USER", (user?: {}) => user)();
export const setToken = createAction(
  "SET_TOKEN",
  (token: string | undefined) => token
)();

export const fetchEtholUserDetail = createAsyncAction(
  "ETHOL_USER_REQUEST",
  "ETHOL_USER_SUCCESS",
  "ETHOL_USER_ERROR"
)<
  {
    token: string;
    onSuccess: (res: EtholLecturer) => void;
    onFailure: (err: Error) => void;
  },
  string,
  Error
>();

export const postLogin = createAsyncAction(
  "REQUEST_POST_LOGIN",
  "SUCCESS_POST_LOGIN",
  "ERROR_GET_POST_LOGIN"
)<
  {
    data: {
      email: string;
      pswd: string;
    };
    onSuccess: (res: { token: string }) => void;
    onFailure: (err: Error) => void;
  },
  string,
  Error
>();

export const fetchUserCheck = createAsyncAction(
  "USER_CHECK_REQUEST",
  "USER_CHECK_SUCCESS",
  "USER_CHECK_ERROR"
)<
  {
    data: {
      token: string;
      userDetail: EtholLecturer;
    };
    onSuccess: (res: string) => void;
    onFailure: (err: Error) => void;
  },
  string,
  Error
>();
