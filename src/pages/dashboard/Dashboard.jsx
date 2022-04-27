import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Table } from "reactstrap";
import { getMerchantProducts } from "../../service/product";
import FormModal from "../../component/FormModal";
import ModalNotif from "../../component/ModalNotif";
import Delete from "./Delete";

function Dashboard() {
  const [data, setData] = useState();
  const [header, setHeader] = useState();
  const [openModal, setOpenModal] = useState(false);
  const [updatedDataId, setUpdatedDataId] = useState({});
  const [productData, setProductData] = useState({});
  const [deleteDataId, setDeleteDataId] = useState({});
  const [isDone, setIsDone] = useState(false);
  const [whatIsDone, setWhatIsDone] = useState("");
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const getAllProduct = async () => {
    const token = sessionStorage.getItem("x-auth");
    const id = sessionStorage.getItem("id");
    const data = await getMerchantProducts(id, token);
    if (data) {
      const headerToShow = Object.keys(data.data[0]);
      headerToShow.splice(-5, 5);
      setHeader(headerToShow);
      setData(data.data);
    }
  };

  useEffect(() => {
    getAllProduct();
  }, [openModal, openDeleteModal]);

  function handleCreate() {
    setOpenModal(true);
    setWhatIsDone("create");
  }

  function handleUpdate(prodid, value) {
    setProductData(value);
    setWhatIsDone("update");
    setUpdatedDataId(prodid);
    setOpenModal(true);
  }

  const handleDelete = async (prodid) => {
    setWhatIsDone("update");
    setDeleteDataId(prodid);
    setOpenDeleteModal(true);
  };

  return (
    <div style={{ margin: "50px" }}>
      {/* modal succesfull */}
      <Modal isOpen={isDone} toggle={() => setIsDone(!isDone)}>
        <ModalNotif whatIsDone={whatIsDone} />
      </Modal>
      <h1>Product Table</h1>
      <button
        className={`btn-action-create`}
        onClick={() => {
          handleCreate();
        }}
      >
        create
      </button>
      <Table striped>
        <thead>
          <tr>
            <th>No</th>
            {header && header.map((header, idx) => <th key={idx}>{header}</th>)}
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((value, idx) => (
              <tr key={idx}>
                <th scope="row">{idx + 1}</th>

                <td>{value.id}</td>
                <td>{value.name}</td>
                <td>{value.price}</td>
                <td>{value.stock}</td>
                <td>{value.category}</td>
                <td>{value.description}</td>
                <td>
                  <button
                    className={`btn-action-edit`}
                    onClick={() => handleUpdate(value.id, value)}
                  >
                    edit
                  </button>
                </td>
                <td>
                  <button
                    className={`btn-action-delete`}
                    onClick={() => handleDelete(value.id)}
                  >
                    delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
      {/* modal delete*/}
      <Modal
        isOpen={openDeleteModal}
        toggle={() => setOpenDeleteModal(!openDeleteModal)}
      >
        <Delete
          data={data}
          setData={setData}
          setOpenDeleteModal={setOpenDeleteModal}
          deleteDataId={deleteDataId}
          setIsDone={setIsDone}
          whatIsDone={whatIsDone}
          setWhatIsDone={setWhatIsDone}
        />
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
          setWhatIsDone={setWhatIsDone}
          productData={productData}
        />
      </Modal>
    </div>
  );
}
export default Dashboard;
