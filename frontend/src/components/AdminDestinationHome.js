import React, { Component } from 'react';
import axios from 'axios';
import swal from 'sweetalert2';
import jspdf from 'jspdf'; //import the generate report package
import "jspdf-autotable";

export default class AdminDestinationHome extends Component {
    constructor(props){
        super(props);
    
        this.state={
          destinations:[]
        };
      }
    
    componentDidMount(){
      this.retrieveDestinations();
    }  
    
      retrieveDestinations(){
        axios.get("/destinations").then(res=>{
          if(res.data.success){
            this.setState({
              destinations:res.data.existingDestinations
            });
    
            console.log(this.state.destinations);
          }
        });
      }
    
      onDelete = (id) =>{
        axios.delete(`/destination/delete/${id}`).then((res)=>{ //delete relavent data using id
              swal.fire({ title: 'Are you sure?', 
              text: "You won't be able to revert this!", 
              icon: 'warning', 
              showCancelButton: true,      // Alert box 
              confirmButtonColor: '#3085d6', 
              cancelButtonColor: '#d33', 
              confirmButtonText: 'Yes, delete it!' 
            }).then((result) => { 
              if (result.isConfirmed) { 
                swal.fire( 'Deleted!', 
                'Your file has been deleted.', 
                'success' 
                ) 
              } 
          })
            this.retrieveDestinations();
        });
      }
    
    
    /*Search Method*/
      filterData(destinations,searchkey){
        const result = destinations.filter((destination) =>
          destination.topic.toLowerCase().includes(searchkey) ||
          destination.description.toLowerCase().includes(searchkey)||
          destination.category.toLowerCase().includes(searchkey)
        )
    
        this.setState({destinations:result})
      }
    
    
      handleSearchArea = (e) =>{  //Part of Search this use for get details  id
        const searchkey = e.currentTarget.value;
        axios.get("/destinations").then(res=>{
            if(res.data.success){
                this.filterData(res.data.existingDestinations,searchkey)
            }
        });
      }
    
    
    
      generateReport = (tickets) => {
        const doc = new jspdf();
      
        const tableColumn = ["Topic", "Description", "Category" ];
      
        const tableRows = [];
      
        tickets.map(ticket => {
      
          const ticketData = [
      
              ticket.topic,
              ticket.description,  
              ticket.category   
      
          ];
          tableRows.push(ticketData);
        })
      
       
          doc.text("All Destinations Report", 14, 15).setFontSize(12);
          const date = Date().split(" ");
          const dateStr = date[1] + "-" + date[2] + "-" + date[3];
      
          doc.autoTable(tableColumn, tableRows, { styles: { fontSize: 8, }, startY: 35 });
          doc.text(`Report Genarated Date - ${dateStr}`, 14, 23);
          doc.save(`alldestinations_report_.pdf`);  
      }
    
    
    
    
    
    
      render() {
        return (
          <div>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <center><h1 className="h3 mb-3 font-weight-normal">All Destination</h1></center>
    
            
              {/*Search*/}
              
              <div class="d-flex justify-content-around">          
                    <button className="btn btn-success">        
                        <i class="fa fa-plus" aria-hidden="true"></i>&nbsp;&nbsp;
                        <a href="/CreateDestination" style={{textDecoration:'none', color:'white'}}>Add Destination</a>                
                    </button>
                    
    
                    
                      <div className="col-lg-3 mt-2 mb-2" >
                            <input
                            className="form-control"
                            type="search"
                            placeholder="search"
                            name="searchQuery"
                            onChange={this.handleSearchArea}/>
                    </div>
    
    
                    <button onClick={()=>this.generateReport(this.state.destinations)} className="btn btn-success" >     
                      Generate Report                
                    </button>
    
                                
              </div>
    
    
              
                 {/* Table view of admin dashboard*/}   
              <br/>
                <table className="table container bg-light" >
                  <thead>
                    <tr>
                      <th className='col1' scope="col">#</th>
                      <th className='col2' scope="col">Topic</th>
                      <th className='col3' scope="col">Description</th>
                      <th className='col4' scope="col">Category</th>
                      <th className='col5' scope="col">Image</th>
                      <th className='col6' scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody> 
                  {this.state.destinations.map((destinations,index)=>(
                    <tr>
                      <th scope="row">{index+1}</th> 
    
                      <td>
                        <a href={`/DestinationDetails/${destinations._id}`}>
                          {destinations.topic}
                        </a>
                      </td>
    
                      <td>{destinations.description}</td>
                      <td>{destinations.category}</td>
                      <div class="dropdown">
                                    <img src={ "http://localhost:8000/" + destinations.image } alt={destinations.name} width="70" height="90"/>                                
                                </div>
                      <td>
                          <a className="btn btn-warning" href={`/EditDestination/${destinations._id}`}>
                            <i className="fas fa-edit"></i>&nbsp;Edit
                          </a>
    
                          &nbsp;
    
                          <a className="btn btn-danger" href="#" onClick={() =>this.onDelete(destinations._id)}>
                            <i className="fas fa-trash-alt"></i>&nbsp;Delete
                          </a>
                      </td>
                    </tr>
                    
                  ))}
                </tbody>
                </table>
                <br/> <br/>  <br/>  
                <center>
                  
              </center>                    
                </div>      
        )
      }
    }
    
    