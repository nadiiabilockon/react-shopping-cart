import React from 'react'
import { data } from '../../data'
import {
    Grid,
    Container,
    Button,
    Input
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
                            <div class="quantity-selector__wrapper text-center">
                                <label for="Quantity" class="quantity-selector uppercase">Quantity</label>


                                <div class="js-qty">
                                    <Button basic color='black' content='-' />
                                    <Input type="text" class="js-qty__num" value="1" min="1" data-id="" aria-label="quantity" pattern="[0-9]*" name="quantity" id="Quantity" data-submit="" />
                                    <Button basic color='black' content='+' />
                                </div>
                            </div>
                            <div class="add-to-cart__wrapper">
                                <Button basic color='black'>
                                    <span id="AddToCartText">Add to Cart</span>
                                    <span class="unicode">•</span>
                                    <span class="add-to-cart__price money"><span id="ButtonPrice" data-item-price="8999" data-item-quantity="1"><span class="money">{product.price}</span>&nbsp;</span></span>
                                </Button>
                            </div>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Container>
        </div>
    )
}
