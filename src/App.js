import React from "react";
import "./App.css";
import Header from "./components/Header";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from "./components/Home";

function App() {
  return (
    <div className="App bg-black">
      <div className="min-h-screen">
        <Header />
        <ToastContainer pauseOnFocusLoss={false} />
        <Router>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
          </Switch>
        </Router>

      </div>
    </div>
  );
}

export default App;
