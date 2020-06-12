import getDay from "date-fns/getDay";

const DayOfWeekHelper = (day, dayNum) => {
    const week = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return day !== null ? week[getDay(day)] : week[dayNum];
}

export default DayOfWeekHelper;