import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Header from '../Header';
import Footer from './footer';
export default function Create() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [prix, setPrix] = useState("");
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  const user = localStorage.getItem("user_id");
  const [user_id, setUser_id] = useState(Number(user));
  const [image, setImage] = useState("");

  console.log(image);

  useEffect(() => {
    fetchCategories();
  }, []);

  const createTask = async (e) => {
    e.preventDefault();
    const task = new FormData();
    task.append("title", title);
    task.append("body", body);
    task.append("category_id", categoryId);
    task.append("user_id", user);
    task.append("prix", prix);
    task.append("image_user", image);

    try {
      await axios.post('/api/tasksssss', task, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      Swal.fire({
        position: 'top-end',
        title: 'Your task has been saved?',
        text: "You won't be able to revert this!",
        icon: 'success',
        timer: '1500',
        showCancelButton: false,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      });
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get('/api/categories');
      setCategories(response.data);
      console.log(user);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Header />
      <div className='row my-5'>
        <div className='col-md-6 mx-auto '>
          <div className='col card'>
            <h5 className='text-center mt-2'>Create New Task</h5>
            <div className='card-body'>
              <form className='mt-5' onSubmit={(e) => createTask(e)}>
                <input type="hidden" name='user_id' value={user_id} onChange={(e) => setUser_id(e.target.value)} />

                <div className='row my-5'>
                  <div className="form-group">
                    <label htmlFor="exampleInputTitle1">Title</label>
                    <input
                      type="text"
                      name='title'
                      className="form-control"
                      id="Title"
                      aria-describedby="TitleHelp"
                      placeholder="Enter Title"
                      value={title} onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="exampleInputBody1">Body</label>
                    <textarea
                      id="body" name='body' cols='30' rows='5'
                      className="form-control"
                      aria-describedby="BodyHelp"
                      placeholder="Enter Body"
                      value={body} onChange={(e) => setBody(e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="exampleInputprix1">Price</label>
                    <input
                      type="text"
                      name='prix'
                      className="form-control"
                      id="prix"
                      aria-describedby="prixHelp"
                      placeholder="Enter Price"
                      cols='30' rows='5'
                      value={prix} onChange={(e) => setPrix(e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <select className="form-select" name='category_id' value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
                      <option disabled value="">Choose a category</option>
                      {
                        categories?.map((category) => {
                          return (
                            <option value={category.id} key={category.id}>{category.name}</option>
                          )
                        })
                      }
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Image</label>
                    <input name='image_user' type="file" className="form-control" id="image" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />
                  </div>

                  <br />

                  <div className="col-md-12 text-center">
                    <button type="submit" className="btn btn-block btn-outline-dark me-2 mybtn tx-tfm">
                      Submit
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
