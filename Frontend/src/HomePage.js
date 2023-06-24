import React from "react";
import { Link } from "react-router-dom";


export default function HomePage() {
  return (
    <>
      <h4 align="right"><Link style={{ color: 'inherit', textDecoration: 'inherit', marginRight: '10px'}} to="/books">Books</Link>
      <Link style={{ color: 'inherit', textDecoration: 'inherit', marginRight: '10px'}} to="/members">Members</Link>
      <Link style={{ color: 'inherit', textDecoration: 'inherit', marginRight: '10px'}} to="/transaction">Transaction</Link></h4>
      <div>
        <div style={{ color: 'brown', fontSize: '40px', fontWeight: 'bold' }} align="center">
          <p>Welcome!
            <br />
            This is Library Management App part of Assignment for FRAPPE
          </p>
        </div>
      </div>
    </>
  );
}
