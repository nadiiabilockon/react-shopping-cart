import React from 'react'
import { Button } from "semantic-ui-react";
import './index.less'
import { useDispatch } from 'react-redux';

export default function QuantityInput({ increase, decrease, handleChange, qty, countInStock, productId }) {
    const dispatch = useDispatch();

    return (
        <div className="qty-input">
            <Button
                basic
                color='black'
                content='-'
                onClick={() => qty > 1 && decrease()}
            />
            <input
                type="number"
                className="input_qty"
                value={countInStock > 0 && qty}
                onChange={(e) => e.target.value <= countInStock &&( productId ? dispatch(handleChange(productId, e.target.value)) : handleChange(e.target.value))}
                min="1"
                step="1"
            />
            <Button basic color='black'
                onClick={() => qty < countInStock && increase()}
                content='+' />
        </div>
    )
}
