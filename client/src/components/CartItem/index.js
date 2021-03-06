import React from "react";
import { Link } from "react-router-dom";
import { Grid, Image } from "semantic-ui-react";
import QuantityInput from "../QuantityInput";
import { useDispatch } from "react-redux";
import "./index.less"

export default function CartItem({ item, addToCart, removeFromCartHandler }) {
  const dispatch = useDispatch();

  return (
    <li className="cart__row">
      <Grid>
        <Grid.Column width={3}>
          <Image src={item.images[0]} alt="product" />
        </Grid.Column>
        <Grid.Column width={5}>
          <h3>
            <Link to={"/product/" + item.product}>{item.name}</Link>
          </h3>
          <p>{item.brand}</p>
          <div>
            <button
              className="btn-reset"
              onClick={() => removeFromCartHandler(item.product)}
            >
              Remove
            </button>
          </div>
        </Grid.Column>
        <Grid.Column width={8} textAlign="center">
          <span className="price">${item.price}</span>
          <QuantityInput
            handleChange={addToCart}
            increase={() => dispatch(addToCart(item.product, +item.qty + 1))}
            decrease={() => dispatch(addToCart(item.product, +item.qty - 1))}
            qty={item.qty}
            productId={item.product}
            countInStock={item.countInStock}
          />
          <span className="price">${(item.price * item.qty).toFixed(2)}</span>
        </Grid.Column>
      </Grid>
    </li>
  );
}

export function CartItemMini({ item }) {

  return (
    <li>
      <Grid>
        <Grid.Column width={3}>
          <div className="product-thumbnail ">
           <Image src={item.images[0]} alt="product" />
            <span className="product-thumbnail__quantity">{item.qty}</span>
          </div>
        </Grid.Column>
        <Grid.Column width={5} textAlign="left">
          <h3>{item.name}</h3>
          <p>{item.brand}</p>
        </Grid.Column>
        <Grid.Column width={8} textAlign="right">
          <span className="price">${(item.price * item.qty).toFixed(2)}</span>
        </Grid.Column>
      </Grid>
    </li>
  );
}
