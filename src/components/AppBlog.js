// Importing necessary packages from react, react-router-dom, and material-ui
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Button,
  CardActionArea,
  Box,
} from "@mui/material";
import Pagination from "@mui/material/Pagination";

function AppBlog() {
  // State to hold the data fetched from the API
  const [data, setData] = useState([]);
  // State to keep track of the current page
  const [currentPage, setCurrentPage] = useState(
    parseInt(localStorage.getItem("currentPage")) || 1
  );
  // The number of posts to show per page
  const postsPerPage = 8;

  // Fetch data from the API on component mount
  useEffect(() => {
    const fetchData = async () => {
      const [photosResponse, postsResponse] = await Promise.all([
        fetch("https://jsonplaceholder.typicode.com/photos"),
        fetch("https://jsonplaceholder.typicode.com/posts"),
      ]);

      const [photos, posts] = await Promise.all([
        photosResponse.json(),
        postsResponse.json(),
      ]);

      // Combine the photo and post data based on their IDs
      const data = photos.map((photo) => ({
        ...photo,
        ...posts.find((post) => post.id === photo.id),
      }));

      setData(data);
    };

    fetchData();
  }, []);

  // Store the current page in localStorage when it changes
  useEffect(() => {
    localStorage.setItem("currentPage", currentPage);
  }, [currentPage]);

  // Calculate the index of the last and first post to show on the current page
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  // Get the posts to show on the current page
  const currentPosts = data.slice(indexOfFirstPost, indexOfLastPost);

  // Map over the posts and create a card for each one
  const postElements = currentPosts.map((post) => (
    <Grid item xs={6} sm={6} md={3} key={post.id}>
      <Card sx={{ maxWidth: 345 }}>
        <Link to={`/post/${post.id}`} style={{ textDecoration: "none" }}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="150"
              image={post.thumbnailUrl}
              alt={post.title}
            />
          </CardActionArea>
        </Link>
        <CardContent sx={{ height: 200 }}>
          <Typography gutterBottom variant="h5" component="div">
            {post.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {post.body ? post.body.slice(0, 100) : null}
            {post.body && post.body.length > 100 ? "..." : ""}
          </Typography>
        </CardContent>
        <CardActions>
          <Link to={`/post/${post.id}`} style={{ textDecoration: "none" }}>
            <Button size="small" color="primary">
              More Details
            </Button>
          </Link>
        </CardActions>
      </Card>
    </Grid>
  ));

  // Create an array of page numbers for the pagination component
  const pageNumbers = Array.from(
    { length: Math.ceil(data.length / postsPerPage) },
    (_, i) => i + 1
  );

  // Handle changes to the current page when the user clicks on a different page number
  const handlePageChange = (_, value) => {
    setCurrentPage(value);
  };

  return (
    <Container maxWidth="lg">
      
      <Typography variant="h2" align="center" gutterBottom>
        Home หน้าแรกของหมู่เฮา
      </Typography>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2} justifyContent="center">
          {postElements}
        </Grid>
      </Box>
      {/* The pagination component */}
      <Container sx={{ display: "flex", justifyContent: "center",pt:"15px" }}>
        <Pagination
          color="primary"
          count={pageNumbers.length}
          page={currentPage}
          onChange={handlePageChange}
        />
      </Container>
    </Container>
  );
}

export default AppBlog;
