import React, { useState } from "react";
import moment from 'moment';
import { format } from "date-fns";
import isSameDay from "date-fns/isSameDay";
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
    events,
    dateEvents,
    displayEvents,
    editEventState,
    createEventState,
    showEvents,
    showEdit,
    dayEvent,
    selectDayEvent,
    updateEvent,
    createEventCopy,
    setCreateEvent,
    createEvent
}) => {
    const [disableOk, setDisableOk] = useState(false);

    const momentDateFormat = "YYYY-MM-DD";
    const momentTimeFormat = "h:mm a"
    const dateFormat = "MMMM d";
    let modalTitle = dayOfWeek(selectedDate) + ", " + format(selectedDate, dateFormat);
    let body;
    let dayEventCopy = dayEvent;

    const handleOk = () => {
        if (editEventState) {
            // Edit Mode
            updateEvent(dayEvent);
        } else if (createEventState) {
            // Create mode
            createEventCopy.userId = 1;
            createEvent(createEventCopy);
        }

        toggleModal();
    }

    const handleCancel = () => {
        // Go back to showing events if it's in edit mode
        if (editEventState) {
            showEvents();

            // Set day event back
            selectDayEvent({...dayEventCopy});
        } else if (createEventState) {
            // Clear fields
            setCreateEvent({});
            setDisableOk(false);
            toggleModal();
        } else {
            toggleModal();
        }
    }

    const moveToEditMode = (event) => {
        selectDayEvent(event);
        showEdit();
    }

    const titleChanged = (event) => {
        const { name, value } = event.currentTarget;
        selectDayEvent({...dayEvent, title: value});
    }

    const dateChanged = (event) => {
        const changedDate = event.format();
        selectDayEvent({...dayEvent, eventDate: changedDate});
        checkCollisionsUpdate(changedDate, undefined);
    }

    const timeChanged = (time, timeString) => {
        const converted = timeString.map((t) => moment(t, momentTimeFormat).format());
        selectDayEvent({...dayEvent, startTime: converted[0], endTime: converted[1]});
        checkCollisionsUpdate(undefined, converted)
    }

    const createTitleChanged = (event) => {
        const { name, value } = event.currentTarget;
        setCreateEvent({...createEventCopy, title: value});
    }

    const createDateChanged = (event) => {
        const changedDate = event.format();
        setCreateEvent({...createEventCopy, eventDate: changedDate});
        checkCollisionsCreate(changedDate, undefined);
    }

    const createTimeChanged = (time, timeString) => {
        const converted = timeString.map((t) => moment(t, momentTimeFormat).format());
        setCreateEvent({...createEventCopy, startTime: converted[0], endTime: converted[1]});
        checkCollisionsCreate(undefined, converted);
    }

    const checkCollisionsCreate = (changedDateParam, converted) => {
        let convertedCopy = createEventCopy;
        if (converted !== undefined) convertedCopy = {eventDate: createEventCopy.eventDate, startTime: converted[0], endTime: converted[1]};
        if (changedDateParam !== undefined) convertedCopy.eventDate = changedDateParam;

        // Check if user has existing events during these times
        const collision = events.filter((event) => {
            return isSameDay(parseISO(event.eventDate), parseISO(convertedCopy.eventDate)) &&
                   (
                        // Event sandboxed
                        (event.startTime <= convertedCopy.startTime &&
                        event.endTime >= convertedCopy.endTime) ||

                        // Overlap in the beginning
                        (event.startTime >= convertedCopy.startTime &&
                        event.startTime <= convertedCopy.endTime) ||

                        // Overlap at the end
                        (event.endTime >= convertedCopy.startTime &&
                        event.endTime <= convertedCopy.endTime)
                   )
        });

        if (collision.length !== 0) setDisableOk(true);
        else setDisableOk(false);
    }

    const checkCollisionsUpdate = (changedDateParam, converted) => {
        let convertedCopy = dayEvent;
        if (converted !== undefined) convertedCopy = {eventDate: dayEvent.eventDate, startTime: converted[0], endTime: converted[1]};
        if (changedDateParam !== undefined) convertedCopy.eventDate = changedDateParam;

        // Check if user has existing events during these times
        const collision = events.filter((event) => {
            return isSameDay(parseISO(event.eventDate), parseISO(convertedCopy.eventDate)) &&
                   (
                        // Event sandboxed
                        (event.startTime <= convertedCopy.startTime &&
                        event.endTime >= convertedCopy.endTime) ||

                        // Overlap in the beginning
                        (event.startTime >= convertedCopy.startTime &&
                        event.startTime <= convertedCopy.endTime) ||

                        // Overlap at the end
                        (event.endTime >= convertedCopy.startTime &&
                        event.endTime <= convertedCopy.endTime)
                   )
        });

        if (collision.length !== 0) setDisableOk(true);
        else setDisableOk(false);
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
                                    <b>[{item.title}]</b> <span>{moment(item.startTime).format('LT')} - {moment(item.endTime).format('LT')}</span>
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
                        onChange={titleChanged}
                    />
                    <DatePicker
                        className="modalRangePicker"
                        defaultValue={moment(dayEvent.eventDate, momentDateFormat)}
                        onChange={dateChanged}
                    />
                    <TimePicker.RangePicker
                        className="modalTimeRange"
                        use12Hours
                        format="h:mm a"
                        defaultValue={[moment(dayEvent.startTime), moment(dayEvent.endTime)]}
                        onChange={timeChanged}
                    />
              </div>;
    } else if (createEventState) {
        modalTitle = '';
        body = <div>
                    <h3>Create Event</h3>
                    <Input
                        className="modalTitleInput"
                        placeholder="Title"
                        value={createEventCopy.title}
                        onChange={createTitleChanged}
                    />
                    <DatePicker
                        className="modalRangePicker"
                        onChange={createDateChanged}
                    />
                    <TimePicker.RangePicker
                        className="modalTimeRange"
                        use12Hours
                        format="h:mm a"
                        onChange={createTimeChanged}
                    />
                    <p
                        className="errorMessage"
                        hidden={!disableOk}
                    >
                        Events scheduled during this time!
                    </p>
              </div>;
    }

    return (
        <div className="event-modal">
            <Modal
                title={modalTitle}
                visible={modalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                okButtonProps={{disabled: disableOk}}
            >
                {body}
            </Modal>
        </div>
    );
}

export default EventModal;