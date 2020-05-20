import {
  USER_SIGN_IN_FAIL,
  USER_SIGN_IN_SUCCESS,
  USER_SIGN_IN_REQUEST,
} from "../../constants/userConstants";

function userSigninReducer(state = { userInfo: {} }, action) {
  switch (action.type) {
    case USER_SIGN_IN_REQUEST:
      return {
        loading: true,
      };
    case USER_SIGN_IN_SUCCESS:
      return {
        loading: false,
        userInfo: action.payload,
      };
    case USER_SIGN_IN_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}

export { userSigninReducer };
