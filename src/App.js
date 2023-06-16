import React from "react";
import "./App.css";
import Header from "./components/Header";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from "./components/Home";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App bg-black">
      <div className="min-h-screen">
        <Header />
        <ToastContainer pauseOnFocusLoss={false} />
        <h1>Tayyab</h1>
        <Routes>
          <Route path="/" element={<Home/>} />

        </Routes>
      

      </div>
    </div>
  );
}

export default App;
