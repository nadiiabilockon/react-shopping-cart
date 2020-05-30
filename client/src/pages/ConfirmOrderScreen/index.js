import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container } from "semantic-ui-react";
import { CartItemMini } from "../../components/CartItem";
import CheckoutSteps from "../../components/CheckoutSteps";

export default function ConfirmOrderScreen(props) {
  const cart = useSelector((state) => state.cart);

  const { cartItems, shipping, payment } = cart;

  if (!shipping.address) {
    props.history.push("/shipping");
  } else if (!payment.paymentMethod) {
    props.history.push("/payment");
  }

  const dispatch = useDispatch();


  const checkoutHandler = () => {
    props.history.push("/signin?redirect=shipping");
  };

  useEffect(() => {

  }, []);

  return (
    <Container className="cart wrapper text-center">
      <CheckoutSteps step1 step2 step3 step4 />
      <div>
        <h3>Shipping</h3>
        <div>
          {cart.shipping.address}, {cart.shipping.city}
          {cart.shipping.postalCode}, {cart.shipping.country}
        </div>
      </div>
      <div>
        <h3>Payment</h3>
        <div>
          Payment Method: {cart.payment.paymentMethod}
        </div>
      </div>
      <h3 className="text-center">Your Cart</h3>
      <div className="cart-list">
        <ul className="cart-list-container">
          {cartItems.length === 0 ? (
            <h4>Cart is empty</h4>
          ) : (
              cartItems.map((item, index) => (
                <CartItemMini
                  key={index}
                  item={item}
                />
              ))
            )}
        </ul>
        <div className="cart__row text-center">
          <p>
            Subtotal ( {cartItems.reduce((a, c) => a + c.qty, 0)} items) :{" "}
            <span className="price">
              ${cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
            </span>
          </p>
          <div>
            <button
              className="btn-reset checkout__button"
              onClick={checkoutHandler}
              disabled={cartItems.length === 0}
            >
              Check Out
            </button>
          </div>
        </div>
      </div>
    </Container>
  );
}
