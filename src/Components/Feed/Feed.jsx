import React, { useEffect, useState } from 'react'
import './Feed.css'
import { Link } from 'react-router-dom'
import { API_KEY, value_converter } from '../../data'
import moment from 'moment/moment'
const Feed = ({category}) => {
  const [data, setData] = useState([]);
  const fetchData = async () => {
    try {
      const videolist_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=IN&videoCategoryId=${category}&key=${API_KEY}`;
      const response = await fetch(videolist_url);
      const data = await response.json();
      setData(data.items);
    } catch (error) {
      console.error("Error fetching video data:", error);
    }
    
  }
  useEffect(()=>{
    fetchData();
  }, [category]);
  return (
    <div className="feed">
      {data.map((item, index) => {
        return (
          <Link to={`video/${item.snippet.categoryId}/${item.id}`} className='card' key={item.id}>
            <img src={item.snippet.thumbnails.medium.url} alt=''/>
            <h2>{item.snippet.title}</h2>
            <h3>{item.snippet.channelTitle}</h3>
            <p>{value_converter(item.statistics.viewCount)} views &bull; {moment(item.snippet.publishedAt).fromNow()}</p>
          </Link>
        )
      })}
    </div>
  )
}

export default Feed
