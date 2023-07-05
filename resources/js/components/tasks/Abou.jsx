import React from 'react';
import Header from '../Header';
import Footer from './footer';
const About = () => {
  return (
    <>
    <Header/>

    <div className="container mt-6">
      <div className="row mt-5">
        <div className=" mt-5">
          <div className="card mt-5">
            <div className="card-body ">
              <h1 className="card-title text-center mt-5">About Cars Link</h1 >
              <p className="card-text mt-5">
                Cars Link is an online platform that provides a seamless experience for buying and selling cars. Our goal is to connect car buyers and sellers in a convenient and efficient manner.
              </p>
              <p className="card-text">
                With Cars Link, users can easily list their cars for sale, browse through the available listings, and connect with potential buyers. Our platform ensures transparency, security, and a user-friendly interface to enhance the car trading experience.
              </p>
              <p className="card-text">
                Whether you're looking to sell your car or find your dream vehicle, Cars Link is the go-to platform for all your automotive needs. Join us today and experience the future of car buying and selling.
              </p>
              
              <br />
              <a href="/" class="btn btn-block btn-outline-dark me-2 mybtn tx-tfm">cancel</a>

            </div>
            
          </div>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default About;
