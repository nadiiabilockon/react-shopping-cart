import React from 'react'
import { Container } from "semantic-ui-react";

export default function OrderScreen(props) {
    return (
        <Container>
            Order {props.match.params.id}
        </Container>
    )
}
