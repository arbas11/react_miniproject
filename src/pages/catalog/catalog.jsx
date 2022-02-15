import React, { useEffect, useState } from "react";
import '../../App.css';
import { v4 as uuid } from 'uuid';
// import { Button, Modal, ModalBody, ModalFooter, ModalHeader, Table } from 'reactstrap';

const dummy = [
    {
        "id": uuid(),
        "name": "Baju",
        "price": 200000,
        "stock": 200,
        "category": "pakaian",
        "pict": "https://picsum.photos/200"
    },
    {
        "id": uuid(),
        "name": "Celana",
        "price": 100000,
        "stock": 400,
        "category": "pakaian",
        "pict": "https://picsum.photos/200"
    },
    {
        "id": uuid(),
        "name": "jaket",
        "price": 400000,
        "stock": 400,
        "category": "pakaian",
        "pict": "https://picsum.photos/200"
    }
]

function Catalog() {
    const [data, setData] = useState([])
    useEffect(() => { setData(dummy) }, [])
    return (<section id="main-section" className="main-content row">
        {data.map((value, idx) => (
            <div key={idx} className="item-card card col-lg-3 col-md-4 col-sm-6 col-xs-6">
                <div className="item-header">
                    <span id='artistName2' className="brand-name">{value.category}</span>
                </div>
                <span id='itemImg2'>
                    <img src={value.pict} className="item-images img-fluid card-img-top" alt="Product" />
                </span>
                <span className="item-footer">
                    <span id='itemTitle2' className="item-name">{value.name}</span>
                    <span id='itemPrice2' className="price-tag">{value.price}</span>
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
