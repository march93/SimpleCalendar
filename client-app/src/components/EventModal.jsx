import React from "react";
import moment from 'moment';
import { format } from "date-fns";
import parseISO from 'date-fns/parseISO'
import {
    Modal,
    List,
    Button,
    Input,
    DatePicker,
    TimePicker
} from "antd";

import dayOfWeek from "../helpers/DayOfWeekHelper";

import 'antd/dist/antd.css';

const EventModal = ({
    modalOpen,
    toggleModal,
    selectedDate,
    dateEvents,
    displayEvents,
    editEventState,
    createEventState,
    showEvents,
    showEdit,
    showCreate,
    dayEvent,
    selectDayEvent
}) => {
    const momentDateFormat = "YYYY-MM-DD";
    const momentTimeFormat = "HH:mm:ss"
    const dateFormat = "MMMM d";
    const timeFormat = "h:mma";
    let body;

    const handleOk = () => toggleModal();

    const handleCancel = () => toggleModal();

    const moveToEditMode = (event) => {
        selectDayEvent(event);
        showEdit();
    }

    if (displayEvents) {
        body = <List
                    size="large"
                    bordered
                    dataSource={dateEvents}
                    renderItem={item =>
                        <List.Item>
                            <Button
                                type="text"
                                onClick={() => moveToEditMode(item)}
                            >
                                <p>
                                    <b>[{item.title}]</b> <span>{format(parseISO(item.startTime), timeFormat)} - {format(parseISO(item.endTime), timeFormat)}</span>
                                </p>
                            </Button>
                        </List.Item>
                    }
                />;
    } else if (editEventState) {
        body = <div>
                    <h3>Edit {dayEvent.title}</h3>
                    <Input
                        className="modalTitleInput"
                        placeholder="Title"
                        value={dayEvent.title}
                    />
                    <DatePicker.RangePicker
                        className="modalRangePicker"
                        defaultValue={[moment(dayEvent.startTime, momentDateFormat), moment(dayEvent.endTime, momentDateFormat)]}
                    />
                    <TimePicker.RangePicker
                        className="modalTimeRange"
                        defaultValue={[moment(dayEvent.startTime, momentTimeFormat), moment(dayEvent.endTime, momentTimeFormat)]}
                    />
              </div>
    } else if (createEventState) {

    }

    return (
        <div className="event-modal">
            <Modal
                title={dayOfWeek(selectedDate) + ", " + format(selectedDate, dateFormat)}
                visible={modalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                {body}
            </Modal>
        </div>
    );
}

export default EventModal;