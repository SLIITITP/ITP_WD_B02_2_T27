import React, { useState ,useEffect}  from "react";
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { NavLink, useLocation, Link } from "react-router-dom";

import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import ThumbUpOffAltOutlinedIcon from '@mui/icons-material/ThumbUpOffAltOutlined';
import HistoryIcon from '@mui/icons-material/History';
import LogoutIcon from '@mui/icons-material/Logout';


const UpdateProfile = () =>{
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [contact, setContact] = useState('');
  const [location, setLocation] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { id } = useParams()
  const [user, setuser] = useState([]);

  const [emailError, setEmailError] = useState('');


  // const { state } = useLocation()
  

  useEffect(() => {
    getuser();
    validateEmail();
    //getfeedback();
}, []);

//Read function for user
async function getuser() {
  console.log(id)
    await axios.get(`http://localhost:8070/user/get/${id}`).then((res) => {
            setUsername(res.data.user.username);
            setContact(res.data.user.contact);
            setLocation(res.data.user.location);
            setEmail(res.data.user.email);
            setPassword(res.data.user.password);
        }).catch((error)=>{
          console.log(error)
        })
}
  const handleNameChange = (e) => {
    setUsername(e.target.value);
  }

  const handleContactChange = (e) => {
    setContact(e.target.value);
  }

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  }
  const handleEmailChange = (e) => {    
    setEmail(e.target.value);
    // validateEmail(value);
  }
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  }
  
  const [passwordError, setPasswordError] = useState('');
  

  const validateEmail = (value) => {
    // Regular expression for email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Check if email input is empty or doesn't match the pattern
    if (!value || !emailPattern.test(value)) {
      setEmailError('Please enter a valid email address');
    } else {
      setEmailError('');
    }
  };


  const [profile, setprofile] = useState([]);

  //delete account
  async function deleteAccount(){
    const config = {
        headers: {
            "content-Type": "application/json",
        },
    };

    // http://localhost:8070/user/delete/:id
    if(window.confirm('Are you sure?\nThis action cannot be undone')){
        await axios.delete(`http://localhost:8070/user/delete/${id}`, config).then(() => {
            alert("Account deleted successfully")
            navigate('/')
        }).catch((error) => {
            alert(`Failed to delete the Account`)
        })
    }
}

async function Update(event){

  const config = {
    headers: {
        "content-Type": "application/json",
    },
};

  event.preventDefault();

  const updatedProfile = {username, contact, location, email, password}

        try {
          //http://localhost:8070/user/update/:id
            await axios.put(`http://localhost:8070/user/update/${id}`,updatedProfile, config);
                alert("Updated Successfully")
                // history.push('/patient/profile')
        } catch (error) {
            if(error.response.status === 401){
                alert("Authentication failed. Please Sign In again")
                // history.push('/patient/signin')
            } else{
                alert("Updating Failed")
            }
        }    
  }


  return(
    <div>
      <div className="row mx-4">
        <div className="col-xl-3 mt-3">
          <div className="card p-2 mb-2">
            <div className="card-body "> 

            <div className="row">
                <div className="col-xl-4">
                    <img src='/images/user.jpg' className="card-img-top imgProfile" alt="userImage" />
                </div>
                <div className="col-xl-8 pt-4 pb-4">
                  <h4> {username}</h4>
                  <p>{email}</p>
                </div>
            </div>

            <Link className="navLink" to={`/Uprofile/${id}`}>
                <div className="navCard">
                    <AccountCircleOutlinedIcon className="mx-3"/>My Profile
                </div>
            </Link>

            <Link className="navLink" to={`/Uprofile/${id}`} >
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

              <button type="button" className="btn btn-outline-danger btn-sm mx-3" onClick={(()=>deleteAccount(profile))}>Delete Account</button>                       
            </div>
          </div>
        </div>
        <div className="container shadow my-1 col-xl-8 p-3 mt-3 ">
          <div className="col-xl-12 p-4 update">
            <form onSubmit={Update}>
              <h1 className="display-6 fw-bolder mb-6 text-center">Update Your Profile</h1>                       
                <div className="mb-3">
                  <label for="exampleInputName1" className="form-label">User Name</label>
                  <input type="text" className="form-control" id="exampleInputName1" name="username"
                  value={username}
                  onChange={handleNameChange}
                  required/>
                </div>
                <div className="mb-3">
                  <label for="exampleInputContct1" className="form-label">Contact Number</label>
                  <input type="text" className="form-control" id="exampleInputcontact1"
                  name="contact"
                  value={contact}
                  onChange={handleContactChange}
                  required/>
                </div>
                <div className="mb-3">
                  <label for="exampleInputLocation1" className="form-label">Location</label>
                  <input type="text" className="form-control" id="exampleInputLocation1"
                  name="location"
                  value={location}
                  onChange={handleLocationChange}
                  required/>
                </div>
                <div className="mb-3">
                          <label for="exampleInputEmail1" className="form-label">Email address</label>
                          <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" 
                            name="email" required
                            value={email}
                            onChange={handleEmailChange} />
                        </div>
                        <div className="mb-3">
                          <label for="exampleInputPassword1" className="form-label">Password</label>
                          <input type="password" className="form-control" id="exampleInputPassword1"
                            name="password"
                            // value={password}
                            onChange={handlePasswordChange} />
                            {passwordError && <div className="error">{passwordError}</div>}
                        </div>
                <button type="submit" className="btn btn-primary rounded-pill pb-2 w-100">Update Profile</button>
        </form>
  </div>
  </div>
  </div>
    </div>
    );
}

export default UpdateProfile;
