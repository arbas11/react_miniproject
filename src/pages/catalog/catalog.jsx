import React, { useEffect, useState } from "react";
import '../../App.css';
import { v4 as uuid } from 'uuid';
import { deleteProducts, getProducts } from "../../service/product";
// import { Button, Modal, ModalBody, ModalFooter, ModalHeader, Table } from 'reactstrap';

function Catalog() {
    const [data, setData] = useState({ headers: [], rows: [] });
    const getData = async () => {
        const { code, products, msg } = await getProducts()
        if (code === 200) {
            setData(products)
        } else {
            alert(msg)
        }
    }

    useEffect(() => {
        getData()
    }, [])
    return (<section id="main-section" className="main-content row">
        {data.rows.map((value, idx) => (
            <div key={idx} className="item-card card col-lg-3 col-md-4 col-sm-6 col-xs-6">
                <div className="item-header">
                    <span id='artistName2' className="brand-name">{value.category}</span>
                </div>
                <span id='itemImg2'>
                    <img src={value.pictureURL} className="item-images img-fluid card-img-top" alt="Product" />
                </span>
                <span className="item-footer">
                    <span id='itemTitle2' className="item-name">{value.name}</span>
                    <span id='itemPrice2' className="price-tag">Rp {value.price},-</span>
                </span>
                <button
                    type="button" className="btn btn-primary item-btn" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    Detail
                </button>
            </div>
        ))}

    </section>
    )
}
export default Catalog;
