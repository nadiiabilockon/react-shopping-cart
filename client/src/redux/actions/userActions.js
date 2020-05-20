import axios from "axios";
import Cookie from "js-cookie";
import {
  USER_SIGN_IN_FAIL,
  USER_SIGN_IN_SUCCESS,
  USER_SIGN_IN_REQUEST,
} from "../../constants/userConstants";

const signin = (email, password) => async (dispatch) => {
  dispatch({
    type: USER_SIGN_IN_REQUEST,
    payload: {
      email,
      password,
    },
  });
  try {
    const { data } = await axios.post(`/users/signin`, { email, password });
    dispatch({
      type: USER_SIGN_IN_SUCCESS,
      payload: data,
    });
    Cookie.set("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_SIGN_IN_FAIL,
      payload: error.message,
    });
  }
};

export { signin };
