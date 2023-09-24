import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
function LogIn() {
  let navigate = useNavigate()
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [stat, setStat] = useState({
    pass: {
      isrigth: true,
      label: "",
    },
    email: {
      isrigth: true,
      label: "",
    },
  });
  const Buttonlogin = async (e) => {
    e.preventDefault();

    await axios.post(`http://127.0.0.1:8080/user/login`, { email, pass })
    .then(async (response) => {
      if (typeof response.data === "object") {
        localStorage.setItem('token',response.data.token)
        if (response.data.token) {
          axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
        }
        navigate("/viewjob");
      }
        if (response.data === "All fields must be filled") {
          setStat((prevState) => ({
            email: {
              isrigth: false,
              label: "the field must be filled",
            },
            pass: {
              isrigth: false,
              label: "the field must be filled",
            },
          }));
        } else if (response.data === "Incorrect email") {
          setStat((prevState) => ({
            pass: {
              isrigth: true,
              label: "",
            },
            email: {
              isrigth: false,
              label: "Incorrect email",
            },
          }));
        } else if (response.data === "Incorrect password") {
          setStat((prevState) => ({
            pass: {
              isrigth: false,
              label: "Incorrect password",
            },
            email: {
              isrigth: true,
              label: "",
            },
          }));
        }
      })
      .catch((error) => {
        console.error("Axios Error:", error);
      });
  };
  return (
    <div className="container m-5">
      <div className="row">
        <div className="col-12 col-md-6 col-lg-6">
          <img
            src="https://i.pinimg.com/564x/60/1c/9f/601c9fdd9819a87c6e234eab66f0baa2.jpg"
            alt="Image Description"
            style={{ width: "100%", height: "100%" }}
          />
        </div>
        <div
          className="col-12 col-md-6 col-lg-5 p-4  mx-md-0"
          style={{
            backgroundColor: "#afecfe",
            borderTopLeftRadius: 30,
            borderBottomLeftRadius: 30,
          }}
        >
          <form onSubmit={Buttonlogin}>
            <div className="mb-3">
              <input
                type="email"
                className={`form-control ${stat.email.isrigth ? "" : "red"}`}
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email Address"
              />
              <label htmlFor="email" className="form-label">
                {stat.email.label}
              </label>
            </div>
            <div className="mb-3">
              <input
                type="password"
                id="password"
                className={`form-control ${stat.pass.isrigth ? "" : "red"}`}
                value={pass}
                onChange={(e) => setPass(e.target.value)}
                placeholder="Enter Password"
              />
              <label htmlFor="password" className="form-label">
                {stat.pass.label}
              </label>
            </div>
            <div className="d-flex justify-content-center mt-5">
              <button className="btn btn-outline-info">Sign Up</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
export default LogIn;