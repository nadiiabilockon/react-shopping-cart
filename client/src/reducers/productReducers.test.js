import { productListReducer } from '../redux/reducers/productReducers';
import { PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_FAIL } from '../constants/productConstants';

describe('Product reducer', () => {
    const initialState = {
        products: [],
        loading: false,
        error: null
    };

    it('should return the initial state', () => {
        expect(productListReducer(initialState, { type: 'unexpected' })).toEqual(initialState)
    })

    it('should handle PRODUCT_LIST_REQUEST', () => {
        expect(productListReducer(initialState, { type: PRODUCT_LIST_REQUEST })).toEqual({
            loading: true,
            products: []
        })
    })

    it('should handle PRODUCT_LIST_SUCCESS', () => {
        const products = [
            {
                name: "Alexa Extrafine Merino Tee",
                brand: "FATE + BECKER",
                price: "89.99",
                id: "1",
                image: ["/images/FATE.jpg"]
            },
            {
                name: "Bella Cami // Black",
                brand: "REMAIN",
                price: "129.00",
                id: "2",
                image: ["/images/REMAIN.jpg"]
            }
        ]

        const updateAction = {
            type: PRODUCT_LIST_SUCCESS,
            payload: products
        };

        expect(productListReducer(initialState, updateAction)).toEqual({
            loading: false,
            products: updateAction.payload
        });
    });

    it('should handle PRODUCT_LIST_FAIL', () => {
        const updateAction = {
            type: PRODUCT_LIST_FAIL,
            payload: 'Unknown error'
        };

        expect(productListReducer(initialState, updateAction)).toEqual({
            loading: false,
            error: updateAction.payload
        })
    })
})