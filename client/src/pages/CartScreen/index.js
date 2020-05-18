import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../../redux/actions/cartActions";
import { Container } from "semantic-ui-react";
import CartItem from "../../components/CartItem";

export default function CartScreen(props) {
  const cart = useSelector((state) => state.cart);

  const { cartItems } = cart;

  const productId = props.match.params.id;
  const qty = props.location.search
    ? Number(props.location.search.split("=")[1])
    : 1;

  const dispatch = useDispatch();

  const removeFromCartHandler = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const checkoutHandler = () => {
    props.history.push("/signin?redirect=shipping");
  };

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, []);

  return (
    <Container className="cart">
      <h3 className="text-center">Your Cart</h3>
      <div className="cart-list">
        <ul className="cart-list-container">
          {cartItems.length === 0 ? (
            <h4>Cart is empty</h4>
          ) : (
            cartItems.map((item, index) => (
              <CartItem
                key={index}
                item={item}
                addToCart={addToCart}
                removeFromCartHandler={removeFromCartHandler}
              />
            ))
          )}
        </ul>
        <div className="cart__row text-center">
          <p>
            Subtotal ( {cartItems.reduce((a, c) => a + c.qty, 0)} items) :{" "}
            <span className="price">
              {" "}
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
