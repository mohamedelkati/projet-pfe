import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert';
import Header from '../Header';
import Footer from './footer';
import '../../../css/login.css'
export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState('');

  const login = (e) => {
    e.preventDefault();
    fetch('api/login', {
      method: 'post',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })
      .then((res) => res.json())
      .then((response) => {
        if (response.status === 200) {
          localStorage.setItem('user_id', response.user.id);
          navigate('/');
        } else {
          Swal('Warning', response.message, 'warning');
        }
      });
  };

  return (
    <>
    <Header/>
      

      <div className="container  ">
      <div className="row">
        <div className="col-md-5 mx-auto">
          <div id="first">
            <div className="myform form">
              <div className="logo">
                <div className="text-center">
                <i className="fa-solid fa-user fa-2xl mx-auto "  >

                  Login
                  </i>

                </div>
              </div>
              <form onSubmit={login} >
              
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">Email address</label>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    id="email"
                    aria-describedby="emailHelp"
                    placeholder="Enter email"

                    onChange={(e) => setEmail(e.target.value)}
                    
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1 ">Password</label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    className="form-control"
                    
                    aria-describedby="emailHelp"
                    placeholder="Enter Password"

                    onChange={(e) => setPassword(e.target.value)}
                    
                  />
                </div>
                <br />
                <div className="col-md-12 text-center">
                <button type="submit" className="btn btn-block btn-outline-dark me-2  mybtn  tx-tfm"> 
                  
                    Login
                  </button>

                </div>
                <div className="col-md-12">
                  
                </div>
                <div className="col-md-12 mb-3">
                  <p className="text-center">
                    <a href="javascript:void();" className="google btn mybtn">
                    </a>
                  </p>
                </div>
                <div className="form-group">
                <p className="font-weight-bold">
                    Don't have account? <a href='/register' className="text-dark">Register</a>
                  </p>
                </div>
              </form>
            </div>
          </div>

        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
}
