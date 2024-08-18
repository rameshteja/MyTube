import React, { useEffect, useState } from 'react'
import './PlayVideo.css'
import video1 from '../../assets/video.mp4'
import like from '../../assets/like.png'
import dislike from '../../assets/dislike.png'
import share from '../../assets/share.png'
import save from '../../assets/save.png'
import { API_KEY, value_converter } from '../../data'
import moment from 'moment/moment'
import { useParams } from 'react-router-dom'

const PlayVideo = () => {
  const { videoId } = useParams();
  const [apiData, setApiData] = useState(null);
  const [channelData, setChannelData] = useState(null);
  const [CommentData, setCommentData] = useState([]);

  const fetchVedioData = async () => {
    try {
      const vedio_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${API_KEY}`;
      const response = await fetch(vedio_url);
      const data = await response.json();
      setApiData(data.items[0]);
    } catch (error) {
      console.error("Error fetching video data:", error);
    }
  }

  const fetchChanneldata = async () => {
    if (!apiData || !apiData.snippet) return;

    try {
      const channel_url = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${apiData.snippet.channelId}&key=${API_KEY}`;
      const response = await fetch(channel_url);
      const data = await response.json();
      setChannelData(data.items[0]);

      //fetching commented data
      const comment_url = `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&maxResults=50&videoId=${videoId}&key=${API_KEY}`;
      const comment_response = await fetch(comment_url);
      const comment_data = await comment_response.json();
      setCommentData(comment_data.items);
    } catch (error) {
      console.error("Error fetching channel data:", error);
    }
  }

  useEffect(() => {
    fetchVedioData();
  }, [videoId]);

  useEffect(() => {
    if (apiData) {
      fetchChanneldata();
    }
  }, [apiData]);

  if (!apiData) {
    return <div>Loading...</div>;  // Add a loading state
  }

  return (
    <div className='play-video'>
      <iframe 
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1`} 
        frameBorder="0" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
      <h3>{apiData.snippet.title || "Title"}</h3>    
      <div className="play-video-info">
        <p>{value_converter(apiData.statistics.viewCount || 0)} views &bull; {moment(apiData.snippet.publishedAt).fromNow()}</p>
        <div>
          <span><img src={like} alt="" />{value_converter(apiData.statistics.likeCount || 0)}</span>
          <span><img src={dislike} alt="" /></span>
          <span><img src={share} alt="" />Share</span>
          <span><img src={save} alt="" />Save</span>
        </div>
      </div>
      <hr />
      <div className="publisher">
        <img src={channelData ? channelData.snippet.thumbnails.default.url : ''} alt='' />
        <div>
          <p>{apiData.snippet.channelTitle || 'Channel Title'}</p>
          <span>{channelData ? `${value_converter(channelData.statistics.subscriberCount)} subscribers` : 'Subscribers'}</span>
        </div>
        <button>Subscribe</button>
      </div>
      <div className="vid-description">
        <p>{apiData.snippet.description ? apiData.snippet.description.slice(0, 250) + '...' : "Description"}</p>
        <hr />
        <h4>{value_converter(apiData.statistics.commentCount || 0)} Comments</h4>
        {/* Comments section */}
        {CommentData.map((item, index) =>{
          return(
            <div className="comment" key={index}>
              <img src={item.snippet.topLevelComment.snippet.authorProfileImageUrl} alt="user_profile" />
              <div>
                <h3>{item.snippet.topLevelComment.snippet.authorDisplayName} <span>1 day ago</span></h3>
                <p>{item.snippet.topLevelComment.snippet.textDisplay}</p>
                <div className="comment-action">
                  <img src={like} alt="" />
                  <span>{value_converter(item.snippet.topLevelComment.snippet.likeCount)}</span>
                  <img src={dislike} alt="" />
                </div>
              </div>
            </div>
          )
        })}
        {/* Add more comments as needed */}
      </div>
    </div>
  )
}

export default PlayVideo
