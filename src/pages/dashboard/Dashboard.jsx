import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Table } from 'reactstrap';
import { getProducts } from "../../service/product";
import ButtonAction from "../../component/ButtonAction";
import FormModal from "../../component/FormModal";
import ModalNotif from "../../component/ModalNotif";
import Delete from './Delete'


function Dashboard() {
    const [data, setData] = useState({ headers: [], rows: [] });
    const [openModal, setOpenModal] = useState(false);
    const [updatedDataId, setUpdatedDataId] = useState({});
    const [deleteDataId, setDeleteDataId] = useState({});
    const [isDone, setIsDone] = useState(false);
    const [whatIsDone, setWhatIsDone] = useState("");
    const [openDeleteModal, setOpenDeleteModal] = useState(false)


    const handleDelete = async (id) => {
        setWhatIsDone('update')
        setDeleteDataId(id)
        setOpenDeleteModal(true)
    }
    function handleUpdate(id) {
        setWhatIsDone('update')
        setUpdatedDataId(id)
        setOpenModal(true)
    }
    function handleCreate() {
        setOpenModal(true)
        setWhatIsDone('create')
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
        <Modal isOpen={isDone} toggle={() => setIsDone(!isDone)}>
            <ModalNotif whatIsDone={whatIsDone} />
        </Modal>
        <h1>Product Table</h1>
        <button className={`btn-action-create`} onClick={() => { handleCreate() }}>create</button>
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
                        <td><ButtonAction what="edit" todo={handleUpdate} toChange={value.id} /></td>
                        <td><ButtonAction what="delete" todo={handleDelete} toChange={value.id} /></td>
                    </tr>
                ))}
            </tbody>
        </Table>
        {/* modal delete*/}
        <Modal isOpen={openDeleteModal} toggle={() => setOpenDeleteModal(!openDeleteModal)}>

            <Delete
                data={data}
                setData={setData}
                setOpenDeleteModal={setOpenDeleteModal}
                deleteDataId={deleteDataId}
                setIsDone={setIsDone}
                whatIsDone={whatIsDone}
                setWhatIsDone={setWhatIsDone} />

        </Modal>
        {/* modal create and update*/}
        <Modal isOpen={openModal} toggle={() => setOpenModal(!openModal)}>

            <FormModal
                data={data}
                setData={setData}
                setOpenModal={setOpenModal}
                updatedDataId={updatedDataId}
                setIsDone={setIsDone}
                whatIsDone={whatIsDone}
                setWhatIsDone={setWhatIsDone} />
        </Modal>
    </div>
}
export default Dashboard;