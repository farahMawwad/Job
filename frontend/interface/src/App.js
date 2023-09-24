import React from "react";
//route
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignUp from "./component/SignUp";
import LogIn from "./component/LogIn";
import ViewJop from "./component/VeiwJob";
import UserViewJop from "./component/UserViewJob";
import AdminViewJop from "./component/AdminVeiwJob";

//css
import 'bootstrap/dist/css/bootstrap.min.css';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/viewjob" element={<ViewJop />} />
          <Route path="/adminviewjob" element={<AdminViewJop />} />
          <Route path="/userviewjob" element={<UserViewJop />} />
          {/* Add more routes as needed */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

