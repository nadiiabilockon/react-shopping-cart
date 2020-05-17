import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/actions/cartActions";
import { Link } from "react-router-dom";
import { Grid, Image, Container } from "semantic-ui-react";
import QuantityInput from "../../components/QuantityInput";

export default function CartScreen(props) {
  const cart = useSelector((state) => state.cart);

  const { cartItems } = cart;

  const productId = props.match.params.id;
  const qty = props.location.search
    ? Number(props.location.search.split("=")[1])
    : 1;
  const dispatch = useDispatch();

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, []);

  return (
    <Container className="cart">
      <div className="cart-list">
        <ul className="cart-list-container">
          <li>
            <h3>Your Cart</h3>
            <div>Price</div>
          </li>
          {cartItems.length === 0 ? (
            <div>Cart is empty</div>
          ) : (
            cartItems.map((item) => (
              <li>
                <Grid>
                  <Grid.Row>
                    <Grid.Column width={3}>
                      <Image src={item.images[0]} alt="product" />
                    </Grid.Column>
                    <Grid.Column width={13}>
                        <div>
                          <p>
                            <Link to={"/product/" + item.product}>
                              {item.name}
                            </Link>
                          </p>
                          <b>{item.brand}</b>
                        </div>
                        <div>
                          <button type="button" className="button">
                            Delete
                          </button>
                      </div>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>

                <div className="cart-price">${item.price}</div>
              </li>
            ))
          )}
        </ul>
      </div>
    </Container>
  );
}
