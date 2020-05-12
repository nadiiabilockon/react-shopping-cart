import React from 'react'
import { data } from '../../data'
import {
    Grid,
    Image,
    Container
} from "semantic-ui-react";
import { Link } from 'react-router-dom'
import './index.less'
import { ImageCarousel } from '../../components/ImageCarousel'

export default function ProductScreen(props) {

    const product = data.products.find(item => item.id == props.match.params.id);

    return (
        <div className="product-page">
            <Container>
                <ImageCarousel />
                <Grid >
                    <nav className="breadcrumb" role="navigation" aria-label="breadcrumbs">
                        <Link title="Back to the frontpage" to="/">Home</Link>
                        <span aria-hidden="true">›</span>
                        <span>{product.name}</span>
                    </nav>
                    <Grid.Row>
                        <Grid.Column width={8}>
                            <Image src={product.image} />
                        </Grid.Column>
                        <Grid.Column width={6}>
                            {}
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Container>
        </div>
    )
}
