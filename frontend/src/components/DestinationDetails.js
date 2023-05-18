import React, { Component } from 'react'
import axios from 'axios';

export default class DestinationDetails extends Component {
    constructor(props){
        super(props);
    
        this.state={
          destination:{}
        };
    }
    
    
    componentDidMount(){
      const id = this.props.match.params.id;
      axios.get(`/destination/${id}`).then((res)=>{
          if(res.data.success){
              this.setState({
                destination:res.data.destination
              });
              console.log(this.state.destination);
          }
      });
    }
    
    
      render() {
        const {topic,description,category,image}=this.state.destination;
    
        return (
    
          <div>
    
    <center>
          <table className="table-medium">
            <th>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    
            <dt></dt><dd><img className="inventry-medium" id="Details-Image" src={ "http://localhost:8000/" + image } alt="gjgjgj" /></dd>
            </th>
            <th>
            <dl>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <center><h4>{topic}</h4></center>
            <hr/>
              <dd><h4>Description : <br/> <br/> {description}</h4></dd>            
                <hr/>         
                <dd><h4>Category :&nbsp;&nbsp;&nbsp; {category}</h4></dd>         
              <hr/>
                              
            </dl>
            </th>        
          </table>
    
          </center>     
          <br/>
          </div>
        )
      }
    }
    