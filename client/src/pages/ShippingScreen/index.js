import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Grid, Container, Form } from "semantic-ui-react";
import { saveShipping } from "../../redux/actions/cartActions";
import CheckoutSteps from "../../components/CheckoutSteps";

export default function ShippingScreen(props) {
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [country, setCountry] = useState("");

    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(saveShipping({ address, city, postalCode, country }));
        props.history.push('payment');
    }

    return (
        <Container className="wrapper text-center">
            <CheckoutSteps step1 step2 />
            <Grid textAlign="center" verticalAlign="middle">
                <Grid.Column style={{ maxWidth: 450 }}>
                    <h3>Shipping address</h3>
                    <Form size="large" onSubmit={handleSubmit}>
                        <Form.Input
                            fluid
                            placeholder="Adress"
                            value={address}
                            required
                            onChange={(e) => setAddress(e.target.value)}
                        />
                        <Form.Input
                            fluid
                            placeholder="City"
                            value={city}
                            required
                            onChange={(e) => setCity(e.target.value)}
                        />
                        <Form.Input
                            fluid
                            placeholder="Postal Code"
                            value={postalCode}
                            required
                            onChange={(e) => setPostalCode(e.target.value)}
                        />
                        <Form.Input
                            fluid
                            placeholder="Country"
                            value={country}
                            required
                            onChange={(e) => setCountry(e.target.value)}
                        />
                        <Form.Button
                            color='black'
                            fluid
                            size="large"
                            content="Continue" />
                    </Form>
                </Grid.Column>
            </Grid>
        </Container>
    )
}

