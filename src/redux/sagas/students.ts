import { takeLatest } from "redux-saga/effects";
import axios, { AxiosResponse } from "axios";
import {
  getStudents,
  getStudentDetail,
  postCreateStudent,
  putUpdateStudent,
  deleteStudent,
} from "../actions/studentsActions";
import {
  getStudentsApi,
  getStudentDetailApi,
  postCreateStudentApi,
  putUpdateStudentApi,
  deleteStudentApi,
} from "../../apis";
import { students } from "../../types";

function* getStudentsSaga({ payload }: ReturnType<typeof getStudents.request>) {
  try {
    const response: AxiosResponse<{ data: students[]; count: number }> =
      yield axios.get(getStudentsApi, {
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

function* getStudentDetailSaga({
  payload,
}: ReturnType<typeof getStudentDetail.request>) {
  try {
    const response: AxiosResponse<{ data: students, studentProgress: number }> = yield axios.get(
      getStudentDetailApi + payload.id
    );
    payload.onSuccess(response.data.data, response.data.studentProgress);
  } catch (err: any) {
    console.error(err.response);
    payload.onFailure(err.data);
  }
}

function* postCreateStudentSaga({
  payload,
}: ReturnType<typeof postCreateStudent.request>) {
  try {
    const response: AxiosResponse<students> = yield axios.post(
      postCreateStudentApi,
      payload.data
    );

    payload.onSuccess(response.data);
  } catch (err: any) {
    console.error(err.response);
    payload.onFailure(err);
  }
}

function* putUpdateStudentSaga({
  payload,
}: ReturnType<typeof putUpdateStudent.request>) {
  try {
    const response: AxiosResponse<students> = yield axios.put(
      putUpdateStudentApi + payload.id,
      payload.data
    );

    payload.onSuccess(response.data);
  } catch (err: any) {
    console.error(err.response);
    payload.onFailure(err);
  }
}

function* deleteStudentSaga({
  payload,
}: ReturnType<typeof deleteStudent.request>) {
  try {
    yield axios.delete(deleteStudentApi + payload.id);

    payload.onSuccess();
  } catch (err: any) {
    console.error(err.response);
    payload.onFailure(err);
  }
}

export default function* studentsSaga() {
  yield takeLatest(getStudents.request, getStudentsSaga);
  yield takeLatest(getStudentDetail.request, getStudentDetailSaga);
  yield takeLatest(postCreateStudent.request, postCreateStudentSaga);
  yield takeLatest(putUpdateStudent.request, putUpdateStudentSaga);
  yield takeLatest(deleteStudent.request, deleteStudentSaga);
}
