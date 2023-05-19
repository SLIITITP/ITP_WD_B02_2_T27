import React, { Component } from 'react';
import axios from 'axios';
import swal from 'sweetalert';

// Creating a new recipe...

export default class Employee_Registration extends Component {

  constructor(props){
    super(props);
    this.state={
        Name:"",
        NIC:"",
        Address:"",
        MobileNumber:"",
        Email:"",
        Description:"",
        Remark:""
    }
  }

  handleInputChange = (e) =>{
    const {name,value} = e.target;

    this.setState({
      ...this.state,
      [name]:value
    })

  }

  onSubmit = (e) =>{

    e.preventDefault();

    const {Name,NIC,Address,MobileNumber,Email,Description,Remark} = this.state;

    const data ={
        Name:Name,
        NIC:NIC,
        Address:Address,
        MobileNumber:MobileNumber,
        Email:Email,
        Description:Description,
        Remark:Remark
    }

    console.log(data)

    // Validation 

    const cuem = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


    if(Name.length === 0 || NIC.length === 0 || Address.length === 0 || MobileNumber.length === 0 || Email.length === 0  || Description.length === 0  ){
      swal(" Fields Cannot empty !","Please enter all data !", "error");
    }else if(Name.length < 4 ){
      swal("Invalid  Name !", "Length shuld be greater than 4 !", "error");
    }else if(NIC.length < 9 ){
      swal("Invalid NIC Number !", "Length shuld be greater than 9 !", "error");
    }else if(Address.length < 4 ){
      swal("Invalid Address !", "Length shuld be greater than 4 !", "error");
    }else if(Remark.length < 0 ){
      swal("Invalid Remark !", "", "error");
    }
    else{

    axios.post("/EmployeeRegistration/save",data).then((res) =>{
      if(res.data.success){
        this.setState(
          {
            Name:"",
            NIC:"",
            Address:"",
            MobileNumber:"",
            Email:"",
            Description:"",
            Remark:""
          }
        )
      }
    });
    swal({ text: "Legal Case Type Successfully Added", icon: "success", button: "Okay!"})
  .then((value) => {
      window.location = '/Employee_Details'; // /ListEmployeeRegistration
  });}
  }   

//demo button method
demo =() => { 

  //setState
  this.setState ({
    Name: "Pasindu Shavinda"
  })

  this.setState ({
    NIC: "805284383V"
  })

  this.setState ({
    Address: "Colombo 03"
  })

  this.setState ({
    MobileNumber: "0771231234"
  })

  this.setState ({
    Email: "pasindu@gmail.com"
  })

  this.setState ({
    Description: "have a lot"
  })

  this.setState ({
    Remark: " "
  })

}

  render() {
    return (
    <div>

<div class="d-grid gap-2 col-6 mx-auto">
<button class="btn btn-success" type="button" style={{marginTop:'250px'}}></button>
  <button type="btn btn-success" class="btn btn-success" variant = "primary"> <a href="/Employee_Registration" style={{textDecoration:'none',color:'white',marginTop:'250px'}}>
  Add New Employees </a></button>
  <button class="btn btn-success" type="button"><a href="/Employee_Details" style={{textDecoration:'none',color:'white',marginTop:'250px'}}>View Employee List</a></button>
  <button type="btn btn-success" class="btn btn-success" variant = "primary"> <a href="/AddPayroll" style={{textDecoration:'none',color:'white',marginTop:'250px'}}>
  Add New Payrolls </a></button>
  <button type="btn btn-success" class="btn btn-success" variant = "primary"> <a href="/Payroll_Details" style={{textDecoration:'none',color:'white',marginTop:'250px'}}>
  View Payroll List </a></button>
  <button class="btn btn-success" type="button"></button>
  <button class="btn btn-success" type="button"></button>
  <button class="btn btn-success" type="button"></button>
</div>

     </div>
    )
   }
}


