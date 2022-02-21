import React from 'react'
import { ModalBody, ModalHeader } from 'reactstrap'

function ModalNotif({ whatIsDone }) {
    return (
        <>
            {whatIsDone === "update" &&
                <ModalHeader>Update Data</ModalHeader>}
            {whatIsDone === "create" &&
                <ModalHeader>Create Data</ModalHeader>}
            {whatIsDone === "delete" &&
                <ModalHeader>Delete Data</ModalHeader>}
            <ModalBody>sucessfully!!
            </ModalBody>
        </>
    )
}

export default ModalNotif