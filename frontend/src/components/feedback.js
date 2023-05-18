import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import axios from 'axios';
import Sweetalert2 from 'sweetalert2';
import './feedback.css'

export default function Feedback(){
  const [feedback, setFeedback] = useState([]);
  const [username, setUserName] = useState([]);
  const [location, setLocation] = useState([]);
  const [feedbackDetails, setfeedbackDetails] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [user, setuser] = useState([]);
  const { state } = useLocation()

  const { id } = useParams()


  useEffect(() => {
    getfeedback();
    getuser();
  }, []);

  //Read function
  function getfeedback() {
    axios
      .get("http://localhost:8070/feedback")
      .then((res) => {
        setfeedbackDetails(res.data);
      })
      .catch((err) => {
        alert(err.message);
      });
  }


  function getuser() {
    axios
        .get(`http://localhost:8070/user/get/${id}`)
        .then((res) => {
          console.log(res.data)
            setuser(res.data.user);
        })
}
console.log(user)


  function displayFeedback() {
    return feedbackDetails.map((feedback) => {
      return (<tr itemScope="row" id={feedback._id} key={feedback._id}>
        <td>
          {feedback.username}
        </td>
        <td> {feedback.location}</td>
        <td>
          {feedback.feedback}
        </td>
      </tr>)
    })
  }


  function searchTable(feedback) {
    return feedback.filter((i) => {
      return (
        i.location.toLowerCase().includes(searchInput.toLowerCase()) 
      );
    })
    
  }

  const navigate = useNavigate();

  //Handle Submit
  const handleSubmit = async (event) => {
    event.preventDefault();

    const newFeedback = { location, feedback, id }
    
    try {
      await axios.post("http://localhost:8070/feedback/add", newFeedback).then((res) => {
        if (res.status === 200 || !res) {
          Sweetalert2.fire({
            icon: 'success',
            title: 'Feedback',
            text: `${res.data}`,
          });
          setFeedback('')
          setLocation('')
          getfeedback()
        } else {
          window.alert("Something went wrong. Please check input details.");
        }
      })

    } catch (error) {
      console.log(error);
    }

  }


  return (
    <div> 
      <div className="row mt-5 px-3">
        <div className="col-xl-6">
          <h1 className="mb-0 fw-bold mt-2">All Feedback in the System</h1><br/>
          <h6>Search for a feedback.</h6>
        </div>
        <div className="table-responsive">
          <section id="content">
            <main>
              <div className="table-data">
                <div className="order">
                  <div className="head">
                    <div class="col-xl-auto">
                      <div class="input-group mb-2">
                        <input type="text" class="form-control" id="inlineFormInputGroup" placeholder="Search" value={searchInput} Search
                          onChange={(e) => setSearchInput(e.target.value)} />

                      </div>
                    </div>
                  </div>
              <table className="table table-striped custom-table" id="assignItemTable">
                <thead >
                  <tr>
                    <th scope="col-xl">User Name</th>
                    <th scope="col-xl">Place</th>
                    <th scope="col-xl">Feedback </th>
                  </tr>
                </thead>
                <tbody>
                  {searchTable(feedbackDetails).map((i, index) => {
                    return (
                      <tr key={index}>
                        <td>{i.userID?.username}</td>
                        <td>{i.location}</td>
                        <td>{i.feedback}</td>
                      </tr>
                    )
                  })}
                </tbody>
                </table>
                </div>
              </div>

            </main>
          </section>
        </div>
      </div>

      <div className="row ">
        <div className="col-xl-2"></div>

        <div className="col-xl-7 addReviewCard feed p-5 m-5">
          <form onSubmit={handleSubmit}>

            <h1 className=" mb-5 ">Add your feedback</h1>

            <div className="mb-3">
              <label for="exampleInputUName1" class="form-label">User Name</label>
              <input type="text" class="form-control" id="exampleInputUName1" name="username" readOnly
                value={user.username}
                />
            </div>

            <div className="mb-3"> 
              <label for="exampleInputULocation1" className="form-label">Location</label>
              <input type="text" className="form-control" id="exampleInputULocation1"
                name="location"
                onChange={(event)=> {setLocation(event.target.value)}} 
                value={location}
                required/>
                <div class="invalid-feedback">
                  Please choose a username.
                </div>
            </div>

            <div className="form-group">
              <label for="exampleFormControlTextarea1">Feedback</label>
              <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"
                name="feedback"
                onChange={(event)=> {setFeedback(event.target.value)}} 
                value={feedback}
                required/>
            </div>

            <br />
            
            <button type="submit"  className="btn btn-outline-success rounded-pill pb-2 w-100" >Submit</button>

          </form>
        </div>
        <div className="col-xl-3"></div>
      </div>
    </div>
  );
}

