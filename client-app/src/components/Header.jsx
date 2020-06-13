import React from "react";
import { format } from "date-fns";
import { Button, Switch } from "antd";

const Header = ({
    currentMonth,
    nextMonth,
    prevMonth,
    toggleModal,
    showCreate,
    currentUser,
    updateUser
}) => {
    const dateFormat = "MMMM yyyy";

    const updateHours = (checked) => {
        updateUser(checked);
    }

    return (
        <div className="header row flex-middle">
            <div className="col col-start">
                <div className="icon" onClick={prevMonth}>
                chevron_left
                </div>
            </div>
            <div>
                <span className="officeHours">Set Office Hours</span>
                <Switch
                    checked={currentUser.workingHours}
                    onChange={updateHours}
                />
            </div>
            <div className="col col-center">
                <span>
                {format(currentMonth, dateFormat)}
                </span>
            </div>
            <div>
                <Button
                    onClick={() => {
                        showCreate();
                        toggleModal();
                    }}
                >
                    Create Event
                </Button>
            </div>
            <div className="col col-end" onClick={nextMonth}>
                <div className="icon">chevron_right</div>
            </div>
        </div>
    );
}

export default Header;