import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    Container,
    Button
} from "semantic-ui-react";
import { saveProduct, listProducts } from "../../redux/actions/productAcrions";
import CreateProductModal from '../../components/CreateProductModal'
import ProductsTable from '../../components/ProductsTable'

export default function ProductsScreen() {
    const [modalOpen, setModalOpen] = useState(false);

    const productList = useSelector(state => state.productList);
    const { loading, products, error } = productList;

    const productSave = useSelector((state) => state.productSave);
    const {
        loading: loadingSave,
        success: successSave,
        error: errorSave,
    } = productSave;

    const dispatch = useDispatch();

    useEffect(() => {
        if (successSave) {
            setModalOpen(false)
        }
        dispatch(listProducts());
    }, [successSave]);

    const handleSubmit = (e, data) => {
        e.preventDefault();

        const { name, brand, price, countInStock, images } = data;
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
        <Container className="products-wrapper">
            <div>
                <Button
                    size='tiny'
                    content='Create new product'
                    onClick={() => setModalOpen(true)}
                />
                <CreateProductModal
                    modalOpen={modalOpen}
                    handleClose={() => setModalOpen(false)}
                    errorSave={errorSave}
                    successSave={successSave}
                    handleSubmit={handleSubmit}
                    loadingSave={loadingSave}
                />
            </div>
            <h3>Products</h3>
            <ProductsTable products={products}/>
        </Container>
    );
}
