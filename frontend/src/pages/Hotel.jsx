import "./hotel.css"
import Navbar from "../../components/navbar/Navbar"
import Header from "../../components/header/Header"
import MailList from "../../components/mailList/MailList"
import Footer from "../../components/footer/Footer"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleArrowLeft, faCircleArrowRight, faCircleXmark, faLocation, faLocationDot } from "@fortawesome/free-solid-svg-icons"
import { useContext, useState } from "react"
import useFetch from "../../hooks/useFetch"
import { useLocation, useNavigate } from "react-router-dom"
import { SearchContext } from "../../context/SearchContext"
import { AuthContext } from "../../context/AuthContext"
import Reserve from "../../components/reserve/Reserve"

const Hotel = () => {

const location = useLocation()
const id = location.pathname.split("/")[2];  
const [slideNumber, setSlideNumber] = useState(0);
const [open, setOpen] = useState(false);
const [openModal, setOpenModal] = useState(false);

const { data, loading, error } = useFetch(`/hotels/find/${id}`);
const { user } = useContext(AuthContext);

const { dates, options } = useContext(SearchContext);
const navigate = useNavigate();

const MILLISECONDS_PER_DAY = 24 * 60 * 60 * 1000
  //At last in component Hotel.jsx change dayDifference function

const dayDifference = (date1, date2)=>{
  const timeDiff = Math.abs(Date.parse(date2) - Date.parse(date1));
  const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
  return diffDays;
};

const days = dayDifference(dates[0]?.endDate, dates[0].startDate)

const handleOpen = (i)=>{
  setSlideNumber(i);
  setOpen(true);
};

const handleMove = (direction) =>{
  let newSlideNumber;

  if(direction === "l"){
    newSlideNumber = slideNumber === 0 ? 5 : slideNumber-1;
  }else{
    newSlideNumber = slideNumber === 5 ? 0 : slideNumber+1;
  }

  setSlideNumber(newSlideNumber)
};

const handleClick = () => {
  if (user) {
    setOpenModal(true);
  } else {
    navigate("/login");
  }
};

  return (
    <div>
      <Navbar/>
      <Header type="list"/>
      {loading ? (
        "loading"
      ) : (
       <div className="hotelContainer">

        {open && <div className="slider">
          <FontAwesomeIcon icon={faCircleXmark} className="close" onClick={() => setOpen(false)}/>
          <FontAwesomeIcon icon={faCircleArrowLeft} className="arrow" onClick={() => handleMove("l")}/>
          <div className="sliderWrapper">
            <img src={data.photos[slideNumber]} alt="" className="sliderImg" />
          </div>
          <FontAwesomeIcon icon={faCircleArrowRight} className="arrow" onClick={() => handleMove("r")}/>
        </div>}
        <div className="hotelWrapper">
          <button className="bookNow">Reserve or Book Now!</button>
          <h1 className="hotelTitle">{data.name}</h1>
          <div className="hotelAddress">
            <FontAwesomeIcon icon={faLocationDot}/>
            <span>1 Galle Face, Colombo 2, Sri Lanka</span>
          </div>
          <span className="hotelDistance">
            Excellent Location - {data?.distance}km from Airport
          </span>
          <span className="hotelPriceHighlight">
            Book a stay over {data?.cheapestPrice} at this property and get a free airport taxi
          </span>
          <div className="hotelImages">
            {data.photos?.map((photo, i) =>(
              <div className="hotelmgWrapper">
                <img
                  onClick={() => handleOpen(i)}
                  src={photo} 
                  alt=""
                  className="hotelImg"
                />
              </div>
            ))}
          </div>
          <div className="hotelDetails">
            <div className="hotelDetailsTexts">
              <h1 className="hotelTitle">{data.title}</h1>
              <p className="hotelDesc">
                {data.desc}
              </p>
            </div>
            <div className="hotelDetailsPrice">
              <h1>Perfect for a {days}-night stay!</h1>
              <span>
                Shangri-La Colombo presents a new level of luxury in the city. 
                Located in the heart of the business and entertainment district.
              </span>
              <h2>
                <b>LKR {days * data.cheapestPrice * options.room}</b> ({days} nights)
              </h2>
              <button onClick={handleClick}>Reserve or Book Now!</button>
            
            </div>
          </div>
        </div>
        <MailList/>
        <Footer/>      
      </div>)}
      {openModal && <Reserve setOpen={setOpenModal} hotelId={id}/>}
    </div>
  )
}


export default Hotel