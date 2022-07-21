import "./PostCard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faEye } from "@fortawesome/free-solid-svg-icons";

const PostCard = (props) => {
  return (
    <div className="col present-post-div">
      <div className="card h-100">
        <div className="img-div">
          <img src={props.image} className="post-img" alt="Post Image" />
        </div>

        <div className="main-div">
          <div className="card-body">
            <p className="card-text font-bolder">
              <span>{props.title}</span>
            </p>
          </div>
          <hr />
          <div className="info-area">
            <FontAwesomeIcon icon={faEye} color="#b6b6b6"></FontAwesomeIcon>
            <span>Write a comment</span>
            <FontAwesomeIcon icon={faHeart} color="#f4c0bf"></FontAwesomeIcon>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
