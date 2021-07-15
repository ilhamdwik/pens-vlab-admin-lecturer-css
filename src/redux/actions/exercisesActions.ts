import { createAsyncAction } from "typesafe-actions";
import { submodule_exercises } from "../../types";

/**
 * Shallow merge new state with current app reducer state and initial state
 * Useful to update persistor state when reducer has new params
 *
 * @param state params of the app reducer
 */
export const getExercises = createAsyncAction(
  "REQUEST_GET_EXERCISE",
  "SUCCESS_GET_EXERCISE",
  "ERROR_GET_EXERCISE"
)<
  {
    page?: number;
    onSuccess: (res: submodule_exercises[], count: number) => void;
    onFailure: (err: Error) => void;
  },
  string,
  Error
>();

export const getExerciseDetail = createAsyncAction(
  "REQUEST_GET_EXERCISE_DETAIL",
  "SUCCESS_GET_EXERCISE_DETAIL",
  "ERROR_GET_EXERCISE_DETAIL"
)<
  {
    id: string;
    onSuccess: (res: submodule_exercises) => void;
    onFailure: (err: Error) => void;
  },
  string,
  Error
>();

export const postCreateExercise = createAsyncAction(
  "REQUEST_POST_CREATE_EXERCISE",
  "SUCCESS_POST_CREATE_EXERCISE",
  "ERROR_GET_POST_CREATE_EXERCISE"
)<
  {
    data: submodule_exercises;
    onSuccess: (res: submodule_exercises) => void;
    onFailure: (err: Error) => void;
  },
  string,
  Error
>();

export const putUpdateExercise = createAsyncAction(
  "REQUEST_PUT_UPDATE_EXERCISE",
  "SUCCESS_PUT_UPDATE_EXERCISE",
  "ERROR_GET_PUT_UPDATE_EXERCISE"
)<
  {
    id: string;
    data: submodule_exercises;
    onSuccess: (res: submodule_exercises) => void;
    onFailure: (err: Error) => void;
  },
  string,
  Error
>();

export const deleteExercise = createAsyncAction(
  "REQUEST_DELETE_EXERCISE",
  "SUCCESS_DELETE_EXERCISE",
  "ERROR_GET_DELETE_EXERCISE"
)<
  {
    id: string;
    onSuccess: () => void;
    onFailure: (err: Error) => void;
  },
  string,
  Error
>();
