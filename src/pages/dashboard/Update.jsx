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
import { v4 as uuid } from 'uuid';
import { updateProducts } from '../../service/product';


const initialValue = {
    id: uuid(),
    name: "",
    price: 0,
    stock: 0,
    category: ""
}
const UpdateForm = ({ data, setOpenModal, updatedDataId, setData, setIsDone, setWhatIsDone }) => {
    const [form, setForm] = useState(initialValue);
    const handleSubmit = async (e) => {
        e.preventDefault();
        const { code, msg, products } = await updateProducts(data, form, updatedDataId)
        if (code === 200) {
            setData(products)
            setIsDone(true)
            setWhatIsDone('update')
            setOpenModal(false)
        } else {
            alert(msg)
        }
    }
    useEffect(() => {
        const editData = data.rows.filter(v => v.id === updatedDataId)[0]
        setForm(editData)
    }, [data, updatedDataId])

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
                        <Col className="modal-btn">
                            <Button className="btn-submit" type="submit"> Submit</Button>
                            <Button onClick={() => setOpenModal(false)} className="btn-action-cancel"> Cancel </Button>
                        </Col>
                    </Row>
                </Form>
            </Row>

        </>)
}

export default UpdateForm;