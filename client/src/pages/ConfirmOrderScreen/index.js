import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Button, Grid, Segment, Message } from "semantic-ui-react";
import { CartItemMini } from "../../components/CartItem";
import CheckoutSteps from "../../components/CheckoutSteps";
import OrderList from "../../components/OrderList";
import { createOrder } from "../../redux/actions/orderActions";

export default function ConfirmOrderScreen(props) {
  const cart = useSelector((state) => state.cart);

  const { cartItems, shipping, payment } = cart;
  const orderCreate = useSelector(state => state.orderCreate);
  const { loading, success, error, order } = orderCreate;

  const itemsPrice = cartItems.reduce((a, c) => a + c.price * c.qty, 0);
  const shippingPrice = itemsPrice > 100 ? 0 : 10;
  const taxPrice = 0.15 * itemsPrice;
  const totalPrice = itemsPrice + shippingPrice + taxPrice;

  const orderDetails = [
    { name: "Items", price: itemsPrice },
    { name: "Shipping", price: shippingPrice },
    { name: "Tax", price: taxPrice },
    { name: "Total", price: totalPrice },
  ];

  const dispatch = useDispatch();

  const confirmHandler = () => {
    dispatch(createOrder({
      orderItems: cartItems, shipping, payment, itemsPrice, shippingPrice,
      taxPrice, totalPrice
    }));
  };

  useEffect(() => {
    if (!shipping.address) {
      props.history.push("/shipping");
    } else if (!payment.paymentMethod) {
      props.history.push("/payment");
    }
    if (success) {
      props.history.push("/order/" + order._id);
    }
  }, [success]);

  return (
    <Container className="wrapper">
      <CheckoutSteps step1 step2 step3 step4 />
      <Grid container>
        <Grid.Row stretched>
          <Grid.Column width={10}>
            <Segment>
              <h3>Shipping</h3>
              <p>
                {`${cart.shipping.address}, ${cart.shipping.city}, ${cart.shipping.postalCode}, ${cart.shipping.country}`}
              </p>
            </Segment>
            <Segment >
              <h3>Payment</h3>
              <p>Payment Method: {cart.payment.paymentMethod}</p>
            </Segment>
            <Segment >
              <h3 className="text-center">Your Cart</h3>
              <div className="cart-list">
                <ul className="cart-list-container">
                  {cartItems.length === 0 ? (
                    <h4>Cart is empty</h4>
                  ) : (
                      cartItems.map((item, index) => (
                        <CartItemMini key={index} item={item} />
                      ))
                    )}
                </ul>
              </div>
            </Segment>
          </Grid.Column>
          <Grid.Column width={6}>
            <Segment padded="very" placeholder>
              <h3>Order Summary</h3>
              <OrderList orderDetails={orderDetails} />
              <Button
                disabled={cartItems.length === 0}
                onClick={confirmHandler}
                color="black"
                size="large"
                fluid
                loading={loading}
              >
                Confirm Order
              </Button>
              {error && <Message content={error} />}
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  );
}
