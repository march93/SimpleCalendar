
import React from "react";

import dayOfWeek from "../helpers/DayOfWeekHelper";

const Days = () => {
    const days = [];

    for (let i = 0; i < 7; i++) {
        days.push(
            <div className="col col-center" key={i}>
                {dayOfWeek(null, i)}
            </div>
        );
    }

    return (
        <div className="days row">{days}</div>
    );
}

export default Days;