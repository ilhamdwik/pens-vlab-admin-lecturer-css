import { takeLatest } from "redux-saga/effects";
import axios, { AxiosResponse } from "axios";
import {
  getUsers,
  getUserDetail,
  postCreateUser,
  putUpdateUser,
  deleteUser,
} from "../actions/usersActions";
import {
  getUsersApi,
  getUserDetailApi,
  postCreateUserApi,
  putUpdateUserApi,
  deleteUserApi,
} from "../../apis";
import { users } from "../../types";

function* getUsersSaga({ payload }: ReturnType<typeof getUsers.request>) {
  try {
    const response: AxiosResponse<{ data: users[]; count: number }> =
      yield axios.get(getUsersApi, {
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

function* getUserDetailSaga({
  payload,
}: ReturnType<typeof getUserDetail.request>) {
  try {
    const response: AxiosResponse<users> = yield axios.get(
      getUserDetailApi + payload.id
    );
    payload.onSuccess(response.data);
  } catch (err: any) {
    console.error(err.response);
    payload.onFailure(err.data);
  }
}

function* postCreateUserSaga({
  payload,
}: ReturnType<typeof postCreateUser.request>) {
  try {
    const response: AxiosResponse<users> = yield axios.post(
      postCreateUserApi,
      payload.data
    );

    payload.onSuccess(response.data);
  } catch (err: any) {
    console.error(err.response);
    payload.onFailure(err);
  }
}

function* putUpdateUserSaga({
  payload,
}: ReturnType<typeof putUpdateUser.request>) {
  try {
    const response: AxiosResponse<users> = yield axios.put(
      putUpdateUserApi + payload.id,
      payload.data
    );

    payload.onSuccess(response.data);
  } catch (err: any) {
    console.error(err.response);
    payload.onFailure(err);
  }
}

function* deleteUserSaga({ payload }: ReturnType<typeof deleteUser.request>) {
  try {
    yield axios.delete(deleteUserApi + payload.id);

    payload.onSuccess();
  } catch (err: any) {
    console.error(err.response);
    payload.onFailure(err);
  }
}

export default function* usersSaga() {
  yield takeLatest(getUsers.request, getUsersSaga);
  yield takeLatest(getUserDetail.request, getUserDetailSaga);
  yield takeLatest(postCreateUser.request, postCreateUserSaga);
  yield takeLatest(putUpdateUser.request, putUpdateUserSaga);
  yield takeLatest(deleteUser.request, deleteUserSaga);
}
