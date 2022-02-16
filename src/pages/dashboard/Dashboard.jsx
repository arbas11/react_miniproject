import React, { useEffect, useState } from "react";
import '../../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Modal, ModalBody, ModalHeader, Table } from 'reactstrap';
import NewForm from "./create";
import UpdateForm from "./Update"
import { deleteProducts, getProducts } from "../../service/product";


function Dashboard() {
    const [data, setData] = useState({ headers: [], rows: [] });
    const [openCreateModal, setOpenCreateModal] = useState(false);
    const [openUpdateModal, setOpenUpdateModal] = useState(false);
    const [updatedDataId, setUpdatedDataId] = useState({});

    const handleDelete = async (id) => {

        const { code, msg, products } = await deleteProducts(data, id)
        if (code === 200) {
            setData(products)
            alert(msg)
        } else {
            alert(msg)
        }
    }
    function handleUpdate(id) {
        setUpdatedDataId(id)
        setOpenUpdateModal(true)
    }

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

    return <div style={{ margin: "50px" }}>
        <h1>Crud data</h1>
        <Button
            color="primary"
            onClick={() => setOpenCreateModal(true)}>create data</Button>
        <Table striped>
            <thead>
                <tr>
                    <th>No</th>
                    {data.headers.map((header, idx) => (<th key={idx}>{header}</th>))}
                </tr>
            </thead>
            <tbody>
                {data.rows.map((value, idx) => (
                    <tr key={idx}>
                        <th scope="row">
                            {idx + 1}
                        </th>

                        <td>{value.id}</td>
                        <td>{value.name}</td>
                        <td>{value.price}</td>
                        <td>{value.stock}</td>
                        <td>{value.category}</td>

                        <td><Button className="btn-info" onClick={() => handleUpdate(value.id)}>edit</Button></td>
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
                    setData={setData}
                    setOpenModal={setOpenUpdateModal}
                    updatedDataId={updatedDataId}
                />
            </ModalBody>
        </Modal>
    </div>
}

export default Dashboard;