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

const Calendar = () => {
    // Events
    const [events, setEvents] = useState([]);

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
            console.log('Error:', error);
        });
    }

    useEffect(() => {
        fetchEvents(currentMonth);
    }, []);

    return (
        <div className="calendar">
            <Header
                currentMonth={currentMonth}
                nextMonth={handleNextMonth}
                prevMonth={handlePrevMonth}
            />
            <Days
                currentMonth={currentMonth}
            />
            <Cells
                events={events}
                monthStart={monthStart}
                startOfWeekForMonth={startOfWeekForMonth}
                endOfWeekForMonth={endOfWeekForMonth}
                selectedDate={selectedDate}
                selectDate={handleSelectDate}
            />
            <EventModal
                modalOpen={modalOpen}
                toggleModal={handleToggleModal}
                selectedDate={selectedDate}
            />
        </div>
    );
}

export default Calendar;