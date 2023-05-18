import React, { Component } from 'react'
import axios from 'axios';
import swal from 'sweetalert';

export default class EditDestination extends Component {
    constructor(props){
        super(props);

        this.state={
              topic:"",
              description:"",
              category:"",
              image:"",

              topicError:"",
              descriptionError:"",
              categoryError:"",
              imageError:""              
        };
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
        this.validation(); 

        if (this.state.topic && this.state.description && this.state.category && this.state.image){

        const id = this.props.match.params.id;

        const{topic,description,category,image} = this.state;

          const data ={
              topic:topic,
              description:description,
              category:category,
              image:image
          }  
          console.log(data)

          axios.put(`/destination/update/${id}`,data).then((res)=>{
                    if(res.data.success){
                      swal({
                        icon: 'success',
                        title: "Destination Successfully Updated !",
                        type: "success"
                      }).then(function() {
                        window.location = "/AdminDestinationHome";
                      });
                        
                        this.setState({
                            topic:"",
                            description:"",
                            category:"",
                            image:""
                        });                        
                    }
                });
              }
            }


            componentDidMount(){
              const id = this.props.match.params.id; //display relavant details
              
              axios.get(`/destination/${id}`).then((res)=>{ 
                  if(res.data.success){
                      this.setState({                    
                        topic:res.data.destination.topic,//Use for edit
                        description:res.data.destination.description,
                        category:res.data.destination.category,
                        image:res.data.destination.image
                      });
                      console.log(this.state.destination);                      
                  }
              });
            }


          onChangeImage=event=>{
              this.setState({
                  selectedFile: event.target.files[0],
                  loaded: 0,
              }, () => {
                  const data = new FormData() 
                  data.append('file', this.state.selectedFile)
                  axios.post("/destination/upload", data, { 
                  }).then(res => { 
                      this.setState({image:res.data.filename})
                  })
              })
          }


          validation = () => {
            let topicError="";
            let descriptionError="";
            let categoryError="";
            let imageError="";
       
            if(!this.state.topic){
              topicError="(Destination Topic Required!)"
            }
            
            if(!this.state.description){
              descriptionError="(Destination Description Required!)"
            }          
      
            if(!this.state.category){
              categoryError="(Destination Category Required!)"
            }           
      
            if(!this.state.image){
              imageError="(Image Required!)"
            }
            
      
      
            if ( topicError | descriptionError | categoryError | imageError  ) {
      
              this.setState({topicError , descriptionError , categoryError , imageError  });
      
              return false;
      
            } else {
      
              this.setState({topicError  , descriptionError , categoryError , imageError  });
      
            }
      
            return true;
      
          }  


  render() {
    return (
      <div className="col-md-8 mt-4 mx-auto"> <h1 className="h3 mb-3 font-weight-normal"><center>Edit Destination</center></h1>
        <form className='form-group'>
        <div className='row'>
            <div className="col-lg-6" style={{marginBottom:'15px'}}>
              <label style={{marginBottom:'5px'}}>Topic</label>&nbsp;
              <span style={{color : "red"}}>{this.state.topicError}</span>
              <input type="text"
              className="form-control"
              name="topic"
              placeholder="Enter Topic"
              value={this.state.topic}
              onChange={this.handleInputChange}/>
            </div>

            <div className="col-lg-6" style={{marginBottom:'15px'}}>
              <label style={{marginBottom:'5px'}}>Description</label>&nbsp;
              <span style={{color : "red"}}>{this.state.descriptionError}</span>
              <input type="text"
              className="form-control"
              name="description"
              placeholder="Enter Description"
              value={this.state.description}
              onChange={this.handleInputChange}/>
            </div>
            </div>

            <div className='row'>
            <div className="col-lg-6" style={{marginBottom:'15px'}}>
              <label style={{marginBottom:'5px'}}>Category</label>&nbsp;
              <span style={{color : "red"}}>{this.state.descriptionError}</span>
              <input type="text"
              className="form-control"
              name="category"
              placeholder="Enter Category"
              value={this.state.category}
              onChange={this.handleInputChange}/>
            </div>

            <div className="col-lg-6" style={{marginBottom:'15px'}}>
              <label style={{marginBottom:'5px'}}>Image</label>&nbsp;
              <span style={{color : "red"}}>{this.state.imageError}</span>
              <input type="file"
              className="form-control"
              name="image"
              onChange={this.onChangeImage}/>
            </div>

            </div>

           
            <button className="btn btn-success" type="submit" style={{marginTop:'15px'}} onClick={this.onSubmit}>
              <i className="fa fa-upload"></i>
              &nbsp; Update Destination Details
            </button>

        </form>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      </div>
    )
  }
}
