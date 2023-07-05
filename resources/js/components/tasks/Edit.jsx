import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

import Header from '../Header';
import Footer from './footer';
import '../../../css/creat.css';
export default function Edit() {
    const [title,setTitle] = useState("");
    const [body,setBody] = useState("");
    const [categoryId, setCategoryId] = useState(""); 
    const [prix, setPrix] = useState(""); 
    const [categories, setCategories] = useState([]); 
    const [errors, setErrors] = useState([]); 
    const [image, setImage] = useState(null); 
    const [loading, setLoading] = useState(false); 
    const [done, setDone] = useState(1); 
    const navigate = useNavigate(); 
    const { taskId }=useParams(); 

    useEffect(() => {
      fetchTask();
        fetchCategories();
      }, []);
  
      const updateTask = async(e)=>{
        e.preventDefault();
        const formData = new FormData();
        formData.append("title", title);
        formData.append("body", body);
        formData.append("prix", prix);
        formData.append("category_id", categoryId);
        formData.append("done", done);
        if (image) {
          formData.append("image_user", image);
      }
        try {
            await axios.post(`/api/tasksid/${taskId}`,formData);
            Swal.fire({
                position :'top-end',
                title: 'your task has been saved?',
                text: "You won't be able to revert this!",
                icon: 'success',
                timer:'1500',
                showCancelButton: false,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'});
                navigate(`/myboutik`);
           
        } catch (error) {
            console.log(error);
        }
      }



    const fetchTask = async()=>{
      try {
        const response = await axios.get(`/api/tasks/${taskId}`);
        setTitle(response.data.title);
        setBody(response.data.body);
        setPrix(response.data.prix);
        setCategoryId(response.data.category_id);
        setDone(response.data.done);
      } catch (error) {
        console.log(error);
      }
    }


    const fetchCategories =async ()=>{
        try {
          const response =await axios.get('/api/categories');
          setCategories(response.data);
          console.log(categories);
          
        } catch (error) {
          console.log(error);
        }
      }
  return (
    <>
    <Header/>
    <div className='row my-5  '>

      <div className='col-md-6 mx-auto '>
        <div className='col  card'>
        <h5 className='text-center mt-2'>Edit</h5>
            <div className='card-body'>
                <form className='mt-5' onSubmit={(e)=>updateTask(e)}>
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
          value={title} onChange={(e)=>setTitle(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="exampleInputBody1">Body</label>
        <input
          type="text"
          name='body'
          className="form-control"
          id="Body"
          aria-describedby="BodyHelp"
          placeholder="Enter Body"
          cols='30' rows='5'
          value={body} onChange={(e)=>setBody(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="exampleInputprix1">prix</label>
        <input
          type="text"
          name='prix'
          className="form-control"
          id="prix"
          aria-describedby="prixHelp"
          placeholder="Enter prix"
          cols='30' rows='5'
          value={prix} onChange={(e)=>setPrix(e.target.value)}
        />
      </div>

      <div className="form-group">
        <select className="form-select" name='category_id' value={categoryId} onChange={(e)=>setCategoryId(e.target.value)}>
          <option disabled value="">choose a category</option>
          {
            categories?.map((category)=>{
              return(
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
        <button type="submit" className="btn btn-block btn-outline-dark me-2  mybtn  tx-tfm">
          Submit
        </button>
      </div>
    </div>
                </form>
            </div>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  )
}
