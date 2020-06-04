import React from 'react'
import { Grid } from 'semantic-ui-react'
import ProductItem from "./ProductItem"

export default function ProductsList({ products }) {
    return (
        <Grid container>
            <Grid.Row columns={3}>
                {products.map(product =>
                    <ProductItem
                        key={product._id}
                        id={product._id}
                        images={product.images}
                        name={product.name}
                        brand={product.brand}
                        price={product.price}
                    />)}
            </Grid.Row>
        </Grid>
    )
}
