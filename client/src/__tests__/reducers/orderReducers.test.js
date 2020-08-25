import {
    orderListReducer,
    orderCreateReducer,
} from "../../redux/reducers/orderReducers";
import {
    ORDER_LIST_REQUEST,
    ORDER_LIST_SUCCESS,
    ORDER_LIST_FAIL,
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
    ORDER_CREATE_FAIL,
} from "../../constants/orderConstants";

describe("Order list reducer", () => {
    const initialState = {
        orders: [],
        loading: false,
        error: null,
    };

    it("should return the initial state", () => {
        expect(orderListReducer(initialState, { type: "unexpected" })).toEqual(
            initialState
        );
    });

    it("should handle ORDER_LIST_REQUEST", () => {
        expect(
            orderListReducer(initialState, { type: ORDER_LIST_REQUEST })
        ).toEqual({
            loading: true,
            orders: [],
        });
    });

    it("should handle ORDER_LIST_SUCCESS", () => {
        const orders = [
            {
                isPaid: true,
                totalPrice: "89.99",
                shippingPrice: "20",
                _id: "1",
                createdAt: "01.01.2020",
            },
            {
                isPaid: false,
                totalPrice: "129.00",
                shippingPrice: "20",
                _id: "2",
                createdAt: "01.01.2020",
            },
        ];

        const updateAction = {
            type: ORDER_LIST_SUCCESS,
            payload: orders,
        };

        expect(orderListReducer(initialState, updateAction)).toEqual({
            loading: false,
            orders: updateAction.payload,
        });
    });

    it("should handle ORDER_LIST_FAIL", () => {
        const updateAction = {
            type: ORDER_LIST_FAIL,
            payload: "Unknown error",
        };

        expect(orderListReducer(initialState, updateAction)).toEqual({
            loading: false,
            error: updateAction.payload,
        });
    });
});

describe("Order create reducer", () => {
    const initialState = {
        order: {},
        loading: false,
        error: null,
    };

    it("should return the initial state", () => {
        expect(orderCreateReducer(initialState, { type: "unexpected" })).toEqual(
            initialState
        );
    });

    it("should handle ORDER_CREATE_REQUEST", () => {
        expect(
            orderCreateReducer(initialState, { type: ORDER_CREATE_REQUEST })
        ).toEqual({
            loading: true,
            order: {}
        });
    });

    it("should handle ORDER_CREATE_SUCCESS", () => {
        const order = {
            isPaid: true,
            totalPrice: "89.99",
            shippingPrice: "20",
            _id: "1",
            createdAt: "01.01.2020"
        }

        const updateAction = {
            type: ORDER_CREATE_SUCCESS,
            payload: order
        };

        expect(orderCreateReducer(initialState, updateAction)).toEqual({
            loading: false,
            order: updateAction.payload,
            success: true
        });
    });

    it("should handle ORDER_CREATE_FAIL", () => {
        const updateAction = {
            type: ORDER_CREATE_FAIL,
            payload: "Unknown error",
        };

        expect(orderCreateReducer(initialState, updateAction)).toEqual({
            loading: false,
            error: updateAction.payload,
        });
    });
});
