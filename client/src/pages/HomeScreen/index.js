import React, { useEffect } from 'react'
import {
    Container,
    Loader,
    Dimmer
} from "semantic-ui-react";
import { useSelector, useDispatch } from 'react-redux';
import ProductsList from '../../components/ProductsList'
import { listProducts } from '../../redux/actions/productAcrions'

export default function HomeScreen() {
    const productList = useSelector(state => state.productList)
    const { products, loading, error } = productList;
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(listProducts())
    }, [])

    return (
        loading ? <Dimmer active inverted><Loader size='large'></Loader></Dimmer> :
            error ? <div>{error}</div>
                : <Container>
                    <h4 className="home__subtitle">Featured Products</h4>
                    <ProductsList products={products} />
                </Container>
    )
}
