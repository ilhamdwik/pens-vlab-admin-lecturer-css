import { takeLatest } from "redux-saga/effects";
import axios, { AxiosResponse } from "axios";
import { getServerTimeApi } from "../../apis";
import { getServerTime } from "../actions/appActions";

function* getServerTimeSaga({
  payload,
}: ReturnType<typeof getServerTime.request>) {
  try {
    const response: AxiosResponse<{ time: number }> = yield axios.get(
      getServerTimeApi
    );

    payload.onSuccess(response.data);
  } catch (err: any) {
    console.error(err.response);
    payload.onFailure(err);
  }
}

export default function* appSaga() {
  yield takeLatest(getServerTime.request, getServerTimeSaga);
}
