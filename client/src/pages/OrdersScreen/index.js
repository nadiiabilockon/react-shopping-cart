import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Container, Message } from "semantic-ui-react";
import OrdersTable from '../../components/OrdersTable'
import { listOrders } from '../../redux/actions/orderActions';

export default function OrdersScreen(props) {
    const orderList = useSelector(state => state.orderList);
    const { loading, orders, error } = orderList;

    const orderId = props.match.params.id;

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(listOrders());
        return () => {
            //
        };
    }, []);

    return (
        <Container>
            {orderId && <Message content={`Order ${orderId} created`} />}
            <OrdersTable orders={orders}/>
        </Container>
    )
}
