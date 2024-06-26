import React   from 'react';
// import Barchart from './Components/Barchart';
import Navbar from './Components/Navbar';
import Sidebar from './Components/Sidebar';
import Main from './Components/Main';
// import { fetchData } from './api/api';

// import { getIntensity } from './api/api';

export default function App() {
 


  return (
    <div >
      <Navbar />
      <div className="grid grid-cols-12 h-screen">
        <div className="col-span-1 bg-gray-200">
          <Sidebar />
        </div>
        <div className="col-span-11 bg-gray-100">
          <Main />
        </div>
      </div>
    </div>
  );
}