import { takeLatest } from "redux-saga/effects";
import axios, { AxiosResponse } from "axios";
import {
  getRoles,
  getRoleDetail,
  postCreateRole,
  putUpdateRole,
  deleteRole,
} from "../actions/rolesActions";
import {
  getRolesApi,
  getRoleDetailApi,
  postCreateRoleApi,
  putUpdateRoleApi,
  deleteRoleApi,
} from "../../apis";
import { roles } from "../../types";

function* getRolesSaga({ payload }: ReturnType<typeof getRoles.request>) {
  try {
    const response: AxiosResponse<{ data: roles[]; count: number }> =
      yield axios.get(getRolesApi, {
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

function* getRoleDetailSaga({
  payload,
}: ReturnType<typeof getRoleDetail.request>) {
  try {
    const response: AxiosResponse<roles> = yield axios.get(
      getRoleDetailApi + payload.id
    );
    payload.onSuccess(response.data);
  } catch (err: any) {
    console.error(err.response);
    payload.onFailure(err.data);
  }
}

function* postCreateRoleSaga({
  payload,
}: ReturnType<typeof postCreateRole.request>) {
  try {
    const response: AxiosResponse<roles> = yield axios.post(
      postCreateRoleApi,
      payload.data
    );

    payload.onSuccess(response.data);
  } catch (err: any) {
    console.error(err.response);
    payload.onFailure(err);
  }
}

function* putUpdateRoleSaga({
  payload,
}: ReturnType<typeof putUpdateRole.request>) {
  try {
    const response: AxiosResponse<roles> = yield axios.put(
      putUpdateRoleApi + payload.id,
      payload.data
    );

    payload.onSuccess(response.data);
  } catch (err: any) {
    console.error(err.response);
    payload.onFailure(err);
  }
}

function* deleteRoleSaga({ payload }: ReturnType<typeof deleteRole.request>) {
  try {
    yield axios.delete(deleteRoleApi + payload.id);

    payload.onSuccess();
  } catch (err: any) {
    console.error(err.response);
    payload.onFailure(err);
  }
}

export default function* rolesSaga() {
  yield takeLatest(getRoles.request, getRolesSaga);
  yield takeLatest(getRoleDetail.request, getRoleDetailSaga);
  yield takeLatest(postCreateRole.request, postCreateRoleSaga);
  yield takeLatest(putUpdateRole.request, putUpdateRoleSaga);
  yield takeLatest(deleteRole.request, deleteRoleSaga);
}
