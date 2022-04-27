import React, { useState } from "react";
import { Button, Row, Col, Input, FormGroup, Label, Form } from "reactstrap";
import { updateProducts } from "../../service/product";

const UpdateForm = ({
  setOpenModal,
  updatedDataId,
  setData,
  setIsDone,
  setWhatIsDone,
  productData,
}) => {
  const initialValue = {
    name: productData.name,
    price: productData.price,
    stock: productData.stock,
    category: productData.category,
    description: productData.description,
    picture: productData.picture,
  };
  const [form, setForm] = useState(initialValue);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = sessionStorage.getItem("x-auth");
    const id = sessionStorage.getItem("id");
    const { code, msg, products } = await updateProducts(
      form,
      id,
      updatedDataId,
      token
    );
    if (code === 200) {
      setData(products);
      setIsDone(true);
      setWhatIsDone("update");
      setOpenModal(false);
    } else {
      alert(msg);
    }
  };

  return (
    <>
      <Row>
        <Form onSubmit={handleSubmit}>
          <>
            {Object.keys(productData).map(
              (key, idx) =>
                key !== "id" &&
                key !== "createdAt" &&
                key !== "updatedAt" &&
                key !== "merchantId" &&
                key !== "merchant_id" && (
                  <FormGroup key={idx}>
                    <Label>{key}</Label>
                    <Input
                      value={form[key]}
                      placeholder={productData[key]}
                      onChange={(e) =>
                        setForm((prev) => ({
                          ...prev,
                          [key]: e.target.value,
                        }))
                      }
                      required
                    />
                  </FormGroup>
                )
            )}
          </>
          <Row>
            <Col className="modal-btn">
              <Button className="btn-submit" type="submit">
                Submit
              </Button>
              <Button
                onClick={() => setOpenModal(false)}
                className="btn-action-cancel"
              >
                Cancel
              </Button>
            </Col>
          </Row>
        </Form>
      </Row>
    </>
  );
};

export default UpdateForm;
