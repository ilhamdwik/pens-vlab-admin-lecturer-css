import { takeLatest } from "redux-saga/effects";
import axios, { AxiosResponse } from "axios";
import {
  getCourses,
  getCourseDetail,
  postCreateCourse,
  putUpdateCourse,
  deleteCourse,
} from "../actions/coursesActions";
import {
  getCoursesApi,
  getCourseDetailApi,
  postCreateCourseApi,
  putUpdateCourseApi,
  deleteCourseApi,
} from "../../apis";
import { prog_languages } from "../../types";

function* getCoursesSaga({ payload }: ReturnType<typeof getCourses.request>) {
  try {
    const response: AxiosResponse<{ data: prog_languages[]; count: number }> =
      yield axios.get(getCoursesApi, {
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

function* getCourseDetailSaga({
  payload,
}: ReturnType<typeof getCourseDetail.request>) {
  try {
    const response: AxiosResponse<prog_languages> = yield axios.get(
      getCourseDetailApi + payload.id
    );
    payload.onSuccess(response.data);
  } catch (err: any) {
    console.error(err.response);
    payload.onFailure(err.data);
  }
}

function* postCreateCourseSaga({
  payload,
}: ReturnType<typeof postCreateCourse.request>) {
  try {
    const response: AxiosResponse<prog_languages> = yield axios.post(
      postCreateCourseApi,
      payload.data
    );

    payload.onSuccess(response.data);
  } catch (err: any) {
    console.error(err.response);
    payload.onFailure(err);
  }
}

function* putUpdateCourseSaga({
  payload,
}: ReturnType<typeof putUpdateCourse.request>) {
  try {
    const response: AxiosResponse<prog_languages> = yield axios.put(
      putUpdateCourseApi + payload.id,
      payload.data
    );

    payload.onSuccess(response.data);
  } catch (err: any) {
    console.error(err.response);
    payload.onFailure(err);
  }
}

function* deleteCourseSaga({
  payload,
}: ReturnType<typeof deleteCourse.request>) {
  try {
    yield axios.delete(deleteCourseApi + payload.id);

    payload.onSuccess();
  } catch (err: any) {
    console.error(err.response);
    payload.onFailure(err);
  }
}

export default function* coursesSaga() {
  yield takeLatest(getCourses.request, getCoursesSaga);
  yield takeLatest(getCourseDetail.request, getCourseDetailSaga);
  yield takeLatest(postCreateCourse.request, postCreateCourseSaga);
  yield takeLatest(putUpdateCourse.request, putUpdateCourseSaga);
  yield takeLatest(deleteCourse.request, deleteCourseSaga);
}
