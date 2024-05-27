import { ActionType } from '../../actions/auth/authActions';


export interface AuthState {
  login_check: boolean;
}

const initialState: AuthState = {
  login_check: false,
};

export const counterReducer = (
  state: AuthState = initialState,
  action: ActionType
): AuthState => {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, login_check: !state.login_check };
    case 'REGISTER':
      return { ...state, login_check: !state.login_check };
    default:
      return state;
  }
};