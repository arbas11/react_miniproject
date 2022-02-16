import React, { useState } from "react";
import {
    Button,
    Row,
    Col,
    Input,
    FormGroup,
    Label,
    Form
} from 'reactstrap';
import { v4 as uuid } from 'uuid';
import { createProducts } from '../../service/product';

const num = Math.floor((Math.random() * 100000) + 1);
const initialValue = {
    id: uuid(),
    name: "",
    price: 0,
    stock: 0,
    category: "",
    pictureURL: `https://loremflickr.com/200/200/${num}`
}
const NewForm = ({ data, setOpenModal }) => {
    const [form, setForm] = useState(initialValue);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { code, msg, products } = await createProducts(data, form)
        if (code === 200) {
            setForm(products)
            setOpenModal(false);
            alert(msg)
        } else {
            alert(msg)
        }
    }

    return (
        <>
            <Row>
                <Form onSubmit={handleSubmit}>
                    <>
                        {Object.keys(form).map((key, idx) => (
                            key !== 'id' &&
                            <FormGroup key={idx}>
                                <Label>{key}</Label>
                                <Input
                                    value={form[key]}
                                    placeholder={key}
                                    onChange={(e) => setForm(prev => ({
                                        ...prev,
                                        [key]: e.target.value
                                    }))}
                                    required
                                />
                            </FormGroup>
                        ))}
                    </>
                    <Row>
                        <Col>
                            <Button color="primary" type="submit"> Submit</Button>
                        </Col>
                        <Col>
                            <Button onClick={() => setOpenModal(false)} color="danger"> Cancel </Button>
                        </Col>
                    </Row>
                </Form>
            </Row>

        </>)
}

export default NewForm;