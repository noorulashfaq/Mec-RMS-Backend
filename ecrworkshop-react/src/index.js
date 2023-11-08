import React from 'react';
import ReactDOM from 'react-dom/client';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { Login } from './Login';
import { Dashboard } from './Dashboard';
// import MulSel from './MulSel';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {
      (sessionStorage.getItem('person'))
      ?
      <>
        <Dashboard/>
      </>
      :
      <><Login/></>
    }
    {/* <MulSel/> */}
  </React.StrictMode>
);