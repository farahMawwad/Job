import React ,{useState ,useEffect} from "react"
import axios from "axios";
import {AiOutlineEdit,AiOutlineDelete ,AiOutlineOrderedList} from "react-icons/ai";
function AdminViewJop() {
  const [ContainJob, setContainJob] = useState();
  const [select, setselect] = useState({});
  const [edit, setedit] = useState({
     job_title:  "",
    job_level:"",
    due_date :"",
    start_date :"",
    job_description :"",
  });
  useEffect (()=>{
    axios.get('http://127.0.0.1:8080/user/userview').then((res)=>{
      setContainJob(res.data)
    })
    },[ContainJob])
    const deletejob=async(id)=>{
  await axios.delete(`http://127.0.0.1:8080/user/deletejob/${id}`) 
}
const editjob=async(id)=>{
setselect((prev)=>({
...prev,
[id]:!prev[id]

}))
  await axios.patch(`http://127.0.0.1:8080/user/editjob/${id}`,edit,{
    headers: {
      'Content-Type': 'application/json',
    }}) 
  
    }
    const orderedList=()=>{

    }
  return (
    <div className="AdminViewJop">
          {ContainJob  ? (
          ContainJob.map((e) => (
       <div className="AdminViewJop d-flex justify-content-center "  key={e._id}>
        <div className="col-12 m-3 flex-column p-4  bg-info " style={{ borderRadius: 20, width: '80%' }} >
          <div className="mb-2 border border-3 bg-info-subtle p-2 rounded-4 d-flex flex-column gap-2">
            <div> <span style={{ fontSize: 18, color: "#8ac11a" }}>job_title : </span>
          <input
  value={select[e._id] ? edit.job_title : e.job_title}
  disabled={select[e._id] ? false : true}
  onChange={(event) =>
    setedit((prevEdit) => ({
      ...prevEdit,
      job_title: event.target.value === undefined ? e.job_title : event.target.value
    }))
  }
  onFocus={() => {
    if (select[e._id]) {
      setedit((prevEdit) => ({
        ...prevEdit,
        job_title: e.job_title
      }));
    }
  }}
/></div>
            <div><span style={{fontSize:18, color:"#8ac11a"}}>job_description : </span>          <input
  value={select[e._id] ? edit.job_description : e.job_description}
  disabled={select[e._id] ? false : true}
  onChange={(event) =>
    setedit((prevEdit) => ({
      ...prevEdit,
      job_description: event.target.value === undefined ? e.job_description : event.target.value
    }))
  }
  onFocus={() => {
    if (select[e._id]) {
      setedit((prevEdit) => ({
        ...prevEdit,
        job_description: e.job_description
      }));
    }
  }}
/> </div>
            <div className='d-flex gap-5'>
            <div><span style={{fontSize:18, color:"#8ac11a"}}>start_date : </span>          <input
  value={select[e._id] ? edit.start_date : e.start_date}
  disabled={select[e._id] ? false : true}
  onChange={(event) =>
    setedit((prevEdit) => ({
      ...prevEdit,
      start_date: event.target.value === undefined ? e.start_date : event.target.value
    }))
  }
  onFocus={() => {
    if (select[e._id]) {
      setedit((prevEdit) => ({
        ...prevEdit,
        start_date: e.start_date
      }));
    }
  }}
/></div>
            <div><span style={{fontSize:18, color:"#8ac11a"}}>due_date : </span>           <input
  value={select[e._id] ? edit.due_date : e.due_date}
  disabled={select[e._id] ? false : true}
  onChange={(event) =>
    setedit((prevEdit) => ({
      ...prevEdit,
      due_date: event.target.value === undefined ? e.due_date : event.target.value
    }))
  }
  onFocus={() => {
    if (select[e._id]) {
      setedit((prevEdit) => ({
        ...prevEdit,
        due_date: e.due_date
      }));
    }
  }}
/> </div>
            </div>
            <div><span style={{fontSize:18, color:"#8ac11a"}}>job_level : </span>           <input
  value={select[e._id] ? edit.job_level: e.job_level}
  disabled={select[e._id] ? false : true}
  onChange={(event) =>
    setedit((prevEdit) => ({
      ...prevEdit,
      job_level: event.target.value === undefined ? e.job_level : event.target.value
    }))
  }
  onFocus={() => {
    if (select[e._id]) {
      setedit((prevEdit) => ({
        ...prevEdit,
        job_level: e.job_level
      }));
    }
  }}
/></div>
            <div className="d-flex justify-content-center justify-content-around m-3">
{select[e._id]?<button  className="btn btn-outline-primary"  onClick={()=>editjob(e._id)} >Supmit</button>:""}
            <AiOutlineDelete onClick={()=>deletejob(e._id)} />
            <AiOutlineEdit   onClick={()=>{
              setselect((prev)=>({
              ...prev,
            [e._id]:!prev[e._id]
            }))
            
            
            }}/>
            <AiOutlineOrderedList  onClick={()=>orderedList(e._id)} />
            </div>
          </div>
        </div>
    </div>
          ))):""}
    </div>
  );
}

export default AdminViewJop;