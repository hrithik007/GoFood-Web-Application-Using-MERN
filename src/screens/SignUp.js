import React, { useState } from 'react'

export default function SignUp() {
const [creds, setCreds] = useState({name:"",email:"",password:""})
const handleSubmit = async(e)=>{
    e.preventDefault();
    const res = await fetch("http://localhost:5000/api/createuser",{
        method:'POST',
        headers:{
            'Content-type':'application/json' 
        },
        body:JSON.stringify({name:creds.name, email:creds.email, password:creds.password})
    });

    console.log("Res :");
    console.log(res);
        const json = await res.json();
        console.log(json);
        setCreds({name:"",email:"",password:""});

}

const onChange = (event)=>{
    setCreds({...creds,[event.target.name]:event.target.value})
}
  return (
    <>
<div className='container'>
<form onSubmit={handleSubmit}>
    <div className="form-group">
    <label htmlFor="exampleInputEmail1">Name</label>
    <input type="text" className="form-control" id="exampleInputName1"  placeholder="Enter Name" name='name' value={creds.name} onChange={onChange}/>
    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
  </div>
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

</div>
</>
  )
}
