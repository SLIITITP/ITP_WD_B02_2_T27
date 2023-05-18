import React, { useState } from "react";
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Sweetalert2 from 'sweetalert2'

const Register = () => {

  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

 
  const [user, setUser] = useState({
    username: "",
    contact: "",
    location: "",
    email: "",
    password: ""
  });

  //Handle inputs
  const handleInput = (event) => {
    let name = event.target.name;
    let value = event.target.value;

    setUser({ ...user, [name]: value });
  }
//validate
const validateUsername = () => {
  if (user.username.trim() === "") {
    setErrors((errors) => ({
      ...errors,
      username: "Username is required"
    }));
  } else {
    setErrors((errors) => ({ ...errors, username: "" }));
  }
};

const validateContact = () => {
  if (user.contact.trim() === "") {
    setErrors((errors) => ({
      ...errors,
      contact: "Contact number is required"
    }));
  } else if (!/^[0-9]{10}$/.test(user.contact)) {
    setErrors((errors) => ({
      ...errors,
      contact: "Invalid contact number"
    }));
  } else {
    setErrors((errors) => ({ ...errors, contact: "" }));
  }
};

const validateLocation = () => {
  if (user.location.trim() === "") {
    setErrors((errors) => ({
      ...errors,
      location: "Location is required"
    }));
  } else {
    setErrors((errors) => ({ ...errors, location: "" }));
  }
};

const validateEmail = () => {
  if (user.email.trim() === "") {
    setErrors((errors) => ({
      ...errors,
      email: "Email is required"
    }));
  } else if (
    !/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i.test(user.email)
  ) {
    setErrors((errors) => ({
      ...errors,
      email: "Invalid email address"
    }));
  } else {
    setErrors((errors) => ({ ...errors, email: "" }));
  }
};

const validatePassword = () => {
  if (user.password.trim() === "") {
    setErrors((errors) => ({
      ...errors,
      password: "Password is required"
    }));
  } else if (user.password.length < 6) {
    setErrors((errors) => ({
      ...errors,
      password: "Password must be at least 6 characters long"
    }));
  } else {
    setErrors((errors) => ({ ...errors, password: "" }));
  }
};
  //Handle Submit
  const handleSubmit = async (event) => {
    event.preventDefault();

    
    validateUsername();
    validateContact();
    validateLocation();
    validateEmail();
    validatePassword();

    const hasErrors = Object.values(errors).some((error) => error !== "");
    if (!hasErrors) {
      // Submit the form
      console.log("Form submitted", user);
    }
    //object destructuring
    //Store input data into variables
    const { username, contact, location, email, password } = user;
    const newUser = {
      "username": username,
      "contact": contact,
      "location": location,
      "email": email,
      "password": password
    }
    try {
      const res = await axios.post("http://localhost:8070/user/add", newUser).then((response) => {
        if (response.status === 200 || !response) {
          Sweetalert2.fire({
            icon: 'success',
            title: 'User',
            text: `${response.data}`,
          });
          navigate('/')

        } else {
          window.alert("Somthing went wrong please check input detils");
        }
      })
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="container shadow my-1 col-md-5 p-4 ">
      <div className="col-md-12 p-4 sign">


        <form onSubmit={handleSubmit} method="POST">
          <h1 className="display-6 fw-bolder mb-6 text-center">Create an Account</h1>
          <p className="lead text-center">Hello! Welcome create a new account..</p>

          <div class="mb-3">
            <label for="exampleInputName1" className="form-label">User Name</label>
            <input type="text" className="form-control" id="exampleInputName1" name="username"
              value={user.username}
              onChange={handleInput} />
               {errors.username && (
          <div className="text-danger">{errors.username}</div>
        )}
          </div>

          <div className="mb-3">
            <label for="exampleInputContct1" className="form-label">Contact Number</label>
            <input type="text" className="form-control" id="exampleInputcontact1" name="contact"
              value={user.contact}
              onChange={handleInput} />

              {errors.contact && (
              <div className="text-danger">{errors.contact}</div>
        )}
          </div>

          <div className="mb-3">
            <label for="exampleInputLocation1" className="form-label">Location</label>
            <input type="text" className="form-control" id="exampleInputLocation1"
              name="location"
              value={user.location}
              onChange={handleInput} />
               {errors.location && (
              <div className="text-danger">{errors.location}</div>
        )}
          </div>

          <div className="mb-3">
            <label for="exampleInputEmail1" className="form-label">Email address</label>
            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
              name="email"
              value={user.email}
              onChange={handleInput} />
               {errors.email && (
              <div className="text-danger">{errors.email}</div>
        )}
          </div> 

          <div className="mb-3">
            <label for="exampleInputPassword1" className="form-label">Password</label>
            <input type="password" className="form-control" id="exampleInputPassword1"
              name="password"
              value={user.password}
              onChange={handleInput} />
               {errors.password && (
              <div className="text-danger">{errors.password}</div>
        )}
          </div>

          <button type="submit" className="btn btn-primary rounded-pill pb-2 w-100">SignUp</button>
          <p ><center>Already have an account? <NavLink to="/" className="login">Login</NavLink></center></p>

        </form>
      </div>
    </div>


  );
}

export default Register;