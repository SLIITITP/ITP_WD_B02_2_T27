import React, { useState } from "react";
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
//import Sweetalert2 from 'sweetalert2'


const Login = () => {

  const navigate = useNavigate();


  const [user, setUser] = useState({
    email: '',
    password: ''
  });

  //Handle Input
  const handleChange = (event) => {
    let name = event.target.name
    let value = event.target.value

    setUser({ ...user, [name]: value });
  }

  //Handle login
  const handleSubmit = async (event) => {
    event.preventDefault();
    const { email, password } = user;

    const regUser = {
      "email": email,
      "password": password
    }
    try {
      await axios.post("http://localhost:8070/user/login", regUser).then((response) => {

      navigate('/Uprofile/' + response.data.results._id);

      })
    } catch (err) {
      window.alert("Somthing went wrong please check login detils");
      console.log(err)
    }
  }

  return (
    <div>
      <div className="container shadow my-1 form">
        <div className="row">
          <div className="col-xl-8 ">
            <h1 className="display-2 fw-bolder text-white text-justify">Discover Your Travel Experience </h1>
          </div>
          <div className="col-xl-3 p-4 log">
            <form onSubmit={handleSubmit}>
              <h1 className="display-6 fw-bolder mb-2 text-center">LOGIN</h1>
              <p className="lead">Enter your credentials to login.</p>
              <div className="mb-3">
                <label for="exampleInputEmail1" className="form-label">Email address</label>
                <input type="email"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  name="email"
                  value={user.email}
                  onChange={handleChange} />
              </div>
              <div className="mb-3">
                <label for="exampleInputPassword1" className="form-label">Password</label>
                <input type="password" className="form-control" id="exampleInputPassword1"
                  name="password"
                  value={user.password}
                  onChange={handleChange} />
              </div>
              <div className="mb-3 form-check">
                <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                <label className="form-check-label" for="exampleCheck1">Remember me</label>
              </div>
              <button type="submit" className="btn btn-primary rounded-pill pb-2 w-100">Login</button>
              <p ><center>Doesn't have an account? <NavLink to="/Register" className="signup">SignUp</NavLink></center></p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;