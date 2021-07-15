import { takeLatest } from "redux-saga/effects";
import axios, { AxiosResponse } from "axios";
import {
  getClasses,
  getClassDetail,
  postCreateClass,
  putUpdateClass,
  deleteClass,
  getStudentsInClass,
} from "../actions/classesActions";
import {
  getClassesApi,
  getClassDetailApi,
  postCreateClassApi,
  putUpdateClassApi,
  deleteClassApi,
  getStudentsInClassApi,
} from "../../apis";
import { classes } from "../../types";

function* getClassesSaga({ payload }: ReturnType<typeof getClasses.request>) {
  try {
    const response: AxiosResponse<{ data: classes[]; count: number }> =
      yield axios.get(getClassesApi, {
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

function* getStudentsInClassSaga({
  payload,
}: ReturnType<typeof getStudentsInClass.request>) {
  try {
    const response: AxiosResponse<classes> = yield axios.get(
      getStudentsInClassApi + payload.id
    );

    payload.onSuccess(response.data);
  } catch (err: any) {
    console.error(err.response);
    payload.onFailure(err);
  }
}

function* getClassDetailSaga({
  payload,
}: ReturnType<typeof getClassDetail.request>) {
  try {
    const response: AxiosResponse<classes> = yield axios.get(
      getClassDetailApi + payload.id
    );
    payload.onSuccess(response.data);
  } catch (err: any) {
    console.error(err.response);
    payload.onFailure(err.data);
  }
}

function* postCreateClassSaga({
  payload,
}: ReturnType<typeof postCreateClass.request>) {
  try {
    const response: AxiosResponse<classes> = yield axios.post(
      postCreateClassApi,
      payload.data
    );

    payload.onSuccess(response.data);
  } catch (err: any) {
    console.error(err.response);
    payload.onFailure(err);
  }
}

function* putUpdateClassSaga({
  payload,
}: ReturnType<typeof putUpdateClass.request>) {
  try {
    const response: AxiosResponse<classes> = yield axios.put(
      putUpdateClassApi + payload.id,
      payload.data
    );

    payload.onSuccess(response.data);
  } catch (err: any) {
    console.error(err.response);
    payload.onFailure(err);
  }
}

function* deleteClassSaga({ payload }: ReturnType<typeof deleteClass.request>) {
  try {
    yield axios.delete(deleteClassApi + payload.id);

    payload.onSuccess();
  } catch (err: any) {
    console.error(err.response);
    payload.onFailure(err);
  }
}

export default function* classesSaga() {
  yield takeLatest(getClasses.request, getClassesSaga);
  yield takeLatest(getClassDetail.request, getClassDetailSaga);
  yield takeLatest(postCreateClass.request, postCreateClassSaga);
  yield takeLatest(putUpdateClass.request, putUpdateClassSaga);
  yield takeLatest(deleteClass.request, deleteClassSaga);
  yield takeLatest(getStudentsInClass.request, getStudentsInClassSaga);
}
