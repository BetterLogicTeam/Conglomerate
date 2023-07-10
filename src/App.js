import React, { useCallback } from "react";
import "./App.css";
import Header from "./components/Header";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./components/Home";
import { Route, Routes } from "react-router-dom";
import About_US from "./components/About_US";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import Tokenomics from "./components/Tokenomics/Tokenomics";
import Roadmap from "./components/Roadmap";


function App() {
  const particlesInit = useCallback(async (engine) => {
    console.log(engine);
    // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
    // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
    // starting from v2 you can add only the features you need reducing the bundle size
    await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback(async (container) => {
    await console.log(container);
  }, []);
  return (
    <>
 

      <Particles
        id="tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
        options={{
          // background: {
          //   color: {
          //     value: "transparent",
          //   },
          // },
          fpsLimit: 120,
          interactivity: {
            events: {
              onClick: {
                enable: false,
                mode: "push",
              },
              onHover: {
                enable: false,
                mode: "repulse",
              },
              resize: false,
            },
            modes: {
              push: {
                quantity: 4,
              },
              repulse: {
                distance: 500,
                duration: 0.9,
              },
            },
          },
          particles: {
            color: {
              value: "#fff",
            },
            backgroundMask: {
              color: "red",
              distance: 120,
              enable: false,
              opacity: 0,
              width: "100%",
            },
            collisions: {
              enable: false,
            },
            move: {
              directions: "right",
              enable: true,
              outModes: {
                default: "bounce",
              },
              random: false,
              speed: 3,
              straight: false,
            },
            number: {
              density: {
                enable: false,
                area: 1200,
              },
              value: 250,
            },
            opacity: {
              value: 0.1,
            },
            // zIndex:{
            //   value: -9
            // },
            shape: {
              type: "circle",
            },
            size: {
              value: { min: 1, max: 5 },
            },
          },
          detectRetina: true,
        }}
      />
      <div className="App ">
        <div className="min-h-screen">
          <Header />
          <ToastContainer pauseOnFocusLoss={false} />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/AboutUS" element={<About_US />} />
            <Route path="/Tokenomics" element={<Tokenomics />} />
            <Route path="/Roadmap" element={<Roadmap />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
