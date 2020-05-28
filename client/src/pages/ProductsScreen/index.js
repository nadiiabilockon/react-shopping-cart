import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, Button, Dimmer, Loader } from "semantic-ui-react";
import {
    saveProduct,
    listProducts,
    deleteProduct,
} from "../../redux/actions/productAcrions";
import CreateProductModal from "../../components/CreateProductModal";
import ProductsTable from "../../components/ProductsTable";

export default function ProductsScreen() {
    const [modalOpen, setModalOpen] = useState(false);
    const [product, setProduct] = useState({});

    const productList = useSelector((state) => state.productList);
    const { loading, products, error } = productList;

    const productSave = useSelector((state) => state.productSave);
    const {
        loading: loadingSave,
        success: successSave,
        error: errorSave,
    } = productSave;

    const productDelete = useSelector((state) => state.productDelete);
    const {
        loading: loadingDelete,
        success: successDelete,
        error: errorDelete,
    } = productDelete;

    const dispatch = useDispatch();

    useEffect(() => {
        if (successSave) {
            setModalOpen(false);
        }
        dispatch(listProducts());
    }, [successSave, successDelete]);

    const openModal = (product) => {
        setProduct(product);
        setModalOpen(true);
    };

    const deleteHandler = (productId) => {
        dispatch(deleteProduct(productId));
    };

    const handleSubmit = (e, data) => {
        e.preventDefault();

        const { id, name, brand, price, countInStock, images } = data;
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
        formData.append("_id", id);
        formData.append("name", name);
        formData.append("brand", brand);
        formData.append("price", price);
        formData.append("countInStock", countInStock);

        dispatch(saveProduct(formData));
    };

    return loading ? (
        <Dimmer active inverted>
            <Loader size="large"></Loader>
        </Dimmer>
    ) : error ? (
        <div>{error}</div>
    ) : (
            <Container className="products-wrapper">
                <div>
                    <Button
                        size="tiny"
                        content="Create new product"
                        onClick={() => openModal({})}
                    />
                    <CreateProductModal
                        product={product}
                        modalOpen={modalOpen}
                        handleClose={() => {
                            setModalOpen(false);
                            setProduct({});
                        }}
                        errorSave={errorSave}
                        successSave={successSave}
                        handleSubmit={handleSubmit}
                        loadingSave={loadingSave}
                    />
                </div>
                <h3>Products</h3>
                <ProductsTable
                    deleteHandler={deleteHandler}
                    openModal={openModal}
                    products={products}
                    loadingDelete={loadingDelete}
                />
            </Container>
        );
}
