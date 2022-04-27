import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import Detail from "../../component/DetailModal";
import ModalNotif from "../../component/ModalNotif";
import { deleteProfile, getProfileID } from "../../service/auth";
import { getMerchantProducts } from "../../service/product";

let initialValue = {
  id: "",
  username: "",
  fullname: "",
  address: "",
  phonenumber: "",
  hashedPassword: "",
  joindate: "",
};
const token = sessionStorage.getItem("x-auth");
const ProfilePage = () => {
  const [profileToShow, setProfileToShow] = useState(initialValue);
  const [isDone, setIsDone] = useState(false);
  const [whatIsDone, setWhatIsDone] = useState("");
  const [openDeleteProfileModal, setOpenDeleteProfileModal] = useState(false);
  const [merchantProducts, setMerchantProducts] = useState();
  const [openProductModal, setOpenProductModal] = useState(false);
  const [productData, setProductData] = useState({});

  const getProfileByID = async () => {
    const token = sessionStorage.getItem("x-auth");
    const id = sessionStorage.getItem("id");
    const data = await getProfileID(id, token);
    if (data.status === 200) {
      setProfileToShow(data.data);
    } else {
      alert("something wrong");
    }
  };

  const getAllProduct = async () => {
    const token = sessionStorage.getItem("x-auth");
    const id = sessionStorage.getItem("id");
    const data = await getMerchantProducts(id, token);
    setMerchantProducts(data.data);
  };

  const handleDelete = async () => {
    const id = sessionStorage.getItem("id");
    const token = sessionStorage.getItem("x-auth");
    setWhatIsDone("delete profile");
    const result = await deleteProfile(id, token);
    if (result.status === 200) {
      setOpenDeleteProfileModal(false);
      setIsDone(true);
      setTimeout(() => {
        window.location = "/";
      }, 500);
      sessionStorage.removeItem("logged");
      sessionStorage.removeItem("id");
      sessionStorage.removeItem("x-auth");
    } else {
      alert(result.error);
    }
  };

  const handleDeleteModal = (id) => {
    setOpenDeleteProfileModal(true);
  };

  function handleDetail(product) {
    setWhatIsDone("edit product");
    setProductData(product);
    setOpenProductModal(true);
  }

  useEffect(() => {
    if (token) {
      getProfileByID();
      getAllProduct();
    }
  }, []);

  return (
    <div className="profile-container">
      <h4>{`Welcome ${profileToShow.fullname}`}</h4>
      <img
        className="profile-image"
        src={profileToShow.profilepic}
        alt="profile"
      />
      <Link to="/dashboard">
        <button className="login-link profile-link">
          Check your dashboard
        </button>
      </Link>
      <button className="login-link" onClick={handleDeleteModal}>
        Delete your account
      </button>
      <section className="main-content catalog-container merchant-product row">
        <h5 className="collections-style">Your product list:</h5>
        {merchantProducts ? (
          merchantProducts.map((value, idx) => (
            <div
              key={idx}
              className="item-card card col-lg-3 col-md-4 col-sm-6 col-xs-6"
            >
              <div className="item-header">
                <span className="brand-name">{value.name}</span>
              </div>
              <span id="itemImg2">
                <img
                  src={
                    value.picture
                      ? value.picture
                      : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJEK40TRPKbM5JcPw1M6F8ayHInpCGrTNSrg&usqp=CAU"
                  }
                  className="item-images img-fluid card-img-top"
                  alt="Product"
                />
              </span>
              <span className="item-footer">
                <span className="item-name">{value.category}</span>
                <span className="price-tag">Rp {value.price},-</span>
              </span>
              <button
                className="btn-action-detail"
                onClick={() => handleDetail(value)}
              >
                Detail
              </button>
            </div>
          ))
        ) : (
          <div>no product available, please add product on your dashboard</div>
        )}
      </section>
      <Modal
        isOpen={openDeleteProfileModal}
        toggle={() => setOpenDeleteProfileModal(!openDeleteProfileModal)}
      >
        <div className="modal-delete">
          <div>
            <ModalHeader className="delete-header">
              Delete Your Account
            </ModalHeader>
            <div className="modal-delete-btn">
              <button className="btn-delete-sure" onClick={handleDelete}>
                are you sure?
              </button>
              <button
                className="btn-delete-cancel"
                onClick={() => setOpenDeleteProfileModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </Modal>
      {/* modal succesfull */}
      <Modal isOpen={isDone} toggle={() => setIsDone(!isDone)}>
        <ModalNotif whatIsDone={whatIsDone} />
      </Modal>
      {/* product detail modal */}
      <Modal
        isOpen={openProductModal}
        toggle={() => setOpenProductModal(!openProductModal)}
      >
        <ModalBody>
          <Detail
            data={productData}
            setOpenModal={setOpenProductModal}
            whatIsDone={whatIsDone}
          />
        </ModalBody>
      </Modal>
    </div>
  );
};

export default ProfilePage;
