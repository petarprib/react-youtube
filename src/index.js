import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import './index.scss';
import 'bootstrap/dist/css/bootstrap.css';
// import { Container } from 'react-bootstrap';

ReactDOM.render(
  <React.StrictMode>
    {/* <Container fluid> */}
      <App />
    {/* </Container> */}
  </React.StrictMode>,
  document.getElementById('root')
);