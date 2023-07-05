import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';
import Swal from 'sweetalert2';
import { Link, useNavigate, useParams } from 'react-router-dom';
import TaskItem from './TaskItem';
import TaskFilter from './TaskFilter';
import Header from '../Header';
import 'bootstrap/dist/css/bootstrap.css';
import '../../../css/app.css';

import Footer from './footer';

export default function Tasks() {
  const user = localStorage.getItem("user_id");
  console.log(user);

  const navigate = useNavigate();

  const [task, setTask] = useState([]);
  const [category, setCategory] = useState([]);
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [catId, setCatId] = useState(null);
  const [orderBy, setOrderBy] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  useEffect(() => {
    if (!category.length) {
      fetchCategories();
      fetchUsers();
    }
    if (!task.length) {
      fetchTasks();
      fetchUsers();
    }
  }, [page, catId, orderBy, debouncedSearchTerm[0]]);

  const fetchTasks = async () => {
    try {
      if (catId) {
        const response = await axios.get(`/api/category/${catId}/tasks/?page=${page}`);
        setTask(response.data);
        console.log(task);
      } else if (orderBy) {
        const response = await axios.get(`/api/order/${orderBy.column}/${orderBy.direction}/tasks?page=${page}`);
        setTask(response.data);
      } else if (debouncedSearchTerm[0] !== '') {
        const response = await axios.get(`/api/search/${debouncedSearchTerm[0]}/tasks?page=${page}`);
        setTask(response.data);
      } else {
        const response = await axios.get(`/api/tasks?page=${page}`);
        setTask(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get('/api/categories');
      setCategory(response.data);
      console.log(category);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get('/api/user');
      setUsers(response.data);
      console.log(task);
    } catch (error) {
      console.log(error);
    }
  };


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

  const fetchNext = (link) => {
    const url = new URL(link);
    setPage(url.searchParams.get('page'));
  };

  const renderPagination = () => (
    <ul className="pagination">
      {task.links?.map((link, index) => (
        <li key={index} className={`page-item ${link.active ? 'active' : ''}`}>
          <a className='page-link ' onClick={() => fetchNext(link.url)}>
            {link.label.replace('&laquo;', '').replace('&raquo;', '')}
          </a>
        </li>
      ))}
    </ul>
  );
  


  

  return (
    <>
    
    <Header/>
    <div className='task'>

    


  <div class="card  text-white border-0">
        <img src={'./image/bg.jpg'} className="card-img" alt="Background" 
        height="550px" />
    <div className='card-img-overlay d-flex flex-column justify-content-center'>

        
          <div className='container  ' 
          style={{ color: "#000000" }}>
            <h1 class="card-title display-3 fw-bolder mb-0 ">Welcome to Cars Link</h1>
              <p class="card-text  lead gs-2">Cars Link - Connecting You to the World of Cars:
              <br />
              Browse, Buy, and Sell with Ease and Confidence!</p>
          </div>
    
      </div>
    </div>


    </div>


    <div className='col-md-3'>
        <TaskFilter
          category={category}
          catId={catId}
          setCatId={setCatId}
          orderBy={orderBy}
          setOrderBy={setOrderBy}
          setPage={setPage}

        />
      </div>
      <div className="container mb-4">
        <div className="row">
          <div className="col-md-12">
            <br />
            <input type="search"  className="form-control" value={searchTerm}
                onChange={(event) => {
                  setCatId(null);
                  setOrderBy(null);
                  setPage(1);
                  setSearchTerm(event.target.value);
                }}
                placeholder='Search...' />
          </div>
        </div>
      </div>
      {task.data?.map((task) => (
                <>
                <TaskItem key={task.id} task={task} deleteTask={deleteTask} className="d-flex justify-content-center mb-6 pb-5" />
                {/* <td><Link to={`/publication/${task.id}`} className='btn btn-sm btn-warning mx-1'>Link</Link></td> */}


                </>
              ))}
              <div className='my-4 d-flex justify-content-between'>
            <div>
              show {task.from || 0} to {task.to || 0} from {task.total || 0} results
            </div>
            <div>
              {renderPagination()}
            </div>
          </div>
    
  <Footer/>
    </>
  );
}
