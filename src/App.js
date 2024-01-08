import React, { useState } from "react";
import { uploadFile, listObjects, downloadFile } from "./services/S3Service";

const S3Component = () => {
  const [file, setFile] = useState(null);
  const [bucketObjects, setBucketObjects] = useState([]);
  const [downloadedFile, setDownloadedFile] = useState("");

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/sample');
      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }
      const result = await response.json();
      console.log("RESULT1")
      console.log(result)
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const handleListObjects = async () => {
    try {
      const response = await listObjects("YOUR_BUCKET_NAME");
      setBucketObjects(response.Contents || []);
    } catch (error) {
      console.error("Error listing objects:", error);
    }
  };

  const handleDownload = async (key) => {
    try {
      const response = await downloadFile("YOUR_BUCKET_NAME", key);
      // `response.Body` contains the downloaded file data
      // Handle the downloaded file data as needed, e.g., display or save it
      setDownloadedFile(response.Body.toString());
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      <button onClick={handleListObjects}>List Objects</button>

      {bucketObjects.map((object) => (
        <div key={object.Key}>
          <span>{object.Key}</span>
          <button onClick={() => handleDownload(object.Key)}>Download</button>
        </div>
      ))}

      {downloadedFile && <div>Downloaded File: {downloadedFile}</div>}
    </div>
  );
};

export default S3Component;
