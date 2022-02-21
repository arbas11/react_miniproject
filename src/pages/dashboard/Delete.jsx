import React from "react";
import {
    ModalHeader
} from 'reactstrap';
import { deleteProducts } from '../../service/product';

const Delete = ({ data, setOpenDeleteModal, deleteDataId, setData, setIsDone, whatIsDone, setWhatIsDone }) => {
    const handleDelete = async (id) => {
        setWhatIsDone('delete')
        const { code, msg, products } = await deleteProducts(data, id)
        if (code === 200) {
            setData(products)
            setOpenDeleteModal(false)
            setTimeout(() => {
                setIsDone(true)
            }, 500);
        } else {
            alert(msg)
        }
    }

    return (
        <div className="modal-delete">
            <div>
                <ModalHeader className="delete-header">Delete Data</ModalHeader>
                <div className="modal-delete-btn">
                    <button className="btn-delete-sure" onClick={() => handleDelete(deleteDataId)} >are you sure?</button>
                    <button className="btn-delete-cancel" onClick={() => setOpenDeleteModal(false)}> Cancel </button>
                </div>
            </div>
        </div>)
}

export default Delete;