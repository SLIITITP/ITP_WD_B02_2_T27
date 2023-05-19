import React, { Component } from 'react';
import axios from 'axios';
import swal from 'sweetalert';

// Creating a new recipe...

export default class AddPayroll extends Component {

  constructor(props){
    super(props);
    this.state={
        NIC:"",
        Basic:"",
        OT:"",
        Allowances:"",
        Deductions:"",
        Net:""
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

    const {NIC,Basic,OT,Allowances,Deductions,Net} = this.state;

    const data ={
          NIC:NIC,
          Basic:Basic,
          OT:OT,
          Allowances:Allowances,
          Deductions:Deductions,
          Net:Net
    }

    console.log(data)

    // Validation 

    const cuem = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


    if(NIC.length === 0  || Basic.length === 0 || OT.length === 0 || Allowances.length === 0 || Deductions.length === 0 ||Net.length === 0 ){
      swal(" Fields Cannot empty !","Please enter all data !", "error");
    }else if(NIC.length < 9 ){
      swal("Invalid NIC !", "Length shuld be greater than 9 !", "error");
    }else if(Basic.length < 4 ){
      swal("Invalid !", "Length shuld be greater than 4 !", "error");
    }else if(OT.length < 2 ){
        swal("Invalid !", "Length shuld be greater than 2 !", "error");
    }
    else{

    axios.post("/Payroll_Details/save",data).then((res) =>{
      if(res.data.success){
        this.setState(
          {
            NIC:"",
            Basic:"",
            OT:"",
            Allowances:"",
            Deductions:"",
            Net:""
          }
        )
      }
    });
    swal({ text: "Legal Case Type Successfully Added", icon: "success", button: "Okay!"})
  .then((value) => {
      window.location = '/Payroll_Details'; // /ListSupplierRegistration
  });}
  }   

//demo button method
demo =() => { 

  //setState
  this.setState ({
    NIC: "200011763380"
  })

  this.setState ({
    Basic: "50000"
  })

  this.setState ({
    OT: "10000"
  })

  this.setState ({
    Allowances: "5000"
  })

  this.setState ({
    Deductions: "1000"
  })

  this.setState ({
    Net: "64000"
  })

}

  render() {
    return (
    <div>
      
      <div className style={{ backgroundColor:'#F1F1F1', backgroundSize: 'cover'}}> <br/>
        <div className="col-md-8 mt-4 mx-auto">
          <h1 className="text-center" > <font face = "montserrat" size ="6" > ADD NEW PAYROLL </font> </h1> 
          <br/>
          <form className="needs-validation" noValidate style={{backgroundColor: "", 
          }}>
          <br/><br/>

          <div class="form-group" style={{marginLeft:"100px", marginRight:"100px"}} >
              <label><strong>NIC :</strong></label>
              <input type="text"
              className="form-control"
              name="NIC" 
              placeholder="Enter NIC"
              value={this.state.NIC}
              onChange={this.handleInputChange} 
              style={{backgroundColor: "#ffff", marginTop:"10px",}} />
          </div><br/>


          <div class="form-group" style={{marginLeft:"100px", marginRight:"100px"}} >
              <label><strong>Basic :</strong></label>
              <input type="text"
              className="form-control"
              name="Basic" 
              placeholder="Enter Basic"
              value={this.state.Basic}
              onChange={this.handleInputChange} 
              style={{backgroundColor: "#ffff", marginTop:"10px",}} />
          </div><br/>

          <div class="form-group" style={{marginLeft:"100px", marginRight:"100px"}} >
              <label><strong>OT :</strong></label>
              <input type="text"
              className="form-control"
              name="OT" 
              maxlength = "10"
              placeholder="Enter OT"
              value={this.state.OT}
              onChange={this.handleInputChange} 
              style={{backgroundColor: "#ffff", marginTop:"10px",}} />
          </div><br/>

          <div class="form-group" style={{marginLeft:"100px", marginRight:"100px"}} >
              <label><strong>Allowances :</strong></label>
              <input type="text"
              className="form-control"
              name="Allowances" 
              placeholder="Enter Allowances"
              value={this.state.Allowances}
              onChange={this.handleInputChange} 
              style={{backgroundColor: "#ffff", marginTop:"10px",}} />
          </div><br/>

          <div class="form-group" style={{marginLeft:"100px", marginRight:"100px"}} >
              <label><strong>Deductions :</strong></label>
              <input type="text"
              className="form-control"
              name="Deductions" 
              placeholder="Enter Deductions"
              value={this.state.Deductions}
              onChange={this.handleInputChange} 
              style={{backgroundColor: "#ffff", marginTop:"10px",}} />
          </div><br/>

          <div class="form-group" style={{marginLeft:"100px", marginRight:"100px"}} >
              <label><strong>Net Salary :</strong></label>
              <input type="text"
              className="form-control"
              name="Net" 
              placeholder="Net Salary"
              value={this.state.Net}
              onChange={this.handleInputChange} 
              style={{backgroundColor: "#ffff", marginTop:"10px",}} />
          </div><br/>

          


          <div className="text-center" > 
          <button className="btn btn-success" type="submit" style={{marginTop:'15px'}} onClick={this.onSubmit}>
              <i className="far fa-check-square"></i>
              &nbsp; Save
            </button>&nbsp;
          <a href="/"><button type="button" style={{marginTop:'15px'}} onClick={this.onClick} class="btn btn-danger"><i class="fa fa-close"></i>&nbsp;Cancel</button></a>
          {/* /ListSupplierRegistration */}<br/><br/>

          
          </div>
          <br/>
          
          </form>
          <br/>
          </div>
        </div>
        </div>
    )
   }
}


