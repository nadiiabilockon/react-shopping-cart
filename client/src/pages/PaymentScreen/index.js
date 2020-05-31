import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Grid, Container, Form, Radio } from "semantic-ui-react";
import { savePayment } from "../../redux/actions/cartActions";
import CheckoutSteps from "../../components/CheckoutSteps";

export default function PaymentScreen(props) {
    const [paymentMethod, setPaymentMethod] = useState("");

    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(savePayment({ paymentMethod }));
        props.history.push('confirmorder');
    }

    const handleRadio = (e) => {
        setPaymentMethod(e.target.value)
    }

    return (
        <Container className="wrapper">
            <CheckoutSteps step1 step2 step3 />
            <Grid textAlign="center" verticalAlign="middle">
                <Grid.Column style={{ maxWidth: 450 }}>
                    <h3>Payment</h3>
                    <Form size="large" onSubmit={handleSubmit}>
                        <Form.Field>
                            <Radio
                                id="paymentMethod"
                                value='paypal'
                                onChange={handleRadio}
                            />
                            <label className="paymentLabel" htmlFor="paymentMethod">PayPal</label>
                        </Form.Field>
                        <Form.Button
                            color='black'
                            fluid size="large"
                            content="Continue" />
                    </Form>
                </Grid.Column>
            </Grid>
        </Container>
    )
}
