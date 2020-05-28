import React from 'react'
import { Table, Button } from 'semantic-ui-react'

export default function ProductsTable(props) {
    return (
        <Table celled>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>ID</Table.HeaderCell>
                    <Table.HeaderCell>Name</Table.HeaderCell>
                    <Table.HeaderCell>Brand</Table.HeaderCell>
                    <Table.HeaderCell>Price</Table.HeaderCell>
                    <Table.HeaderCell>Action</Table.HeaderCell>
                </Table.Row>
            </Table.Header>

            <Table.Body>
                    {props.products && props.products.map(product => (<Table.Row key={product._id}>
                        <Table.Cell>{product._id}</Table.Cell>
                        <Table.Cell>{product.name}</Table.Cell>
                        <Table.Cell>{product.brand}</Table.Cell>
                        <Table.Cell>{product.price}</Table.Cell>
                        <Table.Cell textAlign='center'>
                            <Button onClick={() => props.openModal(product)}>Edit</Button>
                            <Button disabled={props.loadingDelete} onClick={() => props.deleteHandler(product._id)}>Delete</Button>
                        </Table.Cell>
                    </Table.Row>))}
            </Table.Body>
        </Table>
    )
}
