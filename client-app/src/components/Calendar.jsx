import React, { useState, useEffect } from "react";
import addMonths from "date-fns/addMonths";
import subMonths from "date-fns/subMonths";
import startOfMonth from "date-fns/startOfMonth";
import endOfMonth from "date-fns/endOfMonth";
import startOfWeek from "date-fns/startOfWeek";
import endOfWeek from "date-fns/endOfWeek";
import axios from 'axios';

import Header from "./Header";
import Days from "./Days";
import Cells from "./Cells";
import EventModal from "./EventModal";

const Calendar = ({
    toggleAlert,
    setAlertType,
    setAlertMessage
}) => {
    // User
    const [currentUser, setUser] = useState({});

    // Events
    const [events, setEvents] = useState([]);
    const [selectedDateEvents, selectDateEvents] = useState([]);
    const [selectedDayEvent, selectDayEvent] = useState({});
    const [occurrence, setOccurrence] = useState("single");

    // Create Event
    const [createEventCopy, setCreateEvent] = useState({});

    // Current month and selected date
    const [currentMonth, setMonth] = useState(new Date());
    const [selectedDate, selectDate] = useState(new Date());

    // Start and End dates of the current month
    const [monthStart, setMonthStart] = useState(startOfMonth(currentMonth));
    const [monthEnd, setMonthEnd] = useState(endOfMonth(currentMonth));

    // Start and End date of the first and last week of the month
    const [startOfWeekForMonth, setMonthWeekStart] = useState(startOfWeek(monthStart));
    const [endOfWeekForMonth, setMonthWeekEnd] = useState(endOfWeek(monthEnd));

    // Modal State
    const [modalOpen, toggleModal] = useState(false);
    const [displayEvents, setDisplayEvents] = useState(false);
    const [editEventState, setEditEventState] = useState(false);
    const [createEventState, setCreateEventState] = useState(false);

    const handleNextMonth = () => {
        // Update and assign to variables
        // Otherwise, the ones dependent on the ones
        // that need to change will never get updated properly
        let addMonth = addMonths(currentMonth, 1);
        let addWeekStart = startOfMonth(addMonth);
        let addWeekEnd = endOfMonth(addMonth);

        setMonth(addMonth);
        setMonthStart(startOfMonth(addMonth));
        setMonthEnd(endOfMonth(addMonth));
        setMonthWeekStart(startOfWeek(addWeekStart));
        setMonthWeekEnd(endOfWeek(addWeekEnd));

        // Fetch next month's events
        fetchEvents(addMonth);
    }

    const handlePrevMonth = () => {
        // Update and assign to variables
        // Otherwise, the ones dependent on the ones
        // that need to change will never get updated properly
        let subMonth = subMonths(currentMonth, 1);
        let subWeekStart = startOfMonth(subMonth);
        let subWeekEnd = endOfMonth(subMonth);

        setMonth(subMonth);
        setMonthStart(startOfMonth(subMonth));
        setMonthEnd(endOfMonth(subMonth));
        setMonthWeekStart(startOfWeek(subWeekStart));
        setMonthWeekEnd(endOfWeek(subWeekEnd));

        // Fetch prev month's events
        fetchEvents(subMonth);
    }

    const handleSelectDate = (day) => {
        selectDate(day);
        toggleModal(!modalOpen);
    }

    const handleToggleModal = () => {
        toggleModal(!modalOpen);
    }

    const handleDisplayEvents = () => {
        setDisplayEvents(true);

        // If Edit or Create events are true, set to false
        if (editEventState) setEditEventState(false);
        if (createEventState) setCreateEventState(false);
    }

    const handleEditEventState = () => {
        setEditEventState(true);

        // If Display or Create events are true, set to false
        if (displayEvents) setDisplayEvents(false);
        if (createEventState) setCreateEventState(false);
    }

    const handleCreateEventState = () => {
        setCreateEventState(true);

        // If Display or Edit events are true, set to false
        if (displayEvents) setDisplayEvents(false);
        if (editEventState) setEditEventState(false);
    }

    const handleSelectDateEvents = (selectedEvents) => {
        selectDateEvents(selectedEvents);
    }

    const handleSelectDayEvent = (dayEvent) => {
        selectDayEvent(dayEvent);
    }

    const fetchEvents = async (date) => {
        await axios.get('http://localhost:5000/users/1/events', {
            params: {
                date: date
            }
        })
        .then(response => {
            setEvents(response.data);
        })
        .catch(error => {
            toggleAlert(true);
            setAlertType("error");
            setAlertMessage(error);
        });
    }

    const createEvent = async (event) => {
        const payload = {...event, occurrence: occurrence};

        await axios.post('http://localhost:5000/events', payload)
        .then(response => {
            toggleAlert(true);
            setAlertType("success");
            setAlertMessage("Successfully created event!");
            setEvents([...events, ...response.data]);
            setCreateEvent({});
        })
        .catch(error => {
            toggleAlert(true);
            setAlertType("error");
            setAlertMessage(error);
        });
    }

    const updateEvent = async (event) => {
        let body = {};
        if (event.title) body.title = event.title;
        if (event.eventDate) body.eventDate = event.eventDate;
        if (event.startTime) body.startTime = event.startTime;
        if (event.endTime) body.endTime = event.endTime;

        await axios.patch('http://localhost:5000/events/' + event.id, body)
        .then(response => {
            toggleAlert(true);
            setAlertType("success");
            setAlertMessage("Successfully updated event!");
            setEvents([...events.filter(a => a.id !== event.id), event]);
        })
        .catch(error => {
            toggleAlert(true);
            setAlertType("error");
            setAlertMessage(error);
        });
    }

    const deleteEvent = async (id) => {
        toggleModal(false);

        await axios.delete('http://localhost:5000/events/' + id)
        .then(response => {
            toggleAlert(true);
            setAlertType("success");
            setAlertMessage("Successfully deleted event!");
            setEvents([...events.filter(a => a.id !== id)]);
        })
        .catch(error => {
            toggleAlert(true);
            setAlertType("error");
            setAlertMessage(error);
        });
    }

    const getUser = async () => {
        await axios.get('http://localhost:5000/users/1')
        .then(response => {
            setUser(response.data);
        })
        .catch(error => {
            toggleAlert(true);
            setAlertType("error");
            setAlertMessage(error);
        });
    }

    const updateUser = async (hours) => {
        await axios.patch('http://localhost:5000/users/1', {
            workingHours: hours
        })
        .then(response => {
            toggleAlert(true);
            setAlertType("success");
            setAlertMessage("Successfully updated user!");
            setUser({...currentUser, workingHours: hours});
        })
        .catch(error => {
            toggleAlert(true);
            setAlertType("error");
            setAlertMessage(error);
        });
    }

    useEffect(() => {
        getUser();
        fetchEvents(currentMonth);
    }, []);

    return (
        <div className="calendar">
            <Header
                currentMonth={currentMonth}
                nextMonth={handleNextMonth}
                prevMonth={handlePrevMonth}
                toggleModal={handleToggleModal}
                showCreate={handleCreateEventState}
                currentUser={currentUser}
                updateUser={updateUser}
            />
            <Days
                currentMonth={currentMonth}
            />
            <Cells
                events={events}
                selectDateEvents={handleSelectDateEvents}
                monthStart={monthStart}
                startOfWeekForMonth={startOfWeekForMonth}
                endOfWeekForMonth={endOfWeekForMonth}
                selectedDate={selectedDate}
                selectDate={handleSelectDate}
                showEvents={handleDisplayEvents}
            />
            <EventModal
                modalOpen={modalOpen}
                toggleModal={handleToggleModal}
                selectedDate={selectedDate}
                events={events}
                dateEvents={selectedDateEvents}
                displayEvents={displayEvents}
                editEventState={editEventState}
                createEventState={createEventState}
                showEvents={handleDisplayEvents}
                showEdit={handleEditEventState}
                dayEvent={selectedDayEvent}
                selectDayEvent={handleSelectDayEvent}
                updateEvent={updateEvent}
                createEventCopy={createEventCopy}
                setCreateEvent={setCreateEvent}
                createEvent={createEvent}
                deleteEvent={deleteEvent}
                currentUser={currentUser}
                setOccurrence={setOccurrence}
            />
        </div>
    );
}

export default Calendar;