import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import './App.css';

import BooksController from "./BooksManagement/BooksController";
import HomePage from "./HomePage";
import MembersController from "./MemberManagement/MembersController";
import TransactionController from "./TransactionManagement/TransactionController";

function App() {
  return (
    <>
      <h5 onClick={() => window.location.href = '/'}>Home</h5>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/books" element={<BooksController />} />
          <Route path="/members" element={<MembersController />} />
          <Route path="/transaction" element={<TransactionController />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
