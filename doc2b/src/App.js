import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { ROUTE_NAMES } from "./Routes";
import Layout from "./Pages/Layout";
import SignIn from "./Components/SignIn";
import Home from "./Pages/Home";
import Profile from "./Pages/Profile";
import Staff from "./Pages/Staff";
import Organization from "./Pages/Organizations";
import Activities from "./Pages/Activities";
import Positions from "./Pages/Positions";
import Divisions from "./Pages/Divisions";
import SingleStaffMember from "./Pages/SingleStaffMember";
import SingleCompany from "./Pages/SingleCompany";
import Calendar from "./Pages/Calendar";
import ContactUs from "./Pages/ContactUs";
import SinglePosition from "./Pages/SinglePosition";
import SingleActivity from "./Pages/SingleActivity";
import NewActivity from "./Pages/NewActivity";
import EmailActivatedPage from "./Pages/EmailActivatedPage";
import ConfirmNewPassword from "./Pages/ConfirmNewPassword";

function App() {
  const [isLoggedIn] = useState(localStorage.getItem('logedIn') === 'true');
  return (
    <div>
      <Routes>
        <Route element={<Layout />}>
          {isLoggedIn ? (
            <>
              <Route path={ROUTE_NAMES.HOME} element={<Home />} />

              <Route path={ROUTE_NAMES.PROFILE} element={<Profile />} />

              <Route path={ROUTE_NAMES.STAFF} element={<Staff />} />
              <Route path={ROUTE_NAMES.STAFFMEMBER + ":id"} element={<SingleStaffMember />} />

              <Route path={ROUTE_NAMES.ORGANIZATION} element={<Organization />} />
              <Route path={ROUTE_NAMES.COMPANY + ":id"} element={<SingleCompany />} />

              <Route path={ROUTE_NAMES.ACTIVITES} element={<Activities />} />
              <Route path={ROUTE_NAMES.ACTIVITY + ":id"} element={<SingleActivity />} />

              <Route path={ROUTE_NAMES.POSITIONS} element={<Positions />} />
              <Route path={ROUTE_NAMES.POSITION + ":id"} element={<SinglePosition />} />

              <Route path={ROUTE_NAMES.DIVISION} element={<Divisions />} />

              <Route path={ROUTE_NAMES.CALENDAR} element={<Calendar />} />

              <Route path={ROUTE_NAMES.CONTACTUS} element={<ContactUs />} />

              <Route path={ROUTE_NAMES.NEWACTIVITY} element={<NewActivity />} />

              <Route path="*" element={<Home />} />
            </>
          ) : (
            <>
              <Route path={ROUTE_NAMES.ACTIVATEDEMAIL + ":uid/:token"} element={<EmailActivatedPage />} />
              <Route path={ROUTE_NAMES.RESETPASSWORD + ":uid/:token"} element={<ConfirmNewPassword />} />
              <Route path={ROUTE_NAMES.HOME} element={<SignIn />} />
              <Route path="*" element={<SignIn />} />
            </>
          )}
        </Route>
      </Routes>
    </div>
  );
}

export default App;