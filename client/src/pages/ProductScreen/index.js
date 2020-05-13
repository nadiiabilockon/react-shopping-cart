import React from 'react'
import { data } from '../../data'
import {
    Grid,
    Container
} from "semantic-ui-react";
import { Link } from 'react-router-dom'
import './index.less'
import { ImageCarousel } from '../../components/ImageCarousel'

export default function ProductScreen(props) {

    const product = data.products.find(item => item.id === props.match.params.id);

    return (
        <div className="product-page">
            <Container>
                <Grid stackable>
                    <nav className="breadcrumb" role="navigation" aria-label="breadcrumbs">
                        <Link title="Back to the frontpage" to="/">Home</Link>
                        <span aria-hidden="true">›</span>
                        <span>{product.name}</span>
                    </nav>
                    <Grid.Row>
                        <Grid.Column width={10}>
                            <div className="carousel-container">
                                <ImageCarousel slides={product.image} alt={product.name} />
                            </div>
                        </Grid.Column>
                        <Grid.Column width={6} textAlign='center'>
                            <p>${product.price}</p>
                            <p className="uppercase">{product.brand}</p>
                            <h2>{product.name}</h2>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Container>
        </div>
    )
}
