import { takeLatest } from "redux-saga/effects";
import axios, { AxiosResponse } from "axios";
import {
  getLessons,
  getLessonDetail,
  postCreateLesson,
  putUpdateLesson,
  deleteLesson,
} from "../actions/lessonsActions";
import {
  getLessonsApi,
  getLessonDetailApi,
  postCreateLessonApi,
  putUpdateLessonApi,
  deleteLessonApi,
} from "../../apis";
import { submodules } from "../../types";

function* getLessonsSaga({ payload }: ReturnType<typeof getLessons.request>) {
  try {
    const response: AxiosResponse<{ data: submodules[]; count: number }> =
      yield axios.get(getLessonsApi, {
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

function* getLessonDetailSaga({
  payload,
}: ReturnType<typeof getLessonDetail.request>) {
  try {
    const response: AxiosResponse<submodules> = yield axios.get(
      getLessonDetailApi + payload.id
    );
    payload.onSuccess(response.data);
  } catch (err: any) {
    console.error(err.response);
    payload.onFailure(err.data);
  }
}

function* postCreateLessonSaga({
  payload,
}: ReturnType<typeof postCreateLesson.request>) {
  try {
    const response: AxiosResponse<submodules> = yield axios.post(
      postCreateLessonApi,
      payload.data
    );

    payload.onSuccess(response.data);
  } catch (err: any) {
    console.error(err.response);
    payload.onFailure(err);
  }
}

function* putUpdateLessonSaga({
  payload,
}: ReturnType<typeof putUpdateLesson.request>) {
  try {
    const response: AxiosResponse<submodules> = yield axios.put(
      putUpdateLessonApi + payload.id,
      payload.data
    );

    payload.onSuccess(response.data);
  } catch (err: any) {
    console.error(err.response);
    payload.onFailure(err);
  }
}

function* deleteLessonSaga({
  payload,
}: ReturnType<typeof deleteLesson.request>) {
  try {
    yield axios.delete(deleteLessonApi + payload.id);

    payload.onSuccess();
  } catch (err: any) {
    console.error(err.response);
    payload.onFailure(err);
  }
}

export default function* lessonsSaga() {
  yield takeLatest(getLessons.request, getLessonsSaga);
  yield takeLatest(getLessonDetail.request, getLessonDetailSaga);
  yield takeLatest(postCreateLesson.request, postCreateLessonSaga);
  yield takeLatest(putUpdateLesson.request, putUpdateLessonSaga);
  yield takeLatest(deleteLesson.request, deleteLessonSaga);
}
