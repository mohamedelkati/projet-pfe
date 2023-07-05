import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Header from '../Header';
import Footer from './footer';

export default function Publication() {
    const { id } = useParams();
    const [tasks, setTasks] = useState([]);
    const [email, setEmail] = useState('');

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await axios.get(`/api/publication/${id}`);
                setTasks(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchTasks();
    }, [id]);

    useEffect(() => {
        // Set the email value here based on your requirements
        setEmail('elkatielyemlahi@gmail.com');
    }, []);

    return (
        <>
            <Header />
            <div>

                {tasks?.map((task) => (
                    <section className="py-5" key={task.id}>
                    <h1>Welcom to stor :  {task.user.nom_garage}</h1>

                        <div className="container px-4 px-lg-5 my-5">
                            <div className="row gx-4 gx-lg-5 align-items-center">
                                <div className="col-md-6">
                                    <img
                                        className="card-img-top mb-5 mb-md-0"
                                        width="500px"
                                        height="400px"
                                        src={`${window.location.origin}/images/${task.image_user}`}
                                        alt="Task Image"
                                    />
                                </div>

                                <div className="col-md-6">
                                    <h1 className="display-5 fw-bolder">{task.title}</h1>
                                    
                                    <div className="fs-5 mb-3">
                                        <span>{task.category.name}</span>
                                    </div>
                                    <p className="lead"> {task.body} </p>
                                    
                                    <div className="fs-5 mb-3">
                                        <label htmlFor="">phone number  :</label>
                                        <span>{task.user.telephone}</span>
                                    </div>

                                    <div className="fs-5 mb-3 ">
                                        <span>${task.prix}.00</span>
                                    </div>

                                    <div className="fs-5 mb-3">
                                        <label htmlFor="">Vendor name  :</label>
                                        <span>{task.user.prenom } {task.user.nom}</span>
                                    </div>
                                    <div className="btn btn-outline-dark flex-shrink-0 me-4">

                                            <a href={`mailto:${email}?subject=${encodeURIComponent(task.title)}&body=${encodeURIComponent('')}`}  >
                                                <i className="fa-sharp fa-solid fa-paper-plane me-2" />
                                              Send Email  
                                            </a>
                                                                                   
                                    </div>
                                   <div className="btn btn-outline-dark flex-shrink-0 me-2 ">
                                       
                                            <a href="/"><i className="bi-cart-fill me-1"></i>
                                            Cancel</a>
                                            
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                ))}
            </div>
            <Footer/>
        </>
    );
}
