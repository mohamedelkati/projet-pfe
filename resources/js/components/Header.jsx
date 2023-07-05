import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import '../../css/hrader.css'

export default function Header() {
  const [users, setUsers] = useState([]);
  const user = localStorage.getItem('user_id') || '';
  const navigate=useNavigate();
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('/api/user');
      setUsers(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('user_id');
    window.location.href = '/';
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg py-3 shadow-sm"    >
        <div className="container ">
          <a className="navbar-brand" href="/">
          <img src={'./image/logo.png'} className="image" alt="Image"  width="90px"/>
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/about">
                  About
                </a>
              </li>

              <li className="nav-item dropdown">
                {user ? (
                  <a
                    className="nav-link "
                    href="/myboutik"
                    role="button"
                    
                  >
                    my store
                  </a>
                ) : null}
                {/* Dropdown content */}
              </li>
              
              <li className="nav-item">
                <a className="nav-link" href="/Help">
                  Contact
                </a>
              </li>
            </ul>
            <form className="d-flex">


            {!user ? (
                <button className="btn btn-outline-dark me-2" >

                
                <a href="/login" className="nav-link">
                <i className="fa-solid fa-user me-2"  ></i>
                  Login
                </a>
                </button>
                
              ) : null}

              {!user ? (
                <button className="btn btn-outline-dark me-2" >

                
                <a href="/register" className="nav-link">
                <i className="fa-solid fa-user me-2"  ></i>
                Register
                </a>
                </button>
                
              ) : null}

              
              

              

            
                {user ? (
                  <button className="btn btn-outline-dark me-2" >
                    
                  <a
                    href="/create"
                    className={`nav-link ${
                      location.pathname === '/create' ? 'active' : ''
                    }`}
                  >
                  <i className="fa-solid fa-plus "  ></i>

                  Selling
                  </a>
                  
                  </button>
                ) : null}
              

              {user && (
                
                <button
                  onClick={handleLogout}
                  className="btn btn-outline-dark " 
                  
                >
                  <i className="fa-solid fa-right-from-bracket me-2"  ></i>
                  <span
                    className="badge text-secondary border border-secondary rounded-circle"
                    style={{ paddingBottom: '2px' }}
                    onClick={() => { localStorage.removeItem("user_id")  }}
                  ></span>
                  Logout 
                </button>
                
              )}

            </form>
          </div>
        </div>
      </nav>
    </>
  );
}
