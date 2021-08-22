import { createAsyncAction } from "typesafe-actions";
import { lecturers } from "../../types";

/**
 * Shallow merge new state with current app reducer state and initial state
 * Useful to update persistor state when reducer has new params
 *
 * @param state params of the app reducer
 */
export const getLecturers = createAsyncAction(
  "REQUEST_GET_LECTURER",
  "SUCCESS_GET_LECTURER",
  "ERROR_GET_LECTURER"
)<
  {
    page?: number;
    onSuccess: (res: lecturers[], count: number) => void;
    onFailure: (err: Error) => void;
  },
  string,
  Error
>();

export const getLecturerDetail = createAsyncAction(
  "REQUEST_GET_LECTURER_DETAIL",
  "SUCCESS_GET_LECTURER_DETAIL",
  "ERROR_GET_LECTURER_DETAIL"
)<
  {
    id: string;
    onSuccess: (res: lecturers) => void;
    onFailure: (err: Error) => void;
  },
  string,
  Error
>();

export const postCreateLecturer = createAsyncAction(
  "REQUEST_POST_CREATE_LECTURER",
  "SUCCESS_POST_CREATE_LECTURER",
  "ERROR_GET_POST_CREATE_LECTURER"
)<
  {
    data: {
      nip: string;
      name: string;
      position: string;
    };
    onSuccess: (res: lecturers) => void;
    onFailure: (err: Error) => void;
  },
  string,
  Error
>();

export const putUpdateLecturer = createAsyncAction(
  "REQUEST_PUT_UPDATE_LECTURER",
  "SUCCESS_PUT_UPDATE_LECTURER",
  "ERROR_GET_PUT_UPDATE_LECTURER"
)<
  {
    id: string;
    data: {
      nip: string;
      name: string;
      position: string;
    };
    onSuccess: (res: lecturers) => void;
    onFailure: (err: Error) => void;
  },
  string,
  Error
>();

export const deleteLecturer = createAsyncAction(
  "REQUEST_DELETE_LECTURER",
  "SUCCESS_DELETE_LECTURER",
  "ERROR_GET_DELETE_LECTURER"
)<
  {
    id: string;
    onSuccess: () => void;
    onFailure: (err: Error) => void;
  },
  string,
  Error
>();
