import React from 'react';
import axios from 'axios';

const Test = () => {

  function makePostRequest(path, queryObj) {
    axios.post(path, queryObj).then(
        (response) => {
            var result = response.data;
            console.log(result);
        },
        (error) => {
            console.log(error);
        }
    );
  }
  
  let queryObj = { url: 'id.jpeg' };
  makePostRequest('http://127.0.0.1:5000/scan', queryObj);


  return (
    <div>
      <h1>Test</h1>
      <p>This is a test page</p>
    </div>
  );

  
};

export default Test;

/*
    const [selectedFile, setSelectedFile] = useState("");

    const submitForm = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("file", selectedFile);
      
        axios
          .post('http://localhost:8888/addPictureOnServer.php', formData,{
            headers: {
              'Content-Type': 'multipart/form-data'
            }
            })
          .then((res) => {
            alert("File Upload success");
          })
          .catch((err) => alert("File Upload Error"));
    };

    return (
        <div>
            <form>
                <input type="file" name="file" onChange={(e) => setSelectedFile(e.target.files[0])} className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md" />
                <button onClick={submitForm} type="submit">Envoyer</button>
            </form>
        </div>
    );*/