import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import axios from "axios";

import Post from "../components/Post";

export default function Home() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    axios
      .get("/post/allpost")
      .then((res) => {
        console.log(res.data.posts);

        setPosts(res.data.posts);
      })
      .catch((err) => console.log(err));
    return () => {};
  }, []);

  return (
    <Grid container spacing={10}>
      <Grid item sm={8} xs={12}>
        {posts ? (
          posts.map((post, i) => <Post post={post} key={i} />)
        ) : (
          <p>No posts</p>
        )}
      </Grid>
      <Grid item sm={4} xs={12}>
        <p>Profile...</p>
      </Grid>
    </Grid>
  );
}
