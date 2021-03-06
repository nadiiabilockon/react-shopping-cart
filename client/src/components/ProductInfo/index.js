import React from "react";
import { Button } from "semantic-ui-react";
import QuantityInput from "../QuantityInput";

export function ProductInfo({ product, qty, setQty, addToCart }) {
  return (
    <React.Fragment>
      <p>${product.price}</p>
      <p className="uppercase">{product.brand}</p>
      <h2>{product.name}</h2>
      <div className="text-center">
        <p>Status: {product.countInStock > 0 ? "In Stock" : "Sold Out"}</p>
        {product.countInStock > 0 && (
          <React.Fragment>
            <p className="quantity-selector uppercase">Quantity</p>
            <QuantityInput
              handleChange={setQty}
              increase={() => setQty(+qty + 1)}
              decrease={() => setQty(+qty - 1)}
              qty={qty}
              countInStock={product.countInStock}
            />
          </React.Fragment>
        )}
      </div>
      <div className="add-to-cart__wrapper">
        <Button
          basic
          color="black"
          onClick={addToCart}
          disabled={product.countInStock < 1}
        >
          <span>Add to Cart</span>
          <span className="unicode">•</span>
          <span>
            ${product.price && (qty * product.price).toFixed(2)}{" "}
            {qty > 1 && `(${qty})`}
          </span>
        </Button>
      </div>
    </React.Fragment>
  );
}
