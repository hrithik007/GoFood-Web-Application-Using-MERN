import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function Login() {
  const Navigate = useNavigate();
  const [creds, setCreds] = useState({email:"",password:""})
const handleSubmit = async(e)=>{
    e.preventDefault();
    const res = await fetch("http://localhost:5000/api/loginuser",{
        method:'POST',
        headers:{
            'Content-type':'application/json' 
        },
        body:JSON.stringify({email:creds.email, password:creds.password})
    });

        const json = await res.json();
        console.log(json);

        if(!json.success){
          alert("No user found ");
        }
        if(json.success){
          alert("login success ");
          localStorage.setItem("authToken",json.authToken)
          console.log(localStorage.getItem("authToken"))
        }
        setCreds({email:"",password:""});
Navigate("/");
}

const onChange = (event)=>{
    setCreds({...creds,[event.target.name]:event.target.value})
}

  return ( <div className='container'>
  <form onSubmit={handleSubmit}>
    <div className="form-group">
      <label htmlFor="exampleInputEmail1">Email address</label>
      <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" name='email' value={creds.email} onChange={onChange}/>
      <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
    </div>
    <div className="form-group">
      <label htmlFor="exampleInputPassword1">Password</label>
      <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" name='password' value={creds.password} onChange={onChange}/>
    </div>
  
    <button type="submit" className="btn btn-primary">Submit</button>
  </form>
  
  </div>)
}
