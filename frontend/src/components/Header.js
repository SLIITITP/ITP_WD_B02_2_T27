import React, { Component } from 'react';


export default class Header extends Component {
  render() {
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

        <a className="MenuItems"  href="/">
          <div className="NavLink">
          About
          </div>
        </a>&nbsp;

        <a className="MenuItems"  href="/">
          <div className="NavLink">
          Flights
          </div>
        </a>&nbsp;

        <a className="MenuItems"  href="/">
          <div className="NavLink">
          Hotels
          </div>
        </a>&nbsp;

        <a className="MenuItems"  href="/">
          <div className="NavLink">
          Packages
          </div>
        </a>&nbsp;

        <a className="MenuItems"  href="/">
          <div className="NavLink">
          Cars
          </div>
        </a>&nbsp;

        <a className="MenuItems"  href="/Destination">
          <div className="NavLink">
          Destination
          </div>
        </a>&nbsp;

          
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
    </div>

        
    )
  }
}
