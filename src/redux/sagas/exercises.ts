import { takeLatest } from "redux-saga/effects";
import axios, { AxiosResponse } from "axios";
import {
  getExercises,
  getExerciseDetail,
  postCreateExercise,
  putUpdateExercise,
  deleteExercise,
} from "../actions/exercisesActions";
import {
  getExercisesApi,
  getExerciseDetailApi,
  postCreateExerciseApi,
  putUpdateExerciseApi,
  deleteExerciseApi,
} from "../../apis";
import { submodule_exercises } from "../../types";

function* getExercisesSaga({
  payload,
}: ReturnType<typeof getExercises.request>) {
  try {
    const response: AxiosResponse<{ data: submodule_exercises[]; count: number }> =
      yield axios.get(getExercisesApi, {
        params: {
          page: payload.page,
        },
      });

    payload.onSuccess(response.data.data, response.data.count);
  } catch (err: any) {
    console.error(err.response);
    payload.onFailure(err);
  }
}

function* getExerciseDetailSaga({
  payload,
}: ReturnType<typeof getExerciseDetail.request>) {
  try {
    const response: AxiosResponse<submodule_exercises> = yield axios.get(
      getExerciseDetailApi + payload.id
    );
    payload.onSuccess(response.data);
  } catch (err: any) {
    console.error(err.response);
    payload.onFailure(err.data);
  }
}

function* postCreateExerciseSaga({
  payload,
}: ReturnType<typeof postCreateExercise.request>) {
  try {
    const response: AxiosResponse<submodule_exercises> = yield axios.post(
      postCreateExerciseApi,
      payload.data
    );

    payload.onSuccess(response.data);
  } catch (err: any) {
    console.error(err.response);
    payload.onFailure(err);
  }
}

function* putUpdateExerciseSaga({
  payload,
}: ReturnType<typeof putUpdateExercise.request>) {
  try {
    const response: AxiosResponse<submodule_exercises> = yield axios.put(
      putUpdateExerciseApi + payload.id,
      payload.data
    );

    payload.onSuccess(response.data);
  } catch (err: any) {
    console.error(err.response);
    payload.onFailure(err);
  }
}

function* deleteExerciseSaga({
  payload,
}: ReturnType<typeof deleteExercise.request>) {
  try {
    yield axios.delete(deleteExerciseApi + payload.id);

    payload.onSuccess();
  } catch (err: any) {
    console.error(err.response);
    payload.onFailure(err);
  }
}

export default function* exercisesSaga() {
  yield takeLatest(getExercises.request, getExercisesSaga);
  yield takeLatest(getExerciseDetail.request, getExerciseDetailSaga);
  yield takeLatest(postCreateExercise.request, postCreateExerciseSaga);
  yield takeLatest(putUpdateExercise.request, putUpdateExerciseSaga);
  yield takeLatest(deleteExercise.request, deleteExerciseSaga);
}
