
import React, { Component } from 'react'; 
import {BrowserRouter,Route} from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import CreateDestination from './components/CreateDestination';
import EditDestination from './components/EditDestination';
import DestinationDetails from './components/DestinationDetails';
import AdminDestinationHome from './components/AdminDestinationHome';

import Footer from './components/footer';






import "./index.css"

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
      
        

      <Header/>
      <Route path="/Destination" exact component={Home}></Route>
      <Route path="/CreateDestination" exact component={CreateDestination}></Route>
      <Route path="/EditDestination/:id" exact component={EditDestination}></Route>
      <Route path="/DestinationDetails/:id" exact component={DestinationDetails}></Route>
      <Route path="/AdminDestinationHome" exact component={AdminDestinationHome}></Route>
      
      <Footer/>

      </BrowserRouter>
    )
  }
}
