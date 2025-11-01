import React, { useEffect, useState } from 'react';
import './results.css';
import { Link, useParams } from 'react-router-dom';
import { API_KEY } from '../../data';
import moment from 'moment';
import { value_converter } from '../../data';
import Sidebar from '../../Components/Sidebar/Sidebar';

const SearchResults = ({sidebar}) => {
  const { searchQuery } = useParams();
  const [results, setResults] = useState([]);
  const [category, setCategory] = useState(0);

  const fetchSearchResults = async () => {
    try {
      const searchUrl = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=30&q=${encodeURIComponent(searchQuery)}&key=${API_KEY}`;
      const response = await fetch(searchUrl);
      const data = await response.json();
      // Filter only videos (YouTube search also returns channels/playlists)
      const videoResults = data.items.filter(item => item.id.kind === "youtube#video");
      setResults(videoResults);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  useEffect(() => {
    fetchSearchResults();
  }, [searchQuery]);

  return (
    <>
      <Sidebar sidebar={sidebar} category={category} setCategory={setCategory}/>
      <div className={`container search-results ${sidebar?"":"large-container"}`}>
        {results.map((item) => (
          <Link
            to={`/video/${item.snippet.categoryId || '0'}/${item.id.videoId}`}
            key={item.id.videoId}
            className="search-card"
          >
            <img
              src={item.snippet.thumbnails.medium.url}
              alt={item.snippet.title}
            />
            <div className="search-info">
              <h5>{item.snippet.title}</h5>
              <p className="time">{moment(item.snippet.publishedAt).fromNow()}</p>
              <p className="channel">{item.snippet.channelTitle}</p>
              <p className="desc">{item.snippet.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};

export default SearchResults;
