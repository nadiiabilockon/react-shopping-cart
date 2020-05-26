import React, { useState } from "react";
import {
    Button,
    Grid,
    Form,
    Icon,
    Image,
    Modal,
    Message,
} from "semantic-ui-react";
import "./index.less";

export default function CreateProductModal(props) {
    const [name, setName] = useState("");
    const [brand, setBrand] = useState("");
    const [price, setPrice] = useState("");
    const [countInStock, setCountInStock] = useState("");
    const [images, setImages] = useState([]);
    const [previews, setPreviews] = useState([]);

    const uploadMultipleFiles = (e) => {
        setImages([...images, e.target.files]);
        for (let i = 0; i < e.target.files.length; i++) {
            setPreviews([...previews, URL.createObjectURL(e.target.files[i])]);
        }
    };

    return (
        <Modal open={props.modalOpen} size="small" className="modal">
            <Grid textAlign="center" verticalAlign="middle">
                <Grid.Column>
                    <h3>Create new product</h3>
                    <Form
                        size="large"
                        loading={props.loadingSave}
                        onSubmit={(e) =>
                            props.handleSubmit(e, {
                                name,
                                brand,
                                price,
                                countInStock,
                                images,
                            })
                        }
                    >
                        <Form.Input
                            fluid
                            required
                            placeholder="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <Form.Input
                            fluid
                            required
                            placeholder="Brand"
                            value={brand}
                            onChange={(e) => setBrand(e.target.value)}
                        />
                        <Form.Input
                            fluid
                            required
                            placeholder="Price"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                        <Form.Input
                            fluid
                            required
                            placeholder="Count in stock"
                            value={countInStock}
                            onChange={(e) => setCountInStock(e.target.value)}
                        />
                        <div className="file-upload">
                            <label>
                                <Icon name="cloud upload" />
                            Upload images
                            <input
                                    type="file"
                                    name="productImages"
                                    onChange={uploadMultipleFiles}
                                    multiple
                                />
                            </label>
                        </div>
                        <Image.Group size="tiny">
                            {(previews || []).map((url, index) => (
                                <Image key={index} src={url} alt="Product foto" />
                            ))}
                        </Image.Group>
                        <Modal.Actions>
                            <Button
                                content="Cancel"
                                onClick={props.handleClose} />
                            <Button content="Create" />
                        </Modal.Actions>
                    </Form>
                    {props.errorSave && <Message error content={props.errorSave} />}
                </Grid.Column>
            </Grid>
        </Modal>
    );
}
