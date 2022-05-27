import {useState,useEffect} from 'react'
import React from 'react'
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Route, Link, BrowserRouter, Routes } from "react-router-dom";
// We use Route in order to define the different routes of our application

//Root of Equation
import Bisection from "./components/RoE/Bisection.js";
// import FalsePosition from "./components/RoE/FalsePosition.js";
// import NewtonRaphson from "./components/RoE/NewtonRaphson.js";
// import OnePointIteration from "./components/RoE/OnePointIteration.js";

// We import all the components we need in our app
// import { Axios } from 'axios';
import './css/bootstrap.min.css';

const App = () => {
  //  //creating IP state
  //  const [ip, setIP] = useState('');

  //  //creating function to load ip address from the API
  //  const getData = async () => {
  //    const res = await Axios.get('https://api.ipify.org/?format=json')
  //    console.log(res.data);
  //    setIP(res.data.ip)
  //  }
   
   useEffect( () => {
     //passing getData method to the lifecycle method
     getData()
 
   }, [])

  return (
    <BrowserRouter>
    <div>
      <Nav class="navbar navbar-dark bg-dark">
        <Navbar className="Nav-content">
          <Container>
            <Navbar.Brand href="/">Numerical</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto" defaultActiveKey="/">
                <NavDropdown title="Root of Equation" id="collasible-nav-dropdown" >
                  <NavDropdown.Item as={Link} to="/Bisection">
                    Bisection Methods
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/FalsePosition">
                    False-Position
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/OnePointIteration">
                    One-Point Iteration
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/NewtonRaphson">
                    Newton Raphson
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        {/* <Nav><Navbar.Brand>ip</Navbar.Brand></Nav> */}
      </Nav>
      <div>
        <Routes>
          <Route exact path="/" element={<Bisection />} />
          <Route path="/Bisection" element={<Bisection />} />
          {/* <Route path="/FalsePosition" element={<FalsePosition />} />
          <Route path="/OnePointIteration" element={<OnePointIteration />} />
          <Route path="/NewtonRaphson" element={<NewtonRaphson />} /> */}
        </Routes>
      </div>
    </div>
    </BrowserRouter>
  );
};

export default App;

