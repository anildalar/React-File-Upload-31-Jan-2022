import axios from 'axios';
import React, { useEffect, useState } from 'react';
import FileUpload2 from './FileUpload2';

const config2 = require('../config2.json');

//RFC = React Funcitonal Compoent
export default function Login2() {

    //1. State/ Hoook Variable
    const [data2,setData2] = useState({
        identifier:'anil@gmail.com',
        password:'anil@123'
    }) // {P:V,P:V} = JS Object
    const [user,setUser] = useState({ //JS Object   object.property
        user:null,
        is_loggedin:true
    })

    useEffect(()=>{
        //get the local storage value
        try {
            let user = JSON.parse(localStorage.getItem('user'))
            if(user){
                //logged in
                setUser({
                    ...user,
                    is_loggedin:true
                })
            }else{
                //not logged in
                setUser({
                    ...user,
                    is_loggedin:false
                })
            }
            
        } catch (error) {
            
        }

        //alert('Page Loaded successfully!');
    },[])

    //2. Functions defination
    let logout = ()=>{
        console.log('OKOKOKOK');
        //now remove the local storage value
        localStorage.removeItem('user');
        //localStorage.clear();
        //Pure JS Technique

        window.location.replace('/')
    }
    let handleChange = (e)=>{ // e = event e is a formal argument
        console.log(e.target.classList.contains('a_username'));
        if(e.target.classList.contains('a_username')){
            //username
            console.log(e.target.value);
            setData2({
                //get the previous data2 and place here
                ...data2,
                //Now set the value of key/property
                identifier: e.target.value
            });
            console.log('username block')
        }
        if(e.target.classList.contains('a_password')){
            //password
            setData2({
                //get the previous data2 and place here
                ...data2,
                //Now set the value of key/property
                password: e.target.value
            });
            console.log('password block')
        }
    }
    let login = async (e)=>{
        e.preventDefault();
        console.log(data2);
        console.log("ok")

        try {
            // await wait for PO
            let {data}= await axios.post(`${config2.dev_api_url}/api/auth/local`, {
                identifier: data2.identifier,
                password:data2.password ,
              });
    
            console.log(data);
    
            setUser({
                //get the previous data and place here
                ...user,
                is_loggedin:true
            });
    
            localStorage.setItem("user",JSON.stringify(data))   
        } catch (error) {
           console.log(error) 
        }
        // await PO Promise Object
        
    }


    //3. Return statement JSX
    return (
        <>
            <div className="row">
                <div className="col-6 offset-3 pt-5">
                { user.is_loggedin > 0 ||
                    <>
                        <h1 className="text-center">Login Form</h1>
                        <form onSubmit={ (e)=>{ login(e) } }>
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                                <input type="email" className="form-control a_username" name="identifier" onChange={(e)=>{ handleChange(e) }} id="exampleInputEmail1" aria-describedby="emailHelp" />
                                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                                <input type="password" name="password"  onChange={(e)=>{ handleChange(e) }} className="form-control a_password" id="exampleInputPassword1" />
                            </div>
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </form>    
                    </>
                    
                }
                    
                </div>
            </div>
            { user.is_loggedin &&
                <>
                    <button onClick={ ()=>{ logout() }} className="btn btn-success text-center">Logout</button>
                    <FileUpload2 />
                </> 
            }
            
            

        </>
    );
}
