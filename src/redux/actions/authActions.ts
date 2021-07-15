import { createAction, createAsyncAction } from "typesafe-actions";

export const setUser = createAction("SET_USER", (user?: {}) => user)();

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
      userCas: {
        email: string;
        nip?: string;
        nrp?: string;
      };
    };
    onSuccess: (res: string) => void;
    onFailure: (err: Error) => void;
  },
  string,
  Error
>();
