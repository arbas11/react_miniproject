import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, ModalBody, ModalHeader, Table } from 'reactstrap';
import NewForm from "./create";
import UpdateForm from "./Update"
import { deleteProducts, getProducts } from "../../service/product";
import ButtonAction from "../../component/ButtonAction";


function Dashboard() {
    const [data, setData] = useState({ headers: [], rows: [] });
    const [openCreateModal, setOpenCreateModal] = useState(false);
    const [openUpdateModal, setOpenUpdateModal] = useState(false);
    const [updatedDataId, setUpdatedDataId] = useState({});
    const [isDone, setIsDone] = useState(false);
    const [whatIsDone, setWhatIsDone] = useState("");

    const handleDelete = async (id) => {

        const { code, msg, products } = await deleteProducts(data, id)
        if (code === 200) {
            setData(products)
            setIsDone(true)
            setWhatIsDone('delete')
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
        {/* modal succesfull */}
        {isDone &&
            <Modal isOpen={isDone} toggle={() => setIsDone(!isDone)}>
                {whatIsDone === "update" &&
                    <ModalHeader>Update Data</ModalHeader>}
                {whatIsDone === "create" &&
                    <ModalHeader>Create Data</ModalHeader>}
                {whatIsDone === "delete" &&
                    <ModalHeader>Delete Data</ModalHeader>}
                <ModalBody>sucessfully!!
                </ModalBody>
            </Modal>}
        <h1>Product Table</h1>
        <ButtonAction what="create data" todo={setOpenCreateModal} doit={true} />
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
                        <td>{value.description}</td>
                        <td><ButtonAction what="edit" todo={handleUpdate} doit={value.id} /></td>
                        <td><ButtonAction what="delete" todo={handleDelete} doit={value.id} /></td>
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
                    setData={setData}
                    setOpenModal={setOpenCreateModal}
                    isDone={setIsDone}
                    setWhatIsDone={setWhatIsDone}
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
                    isDone={setIsDone}
                    setWhatIsDone={setWhatIsDone}
                />
            </ModalBody>
        </Modal>
    </div>
}

export default Dashboard;