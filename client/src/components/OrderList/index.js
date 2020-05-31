import React from "react";
import { List, Divider } from "semantic-ui-react";

export default function OrderList({ orderDetails }) {
    return (
        <List>
            {orderDetails.map((item, key) => {
                return (
                    <List.Item key={key}>
                        {item.name === "Total" && <Divider />}
                        <List.Content
                            floated="right"
                            className={item.name === "Total" ? "price" : ""}
                        >
                            ${item.price}
                        </List.Content>
                        <List.Content>{item.name} </List.Content>
                    </List.Item>
                );
            })}
        </List>
    );
}
