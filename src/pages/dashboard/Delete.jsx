import React from "react";
import { ModalHeader } from "reactstrap";
import { deleteProducts } from "../../service/product";

const Delete = ({
  data,
  setOpenDeleteModal,
  deleteDataId,
  setData,
  setIsDone,
  whatIsDone,
  setWhatIsDone,
}) => {
  const handleDelete = async (prodid) => {
    setWhatIsDone("delete");
    const token = sessionStorage.getItem("x-auth");
    const id = sessionStorage.getItem("id");
    const { code, msg } = await deleteProducts(id, prodid, token);
    if (code === 200) {
      setOpenDeleteModal(false);
      setTimeout(() => {
        setIsDone(true);
      }, 500);
    } else {
      alert(msg);
    }
  };

  return (
    <div className="modal-delete">
      <div>
        <ModalHeader className="delete-header">Delete Data</ModalHeader>
        <div className="modal-delete-btn">
          <button
            className="btn-delete-sure"
            onClick={() => handleDelete(deleteDataId)}
          >
            are you sure?
          </button>
          <button
            className="btn-delete-cancel"
            onClick={() => setOpenDeleteModal(false)}
          >
            {" "}
            Cancel{" "}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Delete;
