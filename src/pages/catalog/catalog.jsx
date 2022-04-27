import React, { useEffect, useState } from "react";
import { getProducts } from "../../service/product";
import Detail from "../../component/DetailModal";
import { Modal, ModalBody } from "reactstrap";

function Catalog() {
  const [data, setData] = useState();
  const [productData, setProductData] = useState({});
  const [openProductModal, setOpenProductModal] = useState(false);
  const getData = async () => {
    const response = await getProducts();
    if (response.status === 200) {
      setData(response.data);
    }
  };

  function handleDetail(product) {
    setProductData(product);
    setOpenProductModal(true);
  }
  useEffect(() => {
    getData();
  }, []);
  return (
    <section className="main-content catalog-container row">
      {data ? (
        data.map((value, idx) => (
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
        <div>no product available</div>
      )}
      {/* product detail modal */}
      <Modal
        isOpen={openProductModal}
        toggle={() => setOpenProductModal(!openProductModal)}
      >
        <ModalBody>
          <Detail data={productData} setOpenModal={setOpenProductModal} />
        </ModalBody>
      </Modal>
    </section>
  );
}
export default Catalog;
