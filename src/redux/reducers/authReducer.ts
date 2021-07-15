import { createReducer } from "typesafe-actions";
import { users } from "../../types";
import { AuthAction } from "../actions/actionTypes";
import { setUser } from "../actions/authActions";

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
  token?: string | null;
}

const initialState: AuthState = {};

const authReducer = createReducer<AuthState, AuthAction>(
  initialState
).handleAction(setUser, (state: AuthState, action: { payload: users }) => ({
  ...state,
  user: action.payload,
}));

export default authReducer;
