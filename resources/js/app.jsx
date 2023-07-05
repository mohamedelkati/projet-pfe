import './bootstrap';

import ReactDOM from "react-dom/client";

import Tasks from './components/tasks/Tasks';

import Create from './components/tasks/Create';

import Edit from './components/tasks/Edit';

import Header from './components/Header';

import { BrowserRouter,Routes,Route } from 'react-router-dom';

import Authentification from './components/tasks/Authentification';

import Login from './components/tasks/Login';

import Myboutik from './components/tasks/Myboutik';

import Publication from './components/tasks/Publication';

import Footer from './components/tasks/footer';

import About from './components/tasks/Abou';
import Help from './components/tasks/Help';
const user=localStorage.getItem("user_id");

ReactDOM.createRoot(document.getElementById('app')).render(

    <div className="row">

        <div className="col-md-12">

            <BrowserRouter>


                <Routes>

                    <Route path='/' element={<Tasks/>}></Route>

                    <Route path='/publication/:id' element={<Publication/>}></Route>

                    <Route path='/myboutik' element={<Myboutik/>}></Route>

                    <Route path='/create' element={<Create/>}></Route>

                    <Route path='edit/:taskId' element={<Edit/>}></Route>

                    <Route path='/register' element={<Authentification/>}></Route>

                    <Route path='/login' element={<Login/>}></Route>
                    <Route path='/Footer' element={<Footer/>}></Route>
                    <Route path='/About' element={<About/>}></Route>
                    <Route path='/Help' element={<Help/>}></Route>

                </Routes>

            </BrowserRouter>

        </div>

    </div>

);