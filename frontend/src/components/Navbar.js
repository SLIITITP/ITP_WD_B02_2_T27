import React from "react";
import banner from "../images/banner.png";
import "./navbar.css";

const Navbar = () => {
  return (
    <div className="Container">
      <div className="NavBar">
        <div className="Left">
          <div className="Logo">
            <h3>Serandib Travel</h3>
          </div>
        </div>
        <div className="Right">
          <div className="Menu">
            <div className="MenuItems">
              <div className="NavLink" to={"/about"}>
                About
              </div>
            </div>
            <div className="MenuItems">
              <div className="NavLink" to={"/reservations"}>
                Flights
              </div>
            </div>
            <div className="MenuItems">
              <div className="NavLink" to={"/hotels"}>
                Hotels
              </div>
            </div>
            <div className="MenuItems">
              <div className="NavLink" to={"/packages"}>
                Packages
              </div>
            </div>
            <div className="MenuItems">
              <div className="NavLink" to={"/cars"}>
                Cars
              </div>
            </div>
          </div>
          <div className="ButtonContainer">
            <div className="Button">
              <div className="NavLink" to={"/"}>
                Log Out
              </div>
            </div>
          </div>
        </div>
      </div>
      <img className="banner" src={banner} alt="" />
    </div>
  );
};

export default Navbar;
