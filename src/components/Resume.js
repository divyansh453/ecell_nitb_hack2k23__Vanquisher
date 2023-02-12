// import React,{useState} from 'react';
// import axios from 'axios';

// const Resume = () => {
//     const[img,setImg]=useState('')
//     function handleImg(e){
//         console.log(e.target.files)
//         setImg(e.target.files[0])
//     }
//     function submit(){
//         const formData=new FormData();
//         formData.append('image',img)
//         axios.post('https://ecellnitbhack2k23vanquisher-production.up.railway.app/info_student/resume_pdf/5',
//         formData)
//         .then((res)=>{
//             console.log(res)
//         })

//     }
//   return (
//     <div className='resume'>
//         <h2>Upload File in react</h2>
//         <input type="file" onChange={handleImg} name="img"/>
//         <button onClick={submit}>Submit</button>
//     </div>
//   )
// }

// export default Resume

// import axios from 'axios';
  
// import React,{Component} from 'react';
  
// class Resume extends Component {
   
//     state = {
  
//       // Initially, no file is selected
//       selectedFile: null
//     };
     
//     // On file select (from the pop up)
//     onFileChange = event => {
     
//       // Update the state
//       this.setState({ selectedFile: event.target.files[0] });
     
//     };
     
//     // On file upload (click the upload button)
//     onFileUpload = () => {
     
//       // Create an object of formData
//       const formData = new FormData();
     
//       // Update the formData object
//       formData.append(
//         "myFile",
//         this.state.selectedFile,
//         this.state.selectedFile.name
//       );
     
//       // Details of the uploaded file
//       console.log(this.state.selectedFile);
     
//       // Request made to the backend api
//       // Send formData object
//       axios.post("https://ecellnitbhack2k23vanquisher-production.up.railway.app/info_student/resume_pdf/8", formData);
//     };
     
//     // File content to be displayed after
//     // file upload is complete
//     fileData = () => {
     
//       if (this.state.selectedFile) {
          
//         return (
//           <div>
//             <h2>File Details:</h2>
//             <p>File Name: {this.state.selectedFile.name}</p>
  
//             <p>File Type: {this.state.selectedFile.type}</p>
  
//             <p>
//               Last Modified:{" "}
//               {this.state.selectedFile.lastModifiedDate.toDateString()}
//             </p>
  
//           </div>
//         );
//       } else {
//         return (
//           <div>
//             <br />
//             <h4>Choose before Pressing the Upload button</h4>
//           </div>
//         );
//       }
//     };
     
//     render() {
     
//       return (
//         <div>
//             <h1>
//               GeeksforGeeks
//             </h1>
//             <h3>
//               File Upload using React!
//             </h3>
//             <div>
//                 <input type="file" onChange={this.onFileChange} />
//                 <button onClick={this.onFileUpload}>
//                   Upload!
//                 </button>
//             </div>
//           {this.fileData()}
// //         </div>
// //       );
// //     }
// //   }
  
// //   export default Resume;
// const axios = require('axios');
// const fs= require('fs');

// const stream = fs.createReadStream('./download.jpg');

// axios.post('https://ecellnitbhack2k23vanquisher-production.up.railway.app/info_student/resume_pdf/2', {
//         stream,
//         name: 'add.jpg',
//         mimeType: 'image/jpeg',
//     }
// )
// .then((res) => {
//     console.log(`statusCode: ${res.statusCode}`)
//     console.log(res)
// })
// .catch((error) => {
//     console.error(error)
// })

import React from "react";
import axios from "axios";
export default function App() {
  const [uploadFile, setUploadFile] = React.useState();
  const [superHero, setSuperHero] = React.useState();
  
  const submitForm = (event) => {
    event.preventDefault();
    const dataArray = new FormData();
    dataArray.append("superHeroName", superHero);
    dataArray.append("uploadFile", uploadFile);
    axios
      .post("https://ecellnitbhack2k23vanquisher-production.up.railway.app/info_student/resume_pdf/2", dataArray, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
      .then((response) => {
        console.log("successfully uploaded response")
      })
      .catch((error) => {
        // error response
      });
  };
  return (
    <div>
      <form onSubmit={submitForm}>
        <input
          type="text"
          onChange={(e) => setSuperHero(e.target.value)}
          placeholder={"Superhero Name"}
        />
        <br />
        <input type="file" onChange={(e) => setUploadFile(e.target.files)} />
        <br />
        <input type="submit" />
      </form>
    </div>
  );
}