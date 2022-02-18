import React, { useEffect, useState } from "react";
import { getProducts } from "../../service/product";
import Detail from "../../component/DetailModal";
import { Modal, ModalBody } from 'reactstrap';
// import { Button, Modal, ModalBody, ModalFooter, ModalHeader, Table } from 'reactstrap';

function Catalog() {
    const [data, setData] = useState({ headers: [], rows: [] });
    const [productData, setProductData] = useState({});
    const [openProductModal, setOpenProductModal] = useState(false);
    const getData = async () => {
        const { code, products, msg } = await getProducts()
        if (code === 200) {
            setData(products)
        } else {
            alert(msg)
        }
    }
    function handleDetail(products) {
        setProductData(products)
        setOpenProductModal(true)
    }
    useEffect(() => {
        getData()
    }, [])
    return (<section className="main-content catalog-container row">
        {data.rows.map((value, idx) => (
            <div key={idx} className="item-card card col-lg-3 col-md-4 col-sm-6 col-xs-6">
                <div className="item-header">
                    <span className="brand-name">{value.name}</span>
                </div>
                <span id='itemImg2'>
                    <img src={value.pictureURL} className="item-images img-fluid card-img-top" alt="Product" />
                </span>
                <span className="item-footer">
                    <span className="item-name">{value.category}</span>
                    <span className="price-tag">Rp {value.price},-</span>
                </span>
                <button className="btn-action-cancel" onClick={() => handleDetail(value)}>Detail</button>
            </div>
        ))}
        {/* product detail modal */}
        <Modal isOpen={openProductModal} toggle={() => setOpenProductModal(!openProductModal)}>
            <ModalBody>
                <Detail
                    data={productData}
                    setOpenModal={setOpenProductModal}
                />
            </ModalBody>
        </Modal>
    </section>
    )
}
export default Catalog;
