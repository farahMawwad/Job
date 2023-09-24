import React, { useState ,useEffect} from 'react';
import axios from 'axios';
function UserViewJop(props) {
  const {id_user} =props
  const [showFields, setShowFields] = useState({state:false,_id:""});
  const [ContainJob, setContainJob] = useState();
  const [Done, setDone] = useState({});
  const [information, setInformation]=useState({
    user_id:id_user,
    username:"",
    Age: "",
    Address: "",
    Gender: "",
    phone_numbers: "",
    Experience: "",
    Education: "",
    Upload_CV: "",
    relevant: "",
  })
useEffect (()=>{
axios.get('http://127.0.0.1:8080/user/userview').then((res)=>{
 setContainJob(res.data)
})
},[])
const toggleShowFields = (id) => {
  setShowFields((prevState) => ({
    ...prevState,
    _id: id,
    state: !prevState.state,
  }));
};
  const handleButtonClick = async(e)=>{
    e.preventDefault();
    const _id =showFields._id 
    setShowFields((prevState) => ({
      ...prevState,
      state: !prevState.state,
    }));
    await axios.post("http://127.0.0.1:8080/user/add_employee",{information,_id,id_user}).then((res)=>{
   
      if(res.data){

    setDone((prevState) => ({
      ...prevState,
      [_id] : !prevState[_id]
    }));
  }
})

}
  const renderFields = () => {
    if (showFields.state) {
      return (
        <form    onSubmit={handleButtonClick}     style={{ 
          width: '80%', 
          margin: '0 auto', 
          marginTop: '1vh', 
          position: 'absolute', 
          top: '50%',
        left: '60%', 
         transform: 'translate(-50%, -50%)',
        }}
>

        <div className=" border border-3 bg-info-subtle p-2 rounded-4   d-flex justify-content-center flex-column " style={{width:'80%'}}>
        <div className="row mb-3 m-5">
          <div className="col-12 col-lg-6 col-md-12 mb-3  ">
            <label className="mx-1" >User Name</label>
            <input style={{ borderRadius: 10, width: '100%' }} type="text" onChange={(e)=>setInformation({ ...information, username: e.target.value })} required={true}/>
          </div>
          <div className="col-12 col-lg-6 col-md-12">
            <label className="mx-1">Phone Numbers</label>
            <input style={{ borderRadius: 10, width: '100%' }} type="tel" onChange={(e)=>setInformation({ ...information, phone_numbers: e.target.value })} required={true} />
          </div>
          <div className="col-12 col-lg-6 col-md-12 mb-3 ">
            <label className="mx-1">Gender  </label>
            <select  style={{ borderRadius: 10, width: '100%' }} onChange={(e)=>setInformation({ ...information, Gender : e.target.value })} required={true}>
        <option value=""> Gender </option>
        <option value="Female">Female</option>
        <option value="Male">Male</option>
     
      </select>
          </div>
          <div className="col-12 col-lg-6 col-md-12">
            <label className="mx-1">Age</label>
            <input style={{ borderRadius: 10, width: '100%' }}  type="number"  onChange={(e)=>setInformation({ ...information, Age: e.target.value })} required={true}/>
          </div>
          <div className="col-12 col-lg-6 col-md-12 mb-3 ">
            <label className="mx-1">Experience</label>
            <input style={{ borderRadius: 10, width: '100%' }}type="number" onChange={(e)=>setInformation({ ...information, Experience: e.target.value })} required={true} />
          </div>
          <div className="col-12 col-lg-6 col-md-12">
            <label className="mx-1">Address</label>
            <input style={{ borderRadius: 10, width: '100%' }} type="text" onChange={(e)=>setInformation({ ...information, Address: e.target.value })} required={true}/>
          </div>
          <div className="col-12 col-lg-6 col-md-12 mb-3 ">
            <label className="mx-1">Education</label>
             <select  style={{ borderRadius: 10, width: '100%' }} onChange={(e)=>setInformation({ ...information, Education: e.target.value })} required={true}>
        <option value=""> Education Level</option>
        <option value="highschool">High School</option>
        <option value="bachelor">Bachelor's Degree</option>
        <option  value="master">Master's Degree</option>
      </select>
          </div>
          <div className="col-12 col-lg-6 col-md-12">
            <label className="mx-1">relevant</label>
            <textarea style={{ borderRadius: 10, width: '100%' }} type="text" onChange={(e)=>setInformation({ ...information, relevant: e.target.value })}/>
          </div>
          <div className="col-12 col-lg-12 col-md-12   d-flex justify-content-center ">
            <div  className="col-12 col-lg-6 col-md-12 mb-3 ">
            <label >Upload_CV</label>
            <input style={{ borderRadius: 10, width: '100%' }}   type="file"  onChange={(e)=>setInformation({ ...information, Upload_CV: e.target.files[0] })}/>
            </div>
            <div  className="col-12 col-lg-6 col-md-12 mb-3 mt-4 ">
            <button style={{ borderRadius: 10, width: '100%' }}  className="btn btn-outline-primary">Supmit</button>
            </div>
          </div>
        </div>
        </div>
        </form>
      );
    } else {
      return null;
    }
  };

  return (
    <div style={{position:"relative"}}>
      {renderFields()}

    {ContainJob  ? (
      ContainJob.map((e) => (
        <div className="AdminViewJop d-flex justify-content-center " key={e._id}>
        <div className={`col-12 m-3 flex-column p-4 ${Done[e._id]?"bg-success bg-subtle":`bg-info`}`} style={{ borderRadius: 20, width: '80%' }} >
          <div className="mb-2 border border-3 bg-info-subtle p-2 rounded-4 d-flex flex-column gap-2" onClick={()=>Done[e._id]?"":toggleShowFields(e._id)}  key={e._id}>
            <div><span style={{fontSize:18, color:"#8ac11a"}}>job_title : </span> {e.job_title}</div>
            <div><span style={{fontSize:18, color:"#8ac11a"}}>job_description : </span>  {e.job_description}</div>
            <div className='d-flex gap-5'>
            <div><span style={{fontSize:18, color:"#8ac11a"}}>start_date : </span> {e.start_date}</div>
            <div><span style={{fontSize:18, color:"#8ac11a"}}>due_date : </span> {e.due_date}</div>
            </div>
            <div><span style={{fontSize:18, color:"#8ac11a"}}>job_level : </span>  {e.job_level}</div>
          </div>
        </div>
    </div>
      ))
    ) :""}

  
    </div>
  );
}

export default UserViewJop;
