import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import {
    Grid,
    Container,
    Dimmer,
    Loader
} from "semantic-ui-react";
import { Link } from 'react-router-dom'
import './index.less'
import { ImageCarousel } from '../../components/ImageCarousel'
import { ProductInfo } from '../../components/ProductInfo';
import { detailsProduct } from '../../redux/actions/productAcrions';

export default function ProductScreen(props) {
    let [qty, setQty] = useState(1);

    const productDetails = useSelector(state => state.productDetails);
    const { product, loading, error } = productDetails;
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(detailsProduct(props.match.params.id));
    }, [])

    const handleAddToCart = () => {
        props.history.push("/cart/" + props.match.params.id + "?qty=" + qty)
    }

    return (
        loading ? <Dimmer active inverted>< Loader size='large' ></Loader ></Dimmer > :
            error ? <div>{error}</div> :
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
                                        <ImageCarousel slides={product.images} alt={product.name} />
                                    </div>
                                </Grid.Column>
                                <Grid.Column width={6} textAlign='center'>
                                    <ProductInfo product={product} qty={qty} setQty={setQty} addToCart={handleAddToCart} />
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Container>
                </div>
    )
}
