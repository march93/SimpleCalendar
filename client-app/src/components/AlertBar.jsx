import React from "react";
import { Alert } from "antd";

const AlertBar = ({
    showAlert,
    alertType,
    alertMessage
}) => {
    let body;

    if (showAlert) {
        body = <Alert
                    type={alertType}
                    message={alertMessage}
                    closable="true"
               />;
    }

    return (
        <div className="alert">
            {body}
        </div>
    );
}

export default AlertBar;