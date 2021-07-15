import { createAsyncAction } from "typesafe-actions";
import { submodules } from "../../types";

/**
 * Shallow merge new state with current app reducer state and initial state
 * Useful to update persistor state when reducer has new params
 *
 * @param state params of the app reducer
 */
export const getLessons = createAsyncAction(
  "REQUEST_GET_LESSON",
  "SUCCESS_GET_LESSON",
  "ERROR_GET_LESSON"
)<
  {
    page?: number;
    onSuccess: (res: submodules[], count: number) => void;
    onFailure: (err: Error) => void;
  },
  string,
  Error
>();

export const getLessonDetail = createAsyncAction(
  "REQUEST_GET_LESSON_DETAIL",
  "SUCCESS_GET_LESSON_DETAIL",
  "ERROR_GET_LESSON_DETAIL"
)<
  {
    id: string;
    onSuccess: (res: submodules) => void;
    onFailure: (err: Error) => void;
  },
  string,
  Error
>();

export const postCreateLesson = createAsyncAction(
  "REQUEST_POST_CREATE_LESSON",
  "SUCCESS_POST_CREATE_LESSON",
  "ERROR_GET_POST_CREATE_LESSON"
)<
  {
    data: {
      title: string;
      module_id: string;
      contents: string;
      order: number;
      is_exercise: boolean;
      exercise?: {
        placeholder: string;
        expected_output: string;
        expected_code: string;
      };
    };
    onSuccess: (res: submodules) => void;
    onFailure: (err: Error) => void;
  },
  string,
  Error
>();

export const putUpdateLesson = createAsyncAction(
  "REQUEST_PUT_UPDATE_LESSON",
  "SUCCESS_PUT_UPDATE_LESSON",
  "ERROR_GET_PUT_UPDATE_LESSON"
)<
  {
    id: string;
    data: {
      title: string;
      module_id: string;
      contents: string;
      order: number;
      is_exercise: boolean;
      exercise?: {
        placeholder: string;
        expected_output: string;
        expected_code: string;
      };
    };
    onSuccess: (res: submodules) => void;
    onFailure: (err: Error) => void;
  },
  string,
  Error
>();

export const deleteLesson = createAsyncAction(
  "REQUEST_DELETE_LESSON",
  "SUCCESS_DELETE_LESSON",
  "ERROR_GET_DELETE_LESSON"
)<
  {
    id: string;
    onSuccess: () => void;
    onFailure: (err: Error) => void;
  },
  string,
  Error
>();
