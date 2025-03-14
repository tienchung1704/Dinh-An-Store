import React, { useEffect, useState, useContext } from "react";
import "./Posts.css";
import axios from "axios";
import { toast } from "react-toastify";
import { StoreContext } from "../../context/StoreContext";

const Posts = () => {
  const { url } = useContext(StoreContext);

  const [post, setPost] = useState([]);

  const fetchPost = async () => {
    const response = await axios.get(`${url}/api/post/list`);
    if (response.data.success) {
      console.log(response.data.data);
      setPost(response.data.data);
    } else {
      toast.error("Error");
    }
  };

  useEffect(() => {
    fetchPost();
  }, []);

  return (
    <div className="posts" id="posts">
      <div className="list add flex-col">
        <h1>Our Posts</h1>
        <div className="list-table">
          {post.map((item, index) => {
            return (
              <div key={index} className="list-table-format">
                <img src={`${url}/images/` + item.image} alt="" />
                <div className="postContent">
                  <h2>{item.title}</h2>
                  <h3>{item.description}</h3>
                  <p>{item.detail}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Posts;
