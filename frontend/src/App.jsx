import React, { useEffect, useState } from 'react';
import Background from './components/Background';
import Foreground from './components/Foreground';
import Footer from './components/Footer';
import API from './config';
import axios from 'axios';

const App = () => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const res = await axios.get(API.USERS);
      setData(res.data);
    } catch (err) {
      console.error('Error fetching users:', err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="w-screen h-screen relative bg-zinc-800">
      <Background />
      <Foreground data={data} setData={setData} />
      <Footer fetchData={fetchData} />
    </div>
  );
};

export default App;
