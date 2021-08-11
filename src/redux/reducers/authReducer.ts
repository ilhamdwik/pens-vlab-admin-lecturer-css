import { createReducer } from "typesafe-actions";
import { users } from "../../types";
import { AuthAction } from "../actions/actionTypes";
import { setToken, setUser } from "../actions/authActions";

export type User = {
  email: string;
  id: string;
  user_id?: string;
  class_id?: string;
  name: string;
  nip?: string;
  avatar_url?: string;
  isAdmin?: boolean;
};

export interface AuthState {
  user?: User;
  token?: string;
}

const initialState: AuthState = {};

const authReducer = createReducer<AuthState, AuthAction>(initialState)
  .handleAction(
    setToken,
    (state: AuthState, action: { payload: string | null }) => ({
      ...state,
      token: action.payload,
    })
  )
  .handleAction(setUser, (state: AuthState, action: { payload: users }) => ({
    ...state,
    user: action.payload,
  }));

export default authReducer;
