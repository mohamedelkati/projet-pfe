import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Header from '../Header';
import Footer from './footer';
export default function Authentification() {
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [telephone, setTelephone] = useState('');
  const [nomGarage, setNomGarage] = useState('');
  const [errors, setErrors] = useState('');
  const navigate = useNavigate();

  const login = (e) => {
    e.preventDefault();
    fetch('api/register', {
      method: 'post',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ nom, prenom, email, password, telephone, nom_garage: nomGarage }),
    })
      .then((res) => res.json())
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
        // Handle the error and display an appropriate message to the user
      });

    navigate('/login');
  };

  return (
    <>
      <Header />

      <div className="container">
        <div className="row">
          <div className="col-md-5 mx-auto">
            <div id="first">
              <div className="myform form">
                <div className="logo">
                  <div className="text-center">
                    <i className="fa-solid fa-user me-2 fa-2xl mx-auto me-2">Register</i>
                  </div>
                </div>
                <form onSubmit={login}>
                  <div className="form-group">
                    <label htmlFor="exampleInputNom1">Nom</label>
                    <input
                      type="text"
                      className="form-control"
                      id="nom"
                      aria-describedby="NomHelp"
                      placeholder="Enter Nom"
                      name="nom"
                      onChange={(e) => setNom(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="exampleInputPrenom1">Prenom</label>
                    <input
                      type="text"
                      className="form-control"
                      id="Prenom"
                      aria-describedby="PrenomHelp"
                      placeholder="Enter Prenom"
                      name="prenom"
                      onChange={(e) => setPrenom(e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="exampleInputPrenom1">Telephone</label>
                    <input
                      type="tele"
                      className="form-control"
                      id="Telephone"
                      aria-describedby="TelephoneHelp"
                      placeholder="Enter Telephone "
                      
                      name='telephone'
                      onChange={(e)=>setTelephone(e.target.value)}                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      id="Email"
                      aria-describedby="EmailHelp"
                      placeholder="Enter Email"
                      name="email"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="exampleInputnom_garage1">Nom de garage</label>
                    <input
                      type="text"
                      className="form-control"
                      id="nom_garage"
                      aria-describedby="nom_garageHelp"
                      placeholder="Enter nom de garage"
                      name="nom_garage"
                      onChange={(e) => setNomGarage(e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Password</label>
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
                      Register
                    </button>
                  </div>
                  <div className="col-md-12"></div>
                  <div className="col-md-12 mb-3">
                    <p className="text-center">
                      <a href="javascript:void();" className="google btn mybtn"></a>
                    </p>
                  </div>
                </form>
                <div className="row mb-4 px-3">
                  <small className="font-weight-bold">
                    I have an account? <a href="/login" className="text-dark">Login</a>
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
