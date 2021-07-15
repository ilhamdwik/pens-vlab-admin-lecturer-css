import { createAsyncAction } from "typesafe-actions";
import { classes } from "../../types";

/**
 * Shallow merge new state with current app reducer state and initial state
 * Useful to update persistor state when reducer has new params
 *
 * @param state params of the app reducer
 */
export const getClasses = createAsyncAction(
  "REQUEST_GET_CLASS",
  "SUCCESS_GET_CLASS",
  "ERROR_GET_CLASS"
)<
  {
    page?: number;
    onSuccess: (res: classes[], count: number) => void;
    onFailure: (err: Error) => void;
  },
  string,
  Error
>();

export const getStudentsInClass = createAsyncAction(
  "REQUEST_GET_STUDENTS_IN_CLASS",
  "SUCCESS_GET_STUDENTS_IN_CLASS",
  "ERROR_GET_STUDENTS_IN_CLASS"
)<
  {
    id: string;
    onSuccess: (res: classes) => void;
    onFailure: (err: Error) => void;
  },
  string,
  Error
>();

export const getClassDetail = createAsyncAction(
  "REQUEST_GET_CLASS_DETAIL",
  "SUCCESS_GET_CLASS_DETAIL",
  "ERROR_GET_CLASS_DETAIL"
)<
  {
    id: string;
    onSuccess: (res: classes) => void;
    onFailure: (err: Error) => void;
  },
  string,
  Error
>();

export const postCreateClass = createAsyncAction(
  "REQUEST_POST_CREATE_CLASS",
  "SUCCESS_POST_CREATE_CLASS",
  "ERROR_GET_POST_CREATE_CLASS"
)<
  {
    data: classes;
    onSuccess: (res: classes) => void;
    onFailure: (err: Error) => void;
  },
  string,
  Error
>();

export const putUpdateClass = createAsyncAction(
  "REQUEST_PUT_UPDATE_CLASS",
  "SUCCESS_PUT_UPDATE_CLASS",
  "ERROR_GET_PUT_UPDATE_CLASS"
)<
  {
    id: string;
    data: classes;
    onSuccess: (res: classes) => void;
    onFailure: (err: Error) => void;
  },
  string,
  Error
>();

export const deleteClass = createAsyncAction(
  "REQUEST_DELETE_CLASS",
  "SUCCESS_DELETE_CLASS",
  "ERROR_GET_DELETE_CLASS"
)<
  {
    id: string;
    onSuccess: () => void;
    onFailure: (err: Error) => void;
  },
  string,
  Error
>();
