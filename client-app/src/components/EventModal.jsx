import React from "react";
import { format } from "date-fns";
import { Modal } from "antd";

import dayOfWeek from "../helpers/DayOfWeekHelper";

import 'antd/dist/antd.css';

const EventModal = ({
    modalOpen,
    toggleModal,
    selectedDate
}) => {
     const handleOk = () => toggleModal();

     const handleCancel = () => toggleModal();

     const dateFormat = "MMMM d";

    return (
        <div className="event-modal">
            <Modal
                title={dayOfWeek(selectedDate) + ", " + format(selectedDate, dateFormat)}
                visible={modalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                >
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
            </Modal>
        </div>
    );
}

export default EventModal;