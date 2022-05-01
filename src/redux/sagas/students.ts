import { takeLatest } from "redux-saga/effects";
import axios, { AxiosResponse } from "axios";
import {
  getStudents,
  getStudentDetail,
  postCreateStudent,
  putUpdateStudent,
  deleteStudent,
  getStudentsLecturer,
  getStudentDetailLecturer,
  postCreateStudentLecturer,
  putUpdateStudentLecturer,
} from "../actions/studentsActions";
import {
  getStudentsApi,
  getStudentDetailApi,
  postCreateStudentApi,
  putUpdateStudentApi,
  deleteStudentApi,
  getStudentsApiLecturer,
  getStudentDetailApiLecturer,
  postCreateStudentLecturerApi,
  putUpdateStudentLecturerApi,
} from "../../apis";
import { 
  lecturers, 
  students, 
  student_to_lecturer 
} from "../../types";

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

function* getStudentsLecturerSaga({ payload }: ReturnType<typeof getStudentsLecturer.request>) {
  try {
    const response: AxiosResponse<{ data: student_to_lecturer[]; count: number }> =
      yield axios.get(getStudentsApiLecturer, {
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
    const response: AxiosResponse<students> = yield axios.get( 
      getStudentDetailApi + payload.id
    );
    payload.onSuccess(response.data);
  } catch (err: any) {
    console.error(err.response);
    payload.onFailure(err.data);
  }
}

function* getStudentDetailSagaLecturer({
  payload,
}: ReturnType<typeof getStudentDetailLecturer.request>) {
  try {
    const response: AxiosResponse<{ data: student_to_lecturer, studentProgress: number }> = yield axios.get(
      getStudentDetailApiLecturer + payload.id
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

function* postCreateStudentLecturerSaga({
  payload,
}: ReturnType<typeof postCreateStudentLecturer.request>) {
  try {
    const response: AxiosResponse<lecturers> = yield axios.post(
      postCreateStudentLecturerApi,
      payload.data
    );

    payload.onSuccess(response.data);
  } catch (err: any) {
    console.error(err.response);
    payload.onFailure({ message: err?.response?.data } as Error);
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

function* putUpdateStudentLecturerSaga({
  payload,
}: ReturnType<typeof putUpdateStudentLecturer.request>) {
  try {
    const response: AxiosResponse<lecturers> = yield axios.post(
      putUpdateStudentLecturerApi,
      payload.data
    );

    payload.onSuccess(response.data);
  } catch (err: any) {
    // console.error(err.response);
    // payload.onFailure({ message: err?.response?.data } as Error);
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
  yield takeLatest(getStudentsLecturer.request, getStudentsLecturerSaga);
  yield takeLatest(getStudentDetail.request, getStudentDetailSaga);
  yield takeLatest(getStudentDetailLecturer.request, getStudentDetailSagaLecturer);
  yield takeLatest(postCreateStudent.request, postCreateStudentSaga);
  yield takeLatest(postCreateStudentLecturer.request, postCreateStudentLecturerSaga);
  yield takeLatest(putUpdateStudent.request, putUpdateStudentSaga);
  yield takeLatest(putUpdateStudentLecturer.request, putUpdateStudentLecturerSaga);
  yield takeLatest(deleteStudent.request, deleteStudentSaga);
}
