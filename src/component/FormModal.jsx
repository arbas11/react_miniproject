import React from 'react'
import { ModalBody, ModalHeader } from 'reactstrap'
import NewForm from '../pages/dashboard/create'
import UpdateForm from '../pages/dashboard/Update'

function FormModal({ data,
    setData,
    openModal,
    setOpenModal,
    updatedDataId,
    setUpdatedDataId,
    isDone,
    setIsDone,
    whatIsDone,
    setWhatIsDone, }) {
    return (
        <div>
            <ModalHeader className="header-modal-table">{whatIsDone} data</ModalHeader>
            <ModalBody>
                {/* modal create*/}
                {whatIsDone === 'create' &&
                    <NewForm
                        data={data}
                        setData={setData}
                        setOpenModal={setOpenModal}
                        setIsDone={setIsDone}
                        whatIsDone={whatIsDone}
                        setWhatIsDone={setWhatIsDone} />}
                {/* modal update*/}
                {whatIsDone === 'update' &&
                    <UpdateForm
                        data={data}
                        setData={setData}
                        setOpenModal={setOpenModal}
                        updatedDataId={updatedDataId}
                        setIsDone={setIsDone}
                        whatIsDone={whatIsDone}
                        setWhatIsDone={setWhatIsDone} />}
            </ModalBody>
        </div>
    )
}

export default FormModal