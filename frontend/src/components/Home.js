import React, { Component } from 'react'
import axios from 'axios';

export default class Home extends Component {
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
            console.log(this.state.destinations)   
        }
    });
  }
  


  /*Search Method*/
  filterData(destinations,searchkey){
    const result = destinations.filter((destination) =>
      destination.topic.toLowerCase().includes(searchkey)
    )

    this.setState({destinations:result})
  }


  handleSearchArea = (e) =>{
    const searchkey = e.currentTarget.value;
    axios.get("/destinations").then(res=>{
        if(res.data.success){
            this.filterData(res.data.existingDestinations,searchkey)
        }
    });
  }


  render() {
    return (
      <div>
              <center>
                <div className="col-lg-3 mt-2 mb-2" >
                        <input
                        className="form-control"
                        type="search"
                        placeholder="search"
                        name="searchQuery"
                        onChange={this.handleSearchArea}/>
                </div>
              </center> 
        
        <div className="row">
                            <main>
                                <div className="row center" >                                    
                                      {this.state.destinations.map((destinations,index)=>(
                                        <div className="card" >
                                          <a href={`/DestinationDetails/${destinations._id}`}>                                          
                                          <center><img className="card-img-top" src={ "http://localhost:8000/" + destinations.image } alt="Card image cap"/></center>
                                          </a>

                                          <div className="card-body">
                                              <a href={`/DestinationDetails/${destinations._id}`}>
                                                  <h6 className="card-title">{destinations.topic}</h6>
                                              </a>

                                              <h6 className="card-price">{destinations.category}</h6>

                                              <a href={`/DestinationDetails/${destinations._id}`}>                                                  
                                                  <center><a href={`/DestinationDetails/${destinations._id}`} class="btn btn-primary">See Details</a></center>
                                              </a>
                                          </div>

                                        </div>                                            
                                    ))
                                }                           
                            </div>
                        </main>               
                    </div>    <br/>                
      </div>
    )
  }
}
