import { takeLatest } from "redux-saga/effects";
import axios, { AxiosResponse } from "axios";
import {
  getQuizzes,
  getQuizDetail,
  postCreateQuiz,
  putUpdateQuiz,
  deleteQuiz,
  getSubmissionDetail,
  putUpdateSubmission,
} from "../actions/quizzesActions";
import {
  getQuizzesApi,
  getQuizDetailApi,
  postCreateQuizApi,
  putUpdateQuizApi,
  deleteQuizApi,
  putUpdateSubmissionApi,
  getSubmissionDetailApi,
} from "../../apis";
import { quizzes, student_to_quiz } from "../../types";

function* getQuizsSaga({ payload }: ReturnType<typeof getQuizzes.request>) {
  try {
    const response: AxiosResponse<{ data: quizzes[]; count: number }> =
      yield axios.get(getQuizzesApi, {
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

function* getQuizDetailSaga({
  payload,
}: ReturnType<typeof getQuizDetail.request>) {
  try {
    const response: AxiosResponse<quizzes> = yield axios.get(
      getQuizDetailApi + payload.id
    );
    payload.onSuccess(response.data);
  } catch (err: any) {
    console.error(err.response);
    payload.onFailure(err.data);
  }
}

function* postCreateQuizSaga({
  payload,
}: ReturnType<typeof postCreateQuiz.request>) {
  try {
    const response: AxiosResponse<quizzes> = yield axios.post(
      postCreateQuizApi,
      payload.data
    );

    payload.onSuccess(response.data);
  } catch (err: any) {
    console.error(err.response);
    payload.onFailure(err);
  }
}

function* putUpdateQuizSaga({
  payload,
}: ReturnType<typeof putUpdateQuiz.request>) {
  try {
    const response: AxiosResponse<quizzes> = yield axios.put(
      putUpdateQuizApi + payload.id,
      payload.data
    );

    payload.onSuccess(response.data);
  } catch (err: any) {
    console.error(err.response);
    payload.onFailure(err);
  }
}

function* deleteQuizSaga({ payload }: ReturnType<typeof deleteQuiz.request>) {
  try {
    yield axios.delete(deleteQuizApi + payload.id);

    payload.onSuccess();
  } catch (err: any) {
    console.error(err.response);
    payload.onFailure(err);
  }
}

function* getSubmissionDetailSaga({
  payload,
}: ReturnType<typeof getSubmissionDetail.request>) {
  try {
    const response: AxiosResponse<student_to_quiz> = yield axios.get(
      getSubmissionDetailApi + payload.quizId + "&" + payload.studentId
    );
    payload.onSuccess(response.data);
  } catch (err: any) {
    console.error(err.response);
    payload.onFailure(err.data);
  }
}

function* putUpdateSubmissionSaga({
  payload,
}: ReturnType<typeof putUpdateSubmission.request>) {
  try {
    const response: AxiosResponse<student_to_quiz> = yield axios.put(
      putUpdateSubmissionApi + payload.quizId + "&" + payload.studentId,
      payload.data
    );
    payload.onSuccess(response.data);
  } catch (err: any) {
    console.error(err.response);
    payload.onFailure(err.data);
  }
}

export default function* quizzesSaga() {
  yield takeLatest(getQuizzes.request, getQuizsSaga);
  yield takeLatest(getQuizDetail.request, getQuizDetailSaga);
  yield takeLatest(postCreateQuiz.request, postCreateQuizSaga);
  yield takeLatest(putUpdateQuiz.request, putUpdateQuizSaga);
  yield takeLatest(deleteQuiz.request, deleteQuizSaga);
  yield takeLatest(getSubmissionDetail.request, getSubmissionDetailSaga);
  yield takeLatest(putUpdateSubmission.request, putUpdateSubmissionSaga);
}
