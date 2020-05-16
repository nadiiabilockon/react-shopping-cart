import React from 'react'
import { Grid } from 'semantic-ui-react'
import ProductItem from "./ProductItem"

export default function ProductsList({ products }) {
    return (
        <Grid columns={3} >
            <Grid.Row>
                {products.map(product =>
                    <ProductItem
                        key={product._id}
                        id={product._id}
                        image={product.image}
                        name={product.name}
                        brand={product.brand}
                        price={product.price}
                    />)}
            </Grid.Row>
        </Grid>
    )
}
