import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { ROUTE_NAMES } from "./Routes";
import Layout from "./Pages/Layout";
import SignIn from "./Components/SignIn";
import Home from "./Pages/Home";
import Staff from "./Pages/Staff";

function App() {
  const [isLoggedIn] = useState(localStorage.getItem('logedIn') === 'true');

  return (
    <div>
      <Routes>
        <Route element={<Layout/>}>
          {isLoggedIn ? (
            <>
              <Route path={ROUTE_NAMES.HOME} element={<Home/>}/>
              <Route path={ROUTE_NAMES.STAFF} element={<Staff/>}/>
              <Route path="*" element={<Home/>}/>
            </>
          ) : (
            <>
              <Route path={ROUTE_NAMES.HOME} element={<SignIn/>}/>
              <Route path="*" element={<SignIn/>}/>
            </>
          )}
        </Route>
      </Routes>
    </div>
  );
}

export default App;