import React, { useState, useEffect } from "react";
import axios from "axios";
const api = 'http://localhost:3001/';
function IndexContentAdmin() {
  const [selectedFile, setSelectedFile] = useState();

  const submitEmployeeRecord = async (e) => {
    const formData = new FormData();

    formData.append('file', selectedFile);

    axios.post(api + 'addsanpham/', formData)
      .then(res => {
        console.log(res);
      })
  }
  return (
    <div className="page-wrapper">
      <input type="file" name="file" className="form-control mb-4" onChange={(e) => setSelectedFile(e.target.files[0])} />
      <input className='button5' type="submit" value={"Thêm"} onClick={submitEmployeeRecord}/>
    </div>
  );
}

export default IndexContentAdmin;