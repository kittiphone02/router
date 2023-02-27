import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LayoutPage from "../components/LayoutPage";

function PagePost() {
  const [post, setPost] = useState({});
  const [commentArray, setCommentArray] = useState([]);
  const [ImagesArray, setImagesArray] = useState([]);
  const { postId } = useParams();

  async function getPost(id) {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
    const responseJson = await response.json();
    setPost(responseJson);
  }

  async function getCommentArray(id) {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`);
    const responseJson = await response.json();
    setCommentArray(responseJson);
  }

  async function getImage(id) {
    const response = await fetch(`https://jsonplaceholder.typicode.com/photos/${id}`);
    const responseJson = await response.json();
    setImagesArray(responseJson);
  }

  useEffect(() => {
    getPost(postId);
    getCommentArray(postId);
    getImage(postId);
  }, [postId]);
  

  const commentElements = commentArray.map(comment => {
    return (
      <div key={comment.id}>
        <p>{comment.body}</p>
        <p>{comment.email}</p>
        <hr />
      </div>
    );
  });

  const imageElement = <img src={ImagesArray.url} alt={ImagesArray.title} />;

  return (
    <LayoutPage>
      <h2>{post.title}</h2>
      <p>{post.body}</p>
      <hr />
      <h4>{commentArray.length} Comments</h4>
      {commentElements}
      <hr />
      {imageElement}
    </LayoutPage>
  );
}

export default PagePost;
