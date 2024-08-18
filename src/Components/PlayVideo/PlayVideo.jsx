import React from 'react'
import './PlayVideo.css'
import video1 from '../../assets/video.mp4'
import like from '../../assets/like.png'
import dislike from '../../assets/dislike.png'
import share from '../../assets/share.png'
import save from '../../assets/save.png'
import jack from '../../assets/jack.png'
import user_profile from '../../assets/user_profile.jpg'

const PlayVideo = () => {
  return (
    <div className='play-video'>
      <video src={video1} controls autoPlay muted></video>  
      <h3>Best youtube channel to learn web development</h3>    
      <div className="play-video-info">
        <p>15k views &bull; 2days ago</p>
        <div>
          <span><img src={like} alt="" />125</span>
          <span><img src={dislike} alt="" />2</span>
          <span><img src={share} alt="" />Share</span>
          <span><img src={save} alt="" />Save</span>
        </div>
      </div>
      <hr/>
      <div className="publisher">
        <img src={jack} alt='' />
        <div>
          <p>Geaterstak</p>
          <span>1M subscribners</span>
        </div>
        <button>Sunscribe</button>
      </div>
      <div className="vid-description">
        <p>Channel that makes learne easy</p>
        <p>Subscribe to learn more</p>
        <hr/>
        <h4>130 Comments</h4>
        <div className="comment">
          <img src={user_profile} alt="user_profile" />
          <div>
            <h3>jack <span>1day ago</span></h3>
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
            <div className="comment-action">
              <img src={like}  alt="" />
              <span>244</span>
              <img src={dislike} alt="" />
            </div>
          </div>
        </div>
        <div className="comment">
          <img src={user_profile} alt="user_profile" />
          <div>
            <h3>jack <span>1day ago</span></h3>
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
            <div className="comment-action">
              <img src={like}  alt="" />
              <span>244</span>
              <img src={dislike} alt="" />
            </div>
          </div>
        </div>
        <div className="comment">
          <img src={user_profile} alt="user_profile" />
          <div>
            <h3>jack <span>1day ago</span></h3>
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
            <div className="comment-action">
              <img src={like}  alt="" />
              <span>244</span>
              <img src={dislike} alt="" />
            </div>
          </div>
        </div>
        <div className="comment">
          <img src={user_profile} alt="user_profile" />
          <div>
            <h3>jack <span>1day ago</span></h3>
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
            <div className="comment-action">
              <img src={like}  alt="" />
              <span>244</span>
              <img src={dislike} alt="" />
            </div>
          </div>
        </div>
        <div className="comment">
          <img src={user_profile} alt="user_profile" />
          <div>
            <h3>jack <span>1day ago</span></h3>
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
            <div className="comment-action">
              <img src={like}  alt="" />
              <span>244</span>
              <img src={dislike} alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PlayVideo
