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


const initialValue = {
    id: (Math.random() * Date.now()),
    name: "",
    price: 0,
    stock: 0,
    category: ""
}
const NewForm = ({ data, setOpenModal }) => {
    const [form, setForm] = useState(initialValue);
    const handleSubmit = (e) => {
        e.preventDefault();
        data.push(form);
        setOpenModal(false);
    }

    return (
        <>
            <Row>
                <Form onSubmit={handleSubmit}>
                    <>
                        {Object.keys(form).map((key, idx) => (
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