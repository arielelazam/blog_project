import "./PostModal.css";
import Joi from "joi-browser";
import createPostSchema from "../../validation/createPostValidation";
import axios from "axios";
import { React, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const PostModal = (props) => {
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
    setTitleError([]);
    setImageError([]);
  };
  const handleShow = () => setShow(true);

  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");

  const [titleError, setTitleError] = useState([]);
  const [imageError, setImageError] = useState([]);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };
  const handleImageChange = (event) => {
    setImage(event.target.value);
  };

  const resetValues = () => {
    setTitle("");
    setImage("");
    setTitleError([]);
    setImageError([]);
  };

  const handleCreatePost = (event) => {
    event.preventDefault();

    const validatedValue = Joi.validate({ title, image }, createPostSchema, {
      abortEarly: false,
    });

    const { error } = validatedValue;
    if (error) {
      let newTitleErr = [];
      let newImageErr = [];

      error.details.forEach((item) => {
        const errMsg = item.message;
        const errSrc = item.path[0];

        if (errSrc === "title") {
          newTitleErr = [...newTitleErr, errMsg];
        }
        if (errSrc === "image") {
          newImageErr = [...newImageErr, errMsg];
        }

        setTitleError(newTitleErr);
        setImageError(newImageErr);
      });
    } else {
      axios
        .post("/posts/createnewpost", {
          title,
          image,
        })
        .then(props.hasChanged())
        .then(resetValues())
        .then(handleClose())
        .catch((err) => {
          alert("error");
        });
    }
  };

  return (
    <>
      <Button className="nextButton add-post-btn" onClick={handleShow}>
        Add Post
      </Button>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleCreatePost}>
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Insert Title</label>
              <input
                type="text"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                value={title}
                onChange={handleTitleChange}
              />
              {titleError.map((item, idx) => {
                return (
                  <ul key={idx}>
                    <li className="errMsg" key={idx}>
                      *{item}.
                    </li>
                  </ul>
                );
              })}
            </div>
            <br />
            <div className="form-group">
              <label htmlFor="exampleInputPassword1">Insert image URL</label>
              <input
                type="text"
                className="form-control"
                id="exampleInputPassword1"
                value={image}
                onChange={handleImageChange}
              />
              {imageError.map((item, idx) => {
                return (
                  <ul key={idx}>
                    <li className="errMsg" key={idx}>
                      *{item}.
                    </li>
                  </ul>
                );
              })}
            </div>
            <br />

            <button type="submit" className="btn btn-primary">
              Post!
            </button>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default PostModal;
