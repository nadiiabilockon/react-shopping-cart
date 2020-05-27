import React, { useState, useEffect } from "react";
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

export default function CreateProductModal({
    product,
    modalOpen,
    loadingSave,
    errorSave,
    handleSubmit,
    handleClose,
}) {
    const [id, setId] = useState("");
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

    useEffect(() => {
        if (!modalOpen) {
            setPreviews([]);
            setId('')
            setName('')
            setBrand('')
            setPrice('')
            setCountInStock('')
            setImages([])
        }
        if (product._id) {
            setId(product._id)
            setName(product.name)
            setBrand(product.brand)
            setPrice(product.price)
            setCountInStock(product.countInStock)
            setImages(product.images)
            setPreviews(product.images);
        }
    }, [modalOpen, product]);

    return (
        <Modal open={modalOpen} size="small" className="modal">
            <Grid textAlign="center" verticalAlign="middle">
                <Grid.Column>
                    <h3>Product</h3>
                    <Form
                        size="large"
                        loading={loadingSave}
                        onSubmit={(e) =>
                            handleSubmit(e, {
                                id,
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
                            <Button content="Cancel" onClick={handleClose} />
                            <Button content={product._id ? "Update" : "Create"} />
                        </Modal.Actions>
                    </Form>
                    {errorSave && <Message error content={errorSave} />}
                </Grid.Column>
            </Grid>
        </Modal>
    );
}
