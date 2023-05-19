import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import Employee_Registration from './components/sup_manage/Employee_Registration';
import Employee_Details from './components/sup_manage/Employee_Details';
import Edit_Employee from './components/sup_manage/Edit_Employee';

import AddPayroll from './components/sup_manage/AddPayroll';
import Payroll_Details from './components/sup_manage/Payroll_Details';
import Edit_PayrollDetails from './components/sup_manage/Edit_PayrollDetails';

import Footer from './components/sup_manage/Footer';
import NavBar from './components/NavBar';
import Home from './components/sup_manage/Home'

class App extends Component{
  render(){
    return(
      <Router>
        <NavBar/> {/* Create navbar */}
        <div style = {{backgroundColor:'#e0f6fc',  margin:"0"}}>
        
          
          <Route path="/Employee_Registration" exact component={Employee_Registration}></Route>
          <Route path="/Employee_Details" exact component={Employee_Details}></Route>
          <Route path="/Edit_Employee/:id" exact component={Edit_Employee}></Route>
          <Route path="/Home" exact component={Home}></Route>
          <Route path="/AddPayroll" exact component={AddPayroll}></Route>
          <Route path="/Payroll_Details" exact component={Payroll_Details}></Route>
          <Route path="/Edit_PayrollDetails/:id" exact component={Edit_PayrollDetails}></Route>
         

          <div style={{paddingTop:'0px',width:'100%'}}>
          {/* Create footer */}
          <Footer />
          </div>
        </div>
      </Router>
    )
  }
}
export default App;
