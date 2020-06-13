import React, { useState } from "react";

import Calendar from "./components/Calendar";

import "./App.css";
import AlertBar from "./components/AlertBar";

const App = () => {
  // AlertBar
  const [showAlert, toggleAlert] = useState(false);
  const [alertType, setAlertType] = useState();
  const [alertMessage, setAlertMessage] = useState();

  return (
    <div className="App">
      <header>
        <div id="logo">
          <span className="icon">date_range</span>
          <span>
            simple<b>calendar</b>
          </span>
        </div>
      </header>
      <main>
        <Calendar
          toggleAlert={toggleAlert}
          setAlertType={setAlertType}
          setAlertMessage={setAlertMessage}
        />
      </main>
      <AlertBar
          showAlert={showAlert}
          alertType={alertType}
          alertMessage={alertMessage}
      />
    </div>
  );
}

export default App;