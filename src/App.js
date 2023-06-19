import React from "react";
import "./App.css";
import Header from "./components/Header";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from "./components/Home";
import { Route, Routes } from "react-router-dom";
import About_US from "./components/About_US";

function App() {
  return (
    <div className="App bg-black">
      <div className="min-h-screen">
        <Header />
        <ToastContainer pauseOnFocusLoss={false} />
        
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/AboutUS" element={<About_US/>} />


        </Routes>
      

      </div>
    </div>
  );
}

export default App;
