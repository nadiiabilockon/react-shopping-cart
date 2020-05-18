import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "../../constants/cartConstants";
import axios from 'axios'

const addToCart = (id, qty) => async (dispatch) => {
    try {
        const { data } = await axios.get(`/products/${id}`);
        dispatch({
            type: CART_ADD_ITEM, payload: {
                product: data._id,
                name: data.name,
                brand: data.brand,
                images: data.images,
                price: data.price,
                countInStock: data.countInStock,
                qty
            }
        })
    } catch (error) {
    }
}

const removeFromCart = (id) => async (dispatch) => {
    try {
        dispatch({
            type: CART_REMOVE_ITEM, payload: id
        })
    } catch (error) {
    }
}

export { addToCart, removeFromCart }