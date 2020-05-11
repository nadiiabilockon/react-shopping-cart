import React from 'react'
import { Grid } from 'semantic-ui-react'
import ProductItem from "./ProductItem"
import { data } from "./data"

export default function ProductsList() {
    return (
        <Grid columns={3} >
            <Grid.Row>
                {data.products.map(product => <ProductItem key={product.id} id={product.id} image={product.image}
                    name={product.name} brand={product.brand} price={product.price} />)}
            </Grid.Row>
        </Grid>
    )
}
