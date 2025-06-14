import React, { useRef, useEffect, useState } from 'react';
import { MdFileUpload } from 'react-icons/md';
import axios from 'axios';
import API from'../config';

const Footer = ({ fetchData }) => {
  const fileInputRef = useRef();

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await axios.post(API.UPLOAD, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      console.log('Upload success:', res.data);
      alert('File uploaded successfully!');
      await fetchData(); // refresh the user list
    } catch (err) {
      console.error('Upload failed:', err);
      alert('Upload failed');
    }
  };

  return (
    <>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
      <div
        onClick={handleClick}
        className="transition hover:scale-110 fixed bottom-5 right-5 bg-green-600 text-white p-4 rounded-full shadow-lg cursor-pointer hover:bg-green-700 z-50"
      >
        <MdFileUpload size={28} />
      </div>
    </>
  );
};

export default Footer;
