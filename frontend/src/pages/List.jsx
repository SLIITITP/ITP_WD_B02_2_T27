import React, { useContext, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { format } from "date-fns"
import Header from '../../components/header/Header'
import Navbar from '../../components/navbar/Navbar'
import "./list.css"
import { DateRange } from 'react-date-range'
import SearchItem from '../../components/searchItem/SearchItem'
import useFetch from '../../hooks/useFetch'
import { SearchContext } from '../../context/SearchContext'

const List = () => {

  const location = useLocation()
  // storing the payload from the location object
  const [destination, setDestination] = useState(location.state.destination)
  const [dates, setDates] = useState(location.state.dates)
  const [options] = useState(location.state.options)

  // to open and close date options
  const [openDate, setOpenDate] = useState(false)

  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')

  // making fetch request for search
  const { data, loading, reFetch} = useFetch(`/hotels?city=${destination}&min=${minPrice || 1}&max=${maxPrice || 4000}`)

  // using search context for dispatching new search
  const {dispatch}  = useContext(SearchContext)

  const handleSearch = () =>{
    // dispatching new search
    dispatch({
      type: "NEW_SEARCH",
      payload: {
        destination,
        dates,
        options
      }
    })
    reFetch()
  }

  return (
    <div className="listPage">
      <Navbar/>
      <Header type="list"/>
      <div className="listContainer">
        <div className="listWrapper">
          <div className="listSearch">
            <h1 className="lsTitle">Search</h1>
            <div className="lsItem">
              <label htmlFor='destination' >Destination</label>
              <input id='destination' 
              placeholder={destination} 
              type="text"
              value={destination}  
              onChange={e=>{setDestination(e.target.value)}}
              />
            </div>
            <div className="lsItem">
              <label>Check-in Date</label>
              {/* here we want to display the date which the user searched in the search bar from the home page */}
              <span onClick={()=>{setOpenDate(!openDate)}} >
                {`${format(dates[0].startDate, "dd/MM/yyyy")} to ${format(dates[0].endDate, "dd/MM/yyyy")} `}
              </span>
              {/* Showing date options on clicking */}
              { openDate && <DateRange
              onChange={item=>setDates([item.selection])}
              minDate={new Date()} // to prevent the selection of back date
              ranges={dates}
              />
              }
            </div>
            <div className="lsItem">
              <label>Options</label>
              <div className="lsOptionItem">
                <span className="lsOptionText">
                  Min Price (LKR) <small>per night</small>
                </span>
                <input type="number"  onChange={e=>setMinPrice(e.target.value)} className='lsOptionInput'/>
              </div>

              <div className="lsOptionItem">
                <span className="lsOptionText">
                  Max Price (LKR) <small>per night</small>
                </span>
                <input type="number" onChange={e=>setMaxPrice(e.target.value)}  className='lsOptionInput'/>
              </div>

              <div className="lsOptionItem">
                <span className="lsOptionText">
                  Adult
                </span>
                <input type="number" min={1} className='lsOptionInput' placeholder={options.adult} />
              </div>

              <div className="lsOptionItem">
                <span className="lsOptionText">
                  Children
                </span>
                <input type="number" min={0} className='lsOptionInput' placeholder={options.children} />
              </div>

              <div className="lsOptionItem">
                <span className="lsOptionText">
                  Room
                </span>
              <input type="number" min={1} className='lsOptionInput' placeholder={options.room} />
              </div>
              <button className='lsOptionSearch' onClick={handleSearch} >Search</button>
            </div>
          </div>
          <div className="listResult">
            { loading ? "Loading..." :( 
            <>
            { data && data.map(item=>(
                <SearchItem item={item} key={item._id} />
            )) }
            </>
          )}
          </div>
          
        </div>
      </div>
    </div>
  )
}

export default List