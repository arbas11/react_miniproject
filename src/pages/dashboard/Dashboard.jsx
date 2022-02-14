import React, { useEffect, useState } from "react";
import '../../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Modal, ModalBody, ModalHeader, Table } from 'reactstrap';
import NewForm from "./create";
import UpdateForm from "./Update"

const dummy = [
    {
        "id": "323234342",
        "name": "Baju",
        "price": 200000,
        "stock": 200,
        "category": "pakaian"
    },
    {
        "id": "12121212",
        "name": "Celana",
        "price": 100000,
        "stock": 400,
        "category": "pakaian"
    },
    {
        "id": "3324239129",
        "name": "jaket",
        "price": 400000,
        "stock": 400,
        "category": "pakaian"
    }
]

const header = Object.keys(dummy[0]);

function Dashboard() {
    const [data, setData] = useState([])
    const [openCreateModal, setOpenCreateModal] = useState(false);
    const [openUpdateModal, setOpenUpdateModal] = useState(false);
    const [editedDataId, setEditedDataId] = useState({});
    function handleDelete(id) {
        const updateData = data.filter((v) => v.id !== id)
        setData(updateData)
    }
    function handleEdit(id) {
        setEditedDataId(id)
        setOpenUpdateModal(true)
    }

    useEffect(() => { setData(dummy) }, [])
    return <div style={{ margin: "50px" }}>
        <h1>Crud data</h1>
        <Button
            color="primary"
            onClick={() => setOpenCreateModal(true)}>create data</Button>
        <Table striped>
            <thead>
                <tr>
                    <th>no</th>
                    {header.map((v, idx) => (<th key={idx}>{v}</th>))}
                    <th>action</th>
                </tr>
            </thead>
            <tbody>
                {data.map((value, idx) => (
                    <tr key={idx}>
                        <th scope="row">
                            {idx + 1}
                        </th>

                        <td>{value.id}</td>
                        <td>{value.name}</td>
                        <td>{value.price}</td>
                        <td>{value.stock}</td>
                        <td>{value.category}</td>

                        <td><Button className="btn-info" onClick={() => handleEdit(value.id)}>edit</Button></td>
                        <td><Button className="btn-danger" onClick={() => handleDelete(value.id)}>delete</Button></td>
                    </tr>
                ))}
            </tbody>
        </Table>
        {/* modal create*/}
        <Modal isOpen={openCreateModal} toggle={() => setOpenCreateModal(!openCreateModal)}>
            <ModalHeader>create data</ModalHeader>
            <ModalBody>
                <NewForm
                    data={data}
                    setOpenModal={setOpenCreateModal}
                />
            </ModalBody>
        </Modal>
        {/* modal update*/}
        <Modal isOpen={openUpdateModal} toggle={() => setOpenUpdateModal(!openUpdateModal)}>
            <ModalHeader>update data</ModalHeader>
            <ModalBody>
                <UpdateForm
                    data={data}
                    setOpenModal={setOpenUpdateModal}
                    editedDataId={editedDataId}
                />
            </ModalBody>
        </Modal>
    </div>
}

export default Dashboard;