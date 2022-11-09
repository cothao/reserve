import React from 'react';
import './Button.css';
import { Link } from 'react-router-dom';


// is the double logout too much? Lee kinda roasted us lol
export function Button() {
  return (
    <Link to='logout'>
      <button className='btn'>Logout</button>
    </Link>
  );
}
