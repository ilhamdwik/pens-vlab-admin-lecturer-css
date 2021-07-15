import { createAsyncAction } from "typesafe-actions";
import { users } from "../../types";

/**
 * Shallow merge new state with current app reducer state and initial state
 * Useful to update persistor state when reducer has new params
 *
 * @param state params of the app reducer
 */
export const getUsers = createAsyncAction(
  "REQUEST_GET_USER",
  "SUCCESS_GET_USER",
  "ERROR_GET_USER"
)<
  {
    page?: number;
    onSuccess: (res: users[], count: number) => void;
    onFailure: (err: Error) => void;
  },
  string,
  Error
>();

export const getUserDetail = createAsyncAction(
  "REQUEST_GET_USER_DETAIL",
  "SUCCESS_GET_USER_DETAIL",
  "ERROR_GET_USER_DETAIL"
)<
  {
    id: string;
    onSuccess: (res: users) => void;
    onFailure: (err: Error) => void;
  },
  string,
  Error
>();

export const postCreateUser = createAsyncAction(
  "REQUEST_POST_CREATE_USER",
  "SUCCESS_POST_CREATE_USER",
  "ERROR_GET_POST_CREATE_USER"
)<
  {
    data: {
      email: string;
      roles: string[];
    };
    onSuccess: (res: users) => void;
    onFailure: (err: Error) => void;
  },
  string,
  Error
>();

export const putUpdateUser = createAsyncAction(
  "REQUEST_PUT_UPDATE_USER",
  "SUCCESS_PUT_UPDATE_USER",
  "ERROR_GET_PUT_UPDATE_USER"
)<
  {
    id: string;
    data: {
      email: string;
      roles: string[];
    };
    onSuccess: (res: users) => void;
    onFailure: (err: Error) => void;
  },
  string,
  Error
>();

export const deleteUser = createAsyncAction(
  "REQUEST_DELETE_USER",
  "SUCCESS_DELETE_USER",
  "ERROR_GET_DELETE_USER"
)<
  {
    id: string;
    onSuccess: () => void;
    onFailure: (err: Error) => void;
  },
  string,
  Error
>();
