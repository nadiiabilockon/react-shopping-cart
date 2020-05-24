import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Grid, Container, Form, Segment, Message } from "semantic-ui-react";
import { saveProduct } from "../../redux/actions/productAcrions";

export default function CreateProductScreen() {
    const [name, setName] = useState("");
    const [brand, setBrand] = useState("");
    const [price, setPrice] = useState(0);
    const [countInStock, setCountInStock] = useState(0);
    const [images, setImages] = useState([]);

    const productSave = useSelector((state) => state.productSave);
    const {
        loading: loadingSave,
        success: successSave,
        error: errorSave
    } = productSave;

    const dispatch = useDispatch();

    // useEffect(() => {
    //   if (userInfo) {
    //     props.history.push("/");
    //   }
    // }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();

        if (images.length) {
            Object.keys(images).forEach((key) => {
                if (images[key] instanceof FileList) {
                    formData.append("productImages", images[key][0], images[key][0].name);
                } else {
                    formData.append("productImages", images[key]);
                }
            });
        }

        formData.append("name", name);
        formData.append("brand", brand);
        formData.append("price", price);
        formData.append("countInStock", countInStock);

        dispatch(saveProduct(formData));
    };
    
    return (
        <Container className="signin-wrapper text-center">
            <Grid textAlign="center" verticalAlign="middle">
                <Grid.Column>
                    <h3>Create new product</h3>

                    <Form size="large" loading={loadingSave} onSubmit={handleSubmit}>
                        <Segment stacked>
                            <Form.Input
                                fluid
                                placeholder="Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            <Form.Input
                                fluid
                                placeholder="Brand"
                                value={brand}
                                onChange={(e) => setBrand(e.target.value)}
                            />
                            <Form.Input
                                fluid
                                placeholder="Price"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            />
                            <Form.Input
                                fluid
                                placeholder="Count in stock"
                                value={countInStock}
                                onChange={(e) => setCountInStock(e.target.value)}
                            />
                            <div className="form-group">
                                <input type="file" name="productImages" className="form-control" onChange={e => setImages([...images, e.target.files])} multiple />
                            </div>
                            <Form.Button fluid size="large" content="Create" />
                        </Segment>
                    </Form>
                    {errorSave && <Message error content={errorSave} />}
                </Grid.Column>
            </Grid>
        </Container>
    );
}
