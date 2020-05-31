import React from 'react'
import { Step } from 'semantic-ui-react'

export default function CheckoutSteps(props) {
    return (
        <div className="text-center">
        <Step.Group>
            <Step active={props.step1 ? true : false}>
                Signin
            </Step>
            <Step active={props.step2 ? true : false}>
                Shipping
            </Step>
            <Step active={props.step3 ? true : false}>
                Payment
            </Step>
            <Step active={props.step4 ? true : false}>
                Confirm Order
            </Step>
        </Step.Group>
        </div>
    )
}
