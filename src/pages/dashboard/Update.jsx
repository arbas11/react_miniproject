import React, { useState, useEffect } from "react";
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
const UpdateForm = ({ data, setOpenModal, editedDataId }) => {
    const [form, setForm] = useState(initialValue);
    const handleSubmit = (e) => {
        e.preventDefault();
        const editedData = data.map((row, index) => (row.id === editedDataId ? data[index] = form : { ...row }))
        setForm(editedData)
        setOpenModal(false)
    }
    useEffect(() => {
        const editData = data.filter(v => v.id === editedDataId)[0]
        setForm(editData)
    }, [data, editedDataId])
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

export default UpdateForm;