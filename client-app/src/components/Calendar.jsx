import React, { useState } from "react";
import addMonths from "date-fns/addMonths";
import subMonths from "date-fns/subMonths";
import startOfMonth from "date-fns/startOfMonth";
import endOfMonth from "date-fns/endOfMonth";
import startOfWeek from "date-fns/startOfWeek";
import endOfWeek from "date-fns/endOfWeek";

import Header from "./Header";
import Days from "./Days";
import Cells from "./Cells";

const Calendar = () => {
    const [currentMonth, setMonth] = useState(new Date());

    // Start and End dates of the current month
    const [monthStart, setMonthStart] = useState(startOfMonth(currentMonth));
    const [monthEnd, setMonthEnd] = useState(endOfMonth(currentMonth));

    // Start and End date of the first and last week of the month
    const [startOfWeekForMonth, setMonthWeekStart] = useState(startOfWeek(monthStart));
    const [endOfWeekForMonth, setMonthWeekEnd] = useState(endOfWeek(monthEnd));

    const [selectedDate, selectDate] = useState();

    const handleNextMonth = () => {
        setMonth(addMonths(currentMonth, 1));
        setMonthStart(startOfMonth(currentMonth));
        setMonthEnd(endOfMonth(currentMonth));
        setMonthWeekStart(startOfWeek(monthStart));
        setMonthWeekEnd(endOfWeek(monthEnd));
    }

    const handlePrevMonth = () => {
        setMonth(subMonths(currentMonth, 1));
        setMonthStart(startOfMonth(currentMonth));
        setMonthEnd(endOfMonth(currentMonth));
        setMonthWeekStart(startOfWeek(monthStart));
        setMonthWeekEnd(endOfWeek(monthEnd));
    }

    const handleSelectDate = (day) => {
        selectDate(day);
    }

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
                startOfWeekForMonth={startOfWeekForMonth}
                endOfWeekForMonth={endOfWeekForMonth}
                selectedDate={selectedDate}
                selectDate={handleSelectDate}
            />
        </div>
    );
}

export default Calendar;