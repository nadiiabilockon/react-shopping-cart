import React from "react";
import { Table, Button } from "semantic-ui-react";

export default function OrdersTable({ orders }) {
    return (
        <Table celled>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>ID</Table.HeaderCell>
                    <Table.HeaderCell>Date</Table.HeaderCell>
                    <Table.HeaderCell>Total</Table.HeaderCell>
                    <Table.HeaderCell>Paid</Table.HeaderCell>
                    <Table.HeaderCell>Action</Table.HeaderCell>
                </Table.Row>
            </Table.Header>

            <Table.Body>
                {orders &&
                    orders.map((order) => (
                        <Table.Row key={order._id}>
                            <Table.Cell>{order._id}</Table.Cell>
                            <Table.Cell>{order.createdAt}</Table.Cell>
                            <Table.Cell>{order.totalPrice}</Table.Cell>
                            <Table.Cell>{order.isPaid ? '+' : '-'}</Table.Cell>
                            <Table.Cell textAlign="center">
                                <Button
                                    // disabled={props.loadingDelete}
                                    // onClick={() => props.deleteHandler(order._id)}
                                >
                                    Delete
                                </Button>
                            </Table.Cell>
                        </Table.Row>
                    ))}
            </Table.Body>
        </Table>
    );
}
