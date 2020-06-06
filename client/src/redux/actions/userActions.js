import axios from "axios";
import Cookie from "js-cookie";
import {
  USER_SIGN_IN_FAIL,
  USER_SIGN_IN_SUCCESS,
  USER_SIGN_IN_REQUEST,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_LOGOUT
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
    const validationError = error.response.data.errors && error.response.data.errors[0].msg

    dispatch({
      type: USER_SIGN_IN_FAIL,
      payload: validationError || error.message,
    });
  }
};

const register = (name, email, password) => async (dispatch) => {
  dispatch({
    type: USER_REGISTER_REQUEST,
    payload: {
      name,
      email,
      password
    },
  });
  try {
    const { data } = await axios.post(`/users/register`, { name, email, password });
    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: data,
    });
    Cookie.set("userInfo", JSON.stringify(data));
  } catch (error) {
    const validationError = error.response.data.errors && error.response.data.errors[0].msg
    dispatch({
      type: USER_REGISTER_FAIL,
      payload: error.response.data.msg || validationError || error.message
    });
  }
};

const logout = () => (dispatch) => {
  Cookie.remove("userInfo");
  dispatch({ type: USER_LOGOUT })
}

export { signin, register, logout };
