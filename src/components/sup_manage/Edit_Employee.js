import React, { Component } from 'react';
import axios from 'axios';
import swal from 'sweetalert';

export default class Edit_Employee extends Component{

// Make changes to the post
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
    const id = this.props.match.params.id;

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
    /// Validation 

    const cuem = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


    if(Name.length === 0 || NIC.length === 0 || Address.length === 0 || MobileNumber.length === 0 || Email.length === 0 || Description.length === 0  ){
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

      axios.put(`/EmployeeRegistration/update/${id}`,data).then((res) =>{
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
    swal({
      title: "Done!",
      text: "Update Successful",
      icon: "success",
      button: "Okay!"
  })
  .then((value) => {
      window.location = '/Employee_Details'; // /ListRegistration
  });}
  }


  componentDidMount(){

    const id = this.props.match.params.id;

    axios.get(`/EmployeeRegistration/${id}`).then((res) =>{

      if(res.data.success){
        this.setState({
         
          Name:res.data.post.Name,
          NIC:res.data.post.NIC,
          Address:res.data.post.Address,
          MobileNumber:res.data.post.MobileNumber,
          Email:res.data.post.Email,
          Description:res.data.post.Description,
          Remark:res.data.post.Remark

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
          <h1 className="text-center" > <font face = "montserrat" size ="6" > EDIT SUPPLIER DETAILS </font> </h1> 
          <br/>
          <form className="needs-validation" noValidate style={{backgroundColor: "", 
          }}>
          <br/><br/>

            <div className="form-group" style={{marginLeft:"100px", marginRight:"100px"}}>
              <label style={{marginBottom:'5px'}} ><strong> Name :</strong>*</label>
              <input type="text"
              className="form-control"
              name="Name"
              placeholder="Enter  Name"
              value={this.state.Name}
              style={{backgroundColor: "#ffff", marginTop:"10px",}}
              onChange={this.handleInputChange}/>
            </div><br/>

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
              <label style={{marginBottom:'5px'}} ><strong>Address :</strong>*</label>
              <input type="text"
              className="form-control"
              name="Address"
              placeholder="Enter Address"
              value={this.state.Address}
              style={{backgroundColor: "#ffff", marginTop:"10px",}}
              onChange={this.handleInputChange}/>
            </div><br/>

            <div className="form-group" style={{marginLeft:"100px", marginRight:"100px"}}>
              <label style={{marginBottom:'5px'}} ><strong>Mobile Number</strong>*</label>
              <input type="text"
              className="form-control"
              name="MobileNumber"
              placeholder="Enter Mobile Number"
              value={this.state.MobileNumber}
              style={{backgroundColor: "#ffff", marginTop:"10px",}}
              onChange={this.handleInputChange}/>
            </div><br/>

            <div className="form-group" style={{marginLeft:"100px", marginRight:"100px"}}>
              <label style={{marginBottom:'5px'}} ><strong>Email :</strong>*</label>
              <input type="text"
              className="form-control"
              name="Email"
              placeholder="Enter Email"
              value={this.state.Email}
              style={{backgroundColor: "#ffff", marginTop:"10px",}}
              onChange={this.handleInputChange}/>
            </div><br/>


            <div className="form-group" style={{marginLeft:"100px", marginRight:"100px"}}>
              <label style={{marginBottom:'5px'}} ><strong>Description :</strong>*</label>
              <input type="text"
              className="form-control"
              name="Description"
              placeholder="Date"
              value={this.state.Description}
              style={{backgroundColor: "#ffff", marginTop:"10px",}}
              onChange={this.handleInputChange}/>
            </div><br/>

            <div className="form-group" style={{marginLeft:"100px", marginRight:"100px"}}>
              <label style={{marginBottom:'5px'}} ><strong>Remark :</strong>*</label>
              <input type="text"
              className="form-control"
              name="Remark"
              placeholder="Remark"
              value={this.state.Remark}
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