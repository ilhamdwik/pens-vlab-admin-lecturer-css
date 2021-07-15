import { createAsyncAction } from "typesafe-actions";
import { modules } from "../../types";

/**
 * Shallow merge new state with current app reducer state and initial state
 * Useful to update persistor state when reducer has new params
 *
 * @param state params of the app reducer
 */
export const getModules = createAsyncAction(
  "REQUEST_GET_MODULE",
  "SUCCESS_GET_MODULE",
  "ERROR_GET_MODULE"
)<
  {
    page?: number;
    onSuccess: (res: modules[], count: number) => void;
    onFailure: (err: Error) => void;
  },
  string,
  Error
>();

export const getModuleDetail = createAsyncAction(
  "REQUEST_GET_MODULE_DETAIL",
  "SUCCESS_GET_MODULE_DETAIL",
  "ERROR_GET_MODULE_DETAIL"
)<
  {
    id: string;
    onSuccess: (res: modules) => void;
    onFailure: (err: Error) => void;
  },
  string,
  Error
>();

export const postCreateModule = createAsyncAction(
  "REQUEST_POST_CREATE_MODULE",
  "SUCCESS_POST_CREATE_MODULE",
  "ERROR_GET_POST_CREATE_MODULE"
)<
  {
    data: {
      prog_languages_id: string;
      title: string;
      order: number;
      overview: string;
    };
    onSuccess: (res: modules) => void;
    onFailure: (err: Error) => void;
  },
  string,
  Error
>();

export const putUpdateModule = createAsyncAction(
  "REQUEST_PUT_UPDATE_MODULE",
  "SUCCESS_PUT_UPDATE_MODULE",
  "ERROR_GET_PUT_UPDATE_MODULE"
)<
  {
    id: string;
    data: {
      prog_languages_id: string;
      title: string;
      order: number;
      overview: string;
    };
    onSuccess: (res: modules) => void;
    onFailure: (err: Error) => void;
  },
  string,
  Error
>();

export const deleteModule = createAsyncAction(
  "REQUEST_DELETE_MODULE",
  "SUCCESS_DELETE_MODULE",
  "ERROR_GET_DELETE_MODULE"
)<
  {
    id: string;
    onSuccess: () => void;
    onFailure: (err: Error) => void;
  },
  string,
  Error
>();
