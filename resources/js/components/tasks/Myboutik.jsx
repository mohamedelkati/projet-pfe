import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import Header from '../Header';
import Footer from './footer';
export default function Myboutik() {
  const [tasks, setTasks] = useState([]);
  const user = localStorage.getItem('user_id');

  const fetchTasks = async () => {
    try {
      const response = await axios.get(`/api/myboutik/${user}`);
      setTasks(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [user]);

  const deleteTask = (taskId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
      
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.delete(`/api/tasks/${taskId}`);
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: response.data.message,
            showConfirmButton: false,
            timer: 1500
          });
          fetchTasks();
        } catch (error) {
          console.log(error);
        }
      }
    });
  };

  return (
    <div>
      <Header/>
      <h1> {user.prenom } {user.nom}</h1>

        
          <div className='body'>
            {tasks.length === 0 ? (
              <p>No Publication available</p>
            ) : (
              <div className='' 
              
              >
                {tasks.map((task) => (
                  <div className='col-md-3 mb-4 btn-group' height='250px' width='200px' key={task.id}>
                    <div className='card h-100 text-center p-4'>
                      <img
                        src={`${window.location.origin}/images/${task.image_user}`}
                        alt='Task Image'
                        className='card-img-top'
                        
                        height='250px'
                        
                      />
                      <div className='card-body'>
                        <h3 className='card-title mb-0'>{task.title.substring(0, 12)}</h3>
                        <h6 className='card-title mb-0'>{task.category.name.substring(0, 12)}</h6>
                        <h4 className='card-title mb-0'>{task.body.substring(0, 20)}</h4>
                        <p className='card-text'>${task.prix}</p>
                        <div>
                          <Link to={`/edit/${task.id}`} className='btn btn-outline-success mt-auto'>
                            <i className='fas fa-pen'></i>
                          </Link>
                          <button className='
                          
                          btn btn-outline-danger mt-auto mx-2
                          ' onClick={() => deleteTask(task.id)}>
                            <i className='fas fa-trash'></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        
      
      <Footer/>
    </div>
  );
}
