import React, { useEffect, useState } from "react";
import { Button, Row, Col, Input, FormGroup, Label, Form } from "reactstrap";
import { createProducts } from "../../service/product";
const initialValue = function initial() {
  const initialValue = {
    name: "",
    price: 0,
    stock: 0,
    category: "",
    description: "",
    picture: "",
  };
  return initialValue;
};
const NewForm = ({ data, setData, setOpenModal, setIsDone, setWhatIsDone }) => {
  const [form, setForm] = useState(initialValue);

  useEffect(() => {
    initialValue();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = sessionStorage.getItem("x-auth");
    const id = sessionStorage.getItem("id");
    const { code, msg } = await createProducts(form, id, token);
    if (code === 200) {
      setOpenModal(false);
      setIsDone(true);
      setWhatIsDone("create");
    } else {
      alert(msg);
    }
  };

  return (
    <>
      <Row>
        <Form onSubmit={handleSubmit}>
          <>
            {Object.keys(form).map(
              (key, idx) =>
                key !== "id" && (
                  <FormGroup key={idx}>
                    <Label>{key}</Label>
                    <Input
                      value={form[key]}
                      placeholder={key}
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
                {" "}
                Submit
              </Button>
              <Button
                onClick={() => setOpenModal(false)}
                className="btn-action-cancel"
              >
                {" "}
                Cancel{" "}
              </Button>
            </Col>
          </Row>
        </Form>
      </Row>
    </>
  );
};

export default NewForm;
