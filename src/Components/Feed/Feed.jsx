import React, { useEffect, useState } from 'react';
import './Feed.css';
import { Link } from 'react-router-dom';
import { API_KEY, value_converter } from '../../data';
import moment from 'moment';

const Feed = ({ category, searchQuery, searchSubmit }) => {
  const [data, setData] = useState([]);
  // Fetch most popular videos
  const fetchPopularVideos = async () => {
    try {
      const videolist_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=IN&videoCategoryId=${category}&key=${API_KEY}`;
      const response = await fetch(videolist_url);
      if (!response.ok) {
        if (response.status === 403) {
          console.error("Quota exceeded. Please check your API usage.");
          // Inform the user or handle the error accordingly
          return;
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setData(data.items);
    } catch (error) {
      console.error("Error fetching popular videos:", error);
    }
  };

  // Fetch search results
  const fetchSearchData = async () => {
    try {
      const videolist_url = `https://youtube.googleapis.com/youtube/v3/search?key=${API_KEY}&q=${searchQuery}&type=video&part=snippet&maxResults=50`;
      const response = await fetch(videolist_url);
      if (!response.ok) {
        if (response.status === 403) {
          console.error("Quota exceeded. Please check your API usage.");
          // Inform the user or handle the error accordingly
          return;
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setData(data.items);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  useEffect(() => {
    if (searchQuery) {
      fetchSearchData();
    } else {
      fetchPopularVideos();
    }
  }, [searchSubmit, category]);
  
  return (
    <div className="feed">
      {data.length > 0 ? (
        data.map((item, index) => (
          <Link
            to={`video/${item.snippet.categoryId}/${item.id.videoId || item.id}`}
            className='card'
            key={item.id.videoId || item.id}
          >
            <img src={item.snippet.thumbnails.medium.url} alt='' />
            <h2>{item.snippet.title}</h2>
            <h3>{item.snippet.channelTitle}</h3>
            <p>{value_converter(item.statistics?.viewCount || item.snippet?.viewCount)} views &bull; {moment(item.snippet.publishedAt).fromNow()}</p>
          </Link>
        ))
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
};

export default Feed;
