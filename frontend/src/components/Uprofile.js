import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

import './Profile/Uprofile.css'
import UserFeedback from './Bookings/Bookings';
import MyReviews from './MyReviews/MyReviews';

import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
import ThumbUpOffAltOutlinedIcon from '@mui/icons-material/ThumbUpOffAltOutlined';
import HistoryIcon from '@mui/icons-material/History';
import LogoutIcon from '@mui/icons-material/Logout';

export default function Uprofile() {
   // const [feedback, setFeedback] = useState([]);
    const [user, setuser] = useState([]);
    // const [userName, setUserName] = useState([]);
    // const [email, setEmail] = useState([]);

    const [feedbacks, setfeedbacks] = useState([]);
    const { id } = useParams()


    useEffect(() => {
        getuser();
        getfeedback();
    }, []);

    //Read function for user
    function getuser() {
        axios
            .get(`http://localhost:8070/user/get/${id}`)
            .then((res) => {
                console.log(res.data)
                setuser(res.data.user);
            })
    }


    function displayUser() {
        return (
            <div>
                <br/>
                <h4> {user.username}</h4>
                <p> {user.email}</p>
                <br/>
            </div>
        );
    }

    //Read function
  function getfeedback() {
    axios
      .get(`http://localhost:8070/feedback/getall/${id}`)
      .then((res) => {
        setfeedbacks(res.data.feedback);
      })
      .catch((err) => {
        alert(err.message);
      });
  }

    return (
        <div className="px-5">
            <div className="row mt-3">
                <div className="col-xl-3 md-3">
                    <div className="card p-2 mb-2">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-xl-4">
                                    <img src='/images/user.jpg' className="card-img-top imgProfile pt-2" alt="userImage" />
                                </div>
                                <div className="col-xl-8">
                                    {
                                        displayUser()
                                    }
                                </div>
                            </div>
                            <Link className="navLink" to={`/UpdateProfile/${id}`}>
                                <div className="navCard">
                                    <ManageAccountsOutlinedIcon className="mx-3"/>Edit Profile
                                </div>
                            </Link>
                            
                            <Link  className="navLink" to={`/Uprofile/${id}`} >
                                <div className="bt2 navCard">
                                    <HistoryIcon className="mx-3"/>Booking History
                                </div>
                            </Link>
                            <Link className="navLink" to={`/feedback/${id}`}>
                                <div className="navCard">
                                    <ThumbUpOffAltOutlinedIcon className="mx-3"/>All Reviews
                                </div>
                            </Link>
                            <Link  className="ink-class navLink" to={`/`}>
                                <div className="navCard align-middle">
                                    <LogoutIcon className="mx-3"/>Log Out
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="col-xl-9 mb-3">
                        <div className="col-xl-12 pb-3">
                            <table className="TBG">
                                <th className="px-3 pt-3">
                                    <h3>Booking History</h3>
                                </th>
                                <tr>
                                    <UserFeedback/>
                                </tr>
                            </table>
                        </div>
                    <div className="col-xl-12">
                        <table className="TBG">
                            <th className="px-3 pt-3">
                                <h3>My Reviews</h3>
                            </th>
                            <tr>
                                {feedbacks?.map(feedback => {
                                        return (<MyReviews feedback={feedback} />)
                                    })}
                            </tr>
                        </table>
                    </div>
                </div>

            </div>
        </div>
    );
}

