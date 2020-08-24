import { orderListReducer } from '../../redux/reducers/orderReducers';
import { ORDER_LIST_REQUEST, ORDER_LIST_SUCCESS, ORDER_LIST_FAIL } from '../../constants/orderConstants';

describe('Order reducer', () => {
    const initialState = {
        orders: [],
        loading: false,
        error: null
    };

    it('should return the initial state', () => {
        expect(orderListReducer(initialState, { type: 'unexpected' })).toEqual(initialState)
    })

    it('should handle ORDER_LIST_REQUEST', () => {
        expect(orderListReducer(initialState, { type: ORDER_LIST_REQUEST })).toEqual({
            loading: true,
            orders: []
        })
    })

    it('should handle ORDER_LIST_FAIL', () => {
        const updateAction = {
            type: ORDER_LIST_FAIL,
            payload: 'Unknown error'
        };

        expect(orderListReducer(initialState, updateAction)).toEqual({
            loading: false,
            error: updateAction.payload
        })
    })
})