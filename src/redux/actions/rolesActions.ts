import { createAsyncAction } from "typesafe-actions";
import { roles } from "../../types";

/**
 * Shallow merge new state with current app reducer state and initial state
 * Useful to update persistor state when reducer has new params
 *
 * @param state params of the app reducer
 */
export const getRoles = createAsyncAction(
  "REQUEST_GET_ROLE",
  "SUCCESS_GET_ROLE",
  "ERROR_GET_ROLE"
)<
  {
    page?: number;
    onSuccess: (res: roles[], count: number) => void;
    onFailure: (err: Error) => void;
  },
  string,
  Error
>();

export const getRoleDetail = createAsyncAction(
  "REQUEST_GET_ROLE_DETAIL",
  "SUCCESS_GET_ROLE_DETAIL",
  "ERROR_GET_ROLE_DETAIL"
)<
  {
    id: string;
    onSuccess: (res: roles) => void;
    onFailure: (err: Error) => void;
  },
  string,
  Error
>();

export const postCreateRole = createAsyncAction(
  "REQUEST_POST_CREATE_ROLE",
  "SUCCESS_POST_CREATE_ROLE",
  "ERROR_GET_POST_CREATE_ROLE"
)<
  {
    data: roles;
    onSuccess: (res: roles) => void;
    onFailure: (err: Error) => void;
  },
  string,
  Error
>();

export const putUpdateRole = createAsyncAction(
  "REQUEST_PUT_UPDATE_ROLE",
  "SUCCESS_PUT_UPDATE_ROLE",
  "ERROR_GET_PUT_UPDATE_ROLE"
)<
  {
    id: string;
    data: roles;
    onSuccess: (res: roles) => void;
    onFailure: (err: Error) => void;
  },
  string,
  Error
>();

export const deleteRole = createAsyncAction(
  "REQUEST_DELETE_ROLE",
  "SUCCESS_DELETE_ROLE",
  "ERROR_GET_DELETE_ROLE"
)<
  {
    id: string;
    onSuccess: () => void;
    onFailure: (err: Error) => void;
  },
  string,
  Error
>();
