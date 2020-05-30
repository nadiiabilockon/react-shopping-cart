import axios from "axios";
import Cookie from "js-cookie";
import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_SHIPPING, CART_SAVE_PAYMENT } from "../../constants/cartConstants";

const addToCart = (id, qty) => async (dispatch, getState) => {
  try {
    const { data } = await axios.get(`/products/${id}`);
    dispatch({
      type: CART_ADD_ITEM,
      payload: {
        product: data._id,
        name: data.name,
        brand: data.brand,
        images: data.images,
        price: data.price,
        countInStock: data.countInStock,
        qty,
      },
    });
    const {
      cart: { cartItems },
    } = getState();
    Cookie.set("cartItems", JSON.stringify(cartItems));
  } catch (error) { }
};

const removeFromCart = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CART_REMOVE_ITEM,
      payload: id,
    });
    const {
      cart: { cartItems },
    } = getState();
    Cookie.set("cartItems", JSON.stringify(cartItems));
  } catch (error) { }
};

const saveShipping = (data) => async (dispatch) => {
  dispatch({
    type: CART_SAVE_SHIPPING,
    payload: data,
  });
}

const savePayment = (data) => async (dispatch) => {
  dispatch({
    type: CART_SAVE_PAYMENT,
    payload: data,
  });
}
export { addToCart, removeFromCart, saveShipping, savePayment };
