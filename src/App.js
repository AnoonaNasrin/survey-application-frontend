import React from 'react';
import AdminLogin from './component/Admin/AdminLogin'
import UserLogin from './component/Auth/UserLogin'
import UserSign from './component/Auth/UserSign';
import AdminHome from './component/Admin/AdminHome';
import Question from './component/Question/Question';

import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css';


function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route exact path='/admin/login' element={<AdminLogin />} />
          <Route exact path='/login' element={<UserLogin />} />
          <Route exact path='/register' element={<UserSign />} />
          <Route exact path='/admin' element={<AdminHome />} />
          <Route exact path='/admin/question/:surveyId' element={<Question/>}/>
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
}

export default App;

