import React from "react";
import {
    Button,
    Card,
    CardBody,
    CardTitle,
    CardSubtitle,
    CardText
} from 'reactstrap';
const Detail = ({ data, setOpenModal }) => {
    return (
        <Card>
            <div>
                <CardBody >
                    <CardTitle>{data.name}</CardTitle>
                    <CardSubtitle>{data.category}</CardSubtitle>
                </CardBody>
                <img width="100%" src={data.pictureURL} alt="Card" />
                <CardBody>
                    <CardText>{data.description}</CardText>
                    <Button onClick={() => setOpenModal(false)}> Add to card</Button>
                    <Button onClick={() => setOpenModal(false)}>cancel</Button>
                </CardBody>
            </ div>
        </Card >)
}

export default Detail;