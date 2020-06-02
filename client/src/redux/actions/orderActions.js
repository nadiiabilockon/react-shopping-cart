import axios from "axios";
import {
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
    ORDER_CREATE_FAIL,
    ORDER_LIST_REQUEST,
    ORDER_LIST_SUCCESS,
    ORDER_LIST_FAIL,
} from "../../constants/orderConstants";

const createOrder = (order) => async (dispatch, getState) => {
    try {
        dispatch({ type: ORDER_CREATE_REQUEST, payload: order });
        const {
            userSignin: { userInfo },
        } = getState();
        const {
            data: { data: newOrder },
        } = await axios.post("/orders", order, {
            headers: {
                Authorization: " Bearer " + userInfo.token,
            },
        });
        dispatch({ type: ORDER_CREATE_SUCCESS, payload: newOrder });
    } catch (error) {
        dispatch({ type: ORDER_CREATE_FAIL, payload: error.message });
    }
};

const listOrders = () => async (dispatch, getState) => {
    try {
        dispatch({ type: ORDER_LIST_REQUEST });
        const { userSignin: { userInfo } } = getState();
        const { data } = await axios.get("/orders", {
            headers:
                { Authorization: 'Bearer ' + userInfo.token }
        });
        dispatch({ type: ORDER_LIST_SUCCESS, payload: data })
    } catch (error) {
        dispatch({ type: ORDER_LIST_FAIL, payload: error.message });
    }
}

export { createOrder, listOrders };
