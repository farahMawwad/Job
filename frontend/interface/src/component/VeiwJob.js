import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import UserViewJop from "./UserViewJob";
import AdminViewJop from "./AdminVeiwJob";
function ViewJop() {
  let navigate = useNavigate();
  const [state, setstate] = useState();
  const [role, setrole] = useState();
  const [contain, setcontain] = useState(false); // Initialize to false

  useEffect(() => {
    axios.post('http://127.0.0.1:8080/user/test')
      .then((res) => {
        if (res.data.authData != null) {
          console.log(res.data)
          setcontain(true);
          setrole(res.data.authData.role)
          setstate(res.data);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      {contain?state.authData.role === "1"? <UserViewJop id_user={state.authData._id} />:state.authData.role=== "2"? <AdminViewJop id_user={state.authData._id}/>:"":""}
    </div>
  );
}

export default ViewJop;
