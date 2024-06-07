import './App.css';
import React, { useState } from 'react';
import NavBar from './components/NavBar';
import News from './components/News';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar';

const App = () => {
  const pageSize = 6;
  const apiKey = '9183e2121dc94c48a1a3bd15fde0ad48'; // Use environment variable
  const [progress, setProgress] = useState(0);

  return (
    <Router>
      <div>
        <NavBar />
        <LoadingBar
          height={3}
          color='#f11946'
          progress={progress}
        />
        <Routes>
          <Route path="/" element={<News key="general-home" setProgress={setProgress} apiKey={apiKey} pageSize={pageSize} country="in" category="general" />} />
          <Route path="business" element={<News key="business" setProgress={setProgress} apiKey={apiKey} pageSize={pageSize} country="in" category="business" />} />
          <Route path="entertainment" element={<News key="entertainment" setProgress={setProgress} apiKey={apiKey} pageSize={pageSize} country="in" category="entertainment" />} />
          <Route path="general" element={<News key="general" setProgress={setProgress} apiKey={apiKey} pageSize={pageSize} country="in" category="general" />} />
          <Route path="health" element={<News key="health" setProgress={setProgress} apiKey={apiKey} pageSize={pageSize} country="in" category="health" />} />
          <Route path="science" element={<News key="science" setProgress={setProgress} apiKey={apiKey} pageSize={pageSize} country="in" category="science" />} />
          <Route path="sports" element={<News key="sports" setProgress={setProgress} apiKey={apiKey} pageSize={pageSize} country="in" category="sports" />} />
          <Route path="technology" element={<News key="technology" setProgress={setProgress} apiKey={apiKey} pageSize={pageSize} country="in" category="technology" />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
