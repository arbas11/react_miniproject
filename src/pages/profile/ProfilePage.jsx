import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Modal, ModalHeader } from "reactstrap";
import ModalNotif from "../../component/ModalNotif";
import { deleteProfile, getProfileID } from "../../service/auth";

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

  useEffect(() => {
    if (token) {
      getProfileByID();
    }
  }, []);

  return (
    <div className="profile-container">
      <h1>{`Welcome ${profileToShow.fullname}`}</h1>
      <img
        className="profile-image"
        src={profileToShow.profilepic}
        alt="profile"
      />
      <Link to="/dashboard">
        <button className="login-link">Check your dashboard</button>
      </Link>
      <button className="login-link" onClick={handleDeleteModal}>
        Delete your account
      </button>
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
    </div>
  );
};

export default ProfilePage;
