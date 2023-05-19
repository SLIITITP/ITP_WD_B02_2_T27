import Header from "../../components/header/Header"
import Navbar from "../../components/navbar/Navbar"
import Featured from "../../components/featured/Featured"
import Footer from "../../components/footer/Footer"
import "./home.css" 
import PropertyList from "../../components/propertyList/PropertyList"
import HomeGuestsLove from "../../components/HomeGuestsLove/HomeGuestsLove"
import MailList from "../../components/mailList/MailList"

const Home = () => {
  return (
    <div>
      <Navbar/>
      <Header/>
      <div className="homeContainer">
        <Featured/>
        <h1 className="homeTitle">Browse By Property Type</h1>
        <PropertyList/>
        <h1 className="homeTitle">Home Guests Love</h1>
        <HomeGuestsLove/>
        <MailList/>
        <Footer/>
      </div>
  
    </div>
  )
}

export default Home