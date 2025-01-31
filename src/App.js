import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './Navbar';
import React, { Component } from 'react'
import News from './News';

export default class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <Navbar />
          <Routes>
            <Route exact path='/business' element={<News pageSize={18} country="in" key="business" category="business" />} />
            <Route exact path='/entertainment' element={<News pageSize={18} country="in" key="entertainment" category="entertainment" />} />
            <Route exact path='/general' element={<News pageSize={18} country="in" key="general" category="general" />} />
            <Route exact path='/health' element={<News pageSize={18} country="in" key="health" category="health" />} />
            <Route exact path='/science' element={<News pageSize={18} country="in" key="science" category="science" />} />
            <Route exact path='/sports' element={<News pageSize={18} country="in" key="sports" category="sports" />} />
            <Route exact path='/technology' element={<News pageSize={18} country="in" key="technology" category="technology" />} />
            <Route exact path='/*' element={<News pageSize={18} country="in" key="general" category="general" />} />
          </Routes>
        </Router>
      </div>
    )
  }
}
