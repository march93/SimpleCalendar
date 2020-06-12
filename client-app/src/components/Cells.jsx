import React from "react";
import format from "date-fns/format";
import addDays from "date-fns/addDays";
import isSameDay from "date-fns/isSameDay";
import isSameMonth from "date-fns/isSameMonth";

const Cells = ({
    monthStart,
    monthEnd,
    startOfWeekForMonth,
    endOfWeekForMonth,
    selectedDate,
    selectDate
}) => {
    const dateFormat = "d";
    const rows = [];

    let days = [];
    let day = startOfWeekForMonth;
    let formattedDate = "";

    while (day <= endOfWeekForMonth) {
        for (let i = 0; i < 7; i++) {
            formattedDate = format(day, dateFormat);
            const cloneDay = day;

            days.push(
                <div
                    className={`col cell ${
                        !isSameMonth(day, monthStart)
                            ? "disabled"
                            : isSameDay(day, selectedDate) ? "selected" : ""
                    }`}
                    key={day}
                    onClick={() => selectDate(cloneDay)}
                >
                    <span className="number">{formattedDate}</span>
                    <span className="bg">{formattedDate}</span>
                </div>
            );

            day = addDays(day, 1);
        }

        rows.push(
            <div className="row" key={day}>
                {days}
            </div>
        );

        days = [];
    }

    return (
        <div className="body">{rows}</div>
    );
}

export default Cells;