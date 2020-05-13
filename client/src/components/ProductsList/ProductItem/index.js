import React from 'react'
import { Grid, Image } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

import './index.less'

export default function ProductItem({ id, image, name, brand, price }) {
    return (
        <Grid.Column className="product">
            <Link to={`/product/${id}`}><Image src={image[0]} /></Link>
            <figcaption>
                <b className="product-brand">{brand}</b>
                <p className="product-name"> {name} </p>
                <p className="product-price">${price}</p>
            </figcaption>
        </Grid.Column>
    )
}
