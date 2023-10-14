import React, { useState, useEffect, useRef } from "react";
import { Outlet } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { ROUTE_NAMES } from "../../Routes";
import "./style.css";

import SignIn from "../../Components/SignIn";

import Logo from "../../assets/Images/Logo.png";
import AddDocIcon from "../../assets/Images/AddDocIcon.png";
import User from "../../assets/Images/user.png";

import { MdKeyboardArrowDown } from "react-icons/md";
import { ImSearch } from "react-icons/im";
import { FiBell } from "react-icons/fi";
import { FaUser } from "react-icons/fa";
import { ImExit } from "react-icons/im";

export default function Layout() {
  const isLoggedIn = localStorage.getItem("logedIn") === "true";
  const options = ["Team2B", "How2B", "Train2B"];
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Կազմակերպություն");
  const dropdownRef = useRef(null);
  const userDropdownRef = useRef(null);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setDropdownOpen(false);
  };

  const toggleUserDropdown = () => {
    setUserDropdownOpen(!userDropdownOpen);
  };

  // Close the company dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Close the user dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        userDropdownRef.current &&
        !userDropdownRef.current.contains(event.target)
      ) {
        setUserDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      {!isLoggedIn ? (
        <SignIn />
      ) : (
        <>
          <div className="profileContainer">
            <div className="sideBar">
              <div className="rowspan">
                <div className="mainLogo">
                  <NavLink to={ROUTE_NAMES.HOME}>
                    <img src={Logo} alt="mainLogo" />
                  </NavLink>
                </div>
                <NavLink
                  to={ROUTE_NAMES.HOME}
                  className={({ isActive }) =>
                    isActive ? "navItem activeNav" : "navItem"
                  }
                >
                  <h3 className="menuBtn">Գլխավոր</h3>
                </NavLink>
                <NavLink
                  to={ROUTE_NAMES.STAFF}
                  className={({ isActive }) =>
                    isActive ? "navItem activeNav" : "navItem"
                  }
                >
                  <h3 className="menuBtn">Ստաֆ</h3>
                </NavLink>
                <h3 className="menuBtn">Կազմակերպություններ</h3>
                <h3 className="menuBtn">Աշխատողներ</h3>
                <h3 className="menuBtn">Գնացուցակ</h3>
                <h3 className="menuBtn">Գործողությունների պատմություն</h3>
                <h3 className="menuBtn">Հետադարձ կապ</h3>
                <div className="addDocSection">
                  <h3>
                    Կատարել<br />գործողություն
                  </h3>
                  <button>+</button>
                  <img src={AddDocIcon} alt="AddDocIcon" className="AddDocIcon" />
                </div>
              </div>
            </div>
            <div className="profileRCol">
              <div className="profileHeader">
                <div className="InputContainer">
                  <div>
                    <input
                      type="text"
                      value={selectedOption}
                      readOnly={true}
                      onCopy={(e) => e.preventDefault()}
                      style={{ userSelect: "none" }}
                      name="Կազմակերպություն"
                      className={`inpts headerInpt companySelect ${
                        selectedOption !== "Կազմակերպություն"
                          ? "selected"
                          : ""
                      }`}
                      onClick={toggleDropdown}
                      ref={dropdownRef}
                    />
                    <MdKeyboardArrowDown
                      className={`passwordIcon dropdownIcon ${
                        selectedOption !== "Կազմակերպություն"
                          ? "open"
                          : ""
                      }`}
                      onClick={toggleDropdown}
                    />
                    {dropdownOpen && (
                      <div className="CompanyDropdownOptions" ref={dropdownRef}>
                        {options.map((option, index) => (
                          <div
                            key={index}
                            className="CompanyDropdownOption"
                            onClick={() => handleOptionClick(option)}
                          >
                            {option}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <div className="groupedHeaderSec">
                  <div className="InputContainer">
                    <div>
                      <input
                        type="text"
                        placeholder="Փնտրել"
                        name="Փնտրել"
                        className="inpts headerInpt"
                      />
                      <ImSearch className="passwordIcon searchIcon" />
                    </div>
                  </div>
                  <FiBell className="notificationBell" />
                  <div className="userBlock">
                    <div className="userAvatar" onClick={toggleUserDropdown}>
                      <img src={User} alt="user" />
                    </div>
                    <h2 className="userName" onClick={toggleUserDropdown}>
                      Ա․ Ազգանուն
                    </h2>
                    <MdKeyboardArrowDown
                      className="profileDropDownIcon"
                      onClick={toggleUserDropdown}
                    />
                    {userDropdownOpen && (
                      <div className="UserDropdown" ref={userDropdownRef}>
                        <div>
                          <FaUser /> Օգտատեր
                        </div>
                        <div>
                          <ImExit /> Դուրս գալ
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="profileMenu">{/* Menu content */}</div>
              <div className="profileInfoSection">
                <Outlet />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
