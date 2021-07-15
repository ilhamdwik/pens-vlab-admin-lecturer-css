import { takeLatest } from "redux-saga/effects";
import axios, { AxiosResponse } from "axios";
import {
  getLecturers,
  getLecturerDetail,
  postCreateLecturer,
  putUpdateLecturer,
  deleteLecturer,
} from "../actions/lecturersActions";
import {
  getLecturersApi,
  getLecturerDetailApi,
  postCreateLecturerApi,
  putUpdateLecturerApi,
  deleteLecturerApi,
} from "../../apis";
import { lecturers } from "../../types";

function* getLecturersSaga({
  payload,
}: ReturnType<typeof getLecturers.request>) {
  try {
    const response: AxiosResponse<{ data: lecturers[]; count: number }> =
      yield axios.get(getLecturersApi, {
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

function* getLecturerDetailSaga({
  payload,
}: ReturnType<typeof getLecturerDetail.request>) {
  try {
    const response: AxiosResponse<lecturers> = yield axios.get(
      getLecturerDetailApi + payload.id
    );
    payload.onSuccess(response.data);
  } catch (err: any) {
    console.error(err.response);
    payload.onFailure(err.data);
  }
}

function* postCreateLecturerSaga({
  payload,
}: ReturnType<typeof postCreateLecturer.request>) {
  try {
    const response: AxiosResponse<lecturers> = yield axios.post(
      postCreateLecturerApi,
      payload.data
    );

    payload.onSuccess(response.data);
  } catch (err: any) {
    console.error(err.response);
    payload.onFailure(err);
  }
}

function* putUpdateLecturerSaga({
  payload,
}: ReturnType<typeof putUpdateLecturer.request>) {
  try {
    const response: AxiosResponse<lecturers> = yield axios.put(
      putUpdateLecturerApi + payload.id,
      payload.data
    );

    payload.onSuccess(response.data);
  } catch (err: any) {
    console.error(err.response);
    payload.onFailure(err);
  }
}

function* deleteLecturerSaga({
  payload,
}: ReturnType<typeof deleteLecturer.request>) {
  try {
    yield axios.delete(deleteLecturerApi + payload.id);

    payload.onSuccess();
  } catch (err: any) {
    console.error(err.response);
    payload.onFailure(err);
  }
}

export default function* lecturersSaga() {
  yield takeLatest(getLecturers.request, getLecturersSaga);
  yield takeLatest(getLecturerDetail.request, getLecturerDetailSaga);
  yield takeLatest(postCreateLecturer.request, postCreateLecturerSaga);
  yield takeLatest(putUpdateLecturer.request, putUpdateLecturerSaga);
  yield takeLatest(deleteLecturer.request, deleteLecturerSaga);
}
