import axios from 'axios';
import React, { useState } from 'react';

//RFC
export default function FileUpload() {
    //1. State/Hoook Variable
    const [file,setFile] = useState('')


    //2. Function
    let handleChange = (e)=>{
        console.log('Changed',e[0])
        setFile(e[0])
    }
    let uploadImage = async (e)=>{ //Fat Arrow Function / Arrow function ES6  e=event
        e.preventDefault();
        console.log('OKOKOK');

        //Lets create an object of FormData Class

        //let object = new ClassName();
        let data = new FormData();
        data.append('files',file);

        //Promise Chain


        //await always wait for PO / Promise Object
        let upload_response =   await axios({
              method: 'POST',
              url:'http://localhost:1337/api/upload',
              data
          })

        console.log('file upload response ',upload_response)



    }

    //3. Return Statement Return JSX
    return (
        <>
            <div className="row">
                <div className="col-6 offset-3 pb-5">
                    <h1>File Upload using ReactJS and Axios</h1>
                    <form className="mt-5" onSubmit={(e)=>{ uploadImage(e) }}>
                        <div className="mb-3">
                            <label htmlFor="file" className="form-label">Upload File</label>
                            <input onChange={ (e)=>{ handleChange(e.target.files) } } type="file" accept="image/*" name="files" className="form-control" id="file"/>
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
        </>
    );
}
