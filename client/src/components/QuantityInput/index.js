import React from 'react'
import { Button } from "semantic-ui-react";

export default function QuantityInput({ setQty, qty, countInStock}) {
    return (
        <div className="qty-input">
            <Button
                basic
                color='black'
                content='-'
                onClick={() => qty > 1 && setQty(+qty - 1)}
            />
            <input
                type="number"
                className="input_qty"
                value={countInStock > 0 && qty}
                onChange={(e) => e.target.value <= countInStock && setQty(e.target.value)}
                min="1"
                step="1"
            />
            <Button basic color='black'
                onClick={() => qty < countInStock && setQty(+qty + 1)}
                content='+' />
        </div>
    )
}
