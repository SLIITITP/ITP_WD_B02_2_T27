import React, { Component } from 'react';
import axios from 'axios';
import swal from 'sweetalert';

export default class Edit_PayrollDetails extends Component{

// Make changes to the post
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
    const id = this.props.match.params.id;

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
    /// Validation 

    const cuem = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


    if(NIC.length === 0  || Basic.length === 0 || OT.length === 0 || Allowances.length === 0 || Deductions.length === 0 ||Net.length === 0  ){
      swal(" Fields Cannot empty !","Please enter all data !", "error");
    }else if(NIC.length < 9 ){
      swal("Invalid Customer Name !", "Length shuld be greater than 4 !", "error");
    }else if(Basic.length <4 ){
      swal("Invalid !", "Length shuld be greater than 4 !", "error");
    }else if(OT.length < 2 ){
        swal("Invalid !", "Length shuld be greater than 2 !", "error");
    }
    else{

      axios.put(`/Payroll_Details/update/${id}`,data).then((res) =>{
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
    swal({
      title: "Done!",
      text: "Update Successful",
      icon: "success",
      button: "Okay!"
  })
  .then((value) => {
      window.location = '/Payroll_Details'; // 
  });}
  }


  componentDidMount(){

    const id = this.props.match.params.id;

    axios.get(`/Payroll_Details/${id}`).then((res) =>{

      if(res.data.success){
        this.setState({
         
          NIC:res.data.post.NIC,
          Basic:res.data.post.Basic,
          OT:res.data.post.OT,
          Allowances:res.data.post.Allowances,
          Deductions:res.data.post.Deductions,
          Net:res.data.post.Net

        });

        console.log(this.state.post);
      }
    })

  }

  render() {
    return (
    <div>
      <div className style={{ backgroundColor:'#F1F1F1', backgroundSize: 'cover'}}> <br/>
        <div className="col-md-8 mt-4 mx-auto">
          <h1 className="text-center" > <font face = "montserrat" size ="6" > EDIT PAYROLL DETAILS </font> </h1> 
          <br/>
          <form className="needs-validation" noValidate style={{backgroundColor: "", 
          }}>
          <br/><br/>

            <div className="form-group" style={{marginLeft:"100px", marginRight:"100px"}}>
              <label style={{marginBottom:'5px'}} ><strong>NIC :</strong>*</label>
              <input type="text"
              className="form-control"
              name="NIC"
              placeholder="Enter NIC"
              value={this.state.NIC}
              style={{backgroundColor: "#ffff", marginTop:"10px",}}
              onChange={this.handleInputChange}/>
            </div><br/>

            <div className="form-group" style={{marginLeft:"100px", marginRight:"100px"}}>
              <label style={{marginBottom:'5px'}} ><strong>Basic :</strong>*</label>
              <input type="text"
              className="form-control"
              name="Basic"
              placeholder="Enter Basic"
              value={this.state.Basic}
              style={{backgroundColor: "#ffff", marginTop:"10px",}}
              onChange={this.handleInputChange}/>
            </div><br/>

            <div className="form-group" style={{marginLeft:"100px", marginRight:"100px"}}>
              <label style={{marginBottom:'5px'}} ><strong>OT :</strong>*</label>
              <input type="text"
              className="form-control"
              name="OT"
              placeholder="Enter OT"
              value={this.state.OT}
              style={{backgroundColor: "#ffff", marginTop:"10px",}}
              onChange={this.handleInputChange}/>
            </div><br/>


            <div className="form-group" style={{marginLeft:"100px", marginRight:"100px"}}>
              <label style={{marginBottom:'5px'}} ><strong>Allowances :</strong>*</label>
              <input type="text"
              className="form-control"
              name="Allowances"
              placeholder="Allowances"
              value={this.state.Allowances}
              style={{backgroundColor: "#ffff", marginTop:"10px",}}
              onChange={this.handleInputChange}/>
            </div><br/>

            <div className="form-group" style={{marginLeft:"100px", marginRight:"100px"}}>
              <label style={{marginBottom:'5px'}} ><strong>Deductions :</strong>*</label>
              <input type="text"
              className="form-control"
              name="Deductions"
              placeholder="Deductions"
              value={this.state.Deductions}
              style={{backgroundColor: "#ffff", marginTop:"10px",}}
              onChange={this.handleInputChange}/>
            </div><br/>

            <div className="form-group" style={{marginLeft:"100px", marginRight:"100px"}}>
              <label style={{marginBottom:'5px'}} ><strong>Net :</strong>*</label>
              <input type="text"
              className="form-control"
              name="Net"
              placeholder="Net"
              value={this.state.Net}
              style={{backgroundColor: "#ffff", marginTop:"10px",}}
              onChange={this.handleInputChange}/>
            </div><br/>

            


            <div className="text-center" > 
            <button className="btn btn-success" type="submit" style={{marginTop:'15px'}} onClick={this.onSubmit}>
              <i className="far fa-check-square"></i>
              &nbsp; Update      
              </button>&nbsp;
            <a href="/"><button type="button" style={{marginTop:'15px'}} onClick={this.onClick} class="btn btn-warning"><i class="fa fa-close"></i>&nbsp;Cancel</button></a>
            {/* ListRegistration */}
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