import { createAsyncAction } from "typesafe-actions";
import { prog_languages } from "../../types";

/**
 * Shallow merge new state with current app reducer state and initial state
 * Useful to update persistor state when reducer has new params
 *
 * @param state params of the app reducer
 */
export const getCourses = createAsyncAction(
  "REQUEST_GET_COURSE",
  "SUCCESS_GET_COURSE",
  "ERROR_GET_COURSE"
)<
  {
    page?: number;
    onSuccess: (res: prog_languages[], count: number) => void;
    onFailure: (err: Error) => void;
  },
  string,
  Error
>();

export const getCourseDetail = createAsyncAction(
  "REQUEST_GET_COURSE_DETAIL",
  "SUCCESS_GET_COURSE_DETAIL",
  "ERROR_GET_COURSE_DETAIL"
)<
  {
    id: string;
    onSuccess: (res: prog_languages) => void;
    onFailure: (err: Error) => void;
  },
  string,
  Error
>();

export const postCreateCourse = createAsyncAction(
  "REQUEST_POST_CREATE_COURSE",
  "SUCCESS_POST_CREATE_COURSE",
  "ERROR_GET_POST_CREATE_COURSE"
)<
  {
    data: FormData;
    onSuccess: (res: prog_languages) => void;
    onFailure: (err: Error) => void;
  },
  string,
  Error
>();

export const putUpdateCourse = createAsyncAction(
  "REQUEST_PUT_UPDATE_COURSE",
  "SUCCESS_PUT_UPDATE_COURSE",
  "ERROR_GET_PUT_UPDATE_COURSE"
)<
  {
    id: string;
    data: FormData;
    onSuccess: (res: prog_languages) => void;
    onFailure: (err: Error) => void;
  },
  string,
  Error
>();

export const deleteCourse = createAsyncAction(
  "REQUEST_DELETE_COURSE",
  "SUCCESS_DELETE_COURSE",
  "ERROR_GET_DELETE_COURSE"
)<
  {
    id: string;
    onSuccess: () => void;
    onFailure: (err: Error) => void;
  },
  string,
  Error
>();
