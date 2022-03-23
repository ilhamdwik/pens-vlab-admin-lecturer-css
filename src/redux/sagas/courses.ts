import { takeLatest } from "redux-saga/effects";
import axios, { AxiosResponse } from "axios";
import {
  getCourses,
  getCourseDetail,
  postCreateCourse,
  putUpdateCourse,
  deleteCourse,
  // getCoursesLecturer,
  // getCourseDetailLecturer,
  // postCreateCourseLecturer,
  // putUpdateCourseLecturer,
  // deleteCourseLecturer,
} from "../actions/coursesActions";
import {
  getCoursesApi,
  getCourseDetailApi,
  postCreateCourseApi,
  putUpdateCourseApi,
  deleteCourseApi,
  // getCoursesApiLecturer,
  // getCourseDetailApiLecturer,
  // postCreateCourseApiLecturer,
  // putUpdateCourseApiLecturer,
  // deleteCourseApiLecturer,
} from "../../apis";
import { prog_languages } from "../../types";

// courses admin
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

// courses lecturer
// function* getCoursesSagaLecturer({ payload }: ReturnType<typeof getCoursesLecturer.request>) {
//   try {
//     const response: AxiosResponse<{ data: prog_languages[]; count: number }> =
//       yield axios.get(getCoursesApiLecturer, {
//         params: {
//           page: payload.page,
//         },
//       });

//     payload.onSuccess(response.data.data, response.data.count);
//   } catch (err: any) {
//     console.error(err.response);
//     payload.onFailure(err);
//   }
// }

// function* getCourseDetailSagaLecturer({
//   payload,
// }: ReturnType<typeof getCourseDetailLecturer.request>) {
//   try {
//     const response: AxiosResponse<prog_languages> = yield axios.get(
//       getCourseDetailApiLecturer + payload.id
//     );
//     payload.onSuccess(response.data);
//   } catch (err: any) {
//     console.error(err.response);
//     payload.onFailure(err.data);
//   }
// }

// function* postCreateCourseSagaLecturer({
//   payload,
// }: ReturnType<typeof postCreateCourseLecturer.request>) {
//   try {
//     const response: AxiosResponse<prog_languages> = yield axios.post(
//       postCreateCourseApiLecturer,
//       payload.data
//     );

//     payload.onSuccess(response.data);
//   } catch (err: any) {
//     console.error(err.response);
//     payload.onFailure(err);
//   }
// }

// function* putUpdateCourseSagaLecturer({
//   payload,
// }: ReturnType<typeof putUpdateCourseLecturer.request>) {
//   try {
//     const response: AxiosResponse<prog_languages> = yield axios.put(
//       putUpdateCourseApiLecturer + payload.id,
//       payload.data
//     );

//     payload.onSuccess(response.data);
//   } catch (err: any) {
//     console.error(err.response);
//     payload.onFailure(err);
//   }
// }

// function* deleteCourseSagaLecturer({
//   payload,
// }: ReturnType<typeof deleteCourseLecturer.request>) {
//   try {
//     yield axios.delete(deleteCourseApiLecturer + payload.id);

//     payload.onSuccess();
//   } catch (err: any) {
//     console.error(err.response);
//     payload.onFailure(err);
//   }
// }

export default function* coursesSaga() {
  yield takeLatest(getCourses.request, getCoursesSaga);
  yield takeLatest(getCourseDetail.request, getCourseDetailSaga);
  yield takeLatest(postCreateCourse.request, postCreateCourseSaga);
  yield takeLatest(putUpdateCourse.request, putUpdateCourseSaga);
  yield takeLatest(deleteCourse.request, deleteCourseSaga);
  // yield takeLatest(getCoursesLecturer.request, getCoursesSagaLecturer);
  // yield takeLatest(getCourseDetailLecturer.request, getCourseDetailSagaLecturer);
  // yield takeLatest(postCreateCourseLecturer.request, postCreateCourseSagaLecturer);
  // yield takeLatest(putUpdateCourseLecturer.request, putUpdateCourseSagaLecturer);
  // yield takeLatest(deleteCourseLecturer.request, deleteCourseSagaLecturer);
}
