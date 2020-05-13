import React from 'react'
import ProductsList from '../../components/ProductsList'
import {
    Container
} from "semantic-ui-react";

export default function HomeScreen() {
    return (
        <Container>
            <h4 className="home__subtitle">Featured Products</h4>
            <ProductsList />
        </Container>
    )
}
