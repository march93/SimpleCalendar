import React from "react";
import { format } from "date-fns";
import parseISO from 'date-fns/parseISO'
import { Modal, List, Button } from "antd";

import dayOfWeek from "../helpers/DayOfWeekHelper";

import 'antd/dist/antd.css';

const EventModal = ({
    modalOpen,
    toggleModal,
    selectedDate,
    dateEvents
}) => {
    const handleOk = () => toggleModal();

    const handleCancel = () => toggleModal();

    const dateFormat = "MMMM d";
    const timeFormat = "h:mma";

    return (
        <div className="event-modal">
            <Modal
                title={dayOfWeek(selectedDate) + ", " + format(selectedDate, dateFormat)}
                visible={modalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                >
                <List
                    size="large"
                    bordered
                    dataSource={dateEvents}
                    renderItem={item =>
                        <List.Item>
                            <Button type="text">
                                <p>
                                    <b>[{item.title}]</b> <span>{format(parseISO(item.startTime), timeFormat)} - {format(parseISO(item.endTime), timeFormat)}</span>
                                </p>
                            </Button>
                        </List.Item>
                    }
                />
            </Modal>
        </div>
    );
}

export default EventModal;