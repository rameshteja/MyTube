import React, { useEffect, useState } from 'react'
import './Recommended.css'
import { API_KEY, value_converter } from '../../data'
import { Link } from 'react-router-dom';

const Recommended = ({categoryId}) => {
  const [apiData, setApiData] = useState([]);
  const fetchData = async () => {
    try {
      const vedio_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=IN&videoCategoryId=${categoryId}&key=${API_KEY}`;
      const response = await fetch(vedio_url);
      const data = await response.json();
      setApiData(data.items);
    } catch (error) {
      console.error("Error fetching video data:", error);
    }
  }
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className='recommended'>
      {apiData.map((item, index) => {
        return(
          <Link to={`/video/${item.snippet.categoryId}/${item.id}`} className="side-video-list" key={index}>
            <img src={item.snippet.thumbnails.medium.url} alt="" />
            <div className="vid-info">
              <h4>{item.snippet.title.slice(0,50)}</h4>
              <p>{item.snippet.channelTitle}</p>
              <p>{value_converter(item.statistics.viewCount)} views</p>
            </div>
          </Link>
        )
      })}
      
    </div>
  )
}

export default Recommended
