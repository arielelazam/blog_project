import "./HomePage.css";
import axios from "axios";
import PostModal from "../../components/PostModal/PostModal";
import PostCard from "../../components/PostCard/PostCard";
import { useEffect, useState, Fragment } from "react";

const HomePage = () => {
  const [postsArr, setPostsArr] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [changed, setChanged] = useState(false);

  useEffect(() => {
    axios.get("/posts/allposts").then((dataFromServer) => {
      setPostsArr(dataFromServer.data);
    });
  }, [changed]);

  useEffect(() => {
    if (postsArr.length > 0) {
      setLoaded(true);
    }
  }, [postsArr]);

  const handlePageRefresh = () => {
    if (changed === true) {
      setChanged(false);
    } else {
      setChanged(true);
    }
  };

  return (
    <Fragment>
      <br />
      <br />
      <PostModal hasChanged={handlePageRefresh}></PostModal>
      <br />
      <br />

      <div className="row row-cols-1 row-cols-md-3 g-4 home-main-div">
        {!loaded && <h1>loading...</h1>}

        {postsArr.map((item) => {
          return (
            <PostCard
              key={item._id}
              id={item._id}
              title={item.title}
              image={item.image}
            ></PostCard>
          );
        })}
      </div>
    </Fragment>
  );
};

export default HomePage;
