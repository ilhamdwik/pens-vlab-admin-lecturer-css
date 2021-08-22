import { put, takeLatest } from "redux-saga/effects";
import axios, { AxiosResponse } from "axios";
import {
  fetchEtholUserDetail,
  fetchUserCheck,
  postLogin,
  setUser,
} from "../actions/authActions";
import { etholUserDetailApi, postLoginApi, userCheckApi } from "../../apis";
import jwt from "jsonwebtoken";
import { User } from "../reducers/authReducer";
import { EtholLecturer } from "../../types";

function* postLoginSaga({ payload }: ReturnType<typeof postLogin.request>) {
  try {
    const response: AxiosResponse<{ token: string }> = yield axios.post(
      postLoginApi,
      payload.data
    );

    const decoded = jwt.decode(response.data.token) as {
      user_id: string;
      name: string;
      email: string;
    };

    yield put(setUser(decoded));
    payload.onSuccess(response.data);
  } catch (err: any) {
    payload.onFailure(err);
  }
}

function* userCheckSaga({
  payload,
}: ReturnType<typeof fetchUserCheck.request>) {
  try {
    const response: AxiosResponse<{ token: string }> = yield axios.post(
      userCheckApi,
      payload.data
    );

    const decoded = jwt.decode(response.data.token) as User;

    yield put(setUser(decoded));

    payload.onSuccess(response.data.token);
  } catch (err: any) {
    console.error(err.response);
    payload.onFailure({ message: err?.response?.data } as Error);
  }
}

function* fetchEtholUser({
  payload,
}: ReturnType<typeof fetchEtholUserDetail.request>) {
  try {
    const response: AxiosResponse<EtholLecturer> = yield axios.get(
      etholUserDetailApi,
      {
        headers: {
          token: payload.token,
        },
      }
    );

    payload.onSuccess(response.data);
  } catch (err: any) {
    console.error(err.response);
    payload.onFailure({ message: err?.response?.data } as Error);
  }
}

export default function* authSaga() {
  yield takeLatest(postLogin.request, postLoginSaga);
  yield takeLatest(fetchUserCheck.request, userCheckSaga);
  yield takeLatest(fetchEtholUserDetail.request, fetchEtholUser);
}
