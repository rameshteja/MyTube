import React, { useState } from 'react'
import './Home.css';
import Sidebar from '../../Components/Sidebar/Sidebar';
import Feed from '../../Components/Feed/Feed';
const Home = ({sidebar, searchQuery, setSearchQuery, searchSubmit}) => {
  const [category, setCategory] = useState(0);

  return (
    <>
      <Sidebar sidebar={sidebar} category={category} setCategory={setCategory} setSearchQuery={setSearchQuery}/>
      <div className={`container ${sidebar?"":"large-container"}`}>
        <Feed category={category} searchQuery={searchQuery} searchSubmit={searchSubmit}/>
      </div>
    </>
  )
}

export default Home
