import React ,{useState} from "react";
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
function SignUp() {
  let navigate = useNavigate()
  const [ email, setEmail]=useState("")
const [ pass, setPass]=useState("")
const [name,setname]=useState("")
const [ passconfirm, setPassconfirm]=useState("")
const [ stat, setStat]=useState({
  pass:{
 "isrigth":true,
"label":""
  },
  confirmpass:{
 "isrigth":true,
"label":""
  },
 email:{
 "isrigth":true,
 "label":""
  },
 
})
  const ButtonSignup = async(e) => {
    e.preventDefault()
    await axios.post('http://127.0.0.1:8080/user/signup',{email,pass,passconfirm,name})
   .then((response) => {
     if(typeof response.data === "object"){
    
      navigate("/login");
     }
    if(response.data==="All fields must be filled"){
     setStat((prevState) => ({
       email:{
         isrigth:false,
         label:"the field must be filled"
          },
       pass: {
         isrigth:false,
         label:"the field must be filled",
       },
       confirmpass:{
         "isrigth":true,
        "label":""
          },
       
     }));
    }
    else if(response.data==="Email not valid"){
     setStat((prevState) => ({
       pass:{
         "isrigth":true,
         "label":""
          },
       email:{
         "isrigth":false,
         "label":"Email not valid"
          },
          confirmpass:{
           "isrigth":true,
          "label":""
            },
     }));
   }
   else if(response.data ==="Email already in use"){
     setStat((prevState) => ({
       pass:{
         "isrigth":true,
         "label":""
          },
       email:{
         "isrigth":false,
         "label":"Email already in use"
          },
          confirmpass:{
           "isrigth":true,
          "label":""
            },
     }));
     
   }
   else if(response.data ==="Password not strong enough and Email already in use"){
     setStat((prevState) => ({
       pass:{
         "isrigth":false,
         "label":"Password not strong enough"
          },
       email:{
         "isrigth":false,
         "label":"Email already in use"
          },
          confirmpass:{
           "isrigth":true,
          "label":""
            },
     })); 
   }
   else if(response.data==="pass field must be filled and Email not valid"){
     setStat((prevState) => ({
       pass:{
         "isrigth":false,
         "label":"this field must be filled"
          },
       email:{
         "isrigth":false,
         "label":"Email not valid"
          },
          confirmpass:{
           "isrigth":true,
          "label":""
            },
     })); 
   }
   else if(response.data==="pass field must be filled and Email already in use"){
     setStat((prevState) => ({
       pass:{
         "isrigth":false,
         "label":"this field must be filled"
          },
       email:{
         "isrigth":false,
         "label":"Email already in use"
          },
          confirmpass:{
           "isrigth":true,
          "label":""
            },
     })); 
   }
   else if(response.data==="Password not strong enough and Email not valid"){
     setStat((prevState) => ({
       pass:{
         "isrigth":false,
         "label":"Password not strong enough"
          },
       email:{
         "isrigth":false,
         "label":"Email not valid"
          },
          confirmpass:{
           "isrigth":true,
          "label":""
            },
     }));
     
   }
   else if(response.data==="Email already in use"){
     setStat((prevState) => ({
       pass:{
         "isrigth":false,
         "label":""
          },
       email:{
         "isrigth":false,
         "label":"Email already in use"
          },
          confirmpass:{
           "isrigth":true,
          "label":""
            },
     }));
     
   }
   else if(response.data==="Password not strong enough"){
      setStat((prevState) => ({
       email:{
         "isrigth":true,
         "label":""
          },
        pass:{
          "isrigth":false,
          "label":"Password not strong enough"
           },
           confirmpass:{
             "isrigth":true,
            "label":""
              },
      }));
    }
   else if(response.data==="Passwordconfirm is not match and Password not strong enough"){
      setStat((prevState) => ({
       email:{
         "isrigth":true,
         "label":""
          },
        pass:{
          "isrigth":false,
          "label":"Password not strong enough"
           },
           confirmpass:{
             "isrigth":false,
            "label":"Passwordconfirm is not match"
              },
      }));
    }
   else if(response.data==="Passwordconfirm is not match and Email not valid"){
      setStat((prevState) => ({
       email:{
         "isrigth":true,
         "label":"Email not valid"
          },
        pass:{
          "isrigth":true,
          "label":""
           },
           confirmpass:{
             "isrigth":false,
            "label":"Passwordconfirm is not match"
              },
      }));
    }
   else if(response.data==="Password not strong enough and Email already in use and Passwordconfirm is not match"){
      setStat((prevState) => ({
       email:{
         "isrigth":false,
         "label":"Email already in use"
          },
        pass:{
          "isrigth":false,
          "label":"Password not strong enough"
           },
           confirmpass:{
             "isrigth":false,
            "label":"Passwordconfirm is not match"
              },
      }));
    }  else if(response.data==="Passwordconfirm is not match"){
      setStat((prevState) => ({
       email:{
         "isrigth":true,
         "label":""
          },
        pass:{
          "isrigth":true,
          "label":""
           },
           confirmpass:{
             "isrigth":false,
            "label":"Passwordconfirm is not match"
              },
      }));
    }
 
   })
   .catch((error) => {
     console.error('Axios Error:', error);
   });
 
 }
  return (
    <div className="container m-5">
      <div className="row">
        <div className="col-12 col-md-6 col-lg-6">
          <img src="https://i.pinimg.com/564x/60/1c/9f/601c9fdd9819a87c6e234eab66f0baa2.jpg" alt="Image Description" style={{width:'100%' ,height:'100%'  }} />
        </div>

        <div className="col-12 col-md-6 col-lg-5 p-4  mx-md-0" style={{backgroundColor:"#afecfe" ,borderTopLeftRadius:30 ,borderBottomLeftRadius:30}}>
          <form   onSubmit={ButtonSignup}>
            <div className="mb-3">
              <input type="text" className="form-control " id="username" onChange={(e)=>{setname(e.target.value)}}  placeholder="User Name"/>

            </div>
            <div className="mb-3">
            <input
  type="email"
  className={`form-control ${stat.email.isrigth ? "" : "red"}`}
  id="email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  placeholder="Email Address"
/>
              <label htmlFor="email" className="form-label">{stat.email.label}</label>
            </div>
            <div className="mb-3">
              <input type="password"  id="password" className={`form-control ${stat.pass.isrigth ? "" : "red"}`} value={pass}  onChange={(e) => setPass(e.target.value)}  placeholder="Enter Password"/>
              <label htmlFor="password" className="form-label">{stat.pass.label}</label>
            </div>
            <div className="mb-3">
              <input type="password" 
               id="confirmPassword" className={`form-control ${stat.email.isrigth ? "" : "red"}`} value={passconfirm}
               onChange={(e) => setPassconfirm(e.target.value)} placeholder="Confirm Password"/>
              <label htmlFor="confirmPassword" className="form-label">{stat.confirmpass.label}</label>
            </div>
            <div className="d-flex justify-content-center mt-5">
            <button  className="btn btn-outline-info">Sign Up</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
