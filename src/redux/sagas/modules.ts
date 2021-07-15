import { takeLatest } from "redux-saga/effects";
import axios, { AxiosResponse } from "axios";
import {
  getModules,
  getModuleDetail,
  postCreateModule,
  putUpdateModule,
  deleteModule,
} from "../actions/modulesActions";
import {
  getModulesApi,
  getModuleDetailApi,
  postCreateModuleApi,
  putUpdateModuleApi,
  deleteModuleApi,
} from "../../apis";
import { modules } from "../../types";

function* getModulesSaga({ payload }: ReturnType<typeof getModules.request>) {
  try {
    const response: AxiosResponse<{ data: modules[]; count: number }> =
      yield axios.get(getModulesApi, {
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

function* getModuleDetailSaga({
  payload,
}: ReturnType<typeof getModuleDetail.request>) {
  try {
    const response: AxiosResponse<modules> = yield axios.get(
      getModuleDetailApi + payload.id
    );
    payload.onSuccess(response.data);
  } catch (err: any) {
    console.error(err.response);
    payload.onFailure(err.data);
  }
}

function* postCreateModuleSaga({
  payload,
}: ReturnType<typeof postCreateModule.request>) {
  try {
    const response: AxiosResponse<modules> = yield axios.post(
      postCreateModuleApi,
      payload.data
    );

    payload.onSuccess(response.data);
  } catch (err: any) {
    console.error(err.response);
    payload.onFailure(err);
  }
}

function* putUpdateModuleSaga({
  payload,
}: ReturnType<typeof putUpdateModule.request>) {
  try {
    const response: AxiosResponse<modules> = yield axios.put(
      putUpdateModuleApi + payload.id,
      payload.data
    );

    payload.onSuccess(response.data);
  } catch (err: any) {
    console.error(err.response);
    payload.onFailure(err);
  }
}

function* deleteModuleSaga({
  payload,
}: ReturnType<typeof deleteModule.request>) {
  try {
    yield axios.delete(deleteModuleApi + payload.id);

    payload.onSuccess();
  } catch (err: any) {
    console.error(err.response);
    payload.onFailure(err);
  }
}

export default function* modulesSaga() {
  yield takeLatest(getModules.request, getModulesSaga);
  yield takeLatest(getModuleDetail.request, getModuleDetailSaga);
  yield takeLatest(postCreateModule.request, postCreateModuleSaga);
  yield takeLatest(putUpdateModule.request, putUpdateModuleSaga);
  yield takeLatest(deleteModule.request, deleteModuleSaga);
}
