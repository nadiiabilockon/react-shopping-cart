import React from 'react'
import { Step } from 'semantic-ui-react'

export default function CheckoutSteps(props) {
    return (
        <Step.Group>
            <Step active={props.step1 ? true : false}>
                <Step.Content>
                    <Step.Title>Signin</Step.Title>
                </Step.Content>
            </Step>
            <Step active={props.step2 ? true : false}>
                <Step.Content>
                    <Step.Title>Shipping</Step.Title>
                </Step.Content>
            </Step>
            <Step active={props.step3 ? true : false}>
                <Step.Content>
                    <Step.Title>Payment</Step.Title>
                </Step.Content>
            </Step>
            <Step active={props.step4 ? true : false}>
                <Step.Content>
                    <Step.Title>Confirm Order</Step.Title>
                </Step.Content>
            </Step>
        </Step.Group>
    )
}
